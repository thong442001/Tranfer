import { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import firestore from "@react-native-firebase/firestore";
const { width, height } = Dimensions.get("window");
interface Screw {
  id: number;
  x: number;
  image: string;
  size: number;
}
interface GameData {
  backGround?: string;
  backGround_time?: string;
  img_bao_vit?: string;
  img_may_khoan?: string;
  img_vit1?: string;
  img_vit2?: string;
  img_vit3?: string;
}
export const useGameThuTaiBanVit = (
  setScore: React.Dispatch<React.SetStateAction<number>>,
  onTimeEnd: () => void
) => {
  const [screws, setScrews] = useState<Screw[]>([]);
  const [data, setData] = useState<GameData | null>(null);
  const [showText, setShowText] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    // Lấy dữ liệu từ Firebase một lần
    const fetchData = async () => {
      const snapshot = await firestore()
        .collection('Tranfer-PageGameThuTaiBanVit')
        .get();
      snapshot.forEach(doc => {
        setData(doc.data() as GameData);
      });
    };
    fetchData();
  }, []);

  // Lấy danh sách ảnh vít từ Firebase (lọc `undefined`)
  const screwImages = [
    data?.img_vit1,
    data?.img_vit2,
    data?.img_vit3
  ].filter(Boolean) as string[];

  const handleShoot = () => {
    if (isTimeUp || screwImages.length === 0) return; // Ngăn bắn vít nếu hết giờ

    const newScrew: Screw = {
      id: Date.now() + Math.random(),
      x: Math.random() * (width - 150) + 10,
      image: screwImages[Math.floor(Math.random() * screwImages.length)], // Chọn ảnh ngẫu nhiên
      size: Math.random() * 40 + 60, // Random kích thước 60 - 100
    };

    setScrews(prev => [...prev, newScrew]);
    setScore(prev => {
      const newScore = prev + 1;
      if (newScore % 30 === 0) {
        setShowText(true);
        setTimeout(() => setShowText(false), 1500); // Hiển thị 2 giây
      }
      return newScore;
    });

    setTimeout(() => {
      setScrews(prev => prev.filter(screw => screw.id !== newScrew.id));
    }, 1000);
  };

  return {
    screws,
    data,
    showText,
    isTimeUp,
    setIsTimeUp,
    handleShoot
  };
};
