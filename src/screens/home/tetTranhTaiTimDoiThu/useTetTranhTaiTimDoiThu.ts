import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LiXiVangRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import { useSelector } from 'react-redux';
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
    if (user && user.uid) {
      findOpponent(user.uid);
    }
    return () => unsubscribe(); // Cleanup để tránh memory leak
  }, []);


  const findOpponent = async (userId: string) => {
    const queueRef = database().ref('matchmaking');

    // Tìm người chơi đang đợi
    const snapshot = await queueRef.once('value');
    let opponentId: string | null = null;

    snapshot.forEach((child) => {
      if (child.val().uid !== userId) {
        opponentId = child.val().uid;
        return true; // Dừng vòng lặp khi tìm thấy đối thủ
      }
    });

    if (opponentId) {
      // Nếu có đối thủ, tạo phòng đấu
      const matchId = database().ref('matches').push().key;
      await database().ref(`matches/${matchId}`).set({
        player1: userId,
        player2: opponentId,
        status: 'playing',
      });

      // Xóa cả hai khỏi hàng chờ
      await queueRef.child(userId).remove();
      await queueRef.child(opponentId).remove();

      return matchId; // Trả về matchId để điều hướng
    } else {
      // Nếu không có ai, đưa user vào hàng chờ
      await queueRef.child(userId).set({ uid: userId, status: 'waiting' });
      return null;
    }
  };

  const cancelMatchmaking = async (userId: string) => {
    await database().ref(`matchmaking/${userId}`).remove();
  };


  const handleBack = () => {
    cancelMatchmaking(user.uid)
    navigation.navigate('TetTranhTai')
  };

  const toTetTranhTaiInGame = () => {
    navigation.navigate("TetTranhTaiInGame",
      { game: params.game });
  };

  return {
    data,
    handleBack,
    toTetTranhTaiInGame
  };
};
