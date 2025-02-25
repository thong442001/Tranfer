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
import CountupTimer from "../../../components/countupTimer/CountupTimer";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LiXiVangRoutes } from '../../../navigations/HomeNavigation';
import { useThanhLiXi2 } from './useThanhLiXi2';  // Import hook useLogin

// Định nghĩa kiểu props cho màn hình Login
type ThanhLiXi2Props = NativeStackScreenProps<LiXiVangRoutes, 'ThanhLiXi2'>;

const ThanhLiXi2: React.FC<ThanhLiXi2Props> = ({ route, navigation }) => {

  const {
    data,
    user,
    handleLeaveMatch,
  } = useThanhLiXi2({ route, navigation });

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={{ uri: data?.backGround }}
        style={styles.background}
        resizeMode="cover"
      >
        <TouchableOpacity
          //activeOpacity={1}
          onPress={handleLeaveMatch}
          style={styles.vBack}
        >
          <Image
            style={styles.btnBack}
            source={{ uri: data?.btn_back }}
          />
        </TouchableOpacity>

        <Text
          style={styles.title}
        >
          {data?.game}
        </Text>
        <Text
          style={styles.content}
        >
          Đang tìm đối thủ
        </Text>

        <View
          style={styles.vName}
        >
          <LgTxtYellow
            title={user?.name}
            size={16}
            height={60}
          />
        </View>

        <View
          style={styles.vTime}
        >
          <CountupTimer />
        </View>

        <Image
          style={styles.avt}
          source={{ uri: data?.avt }}
        />

        <Image
          style={styles.note}
          source={{ uri: data?.note }}
        />

      </ImageBackground>
    </>
  );
};

export default ThanhLiXi2;
