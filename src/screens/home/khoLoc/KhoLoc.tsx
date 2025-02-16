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
import LgTxtYellow from "../../../components/lineGradient/LgTxtYellow";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import { useKhoLoc } from './useKhoLoc';  // Import hook useLogin

// Định nghĩa kiểu props cho màn hình Login
type KhoLocProps = NativeStackScreenProps<StackRoutes, 'TabHome'>;

const KhoLoc: React.FC<KhoLocProps> = ({ route, navigation }) => {

  const {
    data,
    isShaken,
    setIsShaken,
  } = useKhoLoc({ route, navigation });

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={{ uri: data?.backGround }}
        style={styles.background}
        resizeMode="cover"
      >
        <LgTxtYellow
          title={data?.title}
          size={24}
          height={33}
        />
        <Image
          style={styles.logo_Vinh_Tuong}
          source={{ uri: data?.logo_Vinh_Tuong }}
        />
        {/* Tab */}
        <ImageBackground
          source={{ uri: data?.backGround_phu }}
          style={styles.background_3btn}
          resizeMode='cover'
        >
          <TouchableOpacity
            style={[
              styles.btnTab,
              isShaken == 1 && { backgroundColor: '#B30D00' }]}
            onPress={() => setIsShaken(1)}
          >
            <Text
              style={[
                styles.txtBtn,
                isShaken == 1 && { color: '#ffff' }]}
            >Lắc lộc vàng</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.btnTab,
              isShaken == 2 && { backgroundColor: '#B30D00' }]}
            onPress={() => setIsShaken(2)}
          >
            <Text
              style={[
                styles.txtBtn,
                isShaken == 2 && { color: '#ffff' }]}
            >Lì xì vàng</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.btnTab,
              isShaken == 3 && { backgroundColor: '#B30D00' }]}
            onPress={() => setIsShaken(3)}
          >
            <Text
              style={[
                styles.txtBtn,
                isShaken == 3 && { color: '#ffff' }]}
              numberOfLines={2}
            >{`Mã số\nmay mắn`}</Text>
          </TouchableOpacity>

        </ImageBackground>

        {/* kho đồ */}
        <ImageBackground
          source={{ uri: data?.backGround_phu }}
          style={styles.background_phu}
          resizeMode='contain'
        >

        </ImageBackground>

      </ImageBackground >
    </>
  );
};

export default KhoLoc;
