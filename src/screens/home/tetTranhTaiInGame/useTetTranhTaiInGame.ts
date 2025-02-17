import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';

type UseTetTranhTaiInGameProps = NativeStackScreenProps<StackRoutes, 'TabHome'>;

// Định nghĩa kiểu dữ liệu cho state `data`
interface TetTranhTaiInGameData {
  btn_back?: string;
  backGround?: string;
  backGround1?: string;
  backGround2?: string;
  avt1?: string;
  avt2?: string;
  img_vs?: string;
}

export const useTetTranhTaiInGame = ({ route, navigation }: UseTetTranhTaiInGameProps) => {
  const { params } = route;

  const [data, setData] = useState<TetTranhTaiInGameData | null>(null);

  // Firebase collection reference
  const fb = firestore().collection('Tranfer-PageTetTranhTaiInGame');

  useEffect(() => {
    const unsubscribe = fb.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        setData({
          btn_back: doc.data()?.btn_back,
          backGround: doc.data()?.backGround,
          backGround1: doc.data()?.backGround1,
          backGround2: doc.data()?.backGround2,
          avt1: doc.data()?.avt1,
          avt2: doc.data()?.avt2,
          img_vs: doc.data()?.img_vs,
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

  const toThuTaiBanVit = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", {
      screen: "TetTranhTaiTimDoiThu",
      params: { game: 'ThuTaiBanVit' }
    });
  };

  const toAnhHungSieuBaoVe = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", {
      screen: "TetTranhTaiTimDoiThu",
      params: { game: 'AnhHungSieuBaove' }// v viết thường vì collection trên fb lở viết thường
    });
  };

  const toThanhAnhKim = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", {
      screen: "TetTranhTaiTimDoiThu",
      params: { game: 'ThanhAnhKim' }
    });
  };

  return {
    data,
    handleBack,
    toThuTaiBanVit,
    toAnhHungSieuBaoVe,
    toThanhAnhKim
  };
};
