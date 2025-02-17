import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';

type UseThanhLiXi4Props = NativeStackScreenProps<StackRoutes, 'TabHome'>;

// Định nghĩa kiểu dữ liệu cho state `data`
interface ThanhLiXi4Data {
  title?: string;
  btn_back?: string;
  backGround_phu?: string;
  btn_chia_se?: string;
  btn_nhan_loc?: string;
  logo_vinh_tuong?: string;
}

export const useThanhLiXi4 = ({ route, navigation }: UseThanhLiXi4Props) => {
  const { params } = route;

  const [data, setData] = useState<ThanhLiXi4Data | null>(null);

  // Firebase collection reference
  const fb = firestore().collection('Tranfer-PageThanhLiXi4');

  useEffect(() => {
    const unsubscribe = fb.limit(1).onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        setData({
          title: doc.data()?.title,
          btn_back: doc.data()?.btn_back,
          backGround_phu: doc.data()?.backGround_phu,
          btn_chia_se: doc.data()?.btn_chia_se,
          btn_nhan_loc: doc.data()?.btn_nhan_loc,
          logo_vinh_tuong: doc.data()?.logo_vinh_tuong,
        });
      });
    });

    return () => unsubscribe(); // Cleanup để tránh memory leak
  }, []);

  const handleBack = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", {
      screen: "HomeThanhLiXi",
    });
  };


  return {
    data,
    handleBack,
  };
};
