import React from 'react';
import {
    Text,
    Pressable,
    ImageBackground,
    Image,
} from 'react-native';
import { styles } from "./style";
import { MotiView } from 'moti';
import CountdownTimer from "../countdownTimer/CountdownTimer";
import { useGameAnhHungSieuBaoVe } from "./useGameAnhHungSieuBaoVe";
export interface ThuTaiBanvitProps {
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    onTimeEnd: () => void; // Gọi khi hết giờ
}
const GameAnhHungSieuBaoVe: React.FC<ThuTaiBanvitProps> = ({
    score, setScore, onTimeEnd
}) => {
    const {
        screws,
        data,
        showText,
        isTimeUp,
        setIsTimeUp,
        handleShoot
    } = useGameAnhHungSieuBaoVe(setScore, onTimeEnd);

    return (
        <ImageBackground
            source={{ uri: data?.backGround }}
            style={styles.container}
            resizeMode="contain"
        >
            <ImageBackground
                source={{ uri: data?.backGround_time }}
                style={styles.backGround_time}
                resizeMode="contain"
            >
                <CountdownTimer
                    initialSeconds={180}
                    onTimeEnd={() => {
                        setIsTimeUp(true);  // Khi hết giờ, ngăn không cho bắn vít
                        onTimeEnd(); // Gọi sự kiện từ component cha (nếu cần)
                    }}
                />
            </ImageBackground>

            {/* Vít xuất hiện */}
            {screws.map((screw) => (
                <MotiView
                    key={screw.id}
                    from={{ translateY: 0, opacity: 1 }}
                    animate={{ translateY: 230, opacity: 0 }}
                    transition={{ type: 'timing', duration: 1000 }}
                    style={[styles.screw, { left: screw.x }]}
                >
                    <Image
                        style={[styles.img_score, { width: screw.size, height: screw.size }]}
                        source={{ uri: data?.img_score }}
                        resizeMode="contain"
                    />
                </MotiView>
            ))}

            {/* Hiển thị khi user đạt cột mốc */}
            {showText && (
                <Text
                    style={styles.txtSieuChongAm}
                >SIÊU CHỐNG ẨM</Text>
            )}

            {/* Nút bắn vít */}
            <Pressable
                style={[styles.vKhien, isTimeUp && { opacity: 0.5 }]} // Làm mờ khi hết giờ
                onPress={handleShoot}
                disabled={isTimeUp} // Vô hiệu hóa nút khi hết giờ
            >
                <Image
                    style={styles.img_anh_hung_sieu_bao_ve}
                    source={{ uri: data?.img_anh_hung_sieu_bao_ve }}
                    resizeMode="cover"
                />
            </Pressable>
        </ImageBackground>
    );
};

export default GameAnhHungSieuBaoVe;
