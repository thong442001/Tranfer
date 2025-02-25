import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';

type UseThanhLiXi1Props = NativeStackScreenProps<StackRoutes, 'TabHome'>;

// Định nghĩa kiểu dữ liệu cho state `data`
interface ThanhLiXi1Data {
  title?: string;
  btn_back?: string;
  backGround_phu?: string;
  btn_tim_doi_thu?: string;
  img_chinh?: string;
  note?: string;
}

export const useThanhLiXi1 = ({ route, navigation }: UseThanhLiXi1Props) => {
  const { params } = route;

  const [data, setData] = useState<ThanhLiXi1Data | null>(null);

  // Firebase collection reference
  const fb = firestore().collection('Tranfer-PageThanhLiXi1');

  useEffect(() => {
    const unsubscribe = fb.limit(1).onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        setData({
          title: doc.data()?.title,
          btn_back: doc.data()?.btn_back,
          backGround_phu: doc.data()?.backGround_phu,
          btn_tim_doi_thu: doc.data()?.btn_tim_doi_thu,
          img_chinh: doc.data()?.img_chinh,
          note: doc.data()?.note,
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

  const toThanhLiXi2 = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", {
      screen: "ThanhLiXi2",
      params: { game: 'ThanhLiXi' }
    });
  };

  return {
    data,
    handleBack,
    toThanhLiXi2
  };
};
