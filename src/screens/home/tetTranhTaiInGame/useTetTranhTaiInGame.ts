import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LiXiVangRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';
import {
  Alert,
} from 'react-native';

type UseTetTranhTaiInGameProps = NativeStackScreenProps<LiXiVangRoutes, 'TetTranhTaiInGame'>;

// Định nghĩa kiểu dữ liệu cho state `data`
interface TetTranhTaiInGameData {
  btn_back?: string;
  backGround?: string;
  backGround1?: string;
  backGround2?: string;
  avt1?: string;
  avt2?: string;
  img_vs?: string;
  title?: string;
}

export const useTetTranhTaiInGame = ({ route, navigation }: UseTetTranhTaiInGameProps) => {
  const { params } = route as { params: { game: string } };

  const [data, setData] = useState<TetTranhTaiInGameData | null>(null);
  const [score, setScore] = useState<number>(0);
  const [score2, setScore2] = useState<number>(115);

  // Firebase collection reference
  const fb = firestore().collection('Tranfer-PageTetTranhTaiInGame');

  useEffect(() => {
    let title = ''
    if (params.game == 'ThuTaiBanVit') {
      title = 'THỬ TÀI BẮN VÍT'
    } else if (params.game == 'ThanhAnhKim') {
      title = 'THÁNH ÁNH KIM'
    } else {
      title = 'Anh Hùng Siêu Bảo Vệ'
    }

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
          title: title,
        });
      });
    });

    return () => unsubscribe(); // Cleanup để tránh memory leak
  }, []);

  const handleBack = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", {
      screen: "TetTranhTai",
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

  const handleTimeEnd = () => {
    if (score > score2) {
      Alert.alert("Thắng", `Bạn đã ghi được ${score} điểm`, [
        { text: "OK", onPress: () => handleBack() }
      ]);
    } else if (score == score2) {
      Alert.alert("Hòa", `Bạn đã ghi được ${score} điểm`, [
        { text: "OK", onPress: () => handleBack() }
      ]);
    } else {
      Alert.alert("Thua", `Bạn đã ghi được ${score} điểm`, [
        { text: "OK", onPress: () => handleBack() }
      ]);
    }

  };

  return {
    data,
    handleBack,
    toThuTaiBanVit,
    toAnhHungSieuBaoVe,
    toThanhAnhKim,
    score,
    setScore,
    score2,
    setScore2,
    handleTimeEnd,
  };
};
