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
import { useThanhLiXi3 } from './useThanhLiXi3';  // Import hook useLogin

// Định nghĩa kiểu props cho màn hình Login
type ThanhLiXi3Props = NativeStackScreenProps<StackRoutes, 'TabHome'>;

const ThanhLiXi3: React.FC<ThanhLiXi3Props> = ({ route, navigation }) => {

  const {
    data,
    handleBack,
    toThanhLiXi4
  } = useThanhLiXi3({ route, navigation });

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


        <View
          style={styles.vTxt}
        >
          <Text
            style={styles.title_phu}
          >Đáp nhanh tranh lì xì
          </Text>
          <Text
            style={styles.content_title_phu}
          >Sẵn sàng thách đấu!
          </Text>
        </View>

        <View
          style={styles.vUser1}
        >
          <Image
            style={styles.avt}
            source={{ uri: data?.avt1 }}
          />
          <Text
            style={styles.name1}
          >{"Nguyễn Trần\nNgọc Hân"}
          </Text>
        </View>

        <View
          style={styles.vUser2}
        >
          <Image
            style={styles.avt}
            source={{ uri: data?.avt2 }}
          />
          <Text
            style={styles.name2}
          >{"B Nguyễn"}
          </Text>
        </View>

        <View
          style={styles.vTime}
        >
          <CountupTimer />
        </View>

        <TouchableOpacity
          onPress={toThanhLiXi4}
          style={styles.vBtnChoi}
        >
          <Image
            style={styles.btn_choi_huy}
            source={{ uri: data?.btn_choi }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.vBtnHuy}
        >
          <Image
            style={styles.btn_choi_huy}
            source={{ uri: data?.btn_huy }}
          />
        </TouchableOpacity>


      </ImageBackground>
    </>
  );
};

export default ThanhLiXi3;
