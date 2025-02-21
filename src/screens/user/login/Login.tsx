import React from 'react';
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

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParamList } from '../../../navigations/UserNavigation';
import { useLogin } from './useLogin';  // Import hook useLogin

// Định nghĩa kiểu props cho màn hình Login
type LoginProps = NativeStackScreenProps<UserStackParamList, 'Login'>;

const Login: React.FC<LoginProps> = ({ route, navigation }) => {

  const {
    handleGoogleLogin
  } = useLogin({ route, navigation });



  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Button title="Đăng nhập Google"
            onPress={handleGoogleLogin} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
