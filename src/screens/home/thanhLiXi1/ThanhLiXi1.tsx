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
import { StackRoutes } from '../../../navigations/HomeNavigation';
import { useThanhLiXi1 } from './useThanhLiXi1';  // Import hook useLogin

// Định nghĩa kiểu props cho màn hình Login
type ThanhLiXi1Props = NativeStackScreenProps<StackRoutes, 'TabHome'>;

const ThanhLiXi1: React.FC<ThanhLiXi1Props> = ({ route, navigation }) => {

  const {
    data,
    handleBack,
    toThanhLiXi2
  } = useThanhLiXi1({ route, navigation });

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
            onPress={handleBack}
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

        <ImageBackground
          source={{ uri: data?.backGround_phu }}
          style={styles.background_phu}
          resizeMode='cover'
        >
          <Text
            style={styles.title1}
          >
            Đáp nhanh tranh lì xì
          </Text>

          <View
            style={styles.vTxt_phu}
          >
            <Text
              style={styles.title_phu}
            >
              Nhiệm vụ
            </Text>
            <Text
              style={styles.content_title_phu}
            >
              Trả lời đúng và nhanh nhất 5 câu hỏi bạn sẽ chiến thắng!
            </Text>
          </View>

          <Image style={styles.img_chinh} source={{ uri: data?.img_chinh }} />
          <TouchableOpacity
            onPress={toThanhLiXi2}
          >
            <Image style={styles.btn} source={{ uri: data?.btn_tim_doi_thu }} />
          </TouchableOpacity>
          <Image style={styles.note} source={{ uri: data?.note }} />
        </ImageBackground>

      </ImageBackground>
    </>
  );
};

export default ThanhLiXi1;
