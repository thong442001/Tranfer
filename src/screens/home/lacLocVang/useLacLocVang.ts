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

export const useLacLocVang = ({ route, navigation }: UseLacLocVangProps) => {
  const { params } = route;

  const [data, setData] = useState<LacLocVangData | null>(null);
  const [isShaken, setIsShaken] = useState<boolean>(false);
  const user = useSelector((state: any) => state.app.user);
  const [luot_lac, setLuot_lac] = useState<number>(0);

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
    return () => unsubscribe(); // Cleanup để tránh memory leak
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

  const handleBack = () => {
    navigation.navigate("HuongDan")
  };

  return {
    data,
    luot_lac,
    isShaken,
    setIsShaken,
    handleBack,
  };
};
