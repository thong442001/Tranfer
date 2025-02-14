import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//const UserStack = createNativeStackNavigator();
import Login from '../screens/user/login/Login';

// Định nghĩa kiểu cho các màn hình trong stack
export type UserStackParamList = {
    Login: undefined;
};

const UserStack = createNativeStackNavigator<UserStackParamList>();

const UserNavigation = () => {
    return (
        <UserStack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
            <UserStack.Screen name="Login" component={Login} />
        </UserStack.Navigator>
    )
}

export default UserNavigation