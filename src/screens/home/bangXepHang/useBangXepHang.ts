import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import firestore from '@react-native-firebase/firestore';

type UseBangXepHangProps = NativeStackScreenProps<StackRoutes, 'TabHome'>;

// Định nghĩa kiểu dữ liệu cho state `data`
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

export const useBangXepHang = ({ route, navigation }: UseBangXepHangProps) => {
  const { params } = route;

  const [data, setData] = useState<BangXepHangData | null>(null);

  // Lấy dữ liệu từ Firebase một lần
  const fetchData = async () => {
    const snapshot = await firestore()
      .collection('Tranfer-PageBangXepHang')
      .get();
    snapshot.forEach(doc => {
      setData(doc.data() as BangXepHangData);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleBack = () => {
    navigation.getParent()?.navigate("LiXiVangHomeNavigation", {
      screen: "TetTranhTai",
    });
  };


  const userData = [
    { id: 1, name: "Nguyễn Hoàng Đăng Khoa", lixi: 999 },
    { id: 2, name: "Nguyễn Thị Khánh Linh", lixi: 80 },
    { id: 3, name: "Lê Thị Quỳnh Trâm", lixi: 72 },
    { id: 4, name: "Đoàn Phước Đức", lixi: 68 },
    { id: 5, name: "Đinh Quang Trung", lixi: 46 },
    { id: 6, name: "Nguyễn Lương Kiên Hào", lixi: 30 },
    { id: 48, name: "Lại Ngọc Trâm", lixi: 12 },
  ]


  return {
    data,
    handleBack,
    userData
  };
};
