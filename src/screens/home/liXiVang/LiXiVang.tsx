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
import { useLiXiVang } from './useLiXiVang';  // Import hook useLogin

// Định nghĩa kiểu props cho màn hình Login
type LiXiVangProps = NativeStackScreenProps<StackRoutes, 'TabHome'>;

const LiXiVang: React.FC<LiXiVangProps> = ({ route, navigation }) => {

  const {
    data,
    handleBack,
    toHomeThanhLiXi,
    toTetTranhTai
  } = useLiXiVang({ route, navigation });

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={{ uri: data?.backGround }}
        style={styles.background}
        resizeMode="cover"
      >
        <View
          style={styles.vHeader}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleBack}
          >
            <Image
              style={styles.btnBack}
              source={{ uri: data?.btn_back }}
            />
          </TouchableOpacity>

          <Text
            style={styles.title}
          >Đại hội tranh tài</Text>

          <TouchableOpacity
            activeOpacity={1}
          >
            <Image
              style={styles.btnBack}
              source={{ uri: data?.btn_chi_tiet }}
            />
          </TouchableOpacity>
        </View>


        <ImageBackground
          source={{ uri: data?.img_chinh }}
          style={[styles.poseImg]}
          resizeMode='contain'
        >

          <TouchableOpacity
            activeOpacity={1}
            onPress={toTetTranhTai}
            style={styles.btn_tet_tranh_tai}
          >
            <></>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            onPress={toHomeThanhLiXi}
            style={styles.btn_home_thanh_li_xi}
          >
            <></>
          </TouchableOpacity>

        </ImageBackground>
      </ImageBackground>
    </>
  );
};

export default LiXiVang;
