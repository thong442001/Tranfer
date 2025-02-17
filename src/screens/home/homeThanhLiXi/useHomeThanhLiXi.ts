import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';

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

    return () => unsubscribe(); // Cleanup để tránh memory leak
  }, []);

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

  return {
    data,
    handleBack,
    toThanhLiXi1,
  };
};
