/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import BoxOffice from './pages/BoxOffice';
import MovieDetail from './pages/MovieDetail';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
const Stack = createStackNavigator();

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background :'#ffffff',
  },
};

const App: () => Node = () => {

  return ( 
    <>
      <NavigationContainer theme={Theme} >
        <Stack.Navigator screenOptions={ {headerShown:false}}/*헤더 표시안함(하위페이지 포함 단, 하위 페이지에 직접 설정 시 우선권 넘어감) */ >
          <Stack.Screen name="BoxOffice" component={BoxOffice}  />
          <Stack.Screen name="MovieDetail" component={MovieDetail} />
        </Stack.Navigator>
      </NavigationContainer>

    </>
  );
};


export default App;
