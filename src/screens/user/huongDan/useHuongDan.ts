import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../rtk/Reducer';
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';

// Định nghĩa kiểu dữ liệu cho props của hook
type UseHuongDanProps = NativeStackScreenProps<StackRoutes, 'HuongDan'>;

// Định nghĩa kiểu dữ liệu cho state `data`
interface HuongDanData {
  title?: string;
  backGround?: string;
  btn_back?: string;
  img_chinh?: string;
  backGroundTxt?: string;
  content?: string;
  btn_tham_gia_ngay?: string;
}

export const useHuongDan = ({ route, navigation }: UseHuongDanProps) => {
  const { params } = route;

  const dispatch = useDispatch();
  const [data, setData] = useState<HuongDanData | null>(null);
  const [btnTron, setBtnTron] = useState<number>(1);

  // Firebase collection reference
  const fb = firestore().collection('Tranfer-PageHuongDan');

  useEffect(() => {
    const unsubscribe = fb.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        setData({
          title: doc.data()?.title,
          backGround: doc.data()?.backGround,
          btn_back: doc.data()?.btn_back,
          img_chinh: doc.data()?.img_chinh,
          backGroundTxt: doc.data()?.backGroundTxt,
          content: doc.data()?.content,
          btn_tham_gia_ngay: doc.data()?.btn_tham_gia_ngay,
        });
      });
    });

    return () => unsubscribe(); // Cleanup để tránh memory leak
  }, []);

  const handle = () => {
    dispatch(logout());
  };

  const handle1 = () => {
    navigation.navigate("TabHome")
  };

  return {
    data,
    btnTron,
    setBtnTron,
    handle,
    handle1
  };
};
