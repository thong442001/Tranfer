import { useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParamList } from '../../../navigations/UserNavigation';
import { useDispatch } from 'react-redux';
import { login } from '../../../rtk/Reducer';
// gg
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
type UseLoginProps = NativeStackScreenProps<UserStackParamList, 'Login'>;

export const useLogin = ({ route, navigation }: UseLoginProps) => {
  const { params } = route;

  const dispatch = useDispatch();

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

      dispatch(login(user.displayName));

    } catch (error: any) {
      console.log("Lỗi đăng nhập", error.message);
    }
  };

  return {
    handleGoogleLogin,
  };
};
