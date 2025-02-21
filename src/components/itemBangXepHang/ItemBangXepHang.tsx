import React from 'react';
import {
    Text,
    Pressable,
    ImageBackground,
    Image,
} from 'react-native';
import { styles } from "./style";
import { useItemBangXepHang } from "./useItemBangXepHang";
import { View } from 'moti';
interface ItemData {
    id?: number;
    name?: string;
    lixi?: number;
}
const ItemBangXepHang: React.FC<ItemData> = ({
    id,
    name,
    lixi,
}) => {
    const {
        data,
    } = useItemBangXepHang();

    console.log(data?.avt3)

    return (
        <ImageBackground
            source={{
                uri: (id == 1
                    ? data?.backGround_item1
                    : (id == 2
                        ? data?.backGround_item2
                        : data?.backGround_item3
                    ))
            }}
            style={styles.container}
            resizeMode="contain"
        >
            <View
                style={styles.vTong}
            >
                {/* id */}
                <View
                    style={styles.vID}
                >
                    {
                        (id != 1 && id != 2)
                        &&
                        <Text
                            style={styles.id}
                        >{id}</Text>
                    }
                </View>
                {/* avt */}
                {
                    (id != 1 && id != 2)
                        ?
                        <Image
                            style={styles.avt3}
                            source={{ uri: data?.avt3 }}
                            resizeMode="contain"
                        />
                        :
                        <Image
                            style={styles.avt2}
                            source={{ uri: data?.avt2 }}
                            resizeMode="contain"
                        />
                }

                {/* name */}
                <View
                    style={styles.vName}
                >
                    <Text
                        style={styles.name}
                    >{name}</Text>
                </View>
                {/* quantity lixi */}
                <View
                    style={styles.vLixi}
                >
                    <Text
                        style={styles.lixi}
                    >{lixi}   Lì Xì</Text>
                </View>
            </View>
        </ImageBackground >
    );
};

export default ItemBangXepHang;
