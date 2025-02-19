import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';

type UseThanhLiXi2Props = NativeStackScreenProps<StackRoutes, 'TabHome'>;

// Định nghĩa kiểu dữ liệu cho state `data`
interface ThanhLiXi2Data {
  avt?: string;
  btn_back?: string;
  backGround?: string;
  note?: string;
}

export const useThanhLiXi2 = ({ route, navigation }: UseThanhLiXi2Props) => {
  const { params } = route;

  const [data, setData] = useState<ThanhLiXi2Data | null>(null);

  // Firebase collection reference
  const fb = firestore().collection('Tranfer-PageThanhLiXi2');

  useEffect(() => {
    const unsubscribe = fb.limit(1).onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        setData({
          avt: doc.data()?.avt,
          btn_back: doc.data()?.btn_back,
          backGround: doc.data()?.backGround,
          note: doc.data()?.note,
        });
      });
    });

    const timeout = setTimeout(() => {
      toThanhLiXi3()
    }, 3000);

    return () => unsubscribe(); // Cleanup để tránh memory leak
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const toThanhLiXi3 = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", {
      screen: "ThanhLiXi3",
    });
  };

  return {
    data,
    handleBack,
  };
};
