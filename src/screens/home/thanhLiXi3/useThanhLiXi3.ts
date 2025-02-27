import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LiXiVangRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';
import database from "@react-native-firebase/database";
import { useSelector } from "react-redux";

type UseThanhLiXi3Props = NativeStackScreenProps<LiXiVangRoutes, 'ThanhLiXi3'>;

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
  const { params } = route as { params: { game: string, roomId: string } };
  const user = useSelector((state: any) => state.app.user);

  const [data, setData] = useState<ThanhLiXi3Data | null>(null);
  const [Player1, setPlayer1] = useState<{ id?: string; name?: string; ready?: boolean } | null>(null);
  const [Player2, setPlayer2] = useState<{ id?: string; name?: string; ready?: boolean } | null>(null);
  const [Player1_rt, setPlayer1_rt] = useState<{ id?: string; name?: string; ready?: boolean } | null>(null);
  const [Player2_rt, setPlayer2_rt] = useState<{ id?: string; name?: string; ready?: boolean } | null>(null);

  const fb = firestore().collection('Tranfer-PageThanhLiXi3');
  const roomRef = database().ref(`matchmaking/${params.game}/${params.roomId}`);

  useEffect(() => {
    // Lắng nghe dữ liệu giao diện
    const unsubscribe = fb.limit(1).onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        setData(doc.data() as ThanhLiXi3Data);
      });
    });

    // Lắng nghe trạng thái phòng
    const listener = roomRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        const roomData = snapshot.val();
        const { player1, player2 } = roomData;
        setPlayer1_rt(player1);
        setPlayer2_rt(player2);

        if (!player1 || !player2) return;

        // Hoán đổi nếu user hiện tại là player2
        const isCurrentUserPlayer1 = player1.id === user?.uid;
        setPlayer1(isCurrentUserPlayer1 ? player1 : player2);
        setPlayer2(isCurrentUserPlayer1 ? player2 : player1);

        // Kiểm tra nếu cả 2 đã sẵn sàng và chưa chơi
        if (roomData.player1?.ready && roomData.player2?.ready) {
          startGame();
        }
      } else {
        navigation.navigate("LiXiVang"); // Nếu phòng bị xóa, quay về trang chính
      }
    });


    return () => {
      unsubscribe();
      roomRef.off("value", listener);
    };
  }, []);

  // Đánh dấu người chơi đã sẵn sàng
  const setReady = async () => {
    if (!user?.uid || (!Player1?.id && !Player2?.id)) return;

    const currentPlayerKey = user.uid === Player1_rt?.id ? "player1" : "player2";

    await roomRef.child(currentPlayerKey).update({ ready: true });
  };


  // Khi cả 2 người chơi sẵn sàng -> cập nhật trạng thái `playing` và vào game
  const startGame = async () => {
    await roomRef.update({ status: 'playing' });
    toTetTranhTaiInGame();
  };

  // Điều hướng vào phòng đấu
  const toTetTranhTaiInGame = () => {
    if (params.game === 'ThanhLiXi') {
      navigation.navigate("ThanhLiXi4",
        {
          game: params.game,
          roomId: params.roomId,
        });
    } else {
      navigation.navigate("TetTranhTaiInGame",
        {
          game: params.game,
          roomId: params.roomId,
        });
    }
  };

  // Thoát phòng
  const handleLeaveMatch = async () => {
    if (params.roomId) {
      await leaveMatch(user.uid);
    }
    navigation.navigate("LiXiVang");
  };

  const leaveMatch = async (userId: string) => {
    const snapshot = await roomRef.once("value");
    if (!snapshot.exists()) return false;

    const roomData = snapshot.val();
    if (roomData.player1?.id === userId || roomData.player2?.id === userId) {
      await roomRef.remove();
      return true;
    }
    return false;
  };

  return {
    data,
    Player1,
    Player2,
    setReady,
    handleLeaveMatch,
  };
};
