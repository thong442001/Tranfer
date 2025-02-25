import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import database from "@react-native-firebase/database";
import {
  Alert,
} from 'react-native';
type UseLiXiVangProps = NativeStackScreenProps<StackRoutes, 'TabHome'>;

// Định nghĩa kiểu dữ liệu cho state `data`
interface SieuThiPhuKienData {
  title?: string;
  btn_back?: string;
  backGround?: string;
  backGround_phu?: string;
  btn_doi_ngay?: string;
  img_2may?: string;
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

export const useSieuThiPhuKien = ({ route, navigation }: UseLiXiVangProps) => {
  const { params } = route;
  const [data, setData] = useState<SieuThiPhuKienData | null>(null);
  const user = useSelector((state: any) => state.app.user);
  const [lixi, setLixi] = useState<number>(0);
  const [selectedGifts, setSelectedGifts] = useState<{ [key: string]: number }>({});
  const [gifts, setGifts] = useState<Gift[]>([]);

  useEffect(() => {
    fetchData();

    if (user?.uid) {
      getLiXi(user.uid);
    }

    // Lấy danh sách quà tặng từ Firebase
    const giftsRef = database().ref(`Tranfer-gifts`);
    giftsRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const giftArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setGifts(giftArray);
      }
    });

    return () => {
      giftsRef.off();
    };
  }, [user?.uid]);

  // Lấy dữ liệu từ Firestore
  const fetchData = async () => {
    const snapshot = await firestore()
      .collection("Tranfer-PageSieuThiPhuKien")
      .get();
    snapshot.forEach((doc) => {
      setData(doc.data() as SieuThiPhuKienData);
    });
  };

  // Lấy lì xì từ Firebase Realtime Database
  const getLiXi = async (uid: string) => {
    if (!uid) return;
    try {
      const userRef = database().ref(`Tranfer-users/${uid}/li_xi`);
      userRef.on("value", snapshot => {
        if (snapshot.exists()) {
          setLixi(snapshot.val());
        } else {
          setLixi(0);
        }
      });
    } catch (error) {
      console.error("Lỗi khi lấy lì xì:", error);
      setLixi(0);
    }
  };

  // Tăng số lượng quà được chọn
  const increaseQuantity = (id: string) => {
    setSelectedGifts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // Giảm số lượng quà được chọn
  const decreaseQuantity = (id: string) => {
    if (selectedGifts[id] > 0) {
      setSelectedGifts((prev) => ({
        ...prev,
        [id]: prev[id] - 1,
      }));
    }
  };

  // Xử lý đổi quà
  const handleExchange = () => {
    let totalCost = 0;
    let updatedGifts = [...gifts];

    Object.keys(selectedGifts).forEach((id) => {
      const gift = updatedGifts.find((g) => g.id === id);
      if (gift) {
        totalCost += gift.cost * selectedGifts[id];
      }
    });

    if (totalCost > lixi) {
      Alert.alert("Bạn không đủ lì xì để đổi quà!");
      return;
    }

    if (!user?.uid) {
      Alert.alert("Lỗi: Không tìm thấy user!");
      return;
    }

    const userRef = database().ref(`/Tranfer-users/${user.uid}/kho`);
    const lixiRef = database().ref(`/Tranfer-users/${user.uid}/li_xi`);

    // Trừ lì xì
    const newLiXi = lixi - totalCost;
    lixiRef.set(newLiXi);
    setLixi(newLiXi);

    // Cập nhật số lượng quà trong Firebase
    Object.keys(selectedGifts).forEach((id) => {
      const selectedQuantity = selectedGifts[id];
      const giftRef = database().ref(`/Tranfer-gifts/${id}/stock`);
      const userGiftRef = userRef.child(id);

      // Giảm số lượng quà trong hệ thống
      giftRef.transaction((currentStock) => {
        return (currentStock || 0) - selectedQuantity;
      });

      // Thêm quà vào kho của user
      userGiftRef.transaction((currentData) => {
        return {
          ...gifts.find((g) => g.id === id),
          stock: (currentData?.stock || 0) + selectedQuantity,
          status: "Chưa nhận",
        };
      });
    });

    // Reset số lượng quà đã chọn
    setSelectedGifts({});
    Alert.alert("Đổi quà thành công! Kiểm tra kho lộc.");
  };

  // Xử lý quay lại
  const handleBack = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", {
      screen: "HomeThanhLiXi",
    });
  };

  return {
    data,
    lixi,
    handleBack,
    gifts,
    increaseQuantity,
    decreaseQuantity,
    handleExchange,
    selectedGifts,
  };
};
