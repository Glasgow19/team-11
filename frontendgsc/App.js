
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Root } from 'native-base';

import LoginPage from './components/LoginPage';


console.disableYellowBox = true;

const AppNavigator = createStackNavigator({
  LoginPage,
}, {
  initialRouteName: 'LoginPage',
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