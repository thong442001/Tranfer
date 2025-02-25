import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';

type UseLiXiVangProps = NativeStackScreenProps<StackRoutes, 'TabHome'>;

// Định nghĩa kiểu dữ liệu cho state `data`
interface DaiHoTranhTaiData {
  btn_back?: string;
  title?: string;
  btn_chi_tiet?: string;
  backGround?: string;
  img_chinh?: string;
}

export const useLiXiVang = ({ route, navigation }: UseLiXiVangProps) => {
  const { params } = route;

  const [data, setData] = useState<DaiHoTranhTaiData | null>(null);

  // Firebase collection reference
  const fb = firestore().collection('Tranfer-PageDaiHoTranhTai');

  useEffect(() => {
    const unsubscribe = fb.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        setData({
          btn_back: doc.data()?.btn_back,
          title: doc.data()?.title,
          btn_chi_tiet: doc.data()?.btn_chi_tiet,
          backGround: doc.data()?.backGround,
          img_chinh: doc.data()?.img_chinh,
        });
      });
    });

    return () => unsubscribe(); // Cleanup để tránh memory leak
  }, []);

  const handleBack = () => {
    navigation.navigate("HuongDan")
  };

  const toHomeThanhLiXi = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", {
      screen: "HomeThanhLiXi",
      //screen: "BangXepHang",
    });
  };

  const toTetTranhTai = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", {
      screen: "TetTranhTai",
    });
  };

  return {
    data,
    handleBack,
    toHomeThanhLiXi,
    toTetTranhTai
  };
};
