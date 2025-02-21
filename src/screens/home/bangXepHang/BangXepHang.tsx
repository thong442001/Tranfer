import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Image,
  FlatList
} from 'react-native';
import { styles } from "./style";
import LgTxtYellow from "../../../components/lineGradient/LgTxtYellow";
import ItemBangXepHang from "../../../components/itemBangXepHang/ItemBangXepHang";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import { useBangXepHang } from './useBangXepHang';  // Import hook useLogin

// Định nghĩa kiểu props cho màn hình Login
type BangXepHangProps = NativeStackScreenProps<StackRoutes, 'TabHome'>;

const BangXepHang: React.FC<BangXepHangProps> = ({ route, navigation }) => {

  const {
    data,
    handleBack,
    userData,
  } = useBangXepHang({ route, navigation });

  console.log(userData)

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

        <ImageBackground
          source={{ uri: data?.backGround_phu }}
          style={styles.backGround_phu}
          resizeMode="contain"
        >
          <Image
            style={styles.img_3btn}
            source={{ uri: data?.img_3btn }}
            resizeMode="contain"
          />
          <View
            style={styles.vTop12}
          >
            <ImageBackground
              style={styles.vTop1}
              source={{ uri: data?.backGround_1 }}
              resizeMode="contain"
            >
              <Image
                style={styles.avt1}
                source={{ uri: data?.avt1 }}
                resizeMode="contain"
              />
              <Text
                style={styles.nameTop1}
                numberOfLines={2}
              >
                {userData[0].name}
              </Text>
            </ImageBackground>
            <ImageBackground
              style={styles.vTop2}
              source={{ uri: data?.backGround_2 }}
              resizeMode="contain"
            >
              <Image
                style={styles.avt2}
                source={{ uri: data?.avt2 }}
                resizeMode="contain"
              />
              <Text
                style={styles.nameTop2}
                numberOfLines={2}
              >
                {userData[1].name}
              </Text>
            </ImageBackground>
          </View>

          <View
            style={styles.list}
          >
            <FlatList
              data={userData}
              keyExtractor={(item) => item.id.toString()} // ✅ Sửa thành chuỗi
              renderItem={({ item }) =>
                <ItemBangXepHang
                  id={item.id}
                  name={item.name}
                  lixi={item.lixi}
                />
              }
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>


          {/* Bang Xep Hang cua me */}
          <View>
            <Image
              style={styles.img_hang_cua_toi}
              source={{ uri: data?.img_hang_cua_toi }}
              resizeMode="contain"
            />
            <ItemBangXepHang
              id={userData[6].id}
              name={userData[6].name}
              lixi={userData[6].lixi}
            />
          </View>

        </ImageBackground>

      </ImageBackground>
    </>
  );
};

export default BangXepHang;
