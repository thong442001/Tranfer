import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LiXiVangRoutes } from "../../../navigations/HomeNavigation";
import firestore from "@react-native-firebase/firestore";
import { useSelector } from "react-redux";
import database from "@react-native-firebase/database";

type UseThanhLiXi2Props = NativeStackScreenProps<LiXiVangRoutes, "ThanhLiXi2">;

interface ThanhLiXi2Data {
  avt?: string;
  btn_back?: string;
  backGround?: string;
  note?: string;
  game?: string;
}

export const useThanhLiXi2 = ({ route, navigation }: UseThanhLiXi2Props) => {
  const { params } = route as { params: { game: string } };

  const user = useSelector((state: any) => state.app.user);
  const [data, setData] = useState<ThanhLiXi2Data | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);

  //const gameId = "game_123"; // ID của game hiện tại (Có thể lấy từ route hoặc config)

  const fb = firestore().collection("Tranfer-PageThanhLiXi2");

  useEffect(() => {
    const unsubscribe = fb.limit(1).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setData({
          avt: doc.data()?.avt,
          btn_back: doc.data()?.btn_back,
          backGround: doc.data()?.backGround,
          note: doc.data()?.note,
          game: params.game,
        });
      });
    });
    findMatch(user.uid, user.name)
    return () => {
      unsubscribe();
      if (roomId) {
        database().ref(`matchmaking/${params.game}/${roomId}`).remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!roomId) return;

    const roomRef = database().ref(`matchmaking/${params.game}/${roomId}`);

    const listener = roomRef.on("value", (snapshot) => {
      const roomData = snapshot.val();

      if (roomData?.status === "pending" && roomData?.player1 && roomData?.player2) {
        toThanhLiXi3(roomId);
      }
    });

    return () => {
      roomRef.off("value", listener);
      handleLeaveMatch();
    };
  }, [roomId]);


  const findMatch = async (userId: string, userName: string) => {
    const matchRef = database().ref(`matchmaking/${params.game}`);

    // Tìm phòng chờ trong game hiện tại
    const snapshot = await matchRef
      .orderByChild("status")
      .equalTo("waiting")
      .limitToFirst(1)
      .once("value");

    let foundRoomId: string | null = null;

    if (snapshot.exists()) {
      const roomKey = Object.keys(snapshot.val())[0];
      foundRoomId = roomKey;

      await matchRef.child(foundRoomId).update({
        player2: {
          id: userId,
          name: userName,
          score: 0,
          ready: false,
        },
        status: "pending",
      });

      setRoomId(foundRoomId); // Quan trọng! Kích hoạt useEffect theo dõi phòng đấu
    } else {
      const newRoomRef = matchRef.push();
      foundRoomId = newRoomRef.key as string;

      await newRoomRef.set({
        player1: {
          id: userId,
          name: userName,
          score: 0,
          ready: false,
        },
        player2: null,
        status: "waiting",
      });

      setRoomId(foundRoomId); // Kích hoạt listener trong useEffect
    }

  };

  const toThanhLiXi3 = (roomId: string) => {
    if (!roomId) return;

    navigation.getParent()?.navigate("LiXiVangHomeNavigation", {
      screen: "ThanhLiXi3",
      params: {
        roomId: roomId,
        game: params.game,
      },
    });
  };

  const handleLeaveMatch = async () => {
    if (roomId) {
      await leaveMatch(roomId, user.uid);
      setRoomId(null);
    }
    navigation.navigate("LiXiVang");
  };

  const leaveMatch = async (roomId: string, userId: string) => {
    const roomRef = database().ref(`matchmaking/${params.game}/${roomId}`);
    const snapshot = await roomRef.once("value");

    if (!snapshot.exists()) return false;

    const roomData = snapshot.val();

    if (roomData.status === "waiting" || roomData.status === "pending") {
      if (roomData.player1?.id === userId) {
        await roomRef.update({ player1: null });
      } else if (roomData.player2?.id === userId) {
        await roomRef.update({ player2: null });
      }

      const updatedRoom = (await roomRef.once("value")).val();
      if (!updatedRoom.player1 && !updatedRoom.player2) {
        await roomRef.remove();
      } else {
        await roomRef.update({ status: "waiting" });
      }
      return true;
    }

    return false;
  };

  return {
    data,
    user,
    handleLeaveMatch,
  };
};
