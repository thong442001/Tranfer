import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Image,
} from 'react-native'
import { styles } from "./style";
import DialogXinChao from "../../../components/dialog/xinChao/DialogXinChao";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import { useHuongDan } from './useHuongDan';  // Import hook useLogin

// Định nghĩa kiểu props cho màn hình Login
type LoginProps = NativeStackScreenProps<StackRoutes, 'HuongDan'>;

const HuongDan: React.FC<LoginProps> = ({ route, navigation }) => {
  const {
    data,
    btnTron,
    setBtnTron,
    handle,
    handle1,
    dialogXinChaoData,
    visible,
    setVisible,
  } = useHuongDan({ route, navigation });

  return (

    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        source={{ uri: data?.backGround }}
        style={styles.background}
        resizeMode="cover"
      >
        <View
          style={styles.vHeader}
        >
          <TouchableOpacity
            onPress={handle}>
            <Image
              source={{ uri: data?.btn_back }}
              style={styles.btn_back}
              resizeMode='contain'
            />
          </TouchableOpacity>

          <Text
            style={styles.title}
          >{data?.title}</Text>

          <View
            style={styles.btn_back}
          >
          </View>
        </View>

        <ImageBackground
          source={{ uri: data?.img_chinh }}
          style={styles.img_chinh}
          resizeMode='cover'
        >
          {/* 4 btn tron */}
          <View
            style={styles.vBtnTron}
          >
            <TouchableOpacity
              style={[
                styles.btn_tron,
                btnTron == 1
                && styles.btn_tron_chon
              ]}
              onPress={() => setBtnTron(1)}
            >
              <Text></Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn_tron,
                btnTron == 2
                && styles.btn_tron_chon
              ]}
              onPress={() => setBtnTron(2)}
            >
              <Text></Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn_tron,
                btnTron == 3
                && styles.btn_tron_chon
              ]}
              onPress={() => setBtnTron(3)}
            >
              <Text></Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn_tron,
                btnTron == 4
                && styles.btn_tron_chon
              ]}
              onPress={() => setBtnTron(4)}
            >
              <Text></Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>



        <ImageBackground
          source={{ uri: data?.backGroundTxt }}
          style={styles.backGroundTxt}
          resizeMode="contain"
        >
          <Text
            style={styles.content}
          >
            {data?.content}
          </Text>
        </ImageBackground>


        <TouchableOpacity
          style={styles.boc}
          onPress={handle1}
        >
          <Image
            source={{ uri: data?.btn_tham_gia_ngay }}
            style={styles.btn_tham_gia_ngay}
            resizeMode='contain'
          />
        </TouchableOpacity>

        {/* dialog */}
        <DialogXinChao
          visible={visible}
          uriBackGround={dialogXinChaoData?.backGround}
          uriBtnConfim={dialogXinChaoData?.btn_confirm}
          onConfirm={() => setVisible(false)}
        />

      </ImageBackground>
    </SafeAreaView>
  );
};

export default HuongDan;
