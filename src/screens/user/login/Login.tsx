import React from 'react';
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { styles } from "./style";

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
      </View>
    </SafeAreaView>
  );
};

export default Login;
