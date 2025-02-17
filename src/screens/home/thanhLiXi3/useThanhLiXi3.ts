import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';

type UseThanhLiXi3Props = NativeStackScreenProps<StackRoutes, 'TabHome'>;

// Định nghĩa kiểu dữ liệu cho state `data`
interface ThanhLiXi3Data {
  title?: string;
  btn_back?: string;
  backGround?: string;
  avt1?: string;
  avt2?: string;
  btn_choi?: string;
  btn_huy?: string;
}

export const useThanhLiXi3 = ({ route, navigation }: UseThanhLiXi3Props) => {
  const { params } = route;

  const [data, setData] = useState<ThanhLiXi3Data | null>(null);

  // Firebase collection reference
  const fb = firestore().collection('Tranfer-PageThanhLiXi3');

  useEffect(() => {
    const unsubscribe = fb.limit(1).onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        setData({
          title: doc.data()?.title,
          btn_back: doc.data()?.btn_back,
          backGround: doc.data()?.backGround,
          avt1: doc.data()?.avt1,
          avt2: doc.data()?.avt2,
          btn_choi: doc.data()?.btn_choi,
          btn_huy: doc.data()?.btn_huy,
        });
      });
    });

    return () => unsubscribe(); // Cleanup để tránh memory leak
  }, []);

  const handleBack = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", {
      screen: "ThanhLiXi1",
    });
  };

  const toThanhLiXi4 = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", {
      screen: "ThanhLiXi4",
    });
  };

  return {
    data,
    handleBack,
    toThanhLiXi4
  };
};
