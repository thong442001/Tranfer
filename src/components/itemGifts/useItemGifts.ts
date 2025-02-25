import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

interface ItemBangXepHangData {
  backGround_item1?: string;
  backGround_item2?: string;
  backGround_item3?: string;
  avt2?: string;
  avt3?: string;
}
export const useItemGifts = () => {
  const [data, setData] = useState<ItemBangXepHangData | null>(null);

  useEffect(() => {
    fetchData();
  }, []);
  // Lấy dữ liệu từ Firebase một lần
  const fetchData = async () => {
    const snapshot = await firestore()
      .collection('Tranfer-PageBangXepHang')
      .get();
    snapshot.forEach(doc => {
      setData(doc.data() as ItemBangXepHangData);
    });
  };

  return {
    data,
  };
};
