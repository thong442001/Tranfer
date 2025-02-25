import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import database from "@react-native-firebase/database";

type UseKhoLocProps = NativeStackScreenProps<StackRoutes, 'TabHome'>;

// Định nghĩa kiểu dữ liệu cho state `data`
interface KhoLocData {
  title?: string;
  backGround?: string;
  backGround_phu?: string;
  logo_Vinh_Tuong?: string;
}

interface Gift {
  id: string;
  name: string;
  status: string;
  cost: number;
  stock: number;
  img: string;
  backGround: string;
  backGround_kho: string;
}

export const useKhoLoc = ({ route, navigation }: UseKhoLocProps) => {
  const { params } = route;
  const user = useSelector((state: any) => state.app.user);

  const [data, setData] = useState<KhoLocData | null>(null);
  const [isShaken, setIsShaken] = useState<number>(1);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [unclaimedCount, setUnclaimedCount] = useState(0);

  // Firebase collection reference
  const fb = firestore().collection('Tranfer-PageKhoLoc');

  useEffect(() => {
    if (!user?.uid) return;

    // Lắng nghe thay đổi từ Firestore
    const unsubscribe = fb.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        setData({
          title: doc.data()?.title,
          backGround: doc.data()?.backGround,
          backGround_phu: doc.data()?.backGround_phu,
          logo_Vinh_Tuong: doc.data()?.logo_Vinh_Tuong,
        });
      });
    });

    // Lấy dữ liệu từ Firebase Realtime Database
    const userGiftsRef = database().ref(`/Tranfer-users/${user.uid}/kho`);
    userGiftsRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        // Bỏ qua kho[0] (placeholder)
        const giftArray = Object.keys(data)
          .filter((key) => key !== "0")
          .map((key) => ({
            id: key,
            name: data[key].name,
            stock: data[key].stock,
            img: data[key].img,
            status: data[key].status,
            cost: data[key].cost,
            backGround: data[key].backGround,
            backGround_kho: data[key].backGround_kho,
          }));

        setGifts(giftArray);

        // Đếm số lượng quà chưa nhận
        const count = giftArray.reduce((total, gift) => total + gift.stock, 0);
        setUnclaimedCount(count);
      }
    });

    return () => {
      userGiftsRef.off();
      unsubscribe(); // Cleanup tránh memory leak
    };
  }, [user?.uid]);

  useEffect(() => {
    const count = gifts.reduce(
      (total, gift) => (gift.status === "Chưa nhận" ? total + gift.stock : total),
      0
    );
    setUnclaimedCount(count);
  }, [gifts]); // Mỗi khi `gifts` thay đổi, `unclaimedCount` sẽ được cập nhật lại


  const updateGiftStatus = async (giftId: string) => {
    if (!user?.uid) return;

    const userGiftRef = database().ref(`/Tranfer-users/${user.uid}/kho/${giftId}`);

    try {
      setGifts((prevGifts) =>
        prevGifts.map((gift) =>
          gift.id === giftId ? { ...gift, status: "Đã nhận" } : gift
        )
      );

      // Cập nhật trạng thái trên Firebase
      await userGiftRef.update({ status: "Đã nhận" });

      console.log(`Cập nhật trạng thái quà ${giftId} thành "Đã nhận"`);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái quà:", error);
    }
  };

  return {
    data,
    isShaken,
    setIsShaken,
    gifts, // Trả về danh sách quà
    unclaimedCount, // Trả về tổng số quà chưa nhận
    updateGiftStatus,
  };
};
