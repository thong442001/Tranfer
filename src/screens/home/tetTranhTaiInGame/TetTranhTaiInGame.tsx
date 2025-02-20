import React, { useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import { styles } from "./style";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LiXiVangRoutes } from '../../../navigations/HomeNavigation';
import { useTetTranhTaiInGame } from './useTetTranhTaiInGame';  // Import hook useLogin
import GameThuTaiBanVit from "../../../components/gameThuTaiBanVit/GameThuTaiBanVit";
import GameAnhHungSieuBaoVe from "../../../components/gameAnhHungSieuBaoVe/GameAnhHungSieuBaoVe";
import GameThanhAnhKim from "../../../components/gameThanhAnhKim/GameThanhAnhKim";
// Định nghĩa kiểu props cho màn hình Login
type TetTranhTaiInGameProps = NativeStackScreenProps<LiXiVangRoutes, 'TetTranhTaiInGame'>;
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const TetTranhTaiInGame: React.FC<TetTranhTaiInGameProps> = ({
  route,
  navigation
}) => {

  const {
    data,
    handleBack,
    toThuTaiBanVit,
    toAnhHungSieuBaoVe,
    toThanhAnhKim,
    score,
    setScore,
    score2,
    setScore2,
    handleTimeEnd,
  } = useTetTranhTaiInGame({ route, navigation });

  // Kiểm soát việc render game
  const [isGameActive, setIsGameActive] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsGameActive(true); // Khi vào lại, bật game
      setScore(0);
      // setScore2(0);
      return () => setIsGameActive(false); // Khi back, tắt game
    }, [])
  );

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
              >{score}</Text>
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
              >{score2}
              </Text>
            </ImageBackground>
            <Text
              style={styles.name}
            >Nguyễn Lương Kiên Hào
            </Text>
          </View>
        </View >

        <Text
          style={styles.titleGame}
        >{data?.title}</Text>

        {/* Chỉ render game khi isGameActive = true */}
        {
          isGameActive
          && (
            data?.title == 'THỬ TÀI BẮN VÍT'
              ? (
                <GameThuTaiBanVit
                  score={score}
                  setScore={setScore}
                  onTimeEnd={handleTimeEnd}
                />
              ) : (data?.title == 'THÁNH ÁNH KIM')
                ? (
                  <GameThanhAnhKim
                    score={score}
                    setScore={setScore}
                    onTimeEnd={handleTimeEnd}
                  />
                ) : (
                  <GameAnhHungSieuBaoVe
                    score={score}
                    setScore={setScore}
                    onTimeEnd={handleTimeEnd}
                  />
                )
          )}

      </ImageBackground >
    </>
  );
};

export default TetTranhTaiInGame;
