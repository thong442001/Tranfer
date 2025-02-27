import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LiXiVangRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';
import {
  Alert,
} from 'react-native';
import { useSelector } from "react-redux";
import database from "@react-native-firebase/database";
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
  const { params } = route as { params: { game: string; roomId: string } };
  const user = useSelector((state: any) => state.app.user); // Lấy thông tin user hiện tại

  const [data, setData] = useState<TetTranhTaiInGameData | null>(null);
  const [score, setScoreState] = useState<number>(0);
  const [score2, setScore2] = useState<number>(0); // Điểm số của đối thủ
  const [player1Name, setPlayer1Name] = useState<string>(''); // Tên của chính mình
  const [player2Name, setPlayer2Name] = useState<string>(''); // Tên của đối thủ
  const [winner, setWinner] = useState<string | null>(null);

  // Firebase collection reference
  const fb = firestore().collection('Tranfer-PageTetTranhTaiInGame');
  const roomRef = database().ref(`matchmaking/${params.game}/${params.roomId}`);
  let isPlayer1 = true; // Mặc định user là player1

  useEffect(() => {
    let title = params.game === 'ThuTaiBanVit'
      ? 'THỬ TÀI BẮN VÍT'
      : params.game === 'ThanhAnhKim'
        ? 'THÁNH ÁNH KIM'
        : 'ANH HÙNG SIÊU BẢO VỆ';

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

    // Lắng nghe dữ liệu phòng (score và tên của 2 người chơi)
    const listener = roomRef.on("value", (snapshot) => {
      if (snapshot.exists()) {

        if (!snapshot.exists()) {
          Alert.alert("Đối thủ đã thoát", "Bạn sẽ được đưa về trang chủ", [
            { text: "OK", onPress: () => navigation.navigate("LiXiVang") },
          ]);
          return;
        }

        const roomData = snapshot.val();

        const { player1, player2 } = roomData;
        if (!player1 || !player2) {
          // Nếu đối thủ thoát, cho user còn lại thắng ngay lập tức
          Alert.alert("Bạn thắng!", "Đối thủ đã rời khỏi trận đấu.", [
            { text: "OK", onPress: () => handleWinByDefault() },
          ]);
        }


        // Kiểm tra nếu user là player2, ta hoán đổi
        if (player2.id === user?.uid) {
          isPlayer1 = false;
          setScoreState(player2.score || 0);
          setScore2(player1.score || 0);
          setPlayer1Name(player2.name || "Bạn");
          setPlayer2Name(player1.name || "Đối thủ");
        } else {
          isPlayer1 = true;
          setScoreState(player1.score || 0);
          setScore2(player2.score || 0);
          setPlayer1Name(player1.name || "Bạn");
          setPlayer2Name(player2.name || "Đối thủ");
        }


      }
    });

    return () => {
      unsubscribe();
      roomRef.off("value", listener);
    };
  }, []);

  const handleLeaveGame = async () => {
    if (!user?.uid) return;

    const snapshot = await roomRef.once("value");
    if (!snapshot.exists()) return;

    const roomData = snapshot.val();
    const isPlayer1 = roomData.player1?.id === user.uid;
    const playerKey = isPlayer1 ? "player1" : "player2";

    // Xóa người chơi khỏi phòng
    await roomRef.child(playerKey).remove();

    // Nếu phòng trống -> xóa luôn
    const updatedRoom = await roomRef.once("value");
    if (!updatedRoom.val()?.player1 && !updatedRoom.val()?.player2) {
      await roomRef.remove();
    }

    navigation.navigate("LiXiVang"); // Quay về trang chủ
  };


  const toBangXepHang = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", { screen: "BangXepHang" });
  };

  const handleTimeEnd = async () => {
    let winnerId: "player1" | "player2" | null = null;
    let isDraw = false;

    if (score > score2) {
      winnerId = "player1";
    } else if (score < score2) {
      winnerId = "player2";
    } else {
      isDraw = true; // Trường hợp hòa
    }

    setWinner(winnerId);

    await roomRef.update({ status: "finished" });

    if (isDraw) {
      await giveWinnerLiXi("player1");
      await giveWinnerLiXi("player2");
    } else if (winnerId) {
      await giveWinnerLiXi(winnerId);
    }

    Alert.alert(
      isDraw ? "Hòa" : winnerId === "player1" ? `${player1Name} thắng!` : `${player2Name} thắng!`,
      `Điểm số: ${score} - ${score2}`,
      [{ text: "OK", onPress: () => toBangXepHang() }]
    );
  };

  const giveWinnerLiXi = async (winner: "player1" | "player2") => {
    const snapshot = await roomRef.once("value");
    if (!snapshot.exists()) return;

    const roomData = snapshot.val();
    const winnerUid = roomData[winner]?.id;

    if (winnerUid) {
      const userRef = database().ref(`Tranfer-users/${winnerUid}/li_xi`);
      userRef.transaction((currentLiXi) => (currentLiXi || 0) + 1);
    }
  };

  // 🔥 Hàm cập nhật điểm số vào Firebase
  const setScore = async (newScore: number) => {
    setScoreState(newScore);
    await roomRef.child(`player${isPlayer1 ? "1" : "2"}`).update({ score: newScore });
  };

  const handleWinByDefault = async () => {
    await roomRef.update({ status: "finished" });

    // Người chơi còn lại là người thắng
    const winner = isPlayer1 ? "player1" : "player2";
    await giveWinnerLiXi(winner);

    toBangXepHang()
  };


  return {
    data,
    score,
    setScore,
    score2,
    player1Name,
    player2Name,
    handleTimeEnd,
    winner,
    handleLeaveGame
  };
};
