import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import các màn hình
import HuongDan from '../screens/user/huongDan/HuongDan';

import LacLocVang from '../screens/home/lacLocVang/LacLocVang';
import KhoLoc from '../screens/home/khoLoc/KhoLoc';

import LiXiVang from '../screens/home/liXiVang/LiXiVang';
import TetTranhTai from '../screens/home/tetTranhTai/TetTranhTai';
import HomeThanhLiXi from '../screens/home/homeThanhLiXi/HomeThanhLiXi';

import ThanhLiXi1 from '../screens/home/thanhLiXi1/ThanhLiXi1';
import ThanhLiXi2 from '../screens/home/thanhLiXi2/ThanhLiXi2';
import ThanhLiXi3 from '../screens/home/thanhLiXi3/ThanhLiXi3';
import ThanhLiXi4 from '../screens/home/thanhLiXi4/ThanhLiXi4';

import TetTranhTaiTimDoiThu from '../screens/home/tetTranhTaiTimDoiThu/TetTranhTaiTimDoiThu';
import TetTranhTaiInGame from '../screens/home/tetTranhTaiInGame/TetTranhTaiInGame';

// Định nghĩa kiểu dữ liệu cho Stack
export type LiXiVangRoutes = {
  LiXiVang: undefined;
  HomeThanhLiXi: undefined;
  TetTranhTai: undefined;
  ThanhLiXi1: undefined;
  ThanhLiXi2: undefined;
  ThanhLiXi3: undefined;
  ThanhLiXi4: undefined;
  TetTranhTaiTimDoiThu: { game: string };
  TetTranhTaiInGame: undefined;
};

// Định nghĩa kiểu dữ liệu cho `oStackHome`
const oLiXiVang: Record<keyof LiXiVangRoutes, { name: keyof LiXiVangRoutes; component: React.ComponentType<any> }> = {
  LiXiVang: { name: 'LiXiVang', component: LiXiVang },
  HomeThanhLiXi: { name: 'HomeThanhLiXi', component: HomeThanhLiXi },
  TetTranhTai: { name: 'TetTranhTai', component: TetTranhTai },
  ThanhLiXi1: { name: 'ThanhLiXi1', component: ThanhLiXi1 },
  ThanhLiXi2: { name: 'ThanhLiXi2', component: ThanhLiXi2 },
  ThanhLiXi3: { name: 'ThanhLiXi3', component: ThanhLiXi3 },
  ThanhLiXi4: { name: 'ThanhLiXi4', component: ThanhLiXi4 },
  TetTranhTaiTimDoiThu: { name: 'TetTranhTaiTimDoiThu', component: TetTranhTaiTimDoiThu },
  TetTranhTaiInGame: { name: 'TetTranhTaiInGame', component: TetTranhTaiInGame },
};

// Tạo Stack Navigator
const LiXiVangHome = createNativeStackNavigator<LiXiVangRoutes>();

const LiXiVangHomeNavigation: React.FC = () => {
  return (
    <LiXiVangHome.Navigator screenOptions={{ headerShown: false }} initialRouteName="LiXiVang">
      {Object.entries(oLiXiVang).map(([key, { name, component }]) => (
        <LiXiVangHome.Screen key={key} name={name} component={component} />
      ))}
    </LiXiVangHome.Navigator>
  );
};

// Định nghĩa kiểu cho các tab
export type TabRoutes = {
  LacLocVang: undefined;
  LiXiVangHomeNavigation: undefined;
  KhoLoc: undefined;
};

// Định nghĩa kiểu dữ liệu cho `oTab`
const oTab: Record<keyof TabRoutes, { name: keyof TabRoutes; component: React.ComponentType<any>; icon: any }> = {
  LacLocVang: { name: 'LacLocVang', component: LacLocVang, icon: require('../../assets/images/iconLacLocVang.png') },
  LiXiVangHomeNavigation: { name: 'LiXiVangHomeNavigation', component: LiXiVangHomeNavigation, icon: require('../../assets/images/iconLiXiVang.png') },
  KhoLoc: { name: 'KhoLoc', component: KhoLoc, icon: require('../../assets/images/iconKhoLoc.png') },
};

// Tạo Bottom Tab Navigator
const Tab = createBottomTabNavigator<TabRoutes>();

const TabHome: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="LiXiVangHomeNavigation"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveBackgroundColor: '#FFD233',
        tabBarInactiveBackgroundColor: '#FFF9E1',
        tabBarHideOnKeyboard: true,
      })}
    >
      {Object.entries(oTab).map(([key, { name, component, icon }]) => (
        <Tab.Screen
          key={key}
          name={name}
          component={component}
          options={{
            title: '',
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabItem}>
                <Image
                  source={icon}
                  style={styles.icon}
                  resizeMode='contain'
                />
                <Text
                  style={styles.label}
                  numberOfLines={1}
                >{getLabel(name)}</Text>
              </View>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const getLabel = (name: keyof TabRoutes) => {
  switch (name) {
    case 'LacLocVang':
      return 'Lắc lộc vàng';
    case 'LiXiVangHomeNavigation':
      return 'Li xì vàng';
    case 'KhoLoc':
      return 'Kho lộc';
    default:
      return '';
  }
};

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -10,
  },
  icon: {
    width: 30,
    height: 30,
    alignItems: 'center',
  },
  label: {
    fontFamily: 'SVN-Cookies',
    fontSize: 14,
    color: '#B30D00',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
});

// Định nghĩa kiểu dữ liệu cho Stack
export type StackRoutes = {
  TabHome: undefined;
  HuongDan: undefined;
};

// Định nghĩa kiểu dữ liệu cho `oStackHome`
const oStackHome: Record<keyof StackRoutes, { name: keyof StackRoutes; component: React.ComponentType<any> }> = {
  TabHome: { name: 'TabHome', component: TabHome },
  HuongDan: { name: 'HuongDan', component: HuongDan },
};

// Tạo Stack Navigator
const StackHome = createNativeStackNavigator<StackRoutes>();

const HomeNavigation: React.FC = () => {
  return (
    <StackHome.Navigator screenOptions={{ headerShown: false }} initialRouteName="HuongDan">
      {Object.entries(oStackHome).map(([key, { name, component }]) => (
        <StackHome.Screen key={key} name={name} component={component} />
      ))}
    </StackHome.Navigator>
  );
};

export { oTab, oStackHome };
export default HomeNavigation;
