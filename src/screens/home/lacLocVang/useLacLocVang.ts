import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';

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

    return () => unsubscribe(); // Cleanup để tránh memory leak
  }, []);

  const handleBack = () => {
    navigation.navigate("HuongDan")
  };

  return {
    data,
    isShaken,
    setIsShaken,
    handleBack,
  };
};
