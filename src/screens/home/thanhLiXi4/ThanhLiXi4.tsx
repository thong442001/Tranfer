import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import { styles } from "./style";
import LgTxtYellow from "../../../components/lineGradient/LgTxtYellow";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LiXiVangRoutes } from '../../../navigations/HomeNavigation';
import { useThanhLiXi4 } from './useThanhLiXi4';  // Import hook useLogin

// Định nghĩa kiểu props cho màn hình Login
type ThanhLiXi4Props = NativeStackScreenProps<LiXiVangRoutes, 'ThanhLiXi4'>;

const ThanhLiXi4: React.FC<ThanhLiXi4Props> = ({ route, navigation }) => {

  const {
    data,
    Player1,
    Player2,
    handleTimeEnd,
    handleLeaveMatch,
  } = useThanhLiXi4({ route, navigation });

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        style={styles.background}
      >
        <View
          style={styles.vHeader}
        >
          <TouchableOpacity
            onPress={handleLeaveMatch}
          >
            <Image
              source={{ uri: data?.btn_back }}
              style={styles.btn_back}
              resizeMode='contain'
            />
          </TouchableOpacity>

          <View
            style={styles.vTitle}
          >
            <LgTxtYellow
              title={data?.title}
              size={24}
              height={30}
            />
          </View>

          <View
            style={styles.btn_back}
          >
          </View>
        </View>

        <Image
          style={styles.logo_vinh_tuong}
          source={{ uri: data?.logo_vinh_tuong }}
        />

        <ImageBackground
          source={{ uri: data?.backGround_phu }}
          style={styles.backGround_phu}
          resizeMode="contain"
        >
          <View
            style={styles.vContent}
          >
            <Text
              style={styles.title_phu}
            >Bạn đạt 4/5 câu đúng
            </Text>
            <Text
              style={styles.content_title_phu}
            >Xuất sắc quá! Thánh đáp nhanh trúng lớn đây rồi! Tích cực tham gia mỗi ngày để
              có thêm nhiều lì xì nhé!
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleTimeEnd}
            style={styles.vBtnChiaSe}
          >
            <Image
              style={styles.btn_chiaSe_nhanLoc}
              source={{ uri: data?.btn_chia_se }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleTimeEnd}
            style={styles.vBtnNhanLoc}
          >
            <Image
              style={styles.btn_chiaSe_nhanLoc}
              source={{ uri: data?.btn_nhan_loc }}
            />
          </TouchableOpacity>

        </ImageBackground>

      </ImageBackground>
    </>
  );
};

export default ThanhLiXi4;
