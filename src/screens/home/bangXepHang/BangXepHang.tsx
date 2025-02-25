import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Image,
  FlatList,
} from "react-native";
import { styles } from "./style";
import LgTxtYellow from "../../../components/lineGradient/LgTxtYellow";
import ItemBangXepHang from "../../../components/itemBangXepHang/ItemBangXepHang";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackRoutes } from "../../../navigations/HomeNavigation";
import { useBangXepHang } from "./useBangXepHang"; // Import hook useBangXepHang

type BangXepHangProps = NativeStackScreenProps<StackRoutes, "TabHome">;

const BangXepHang: React.FC<BangXepHangProps> = ({ route, navigation }) => {
  const {
    data,
    handleBack,
    leaderboard,
    userRank,
    user,
  } = useBangXepHang({
    route,
    navigation,
  });

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={{ uri: data?.backGround }}
        style={styles.background}
        resizeMode="cover"
      >
        {/* HEADER */}
        <View style={styles.vHeader}>
          <TouchableOpacity onPress={handleBack}>
            <Image
              source={{ uri: data?.btn_back }}
              style={styles.btn_back}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={styles.vTitle}>
            <LgTxtYellow title={data?.title} size={24} height={30} />
          </View>

          <View style={styles.btn_back} />
        </View>

        {/* BẢNG XẾP HẠNG */}
        <ImageBackground
          source={{ uri: data?.backGround_phu }}
          style={styles.backGround_phu}
          resizeMode="contain"
        >
          {/* Ảnh top 3 */}
          <Image style={styles.img_3btn} source={{ uri: data?.img_3btn }} resizeMode="contain" />

          {/* Hiển thị top 1 và top 2 */}
          <View style={styles.vTop12}>
            {leaderboard.length > 0 && (
              <ImageBackground style={styles.vTop1} source={{ uri: data?.backGround_1 }} resizeMode="contain">
                <Image style={styles.avt1} source={{ uri: data?.avt1 }} resizeMode="contain" />
                <Text style={styles.nameTop1} numberOfLines={2}>
                  {leaderboard[0]?.name || "Chưa có"}
                </Text>
              </ImageBackground>
            )}

            {leaderboard.length > 1 && (
              <ImageBackground style={styles.vTop2} source={{ uri: data?.backGround_2 }} resizeMode="contain">
                <Image style={styles.avt2} source={{ uri: data?.avt2 }} resizeMode="contain" />
                <Text style={styles.nameTop2} numberOfLines={2}>
                  {leaderboard[1]?.name || "Chưa có"}
                </Text>
              </ImageBackground>
            )}
          </View>

          {/* DANH SÁCH XẾP HẠNG */}
          <View style={styles.list}>
            {leaderboard.length === 0 ? (
              <Text style={{ textAlign: "center", color: "white", marginTop: 20 }}>Chưa có dữ liệu</Text>
            ) : (
              <FlatList
                data={leaderboard}
                keyExtractor={(item) => item?.uid}
                renderItem={({ item, index }) => (
                  <ItemBangXepHang index={index} name={item?.name} lixi={item?.li_xi} />
                )}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>

          {/* HẠNG CỦA TÔI */}
          <View>
            <Image style={styles.img_hang_cua_toi} source={{ uri: data?.img_hang_cua_toi }} resizeMode="contain" />

            {userRank !== null ? (
              <ItemBangXepHang index={userRank - 1} name={user?.name} lixi={leaderboard[userRank - 1]?.li_xi || 0} />
            ) : (
              <Text style={{ textAlign: "center", color: "white", marginTop: 10 }}>Bạn chưa có thứ hạng</Text>
            )}
          </View>
        </ImageBackground>
      </ImageBackground>
    </>
  );
};

export default BangXepHang;
