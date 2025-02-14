import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';

type UseLiXiVangProps = NativeStackScreenProps<StackRoutes, 'TabHome'>;

// Định nghĩa kiểu dữ liệu cho state `data`
interface DaiHoTranhTaiData {
  btn_back?: string;
  backGround?: string;
  btn_thu_tai_ban_vit?: string;
  btn_anh_hung_sieu_bao_ve?: string;
  btn_thanh_anh_kim?: string;
}

export const useTetTranhTai = ({ route, navigation }: UseLiXiVangProps) => {
  const { params } = route;

  const [data, setData] = useState<DaiHoTranhTaiData | null>(null);

  // Firebase collection reference
  const fb = firestore().collection('Tranfer-PageTetTranhTai');

  useEffect(() => {
    const unsubscribe = fb.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        setData({
          btn_back: doc.data()?.btn_back,
          backGround: doc.data()?.backGround,
          btn_thu_tai_ban_vit: doc.data()?.btn_thu_tai_ban_vit,
          btn_anh_hung_sieu_bao_ve: doc.data()?.btn_anh_hung_sieu_bao_ve,
          btn_thanh_anh_kim: doc.data()?.btn_thanh_anh_kim,
        });
      });
    });

    return () => unsubscribe(); // Cleanup để tránh memory leak
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };


  return {
    data,
    handleBack,
  };
};
