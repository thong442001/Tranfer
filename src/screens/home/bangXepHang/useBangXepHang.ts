import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackRoutes } from "../../../navigations/HomeNavigation";
import firestore from "@react-native-firebase/firestore";
import database from "@react-native-firebase/database";
import { useSelector } from "react-redux";

type UseBangXepHangProps = NativeStackScreenProps<StackRoutes, "TabHome">;

// Kiểu dữ liệu state `data`
interface BangXepHangData {
  title?: string;
  btn_back?: string;
  backGround?: string;
  backGround_1?: string;
  backGround_2?: string;
  backGround_item1?: string;
  backGround_item2?: string;
  backGround_item3?: string;
  backGround_phu?: string;
  img_3btn?: string;
  img_hang_cua_toi?: string;
  logo_vinh_tuong?: string;
  avt1?: string;
  avt2?: string;
  avt3?: string;
}

// Kiểu dữ liệu user trong bảng xếp hạng
interface UserData {
  uid: string;
  name: string;
  email: string;
  avatar: string;
  luot_lac: number;
  li_xi: number;
  kho: string[];
}

export const useBangXepHang = ({ route, navigation }: UseBangXepHangProps) => {
  const { params } = route;
  const [data, setData] = useState<BangXepHangData | null>(null);
  const [leaderboard, setLeaderboard] = useState<UserData[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null); // Thứ hạng của user

  const user = useSelector((state: any) => state.app.user); // Lấy user từ Redux

  useEffect(() => {
    fetchData();

    const ref = database().ref("Tranfer-users");

    // Lắng nghe thay đổi real-time
    const listener = ref.orderByChild("li_xi").on("value", (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const sortedData: UserData[] = Object.keys(data)
          .map((key) => ({ uid: key, ...data[key] }))
          .sort((a, b) => b.li_xi - a.li_xi); // Sắp xếp theo `li_xi` giảm dần

        setLeaderboard(sortedData);

        // Tìm thứ hạng của user hiện tại
        const userIndex = sortedData.findIndex((u) => u.uid === user?.uid);
        if (userIndex !== -1) {
          setUserRank(userIndex + 1); // Thứ hạng bắt đầu từ 1
        } else {
          setUserRank(null); // Không tìm thấy user
        }
      }
    });

    return () => ref.off("value", listener); // Cleanup listener khi component unmount
  }, []);

  // Lấy dữ liệu từ Firestore
  const fetchData = async () => {
    const snapshot = await firestore()
      .collection("Tranfer-PageBangXepHang")
      .get();
    snapshot.forEach((doc) => {
      setData(doc.data() as BangXepHangData);
    });
  };

  // Điều hướng về trang chính
  const handleBack = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", {
      screen: "TetTranhTai",
    });
  };

  return {
    data,
    handleBack,
    leaderboard,
    userRank,
    user,
  };
};
