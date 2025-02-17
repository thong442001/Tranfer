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
import { useTetTranhTaiInGame } from './useTetTranhTaiInGame';  // Import hook useLogin

// Định nghĩa kiểu props cho màn hình Login
type TetTranhTaiInGameProps = NativeStackScreenProps<StackRoutes, 'TabHome'>;

const TetTranhTaiInGame: React.FC<TetTranhTaiInGameProps> = ({
  route,
  navigation
}) => {

  const {
    data,
    handleBack,
    toThuTaiBanVit,
    toAnhHungSieuBaoVe,
    toThanhAnhKim
  } = useTetTranhTaiInGame({ route, navigation });

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

        <View
          style={styles.vInform}
        >
          <View>
            <ImageBackground
              style={styles.backGround12}
              source={{ uri: data?.backGround1 }}
              resizeMode="contain"
            >
              <Image
                style={styles.avt}
                source={{ uri: data?.avt1 }}
                resizeMode="contain"
              />
              <Text
                style={styles.diem1}
              >115
              </Text>
            </ImageBackground>
            <Text
              style={styles.name}
            >Nguyễn Trần Ngọc Hân
            </Text>
          </View>

          <Image
            style={styles.img_vs}
            source={{ uri: data?.img_vs }}
            resizeMode="contain"
          />

          <View>
            <ImageBackground
              style={[styles.backGround12, { alignItems: "flex-end" }]}
              source={{ uri: data?.backGround2 }}
              resizeMode="contain"
            >
              <Image
                style={styles.avt}
                source={{ uri: data?.avt2 }}
                resizeMode="contain"
              />
              <Text
                style={styles.diem2}
              >115
              </Text>
            </ImageBackground>
            <Text
              style={styles.name}
            >Nguyễn Lương Kiên Hào
            </Text>
          </View>

        </View >

      </ImageBackground >
    </>
  );
};

export default TetTranhTaiInGame;
