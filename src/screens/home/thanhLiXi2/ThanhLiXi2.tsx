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
import { StackRoutes } from '../../../navigations/HomeNavigation';
import { useThanhLiXi2 } from './useThanhLiXi2';  // Import hook useLogin

// Định nghĩa kiểu props cho màn hình Login
type ThanhLiXi2Props = NativeStackScreenProps<StackRoutes, 'TabHome'>;

const ThanhLiXi2: React.FC<ThanhLiXi2Props> = ({ route, navigation }) => {

  const {
    data,
    handleBack,
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
          onPress={handleBack}
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
          Đáp nhanh tranh lì xì
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
            title={"Nguyễn Trần\nNgọc Hân"}
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
