import React, { useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';
import { styles } from "./style";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
// Firebase
import firestore from '@react-native-firebase/firestore';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParamList } from '../../../navigations/UserNavigation';
import { useLogin } from './useLogin';  // Import hook useLogin

// Định nghĩa kiểu props cho màn hình Login
type LoginProps = NativeStackScreenProps<UserStackParamList, 'Login'>;

const Login: React.FC<LoginProps> = ({ route, navigation }) => {

  const {
    name,
    setName,
    handle
  } = useLogin({ route, navigation });

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "94150586774-tcuggtv48vtb53mdubcaf791s2abdeh1.apps.googleusercontent.com", // Thay YOUR_WEB_CLIENT_ID bằng webClientId từ Firebase
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {

      // Đăng xuất trước để chọn lại tài khoản
      await GoogleSignin.signOut();

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = await GoogleSignin.getTokens(); // Lấy token chính xác

      if (!idToken) {
        throw new Error("Không lấy được idToken từ Google");
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const user = userCredential.user;

      // Tham chiếu đến Firebase Realtime Database
      const userRef = database().ref(`Tranfer-users/${user.uid}`);
      const snapshot = await userRef.once("value");

      if (!snapshot.exists()) {
        await userRef.set({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          li_xi: 0, // Lì xì khởi tạo là 0
        });
      }

      Alert.alert("Đăng nhập thành công!");
      //handle();

    } catch (error: any) {
      Alert.alert("Lỗi đăng nhập", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Login</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholderTextColor={'#8C96A2'}
          placeholder="Họ và tên"
        />

        <TouchableOpacity onPress={handle}>
          <Text>
            Tôi vẫn khỏe
          </Text>
        </TouchableOpacity>

        <View>
          <Button title="Đăng nhập Google"
            onPress={handleGoogleLogin} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
