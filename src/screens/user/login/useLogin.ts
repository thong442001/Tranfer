import { useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParamList } from '../../../navigations/UserNavigation';
import { useDispatch } from 'react-redux';
import { login } from '../../../rtk/Reducer';
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

type UseLoginProps = NativeStackScreenProps<UserStackParamList, 'Login'>;
interface UserData {
  uid: string;
  name: string;
  email: string;
  avatar: string;
  luot_lac: number;
  li_xi: number;
  kho: string[];
}

export const useLogin = ({ route, navigation }: UseLoginProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "94150586774-tcuggtv48vtb53mdubcaf791s2abdeh1.apps.googleusercontent.com",
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

      // Xác thực với Firebase
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const user = userCredential.user;

      // Tham chiếu đến Firebase Realtime Database
      const userRef = database().ref(`Tranfer-users/${user.uid}`);
      const snapshot = await userRef.once("value");

      let userData: UserData;

      if (!snapshot.exists()) {
        // Tạo user mới nếu chưa tồn tại trong database
        userData = {
          uid: user.uid,
          name: user.displayName || "Người dùng mới",
          email: user.email || "",
          avatar: user.photoURL || "",
          luot_lac: 11,
          li_xi: 0,
          kho: ["placeholder"],// Luôn là array để tránh lỗi
        };

        await userRef.set(userData); // Lưu vào database
      } else {
        userData = snapshot.val();

        if (!userData.kho || !Array.isArray(userData.kho)) {
          userData.kho = ["placeholder"]; // Giá trị mặc định
          await userRef.update({ kho: userData.kho });
        }

      }

      // Dispatch dữ liệu user lên Redux store
      dispatch(login(userData));

    } catch (error: any) {
      console.error("Lỗi đăng nhập:", error.message);
    }
  };

  return {
    handleGoogleLogin,
  };
};
