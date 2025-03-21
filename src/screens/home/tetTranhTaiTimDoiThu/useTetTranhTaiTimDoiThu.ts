import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LiXiVangRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import { useSelector } from 'react-redux';
import {
  Alert,
} from 'react-native';
type UseTetTranhTaiTimDoiThuProps = NativeStackScreenProps<LiXiVangRoutes, 'TetTranhTaiTimDoiThu'>;

// Định nghĩa kiểu dữ liệu cho state `data`
interface TetTranhTaiTimDoiThuData {
  title?: string;
  title_phu?: string;
  content?: string;
  btn_back?: string;
  backGround?: string;
  backGround_phu?: string;
  btn_tim_doi_thu?: string;
  img?: string;
  note?: string;
  time?: string;
}

export const useTetTranhTaiTimDoiThu = ({ route, navigation }: UseTetTranhTaiTimDoiThuProps) => {
  const { params } = route as { params: { game: string } };


  const [data, setData] = useState<TetTranhTaiTimDoiThuData | null>(null);
  const user = useSelector((state: any) => state.app.user);

  //const game = params?.game ?? "defaultGame"; // Nếu `params` không tồn tại, dùng giá trị mặc định
  //const params = route.params!; // Dùng `!` để nói với TypeScript rằng `params` chắc chắn có giá trị
  // Firebase collection reference
  const fb = firestore().collection(`Tranfer-Page${params.game}`);

  useEffect(() => {
    const unsubscribe = fb.limit(1).onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        setData({
          title: doc.data()?.title,
          title_phu: doc.data()?.title_phu,
          content: doc.data()?.content,
          btn_back: doc.data()?.btn_back,
          backGround: doc.data()?.backGround,
          backGround_phu: doc.data()?.backGround_phu,
          btn_tim_doi_thu: doc.data()?.btn_tim_doi_thu,
          img: doc.data()?.img,
          note: doc.data()?.note,
          time: doc.data()?.time,
        });
      });
    });
    // Chỉ gọi findOpponent khi user.uid có giá trị hợp lệ
    // if (user && user.uid) {
    //   findOpponent(user.uid);
    // }
    return () => unsubscribe(); // Cleanup để tránh memory leak
  }, []);


  const handleBack = () => {
    navigation.navigate('TetTranhTai')
  };

  // const toTetTranhTaiInGame = () => {
  //   navigation.navigate("TetTranhTaiInGame",
  //     { game: params.game });
  // };

  const toThanhLiXi2 = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", {
      screen: "ThanhLiXi2",
      params: { game: params.game }
    });
  };

  const checkTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Kiểm tra nếu thời gian nằm trong khoảng cho phép
    const allowedTimes = [
      { start: { h: 12, m: 45 }, end: { h: 13, m: 0 } },
      { start: { h: 18, m: 0 }, end: { h: 20, m: 0 } },
    ];

    const isValid = allowedTimes.some(
      ({ start, end }) =>
        (hours > start.h || (hours === start.h && minutes >= start.m)) &&
        (hours < end.h || (hours === end.h && minutes < end.m))
    );

    if (isValid) {
      toThanhLiXi2();
    } else {
      Alert.alert("Chưa đến giờ để thi đấu!");
    }

  };

  return {
    data,
    handleBack,
    checkTime
  };
};
