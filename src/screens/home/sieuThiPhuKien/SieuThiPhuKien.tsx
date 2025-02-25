import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import { styles } from "./style";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import { useSieuThiPhuKien } from './useSieuThiPhuKien';  // Import hook useLogin

// Định nghĩa kiểu props cho màn hình Login
type HomeThanhLiXiProps = NativeStackScreenProps<StackRoutes, 'TabHome'>;

const SieuThiPhuKien: React.FC<HomeThanhLiXiProps> = ({ route, navigation }) => {

  const {
    data,
    lixi,
    handleBack,
    gifts,
    increaseQuantity,
    decreaseQuantity,
    handleExchange,
    selectedGifts,
  } = useSieuThiPhuKien({ route, navigation });

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
            onPress={handleBack}>
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
        <FlatList
          data={gifts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ImageBackground
              source={{ uri: item.backGround }}
              style={{
                flexDirection: 'row',
                width: Dimensions.get('window').width * 0.85,
                height: Dimensions.get('window').height * 0.3,
                gap: 20,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
                marginVertical: 10,
              }}
              resizeMode="contain"
            >
              <View>
                <Image
                  source={{ uri: item.img }}
                  style={{ width: 90, height: 120 }}
                  resizeMode="contain"
                />
                <Text style={{ color: "#FFF" }}>(Còn lại: {item.stock})</Text>
              </View>

              <View
                style={{ gap: 10 }}>
                <Text style={{ width: 140, textAlign: "center", fontSize: 16, color: "#FFE995", fontFamily: 'SVN-Cookies', }}>{item.name}</Text>
                <Text style={{ color: "#FFFFFF", textAlign: 'center' }}>Yêu cầu: {item.cost} lì xì</Text>


                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, alignSelf: 'center' }}>
                  <TouchableOpacity
                    onPress={() => decreaseQuantity(item.id)}
                    style={[{ width: 30 }, { height: 30 }, { borderRadius: 50 }, selectedGifts[item.id] ? { backgroundColor: "#FFF613" } : { backgroundColor: "grey" }]}>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>-</Text>
                  </TouchableOpacity>

                  <Text
                    style={{
                      fontSize: 18,
                      marginHorizontal: 10,
                      color: '#FFE933',
                      fontFamily: 'SVN-Cookies',
                      textAlign: 'center'
                    }}
                  >{selectedGifts[item.id] || 0}</Text>

                  <TouchableOpacity
                    onPress={() => increaseQuantity(item.id)}
                    style={{ width: 30, height: 30, backgroundColor: "#FFF613", borderRadius: 50 }}>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </ImageBackground>
          )}
        />
        <ImageBackground
          source={{ uri: data?.backGround_phu }}
          style={styles.background_phu}
          resizeMode="cover"
        >
          <ImageBackground
            source={{ uri: data?.img_2may }}
            style={styles.img_2may}
            resizeMode="contain"
          >
            <View style={styles.wrapper}>
              <Text style={styles.txt}
              >Bạn đang có <Text style={styles.quantity}>{lixi}</Text > lì xì </Text>
              <TouchableOpacity
                onPress={handleExchange}
              >
                <Image
                  style={styles.btn}
                  source={{ uri: data?.btn_doi_ngay }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ImageBackground>

      </ImageBackground >
    </>
  );
};

export default SieuThiPhuKien;
