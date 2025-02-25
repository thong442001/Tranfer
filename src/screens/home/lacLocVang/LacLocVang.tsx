import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Image,
  Modal,
  TouchableWithoutFeedback
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
    selectedGift,  // gift random
    msmmData, // msmm
    shakeOnce, // Hàm lắc quà
    visible,
    setVisible,
    visible10,
    setVisible10,
    shakeTenTimes,
    index, // thứ tự của quà
    setindex,
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

        {/* <Text>Danh sách quà:</Text>
        {gifts.map((gift) => (
          <Text key={gift.id}>{gift.name} ({gift.stock})</Text>
        ))} */}

        <View style={styles.wrapper}>
          <Text style={styles.txt}>Bạn có <Text style={styles.quantity}>{luot_lac}</Text> lượt lắc</Text>

          <TouchableOpacity
            onPress={() => {
              shakeOnce()
              setVisible(true)
              setIsShaken(true)
            }}
            disabled={luot_lac < 1}
          >
            <Image style={styles.btn}
              source={{ uri: data?.btnLac1Luot }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              shakeTenTimes()
              setVisible10(true)
              setIsShaken(true)
            }}
            disabled={luot_lac < 10}
          >
            <Image style={styles.btn}
              source={{ uri: data?.btnLac10Luot }}
            />
          </TouchableOpacity>
        </View>
        {/* dialog1 */}
        <Modal transparent visible={visible} animationType="fade">
          <View style={styles.overlay}>

            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
              <View style={styles.background_1} />
            </TouchableWithoutFeedback>

            <Image style={styles.btn}
              source={require('../../../../assets/images/logo_vinh_tuong.png')}
            />
            <ImageBackground
              source={require('../../../../assets/images/backGround_1.png')}
              style={styles.dialog_1}
              resizeMode="contain"
            >
              {selectedGift.length > 0 && (
                <View>
                  <Text
                    style={styles.name_dialog_1}
                  >1 {selectedGift[0].name}</Text>
                  <Text
                    style={styles.name_dialog_1}
                  >1 Mã số may mắn</Text>
                </View>
              )}


              <View
                style={{ flexDirection: 'row', alignSelf: 'center', gap: 5 }}
              >
                {selectedGift.length > 0 && (
                  <Image
                    source={{ uri: selectedGift[0].img }}
                    style={styles.giftImage}
                    resizeMode="contain"
                  />
                )}

                <Image
                  source={{ uri: msmmData?.img }}
                  style={styles.giftImage}
                  resizeMode="contain"
                />
              </View>

              <Text
                style={styles.txt_dialog_1}
              >
                WOW, THÁNH LẮC VÀNG ĐÂY RỒI,
                GIÀU TO RỒI ANH EM ƠI!
              </Text>

            </ImageBackground>

            <TouchableOpacity
            // onPress={() =>
            //   setIsShaken(true)
            // }
            >
              <Image style={styles.btn}
                source={require('../../../../assets/images/btn_chia_se.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setVisible(false)
              }
            >
              <Image style={styles.btn}
                source={require('../../../../assets/images/btn_nhan_loc.png')}
              />
            </TouchableOpacity>

          </View >
        </Modal >

        {/* dialog10 */}
        <Modal transparent visible={visible10} animationType="fade">
          <View style={styles.overlay}>

            <TouchableWithoutFeedback
              onPress={() => {
                setVisible10(false)
                setindex(0)
              }}>
              <View style={styles.background_1} />
            </TouchableWithoutFeedback>

            <ImageBackground
              source={require('../../../../assets/images/backGround_10.png')}
              style={styles.dialog_10}
              resizeMode="contain"
            >
              <Text
                style={styles.title_dialog_10}
              >
                LỘC TỚI NGẬP TRÀN
              </Text>

              {selectedGift.length > 0 && (
                <View>
                  <Text
                    style={styles.name_dialog_10}
                  >1 {selectedGift[index].name}</Text>
                  <Text
                    style={styles.name_dialog_10}
                  >1 Mã số may mắn</Text>
                </View>
              )}


              <View
                style={{ flexDirection: 'row', alignSelf: 'center', gap: 5 }}
              >
                {selectedGift.length > 0 && (
                  <Image
                    source={{ uri: selectedGift[index].img }}
                    style={styles.giftImage}
                    resizeMode="contain"
                  />
                )}

                <Image
                  source={{ uri: msmmData?.img }}
                  style={styles.giftImage}
                  resizeMode="contain"
                />
              </View>
              {/* Nút chuyển quà */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                  alignSelf: 'center'
                }}
              >
                <TouchableOpacity
                  style={[
                    { width: 30 },
                    { height: 30 },
                    { borderRadius: 50 },
                    index != 0
                      ? { backgroundColor: "#FFF613" }
                      : { backgroundColor: "grey" }
                  ]}
                  onPress={() => setindex(prev => Math.max(prev - 1, 0))}
                  disabled={index === 0}
                >
                  <Text
                    style={{ fontSize: 20, textAlign: 'center' }}
                  >{"<"}</Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 18,
                    marginHorizontal: 10,
                    color: '#FFE933',
                    fontFamily: 'SVN-Cookies',
                    textAlign: 'center'
                  }}
                >{index + 1}/10</Text>
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: "#FFF613",
                    borderRadius: 50
                  }}
                  onPress={() => setindex(prev => Math.min(prev + 1, selectedGift.length - 1))}
                  disabled={index === selectedGift.length - 1}
                >
                  <Text
                    style={{ fontSize: 20, textAlign: 'center' }}
                  >{">"}</Text>
                </TouchableOpacity>
              </View>



              <Text
                style={styles.txt_dialog_10}
              >
                Chúc mừng thánh lắc,
                rinh lộc mát tay anh em ơi!
                Tích cực săn thêm lượt lắc thôi nào!
              </Text>

            </ImageBackground>

            <TouchableOpacity
            // onPress={() =>
            //   setIsShaken(true)
            // }
            >
              <Image style={styles.btn}
                source={require('../../../../assets/images/btn_chia_se.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setVisible10(false)
                setindex(0)
              }}
            >
              <Image style={styles.btn}
                source={require('../../../../assets/images/btn_nhan_loc.png')}
              />
            </TouchableOpacity>

          </View >
        </Modal >


      </ImageBackground >
    </>
  );
};

export default LacLocVang;
