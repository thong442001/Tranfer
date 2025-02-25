import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import database from "@react-native-firebase/database";
type UseLiXiVangProps = NativeStackScreenProps<StackRoutes, 'TabHome'>;

// Định nghĩa kiểu dữ liệu cho state `data`
interface DaiHoTranhTaiData {
  btn_back?: string;
  backGround?: string;
  btn_thanh_li_xi?: string;
  btn_sieu_thi_phu_kien?: string;
}

export const useHomeThanhLiXi = ({ route, navigation }: UseLiXiVangProps) => {
  const { params } = route;

  const [data, setData] = useState<DaiHoTranhTaiData | null>(null);
  const user = useSelector((state: any) => state.app.user);
  const [lixi, setLixi] = useState<number>(0);

  // Firebase collection reference
  const fb = firestore().collection('Tranfer-PageHomeThanhLiXi');

  useEffect(() => {
    const unsubscribe = fb.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        setData({
          btn_back: doc.data()?.btn_back,
          backGround: doc.data()?.backGround,
          btn_thanh_li_xi: doc.data()?.btn_thanh_li_xi,
          btn_sieu_thi_phu_kien: doc.data()?.btn_sieu_thi_phu_kien,
        });
      });
    });

    // Chỉ gọi getLiXi khi user.uid có giá trị hợp lệ
    if (user && user.uid) {
      getLiXi(user.uid);
    }

    return () => unsubscribe(); // Cleanup tránh memory leak
  }, [user?.uid]); // Thêm dependency user.uid để gọi lại khi user thay đổi


  const getLiXi = async (uid: string) => {
    if (!uid) return; // Nếu uid không tồn tại, thoát luôn để tránh lỗi

    try {
      const userRef = database().ref(`Tranfer-users/${uid}/li_xi`);

      // Lắng nghe thay đổi trực tiếp thay vì chỉ đọc 1 lần
      userRef.on("value", snapshot => {
        if (snapshot.exists()) {
          console.log("Lì xì của user:", snapshot.val());
          setLixi(snapshot.val()); // Cập nhật UI ngay khi dữ liệu thay đổi
        } else {
          console.log("User không tồn tại hoặc chưa có lì xì.");
          setLixi(0);
        }
      });
    } catch (error) {
      console.error("Lỗi khi lấy lì xì:", error);
      setLixi(0);
    }
  };



  const handleBack = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", {
      screen: "LiXiVang",
    });
  };

  const toThanhLiXi1 = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", {
      screen: "ThanhLiXi1",
    });
  };

  const toSieuThiPhuKien = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", {
      screen: "SieuThiPhuKien",
    });
  };

  return {
    data,
    lixi,
    handleBack,
    toThanhLiXi1,
    toSieuThiPhuKien,
  };
};
