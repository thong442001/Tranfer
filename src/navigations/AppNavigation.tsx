import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import HomeNavigation from './HomeNavigation';
import UserNavigation from './UserNavigation';


const AppNavigation: React.FC = () => {

  const user = useSelector((state: any) => state.app.user);

  return (
    <NavigationContainer>
      {
        user != null ? <HomeNavigation /> : <UserNavigation />
      }
    </NavigationContainer>
  );
}

export default AppNavigation;
