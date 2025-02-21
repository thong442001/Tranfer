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
import { useGameThuTaiBanVit } from "./useGameThuTaiBanVit";
export interface ThuTaiBanvitProps {
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    onTimeEnd: () => void; // Gọi khi hết giờ
}
const GameThuTaiBanVit: React.FC<ThuTaiBanvitProps> = ({
    score, setScore, onTimeEnd
}) => {
    const {
        screws,
        data,
        showText,
        isTimeUp,
        setIsTimeUp,
        handleShoot
    } = useGameThuTaiBanVit(setScore, onTimeEnd);

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
                    initialSeconds={3}
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
                    from={{ translateY: -80, opacity: 1 }}
                    animate={{ translateY: -200, opacity: 0 }}
                    transition={{ type: 'timing', duration: 1000 }}
                    style={[styles.screw, { left: screw.x }]}
                >
                    <Image
                        style={[styles.img_vit, { width: screw.size, height: screw.size }]}
                        source={{ uri: screw.image }}
                        resizeMode="contain"
                    />
                </MotiView>
            ))}

            {/* Hiển thị khi user đạt cột mốc */}
            {showText && (
                <Text style={styles.txtThiCongNgon}>THI CÔNG NGON</Text>
            )}

            {/* Nút bắn vít */}
            <Pressable
                style={[styles.vMayKhoan, isTimeUp && { opacity: 0.5 }]} // Làm mờ khi hết giờ
                onPress={handleShoot}
                disabled={isTimeUp} // Vô hiệu hóa nút khi hết giờ
            >
                <Image
                    style={styles.img_may_khoan}
                    source={{ uri: data?.img_may_khoan }}
                    resizeMode="contain"
                />
            </Pressable>
            <Image
                style={styles.img_bao_vit}
                source={{ uri: data?.img_bao_vit }}
                resizeMode="contain"
            />
        </ImageBackground>
    );
};

export default GameThuTaiBanVit;
