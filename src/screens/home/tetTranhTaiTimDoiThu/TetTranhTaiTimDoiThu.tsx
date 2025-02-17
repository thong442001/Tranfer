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
import { useTetTranhTaiTimDoiThu } from './useTetTranhTaiTimDoiThu';  // Import hook useLogin

// Định nghĩa kiểu props cho màn hình Login
type ThanhLiXi1Props = NativeStackScreenProps<LiXiVangRoutes, 'TetTranhTaiTimDoiThu'>;

const TetTranhTaiTimDoiThu: React.FC<ThanhLiXi1Props> = ({ route, navigation }) => {

  const {
    data,
    handleBack,
    toTetTranhTaiInGame
  } = useTetTranhTaiTimDoiThu({ route, navigation });

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        style={styles.background}
        source={{ uri: data?.backGround }}
        resizeMode='cover'
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
          resizeMode='contain'
        >
          <View
            style={styles.vContent}
          >
            <Text
              style={styles.title_phu}
            >{data?.title_phu}
            </Text>
            <Text
              style={styles.content_title_phu}
            >{data?.content}
            </Text>
          </View>

          <Image
            style={styles.img}
            source={{ uri: data?.img }}
            resizeMode='cover'
          />

          <TouchableOpacity
            onPress={toTetTranhTaiInGame}
          >
            <Image
              style={styles.btn_tim_doi_thu}
              source={{ uri: data?.btn_tim_doi_thu }}
            />
          </TouchableOpacity>

          <View
            style={styles.vNote}
          >
            <Text
              style={styles.note}
            >{data?.note}
            </Text>
            <Text
              style={styles.time}
            >{data?.time}
            </Text>
          </View>

        </ImageBackground>

      </ImageBackground>
    </>
  );
};

export default TetTranhTaiTimDoiThu;
