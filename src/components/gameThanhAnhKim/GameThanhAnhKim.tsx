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
import { useGameThanhAnhKim } from "./useGameThanhAnhKim";
export interface ThuTaiBanvitProps {
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    onTimeEnd: () => void; // Gọi khi hết giờ
}
const GameThanhAnhKim: React.FC<ThuTaiBanvitProps> = ({
    score, setScore, onTimeEnd
}) => {
    const {
        screws,
        data,
        showText,
        isTimeUp,
        setIsTimeUp,
        handleShoot
    } = useGameThanhAnhKim(setScore, onTimeEnd);

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
                    initialSeconds={10}
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
                    from={{ translateY: 200, opacity: 1 }}
                    animate={{ translateY: -200, opacity: 0 }}
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
                    style={styles.txtBenMau}
                >BỀN MÀU</Text>
            )}

            {/* Nút bắn vít */}
            <Pressable
                style={[styles.vNhan, isTimeUp && { opacity: 0.5 }]} // Làm mờ khi hết giờ
                onPress={handleShoot}
                disabled={isTimeUp} // Vô hiệu hóa nút khi hết giờ
            >
            </Pressable>
        </ImageBackground>
    );
};

export default GameThanhAnhKim;
