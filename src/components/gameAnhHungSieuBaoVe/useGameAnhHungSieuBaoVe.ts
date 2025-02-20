import { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import firestore from "@react-native-firebase/firestore";
const { width, height } = Dimensions.get("window");
interface Screw {
  id: number;
  x: number;
  size: number;
}
interface GameData {
  backGround?: string;
  backGround_time?: string;
  img_anh_hung_sieu_bao_ve?: string;
  img_score?: string;
}
export const useGameAnhHungSieuBaoVe = (
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
        .collection('Tranfer-PageAnhHungSieuBaoVe')
        .get();
      snapshot.forEach(doc => {
        setData(doc.data() as GameData);
      });
    };
    fetchData();
  }, []);


  const handleShoot = () => {
    if (isTimeUp) return; // Ngăn bắn vít nếu hết giờ

    const newScrew: Screw = {
      id: Date.now() + Math.random(),
      x: Math.random() * (width - 150) + 10,
      size: Math.random() * 20 + 40, // Random kích thước 60 - 100
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
