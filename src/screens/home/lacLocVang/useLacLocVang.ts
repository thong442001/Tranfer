import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import database from "@react-native-firebase/database";
type UseLacLocVangProps = NativeStackScreenProps<StackRoutes, 'TabHome'>;

// Định nghĩa kiểu dữ liệu cho state `data`
interface LacLocVangData {
  btn_back?: string;
  backGround?: string;
  backGroundPerson?: string;
  btnLac1Luot?: string;
  btnLac10Luot?: string;
  imgPerson?: string;
}
interface Gift {
  id: string;
  name: string;
  cost: number;
  stock: number;
  img: string;
  backGround: string;
  backGround_kho: string;
}
export const useLacLocVang = ({ route, navigation }: UseLacLocVangProps) => {
  const { params } = route;

  const [data, setData] = useState<LacLocVangData | null>(null);
  const [isShaken, setIsShaken] = useState<boolean>(false);
  const user = useSelector((state: any) => state.app.user);
  const [luot_lac, setLuot_lac] = useState<number>(0);

  const [gifts, setGifts] = useState<Gift[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [visible10, setVisible10] = useState<boolean>(false);
  // 🆕 State lưu quà được random
  const [selectedGift, setSelectedGift] = useState<Gift[]>([]); // Lưu danh sách 10 quà
  const [msmmData, setMsmmData] = useState<Gift | null>(null);

  const [index, setindex] = useState<number>(0);

  // Firebase collection reference
  const fb = firestore().collection('Tranfer-PageLacLocVang');

  useEffect(() => {
    const unsubscribe = fb.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        setData({
          btn_back: doc.data()?.btn_back,
          backGround: doc.data()?.backGround,
          backGroundPerson: doc.data()?.backGroundPerson,
          btnLac1Luot: doc.data()?.btnLac1Luot,
          btnLac10Luot: doc.data()?.btnLac10Luot,
          imgPerson: doc.data()?.imgPerson,
        });
      });
    });
    // Chỉ gọi getLuot_lac khi user.uid có giá trị hợp lệ
    if (user && user.uid) {
      getLuot_lac(user.uid);
    }

    // Lấy danh sách quà từ Firebase
    const giftsRef = database().ref("/Tranfer-gifts-Lac-Loc-Vang");

    const onDataChange = (snapshot: any) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const giftArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setGifts(giftArray);
        // 🆕 Tìm "msmm" và lưu vào state
        const msmmGift = giftArray.find(gift => gift.id === "msmm");
        if (msmmGift) {
          setMsmmData(msmmGift);
        }
      }
    };

    giftsRef.on("value", onDataChange);

    return () => {
      giftsRef.off("value", onDataChange);
      unsubscribe(); // Cleanup để tránh memory leak
    }
  }, [user?.uid]);

  const getLuot_lac = async (uid: string) => {
    if (!uid) return; // Nếu uid không tồn tại, thoát luôn để tránh lỗi

    try {
      const userRef = database().ref(`Tranfer-users/${uid}/luot_lac`);

      // Lắng nghe thay đổi trực tiếp thay vì chỉ đọc 1 lần
      userRef.on("value", snapshot => {
        if (snapshot.exists()) {
          console.log("luot_lac của user:", snapshot.val());
          setLuot_lac(snapshot.val()); // Cập nhật UI ngay khi dữ liệu thay đổi
        } else {
          console.log("User không tồn tại hoặc chưa có luot_lac.");
          setLuot_lac(0);
        }
      });
    } catch (error) {
      console.error("Lỗi khi lấy luot_lac:", error);
      setLuot_lac(0);
    }
  };

  // Hàm random quà 1
  const shakeOnce = async () => {
    if (!user?.uid || gifts.length === 0 || luot_lac <= 0) return;

    // Lọc danh sách quà bỏ qua "msmm"
    const validGifts = gifts.filter(gift => gift.id !== "msmm");
    if (validGifts.length === 0) return;

    const randomGift = validGifts[Math.floor(Math.random() * validGifts.length)];

    // Đường dẫn đến kho quà của user
    const userGiftRef = database().ref(`/Tranfer-users/${user.uid}/kho/${randomGift.id}`);
    const userLuotLacRef = database().ref(`/Tranfer-users/${user.uid}/luot_lac`);

    try {
      // Cập nhật quà vào kho
      const snapshot = await userGiftRef.once("value");

      if (snapshot.exists()) {
        const currentStock = snapshot.val().stock || 0;
        await userGiftRef.update({ stock: currentStock + 1 });
      } else {
        await userGiftRef.set({
          ...randomGift,
          stock: 1,
          status: "Chưa nhận",
        });
      }

      // Cập nhật mã số may mắn (msmm)
      const userMsmmRef = database().ref(`/Tranfer-users/${user.uid}/kho/msmm`);
      const msmmSnapshot = await userMsmmRef.once("value");

      if (msmmSnapshot.exists()) {
        const currentStock = msmmSnapshot.val().stock || 0;
        await userMsmmRef.update({ stock: currentStock + 1 });
      } else {
        await userMsmmRef.set({
          ...msmmData,
          stock: 1,
          status: "Chưa nhận",
        });
      }

      // Trừ 1 lượt lắc
      await userLuotLacRef.transaction(currentLuot => (currentLuot || 0) > 0 ? currentLuot - 1 : 0);

      // ✅ Lưu quà vào state để hiển thị UI (danh sách 1 quà)
      setSelectedGift([randomGift]); // 🆕 Lưu vào mảng thay vì 1 object

    } catch (error) {
      console.error("Lỗi khi cập nhật quà hoặc trừ lượt lắc:", error);
    }
  };


  const shakeTenTimes = async () => {
    if (!user?.uid || gifts.length === 0 || luot_lac < 10) return;

    const userGiftRef = database().ref(`/Tranfer-users/${user.uid}/kho`);
    const userLuotLacRef = database().ref(`/Tranfer-users/${user.uid}/luot_lac`);

    try {
      let newGifts: Gift[] = []; // Mảng chứa 10 quà lắc được

      for (let i = 0; i < 10; i++) {
        // Lọc danh sách quà bỏ qua "msmm"
        const validGifts = gifts.filter(gift => gift.id !== "msmm");
        if (validGifts.length === 0) continue;

        const randomGift = validGifts[Math.floor(Math.random() * validGifts.length)];
        newGifts.push(randomGift);

        // Cập nhật quà vào kho người dùng
        const giftRef = userGiftRef.child(randomGift.id);
        const snapshot = await giftRef.once("value");

        if (snapshot.exists()) {
          const currentStock = snapshot.val().stock || 0;
          await giftRef.update({ stock: currentStock + 1 });
        } else {
          await giftRef.set({
            ...randomGift,
            stock: 1,
            status: "Chưa nhận",
          });
        }
      }

      // Cập nhật mã số may mắn vào kho
      const userMsmmRef = userGiftRef.child("msmm");
      const msmmSnapshot = await userMsmmRef.once("value");
      if (msmmSnapshot.exists()) {
        const currentStock = msmmSnapshot.val().stock || 0;
        await userMsmmRef.update({ stock: currentStock + 10 });
      } else {
        await userMsmmRef.set({
          ...msmmData,
          stock: 10,
          status: "Chưa nhận",
        });
      }

      // Trừ 10 lượt lắc
      await userLuotLacRef.transaction(currentLuot => (currentLuot || 0) >= 10 ? currentLuot - 10 : 0);

      // ✅ Lưu danh sách quà để hiển thị UI
      setSelectedGift(newGifts);

    } catch (error) {
      console.error("Lỗi khi cập nhật quà hoặc trừ lượt lắc:", error);
    }
  };


  const handleBack = () => {
    navigation.navigate("HuongDan")
  };

  const changeIndex = (n: number) => {
    setindex(index + n);
    navigation.navigate("HuongDan")
  };

  return {
    data,
    luot_lac,
    isShaken,
    setIsShaken,
    handleBack,
    selectedGift,  // gift random
    msmmData, // msmm
    shakeOnce, // Hàm lắc quà
    visible,
    setVisible,
    visible10,
    setVisible10,
    shakeTenTimes,
    index, // thứ tự của quà
    setindex,
  };
};
