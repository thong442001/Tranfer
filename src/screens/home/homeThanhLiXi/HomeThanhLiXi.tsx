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
import { useHomeThanhLiXi } from './useHomeThanhLiXi';  // Import hook useLogin

// Định nghĩa kiểu props cho màn hình Login
type HomeThanhLiXiProps = NativeStackScreenProps<StackRoutes, 'TabHome'>;

const HomeThanhLiXi: React.FC<HomeThanhLiXiProps> = ({ route, navigation }) => {

  const {
    data,
    lixi,
    handleBack,
    toThanhLiXi1,
    toSieuThiPhuKien,
  } = useHomeThanhLiXi({ route, navigation });

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

        <View style={styles.wrapper}>
          <Text style={styles.txt}>Bạn đang có <Text style={styles.quantity}>{lixi}</Text > lì xì </Text>
          <TouchableOpacity
            onPress={toThanhLiXi1}
          >
            <Image style={styles.btn} source={{ uri: data?.btn_thanh_li_xi }} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={toSieuThiPhuKien}
          >
            <Image style={styles.btn} source={{ uri: data?.btn_sieu_thi_phu_kien }} />
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </>
  );
};

export default HomeThanhLiXi;
