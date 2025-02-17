import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import { styles } from "./style";

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import { useTetTranhTai } from './useTetTranhTai';  // Import hook useLogin

// Định nghĩa kiểu props cho màn hình Login
type LiXiVangProps = NativeStackScreenProps<StackRoutes, 'TabHome'>;

const TetTranhTai: React.FC<LiXiVangProps> = ({ route, navigation }) => {

  const {
    data,
    handleBack,
    toThuTaiBanVit,
    toAnhHungSieuBaoVe,
    toThanhAnhKim
  } = useTetTranhTai({ route, navigation });

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={{ uri: data?.backGround }}
        style={styles.background}
        resizeMode="cover"
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleBack}
          style={styles.vBack}
        >
          <Image
            style={styles.btnBack}
            source={{ uri: data?.btn_back }}
          />
        </TouchableOpacity>

        <View style={styles.wrapper}>
          <TouchableOpacity
            onPress={toThuTaiBanVit}
          >
            <Image
              style={styles.btn}
              source={{ uri: data?.btn_thu_tai_ban_vit }}
              resizeMode="cover"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={toAnhHungSieuBaoVe}
          >
            <Image
              style={styles.btn}
              source={{ uri: data?.btn_anh_hung_sieu_bao_ve }}
              resizeMode="cover"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={toThanhAnhKim}
          >
            <Image
              style={styles.btn}
              source={{ uri: data?.btn_thanh_anh_kim }}
              resizeMode="cover"
            />
          </TouchableOpacity>

        </View>

      </ImageBackground>
    </>
  );
};

export default TetTranhTai;
