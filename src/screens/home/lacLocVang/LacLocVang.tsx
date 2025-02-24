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
import { useLacLocVang } from './useLacLocVang';  // Import hook useLogin

// Định nghĩa kiểu props cho màn hình Login
type LacLocVangProps = NativeStackScreenProps<StackRoutes, 'TabHome'>;

const LacLocVang: React.FC<LacLocVangProps> = ({ route, navigation }) => {

  const {
    data,
    luot_lac,
    isShaken,
    setIsShaken,
    handleBack,
  } = useLacLocVang({ route, navigation });

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={{ uri: isShaken ? data?.backGroundPerson : data?.backGround }}
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

        <Image
          source={{ uri: data?.imgPerson }}
          style={[styles.poseImg, { opacity: isShaken ? 0 : 1 }]}
        />

        <View style={styles.wrapper}>
          <Text style={styles.txt}>Bạn có <Text style={styles.quantity}>{luot_lac}</Text> lượt lắc</Text>

          <TouchableOpacity onPress={() => setIsShaken(true)}>
            <Image style={styles.btn}
              source={{ uri: data?.btnLac1Luot }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsShaken(true)}>
            <Image style={styles.btn}
              source={{ uri: data?.btnLac10Luot }}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
};

export default LacLocVang;
