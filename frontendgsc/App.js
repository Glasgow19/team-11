
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Root } from 'native-base';

import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import LanguagePage from './components/LanguagePage';
import SplashScreen from './components/SplashScreen';
import Animation from './components/LeftArrow';

console.disableYellowBox = true;

const AppNavigator = createStackNavigator({
  LoginPage,
  HomePage,
  LanguagePage,
  SplashScreen,
  Animation
}, {
  initialRouteName: 'SplashScreen',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

const AppContainer = createAppContainer(AppNavigator);
export default () =>
  <Root>
    <AppContainer />
  </Root>
  ;