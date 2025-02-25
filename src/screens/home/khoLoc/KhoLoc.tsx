import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import { styles } from "./style";
import LgTxtYellow from "../../../components/lineGradient/LgTxtYellow";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutes } from '../../../navigations/HomeNavigation';
import { useKhoLoc } from './useKhoLoc';  // Import hook useLogin

// Định nghĩa kiểu props cho màn hình Login
type KhoLocProps = NativeStackScreenProps<StackRoutes, 'TabHome'>;
interface Gift {
  id: string;
  name: string;
  status: string;
  cost: number;
  stock: number;
  img: string;
  backGround: string;
  backGround_kho: string;
}
const KhoLoc: React.FC<KhoLocProps> = ({ route, navigation }) => {

  const {
    data,
    isShaken,
    setIsShaken,
    gifts, // Trả về danh sách quà
    unclaimedCount, // Trả về tổng số quà chưa nhận
    updateGiftStatus,
  } = useKhoLoc({ route, navigation });

  const filteredGifts = gifts.filter(gift => {
    if (isShaken === 1) return gift.id !== "msmm"; // Bỏ msmm
    if (isShaken === 2) return gift.name.includes("Phiếu mua hàng"); // Chỉ lấy phiếu
    if (isShaken === 3) return gift.id === "msmm"; // Chỉ lấy msmm
    return true;
  });

  const msmmGroups = gifts
    .filter(gift => gift.id === "msmm") // Lọc ra chỉ những gift có id là "msmm"
    .flatMap(gift =>
      Array.from({ length: gift.stock }, () => ({
        ...gift,
        stock: 1 // Mỗi phần tử sau khi tách chỉ có stock = 1
      }))
    );

  console.log(msmmGroups);






  const renderGiftItem = ({ item }: { item: Gift }) => (
    <TouchableOpacity
      onPress={() => updateGiftStatus(item.id)}
    >
      <ImageBackground
        style={styles.giftItem}
        source={{ uri: item?.backGround_kho }}
        resizeMode='contain'
      >
        <Image
          source={{ uri: item.img }}
          style={styles.giftImage}
          resizeMode='contain'
        />
        {
          item.id != "msmm" &&
          <Text style={styles.giftName}>{item.name}</Text>
        }
        {
          item.id != "msmm" &&
          <Text style={styles.giftStock}>Số lượng: {item.stock}</Text>
        }
        <View
          style={{
            position: "absolute",
            bottom: 5
          }}
        >
          <Text style={styles.giftStock}>Trạng thái:</Text>
          <Text
            style={[
              styles.giftStatus,
              { color: item.status === "Chưa nhận" ? "red" : "green" },
            ]}
          >
            {item.status}
          </Text>
        </View>

      </ImageBackground>
    </TouchableOpacity >
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <ImageBackground
          source={{ uri: data?.backGround }}
          style={styles.background}
          resizeMode='cover'
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
            {
              isShaken != 3
                ? (
                  <FlatList
                    data={filteredGifts} // Dùng danh sách đã lọc
                    keyExtractor={(item) => item.id}
                    renderItem={renderGiftItem}
                    numColumns={3}
                    contentContainerStyle={styles.listContainer}
                  />
                ) : (
                  <FlatList
                    data={msmmGroups} // Dùng danh sách đã lọc
                    keyExtractor={(item, index) => `item-${index}`} // Tránh trùng key
                    renderItem={renderGiftItem}
                    numColumns={3}
                    contentContainerStyle={styles.listContainer}
                  />
                )
            }
            <Text style={styles.unclaimedText}>
              Tổng số quà chưa nhận thưởng là:
              <Text
                style={styles.unclaimedNumber}
              > {unclaimedCount}</Text>
            </Text>

          </ImageBackground>

        </ImageBackground >
      </SafeAreaView>
    </>
  );
};

export default KhoLoc;
