import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LiXiVangRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';
import database from "@react-native-firebase/database";
import { useSelector } from "react-redux";
type UseThanhLiXi3Props = NativeStackScreenProps<LiXiVangRoutes, 'ThanhLiXi3'>;

// Định nghĩa kiểu dữ liệu cho state `data`
interface ThanhLiXi3Data {
  title?: string;
  btn_back?: string;
  backGround?: string;
  avt1?: string;
  avt2?: string;
  btn_choi?: string;
  btn_huy?: string;
}

export const useThanhLiXi3 = ({ route, navigation }: UseThanhLiXi3Props) => {
  const { params } = route as {
    params: {
      game: string,
      roomId: string,
    }
  };

  console.log(params.roomId);
  const user = useSelector((state: any) => state.app.user);
  const [data, setData] = useState<ThanhLiXi3Data | null>(null);
  const [player1, setPlayer1] = useState<{ id?: string; name?: string } | null>(null);
  const [player2, setPlayer2] = useState<{ id?: string; name?: string } | null>(null);
  // Firebase collection reference
  const fb = firestore().collection('Tranfer-PageThanhLiXi3');

  useEffect(() => {
    const unsubscribe = fb.limit(1).onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        setData({
          title: doc.data()?.title,
          btn_back: doc.data()?.btn_back,
          backGround: doc.data()?.backGround,
          avt1: doc.data()?.avt1,
          avt2: doc.data()?.avt2,
          btn_choi: doc.data()?.btn_choi,
          btn_huy: doc.data()?.btn_huy,
        });
      });
    });

    const roomRef = database().ref(`matchmaking/${params.game}/${params.roomId}`);

    // Lắng nghe sự thay đổi của phòng
    const listener = roomRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        const roomData = snapshot.val();

        // Kiểm tra nếu user hiện tại là player1 hay player2
        if (roomData.player1?.id === user.uid) {
          setPlayer1(roomData.player1);
          setPlayer2(roomData.player2 || null);
        } else {
          setPlayer1(roomData.player2);
          setPlayer2(roomData.player1);
        }
      } else {
        // Nếu phòng bị xóa, đẩy user về trang chính
        navigation.navigate("LiXiVang");
      }
    });
    return () => {
      unsubscribe(); // Cleanup để tránh memory leak
      roomRef.off("value", listener); // Cleanup khi component unmount
    }
  }, []);


  const handleLeaveMatch = async () => {
    if (params.roomId) {
      await leaveMatch(params.roomId, user.uid);

    }
    navigation.navigate("LiXiVang");
  };

  const toThanhLiXi4 = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", {
      screen: "ThanhLiXi4",
    });
  };

  const leaveMatch = async (roomId: string, userId: string) => {
    const roomRef = database().ref(`matchmaking/${params.game}/${roomId}`);
    const snapshot = await roomRef.once("value");

    if (!snapshot.exists()) return false;

    const roomData = snapshot.val();

    // Nếu user là player1 hoặc player2 thì xóa phòng ngay lập tức
    if (roomData.player1?.id === userId || roomData.player2?.id === userId) {
      await roomRef.remove();
      return true;
    }

    return false;
  };



  return {
    data,
    player1,
    player2,
    handleLeaveMatch,
    toThanhLiXi4
  };
};
