import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';

type UseKhoLocProps = NativeStackScreenProps<StackRoutes, 'TabHome'>;

// Định nghĩa kiểu dữ liệu cho state `data`
interface KhoLocData {
  title?: string;
  backGround?: string;
  backGround_phu?: string;
  logo_Vinh_Tuong?: string;
}

export const useKhoLoc = ({ route, navigation }: UseKhoLocProps) => {
  const { params } = route;

  const [data, setData] = useState<KhoLocData | null>(null);
  const [isShaken, setIsShaken] = useState<number>(1);

  // Firebase collection reference
  const fb = firestore().collection('Tranfer-PageKhoLoc');

  useEffect(() => {
    const unsubscribe = fb.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        setData({
          title: doc.data()?.title,
          backGround: doc.data()?.backGround,
          backGround_phu: doc.data()?.backGround_phu,
          logo_Vinh_Tuong: doc.data()?.logo_Vinh_Tuong,
        });
      });
    });

    return () => unsubscribe(); // Cleanup để tránh memory leak
  }, []);

  return {
    data,
    isShaken,
    setIsShaken,
  };
};
