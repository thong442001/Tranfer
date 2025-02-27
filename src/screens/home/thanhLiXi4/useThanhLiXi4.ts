import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LiXiVangRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from "react-redux";
import database from "@react-native-firebase/database";
import {
  Alert,
} from 'react-native';
type UseThanhLiXi4Props = NativeStackScreenProps<LiXiVangRoutes, 'ThanhLiXi4'>;

// Định nghĩa kiểu dữ liệu cho state `data`
interface ThanhLiXi4Data {
  title?: string;
  btn_back?: string;
  backGround_phu?: string;
  btn_chia_se?: string;
  btn_nhan_loc?: string;
  logo_vinh_tuong?: string;
}

export const useThanhLiXi4 = ({ route, navigation }: UseThanhLiXi4Props) => {
  const { params } = route as { params: { game: string; roomId: string } };

  const user = useSelector((state: any) => state.app.user);
  const [data, setData] = useState<ThanhLiXi4Data | null>(null);
  const [Player1, setPlayer1] = useState<{ id?: string; name?: string; ready?: boolean, score?: number } | null>(null);
  const [Player2, setPlayer2] = useState<{ id?: string; name?: string; ready?: boolean, score?: number } | null>(null);
  const [Player1_rt, setPlayer1_rt] = useState<{ id?: string; name?: string; ready?: boolean, score?: number } | null>(null);
  const [Player2_rt, setPlayer2_rt] = useState<{ id?: string; name?: string; ready?: boolean, score?: number } | null>(null);

  // Firebase collection reference
  const fb = firestore().collection('Tranfer-PageThanhLiXi4');
  const roomRef = database().ref(`matchmaking/${params.game}/${params.roomId}`);

  useEffect(() => {
    const unsubscribe = fb.limit(1).onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        setData({
          title: doc.data()?.title,
          btn_back: doc.data()?.btn_back,
          backGround_phu: doc.data()?.backGround_phu,
          btn_chia_se: doc.data()?.btn_chia_se,
          btn_nhan_loc: doc.data()?.btn_nhan_loc,
          logo_vinh_tuong: doc.data()?.logo_vinh_tuong,
        });
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
        if (!roomData.player1?.ready && !roomData.player2?.ready) {
          finished();
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

  const finished = async () => {
    await roomRef.update({ status: 'finished' });
    toBangXepHang();
  };


  const toBangXepHang = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", { screen: "BangXepHang" });
  };

  const handleTimeEnd = async () => {
    if (!user?.uid || (!Player1?.id && !Player2?.id)) return;

    const userRef1 = database().ref(`Tranfer-users/${Player1?.id}`);
    const userRef2 = database().ref(`Tranfer-users/${Player2?.id}`);

    let li_xi_increase_1 = 0;
    let li_xi_increase_2 = 0;
    let message = "";

    // 🔥 Xác định kết quả
    if ((Player1?.score ?? 0) > (Player2?.score ?? 0)) {
      li_xi_increase_1 = 1; // Người thắng +1 lì xì
      message = Player1?.id === user.uid
        ? "🎉 Bạn đã thắng! +1 Lì xì 🎁"
        : "😢 Bạn đã thua! Không nhận được lì xì.";
    } else if ((Player1?.score ?? 0) < (Player2?.score ?? 0)) {
      li_xi_increase_2 = 1; // Người thắng +1 lì xì
      message = Player2?.id === user.uid
        ? "🎉 Bạn đã thắng! +1 Lì xì 🎁"
        : "😢 Bạn đã thua! Không nhận được lì xì.";
    } else {
      li_xi_increase_1 = 1; // Hòa -> cả 2 được +1
      li_xi_increase_2 = 1;
      message = "🤝 Hòa nhau! Cả hai đều nhận +1 Lì xì 🎁";
    }

    // 🔥 Cập nhật `li_xi` trong Firebase chỉ tăng khi player1 nhấn
    if (li_xi_increase_1 && Player1_rt?.id === user.uid) {
      await userRef1.child("li_xi").transaction((current) => (current || 0) + li_xi_increase_1);
    }
    if (li_xi_increase_2 && Player1_rt?.id === user.uid) {
      await userRef2.child("li_xi").transaction((current) => (current || 0) + li_xi_increase_2);
    }

    // 🔥 Hiển thị kết quả qua Alert
    Alert.alert("Kết quả", message, [{ text: "OK", onPress: () => setReady() }]);
  };

  // Đánh dấu người chơi đã sẵn sàng
  const setReady = async () => {
    if (!user?.uid || (!Player1?.id && !Player2?.id)) return;

    const currentPlayerKey = user.uid === Player1_rt?.id ? "player1" : "player2";

    await roomRef.child(currentPlayerKey).update({ ready: false });
  };


  return {
    data,
    Player1,
    Player2,
    handleTimeEnd,
    handleLeaveMatch,
  };
};
