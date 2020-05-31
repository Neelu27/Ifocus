import React from 'react';
import { Platform ,Image,View,TouchableOpacity} from 'react-native';
import { createAppContainer,createSwitchNavigator,withNavigation,TabNavigator} from 'react-navigation';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createStackNavigator } from 'react-navigation-stack';

import TransactionScreen from '../screens/TransactionScreen';
import AdsScreen from '../screens/AdsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';

const HomeStack = createStackNavigator(
  {
    HomeScreen:{
        screen: HomeScreen,
        navigationOptions: {

      }
    },
 },
 {
   initialRouteName: 'HomeScreen',
 }
)
// HomeStack.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = false;
//   return {
//     tabBarVisible,
//   };
// };
const TransactionStack = createStackNavigator(
  {
    TransactionScreen:{
        screen: TransactionScreen,
        navigationOptions: {

      }
    },

 },
 {
   initialRouteName: 'TransactionScreen',
 }
)
// TransactionStack.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = false;
//   return {
//     tabBarVisible,
//   };
// };
const AdsStack = createStackNavigator(
  {
    AdsScreen:{
        screen: AdsScreen,
        navigationOptions: {

      }
    },

 },
 {
   initialRouteName: 'AdsScreen',
 }
)
// AdsStack.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = false;
//   return {
//     tabBarVisible,
//   };
// };
const ProfileStack = createStackNavigator(
  {
    ProfileScreen:{
        screen: ProfileScreen,
        navigationOptions: {

      }
    },

 },
 {
   initialRouteName: 'ProfileScreen',
 }
)
// ProfileStack.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = false;
//   return {
//     tabBarVisible,
//   };
// };

const Tab = TabNavigator({
  HomeScreen:{
      screen: HomeScreen,

      navigationOptions: {

    },
    TransactionScreen:TransactionScreen

}
})
// Transaction:TransactionStack,
// Ads:AdsStack,
// Profile:ProfileStack,
// const TabStack = createStackNavigator({
//   TabNavigator:{
//     screen: TabNavigator,
//   navigationOptions: {}
//   },
//
//     initialRouteName: 'TabNavigator',
//
// })
export default createStackNavigator({ Tab }, { headerMode: "none" });
