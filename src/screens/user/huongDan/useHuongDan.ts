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

interface DialogXinChaoData {
  backGround?: string;
  btn_confirm?: string;
}

export const useHuongDan = ({ route, navigation }: UseHuongDanProps) => {
  const { params } = route;

  const dispatch = useDispatch();
  const [data, setData] = useState<HuongDanData | null>(null);
  const [btnTron, setBtnTron] = useState<number>(1);
  const [dialogXinChaoData, setdDialogXinChaoData] =
    useState<DialogXinChaoData | null>(null);
  const [visible, setVisible] =
    useState<boolean>(true);

  // Firebase collection reference
  const fb = firestore().collection('Tranfer-PageHuongDan');
  const dialogFb = firestore().collection('Tranfer-DialogXinChao');

  useEffect(() => {
    const unsubscribe1 = fb.onSnapshot(querySnapshot => {
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

    const unsubscribe2 = dialogFb.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        setdDialogXinChaoData({
          backGround: doc.data()?.backGround,
          btn_confirm: doc.data()?.btn_confirm,
        });
      });
    });

    return () => {
      // Cleanup để tránh memory leak
      unsubscribe1();
      unsubscribe2();
    }
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
    handle1,
    dialogXinChaoData,
    visible,
    setVisible,
  };
};
