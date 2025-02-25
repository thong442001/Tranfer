import React from "react";
import { Text, ImageBackground, Image } from "react-native";
import { styles } from "./style";
import { useItemGifts } from "./useItemGifts";
import { View } from "moti";

interface ItemData {
    index: number; // ✅ Bắt buộc truyền index
    name: string;
    lixi: number;
}

const ItemGifts: React.FC<ItemData> = ({ index, name, lixi }) => {
    const { data } = useItemGifts();

    // Chọn background phù hợp với vị trí
    const backgroundUri =
        index === 0
            ? data?.backGround_item1
            : index === 1
                ? data?.backGround_item2
                : data?.backGround_item3;

    // Chọn avatar theo vị trí
    const avatarUri =
        index === 0 ? data?.avt2 : index === 1 ? data?.avt2 : data?.avt3;

    return (
        <ImageBackground source={{ uri: backgroundUri }} style={styles.container} resizeMode="contain">
            <View style={styles.vTong}>
                {/* ID (Chỉ hiển thị nếu không phải top 1, 2) */}
                <View style={styles.vID}>
                    {index >= 2 && <Text style={styles.id}>{index + 1}</Text>}
                </View>

                {/* Avatar */}
                <Image style={index < 2 ? styles.avt2 : styles.avt3} source={{ uri: avatarUri }} resizeMode="contain" />

                {/* Tên người chơi */}
                <View style={styles.vName}>
                    <Text style={styles.name}>{name}</Text>
                </View>

                {/* Lì xì */}
                <View style={styles.vLixi}>
                    <Text style={styles.lixi}>{lixi} Lì Xì</Text>
                </View>
            </View>
        </ImageBackground>
    );
};

export default ItemGifts;
