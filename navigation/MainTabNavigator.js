import React from 'react';
import { Platform ,Image,View,TouchableOpacity} from 'react-native';
import { FontAwesome ,Ionicons,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons} from '@expo/vector-icons';

import { createAppContainer,createSwitchNavigator,withNavigation} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../screens/HomeScreen';
import LogInScreen from '../screens/LogInScreen';
import LoginScreenV2 from '../screens/LoginScreenV2';
import HealthPolicyLogout from '../screens/HealthPolicyLogout';
import RegisterScreen from '../screens/RegisterScreen';
import OTPScreen from '../screens/OTPScreen';
import OtpScreen from '../screens/OtpScreen';
import Loader from '../components/Loader';
import CalenderScreen from '../screens/CalenderScreen';



import CameraScreens from '../screens/CameraScreens';
import Notification from '../screens/Notification';
import SearchScreen from '../screens/SearchScreen';
import HealthProduct from '../screens/HealthProduct';
import HealthPolicy from '../screens/HealthPolicy';
import Multivitamins from '../screens/Multivitamins';
import Survey from '../components/Survey';
import SenitizerScreen from '../screens/SenitizerScreen';
import CoughcoldScreen from '../screens/CoughcoldScreen';
import CovidSurvey from '../screens/CovidSurvey';
import SurveyHealthScreen from '../screens/SurveyHealthScreen';
import DentalSurvey from '../screens/DentalSurvey';
import ProductOverView from '../screens/ProductOverView';
import InsurencehelthPolicy from '../screens/InsurencehelthPolicy';
import InsurenceHelthPolicyLog from '../screens/InsurenceHelthPolicyLog';
import InsurenceLogNotCover from '../screens/InsurenceLogNotCover';
import InsurenceLog from '../screens/InsurenceLog';
import Insurence from '../screens/Insurence';
import CheckoutScreen from '../screens/CheckoutScreen';
import MyPolicy from '../screens/MyPolicy';
import AboutScreen from '../screens/AboutScreen';
import MyOrder from '../screens/MyOrder';
import MyOrderDetails from '../screens/MyOrderDetails';
import MyAddress from '../screens/MyAddress';
import CartScreen from '../screens/CartScreen';
import Checkout from '../screens/Checkout';
import UseProfile from '../screens/UseProfile';
import BuyInsurence from '../screens/BuyInsurence';
import BuyInsurenceNext from '../screens/BuyInsurenceNext';
import BuyInsurencePay from '../screens/BuyInsurencePay';
import TabBar from '../components/TabBar';
import SellerOrderCompo from '../components/SellerOrderCompo';
import SellerOrderAnnounce from '../components/SellerOrderAnnounce';
import DrawerContent from '../components/DrawerContent';
import TabBarIcon from '../components/TabBarIcon';
import IconWithBadge from '../components/IconWithBadge';
import EmailRegister from '../components/EmailRegister';
import MobileRegistretion from '../components/MobileRegistretion';
import BlogScreen from '../components/BlogScreen';
import ProductOverViewHealthInsurance from '../screens/ProductOverViewHealthInsurance';








import Timeline from '../index1';
let tabBarVisible: boolean;

const isTabsHidden = (navigation: NavigationTabProp<NavigationRoute<NavigationParams>>) => {
  const route: { path: string } | {} =
    navigation.router?.getPathAndParamsForState(navigation.state) || {};
  tabBarVisible = !('path' in route && route.path === 'Detail');
  return tabBarVisible;
};

const HomeStack = createStackNavigator(
    {
      HomeScreen:{
          screen: HomeScreen,

          navigationOptions: {}
      },
      Timeline:Timeline,
      Notification:Notification,
      SearchScreen:SearchScreen,
      TabBar:TabBar,
      SellerOrderCompo:SellerOrderCompo,
      SellerOrderAnnounce:SellerOrderAnnounce,
      HealthProduct:HealthProduct,
      HealthPolicy:HealthPolicy,
      HealthPolicyLogout:HealthPolicyLogout,
      Survey:Survey,
      Multivitamins:Multivitamins,
      SenitizerScreen:SenitizerScreen,
      CoughcoldScreen:CoughcoldScreen,
      CovidSurvey:CovidSurvey,
      SurveyHealthScreen:SurveyHealthScreen,
      DentalSurvey:DentalSurvey,
      InsurencehelthPolicy:InsurencehelthPolicy,
      Insurence:Insurence,
      CheckoutScreen:CheckoutScreen,
      MyPolicy:MyPolicy,
      AboutScreen:AboutScreen,
      MyOrder:MyOrder,
      MyOrderDetails:MyOrderDetails,
      MyAddress:MyAddress,
      CartScreen:CartScreen,
      Checkout:Checkout,
      UseProfile:UseProfile,
      BuyInsurence:BuyInsurence,
        BuyInsurenceNext:BuyInsurenceNext,
        BuyInsurencePay:BuyInsurencePay,
        InsurenceLog:InsurenceLog,
        InsurenceHelthPolicyLog:InsurenceHelthPolicyLog,
        InsurenceLogNotCover:InsurenceLogNotCover,
        ProductOverView:ProductOverView,
        ProductOverViewHealthInsurance:ProductOverViewHealthInsurance,

   },
   {
     initialRouteName: 'HomeScreen',
   }
)

const LogInStack = createStackNavigator(
    {
      LogInScreen:LogInScreen,
      LoginScreenV2:LoginScreenV2,
      OtpScreen:OtpScreen,
      OTPScreen:OTPScreen,
      RegisterScreen:RegisterScreen,
   },
   {
     initialRouteName: 'LoginScreenV2',
   }
)

const BlogStack = createStackNavigator(
  {
    BlogScreen:{
        screen: BlogScreen,
        navigationOptions: {
            header: null,
        }
    },
 },
 {
   initialRouteName: 'BlogScreen',
 }
)

const navigateBar =  createBottomTabNavigator({
  Home:{
    screen:HomeStack,
    navigationOptions:{
      header:null
    }
  },
});

const navigate = createStackNavigator({
    Home:{
      screen:HomeStack,
      navigationOptions:{
        header:null
      }
    },
    LogScreen:{
          screen: LogInStack,
          navigationOptions: {
             header:null
          }
      } ,
 });

const drawerNavigator = createDrawerNavigator({
    navigate:{
      screen:navigate,
      navigationOptions:{
        drawerLabel:()=>null
      }
    },
    Home:{
        screen:HomeStack,
        navigationOptions: {
              drawerLabel: () => null

        }
    } ,

    Blog:{
        screen: HomeScreen,
        navigationOptions: {
            drawerLabel: () => null
       }
    },
  },
  {
    drawerBackgroundColor:'#fff',
    drawerPosition:'left',
    drawerType:'slide',
    hideStatusBar:false,
    contentComponent:props =><DrawerContent  {...props}  />,
    contentOptions: {
        activeTintColor: '#ee5034',
        inactiveTintColor: '#efa834',
        itemsContainerStyle: {
            marginVertical: 0,
            paddingVertical:0
        },
        iconContainerStyle: {
            opacity: 1
        }
    },
    initialRouteName:'navigate'
  }
);

export default createAppContainer(drawerNavigator);
