import React from 'react';
import { Platform ,Image,View,TouchableOpacity} from 'react-native';
import { FontAwesome ,Ionicons,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons} from '@expo/vector-icons';

import { createAppContainer,createSwitchNavigator,withNavigation} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../screens/HomeScreen';
import LogInScreen from '../screens/LogInScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OTPScreen from '../screens/OTPScreen';

import DescoverScreen from '../screens/DescoverScreen';
import Order from '../screens/Order';
import VideoScreen from '../screens/VideoScreen';
import AudioScreen from '../screens/AudioScreen';
import BookScreen from '../screens/BookScreen';
import CalenderScreen from '../screens/CalenderScreen';
import BookDescreption from '../screens/BookDescreption';
import AudioPlayScreen from '../screens/AudioPlayScreen';
import Audiogroup from '../screens/Audiogroup';
import VideoScreen1 from '../screens/VideoScreen1';
import BookReading from '../screens/BookReading';
import firstScreen from '../screens/firstScreen';
import Attendance from '../screens/Attendance';
import AttendanceNo from '../screens/AttendanceNo';
import ContinueSafa from '../screens/ContinueSafa';
import SchemsScreen from '../screens/SchemsScreen';
import RetailersScreen from '../screens/RetailersScreen';
import Feedback from '../screens/Feedback';
import ModifyScreen from '../screens/ModifyScreen';
import CameraScreens from '../screens/CameraScreens';
import OrderScreen from '../screens/OrderScreen';
import Notification from '../screens/Notification';
import Training from '../screens/Training';
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
import InsurencehelthPolicy from '../screens/InsurencehelthPolicy';
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
import RestourentDetails from '../components/RestourentDetails';
import DrawerContent from '../components/DrawerContent';
import TabBarIcon from '../components/TabBarIcon';
import IconWithBadge from '../components/IconWithBadge';
import EmailRegister from '../components/EmailRegister';
import MobileRegistretion from '../components/MobileRegistretion';
import BlogScreen from '../components/BlogScreen';
import ShareScreen from '../components/ShareScreen';
import ContactScreen from '../components/ContactScreen';
import HelpScreen from '../components/HelpScreen';
import SettingsScreen from '../components/SettingsScreen';
import ContactMenu from '../components/ContactMenu';
import AddFoodScreen from '../components/AddFoodScreen';
import MyCartScreen from '../components/MyCartScreen';
import OrderedScreen from '../components/OrderedScreen';
import PaidScreen from '../components/PaidScreen';
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

      RestourentDetails:RestourentDetails,
      DescoverScreen:DescoverScreen,
      Order:Order,
      ContactMenu:ContactMenu,
      AddFoodScreen:AddFoodScreen,
      MyCartScreen:MyCartScreen,
      OrderedScreen:OrderedScreen,
      PaidScreen:PaidScreen,
      Timeline:Timeline,
      VideoScreen1:VideoScreen1,
      Notification:Notification,
      Training:Training,
      SearchScreen:SearchScreen,
      TabBar:TabBar,
      SellerOrderCompo:SellerOrderCompo,
      SellerOrderAnnounce:SellerOrderAnnounce,
      HealthProduct:HealthProduct,
      HealthPolicy:HealthPolicy,
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
      // QrCodeCamera:QrCodeCamera,
   },
   {
     initialRouteName: 'HomeScreen',
   }
)
HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarStyle:{
        borderWidth:0,
        borderColor:'#000',
        shadowOffset: { height: 0, width: 0 },
        shadowColor: '#585A5B',
        alignItems:'center',
        shadowOpacity: 0,
        elevation: 0 },
    tabBarVisible:true,
    tabBarOptions: {
        activeTintColor: "#fff",
        inactiveTintColor: '#000',
        activeBackgroundColor: '#585A5B',
        inactiveBackgroundColor: '#585A5B',
        borderTopWidth:0,
        borderTopColor: "#585A5B",
        labelStyle:{fontSize:18,textAlign:'center',alignSelf:'center'},
        style:{borderWidth:0,paddingVertical:6,borderColor:'#585A5B',
                shadowOffset: { height: 0, width: 0 },
                shadowColor: '#585A5B',backgroundColor:'#585A5B',
                shadowOpacity: 0,
                alignItems:'center',
                elevation: 0},
        tabStyle:{borderWidth:0,paddingVertical:6,borderColor:'#585A5B',
                  shadowOffset: { height: 0, width: 0 },
                  shadowColor: '#585A5B',backgroundColor:'#585A5B',
                  alignItems:'center',
                  shadowOpacity: 0,
                  elevation: 0}
    },
    headerStyle:{borderWidth:0,shadowOffset: { height: 0, width: 0 },
    shadowColor: '#585A5B',
    shadowOpacity: 0,
    elevation: 0},
    // tabBarIcon: ({ focused, tintColor }) => (
    //   focused ?<FontAwesome name={'play-circle-o'}
    //                         size={20}
    //                         color={tintColor}
    //                       />:<FontAwesome
    //                         name={'play-circle-o'}
    //                         size={20}
    //                         color={tintColor}/>

  // ),
};

const VideoStack = createStackNavigator(
    {
      VideoScreen:{
          screen: VideoScreen,
          navigationOptions: {}
      },
   },
   {
     initialRouteName: 'VideoScreen',
   }
)
VideoStack.navigationOptions = {
    tabBarLabel: 'Videos',
    tabBarStyle:{
        borderWidth:0,
        borderColor:'#000',
        shadowOffset: { height: 0, width: 0 },
        shadowColor: '#585A5B',
        alignItems:'center',
        shadowOpacity: 0,
        elevation: 0 },
    tabBarVisible:true,
    tabBarOptions: {
        activeTintColor: "#fff",
        inactiveTintColor: '#000',
        activeBackgroundColor: '#585A5B',
        inactiveBackgroundColor: '#585A5B',
        borderTopWidth:0,
        borderTopColor: "#585A5B",
        labelStyle:{fontSize:18,textAlign:'center',alignSelf:'center'},
        style:{borderWidth:0,paddingVertical:6,borderColor:'#585A5B',
                shadowOffset: { height: 0, width: 0 },
                shadowColor: '#585A5B',backgroundColor:'#585A5B',
                shadowOpacity: 0,
                alignItems:'center',
                elevation: 0},
        tabStyle:{borderWidth:0,paddingVertical:6,borderColor:'#585A5B',
                  shadowOffset: { height: 0, width: 0 },
                  shadowColor: '#585A5B',backgroundColor:'#585A5B',
                  shadowOpacity: 0,
                  elevation: 0}
    },
    headerStyle:{borderWidth:0,shadowOffset: { height: 0, width: 0 },
    shadowColor: '#585A5B',
    alignItems:'center',
    shadowOpacity: 0,
    elevation: 0},
    // tabBarIcon: ({ focused, tintColor }) => (
    //   focused ?<FontAwesome name={'book'}
    //                         size={25}
    //                         color={tintColor}
    //                       />:<FontAwesome
    //                         name={'book'}
    //                         size={25}
    //                         color={tintColor}/>
      // <Image
      //             source={require('../AllImage/Icons-POI/transaction.png')}
      //             style={{width:30,height:30,tintColor:tintColor,marginVertical:10}}
      //         />:<Image
      //               source={require('../AllImage/Icons-POI/transaction.png')}
      //               style={{width:25,height:25,tintColor:tintColor,marginVertical:10}}
      //             />
  // ),
};

const AudiosStack = createStackNavigator(
    {
      AudioScreen:{
          screen: AudioScreen,

          navigationOptions:(navigation)=> {}
      },
      Audiogroup:Audiogroup,
      OrderScreen:OrderScreen,



      },


   {
     initialRouteName: 'AudioScreen',
   },

)
AudiosStack.navigationOptions =  {

    tabBarLabel: 'My Visit',
    tabBarVisible:(AudiosStack.routeName === "AudioPlayScreen"? false:true
        ),
    tabBarStyle:{
        borderWidth:0,
        borderColor:'#000',
        shadowOffset: { height: 0, width: 0 },
        shadowColor: '#585A5B',
        alignItems:'center',
        shadowOpacity: 0,
        elevation: 0 },
    tabBarOptions: {
        activeTintColor: "#fff",
        inactiveTintColor: '#000',
        activeBackgroundColor: '#585A5B',
        inactiveBackgroundColor: '#585A5B',
        borderTopWidth:0,
        borderTopColor: "#585A5B",
        labelStyle:{fontSize:18,textAlign:'center',alignSelf:'center'},
        style:{borderWidth:0,paddingVertical:6,borderColor:'#585A5B',
                shadowOffset: { height: 0, width: 0 },
                shadowColor: '#585A5B',backgroundColor:'#585A5B',
                alignItems:'center',
                shadowOpacity: 0,
                elevation: 0},
        tabStyle:{borderWidth:0,paddingVertical:6,borderColor:'#585A5B',
                shadowOffset: { height: 0, width: 0 },
                shadowColor: '#585A5B',backgroundColor:'#585A5B',
                alignItems:'center',
                shadowOpacity: 0,
                elevation: 0}
    },
    headerStyle:{borderWidth:0,shadowOffset: { height: 0, width: 0 },
    shadowColor: '#585A5B',
    shadowOpacity: 0,
    elevation: 0},
    // tabBarIcon: ({ focused, tintColor }) => (
    //   focused ?<FontAwesome name={'music'}
    //                         size={20}
    //                         color={tintColor}
    //                       />:<FontAwesome
    //                         name={'music'}
    //                         size={20}
    //                         color={tintColor}/>
      // <Image
      //             source={require('../AllImage/Icons-POI/tool.png')}
      //             style={{width:30,height:30,tintColor:tintColor,marginVertical:10}}
      //         />:<Image
      //               source={require('../AllImage/Icons-POI/tool.png')}
      //               style={{width:27,height:27,tintColor:tintColor,marginVertical:10}}
      //             />
  // ),


};

const BooksStack = createStackNavigator(
    {
    BookScreen:{
          screen: BookScreen,
          navigationOptions: {}
      },
      BookDescreption:BookDescreption,
      BookReading:BookReading
   },
   {
     initialRouteName: 'BookScreen',
   }
)
BooksStack.navigationOptions = {
    tabBarLabel: 'Report',
    tabBarVisible:true,
    tabBarStyle:{
        borderWidth:0,
        borderColor:'#000',
        shadowOffset: { height: 0, width: 0 },
        shadowColor: '#585A5B',
        alignItems:'center',
        shadowOpacity: 0,
        elevation: 0 },
    tabBarOptions: {
        activeTintColor: "#fff",
        inactiveTintColor: '#000',
        activeBackgroundColor: '#585A5B',
        inactiveBackgroundColor: '#585A5B',
        borderTopWidth:0,
        borderTopColor: "#585A5B",
        labelStyle:{fontSize:18,textAlign:'center',alignSelf:'center'},
        style:{borderWidth:0,paddingVertical:6,borderColor:'#585A5B',
              shadowOffset: { height: 0, width: 0 },
              shadowColor: '#585A5B',backgroundColor:'#585A5B',
              alignItems:'center',
              shadowOpacity: 0,
              elevation: 0},
        tabStyle:{borderWidth:0,paddingVertical:6,borderColor:'#585A5B',
                shadowOffset: { height: 0, width: 0 },
                shadowColor: '#585A5B',backgroundColor:'#585A5B',
                alignItems:'center',
                shadowOpacity: 0,
                elevation: 0}
      },
    headerStyle:{borderWidth:0,shadowOffset: { height: 0, width: 0 },
    shadowColor: '#585A5B',
    shadowOpacity: 0,
    elevation: 0},
    // tabBarIcon: ({ focused, tintColor }) => (
    // focused ?<FontAwesome name={'book'}
    //                       size={20}
    //                       color={tintColor}
    //                     />:<FontAwesome
    //                       name={'book'}
    //                       size={20}
    //                       color={tintColor}/>
    // <Image
    //             source={require('../AllImage/Icons-POI/settings.png')}
    //             style={{width:30,height:30,tintColor:tintColor,marginVertical:10}}
    //         />:<Image
    //               source={require('../AllImage/Icons-POI/settings.png')}
    //               style={{width:27,height:27,tintColor:tintColor,marginVertical:10}}
    //             />
  // ),
};
const CalenderStack = createStackNavigator(
    {
      CalenderScreen:{
          screen: CalenderScreen,

          navigationOptions: {}
      },
   },
   {
     initialRouteName: 'CalenderScreen',
   }
)
CalenderStack.navigationOptions = {
    tabBarLabel: 'Calender',
    tabBarVisible:true,
    tabBarStyle:{
       borderWidth:0,
       borderColor:'#000',
       shadowOffset: { height: 0, width: 0 },
       shadowColor: '#585A5B',
       alignItems:'center',
       shadowOpacity: 0,
       elevation: 0 },
    tabBarOptions: {
        activeTintColor: "#fff",
        inactiveTintColor: '#000',
        activeBackgroundColor: '#585A5B',
        inactiveBackgroundColor: '#585A5B',
        borderTopWidth:0,
        borderTopColor: "#585A5B",
        labelStyle:{fontSize:18,textAlign:'center',alignSelf:'center'},
        style:{borderWidth:0,paddingVertical:6,borderColor:'#585A5B',
              shadowOffset: { height: 0, width: 0 },
              shadowColor: 'transparent',backgroundColor:'#585A5B',
              alignItems:'center',
              shadowOpacity: 0,
              elevation: 0},
        tabStyle:{borderWidth:0,paddingVertical:6,borderColor:'#585A5B',
                  shadowOffset: { height: 0, width: 0 },
                  shadowColor: '#585A5B',
                  alignItems:'center',
                  shadowOpacity: 0,
                  backgroundColor:'#585A5B',
                  elevation: 0}
    },
    headerStyle:{borderWidth:0,shadowOffset: { height: 0, width: 0 },
    shadowColor: '#585A5B',
    shadowOpacity: 0,
    elevation: 0},
    // tabBarIcon: ({ focused, tintColor }) => (
    //   focused ?<FontAwesome name={'calendar'}
    //                         size={20}
    //                         color={tintColor}
    //                       />:<FontAwesome
    //                         name={'calendar'}
    //                         size={20}
    //                         color={tintColor}/>
      // <Image
      //           source={require('../AllImage/Icons-POI/home1.png')}
      //           style={{width:30,height:30,tintColor:tintColor,marginVertical:10}}
      //       />:<Image
      //             source={require('../AllImage/Icons-POI/home1.png')}
      //             style={{width:27,height:27,tintColor:tintColor,marginVertical:10}}
      //           />
  // ),
};






const LogInStack = createStackNavigator(
    {
      firstScreen:firstScreen,
      LogInScreen:LogInScreen,
      OTPScreen:OTPScreen,
      Attendance:Attendance,
      AttendanceNo:AttendanceNo,
      RegisterScreen:RegisterScreen,

   },
   {
     initialRouteName: 'firstScreen',
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

const ShareStack = createStackNavigator(
  {
    ShareScreen:{
        screen: ShareScreen,
        navigationOptions: {
            header: null,
        }
    },
 },
 {
   initialRouteName: 'ShareScreen',
 }
)

const ContactStack = createStackNavigator(
  {
    ContactScreen:{
        screen: ContactScreen,
        navigationOptions: {
            header: null,
        }
    },
 },
 {
   initialRouteName: 'ContactScreen',
 }
)

const HelpStack = createStackNavigator(
  {
    HelpScreen:{
        screen: HelpScreen,
        navigationOptions: {
            header: null,
        }
    },
   },
   {
     initialRouteName: 'HelpScreen',
   }
)

const SettingsStack = createStackNavigator(
    {
      SettingsScreen:{
          screen: SettingsScreen,
          navigationOptions: {
              header: null,
          }
      },
   },
   {
     initialRouteName: 'SettingsScreen',
   }
)
const navigateBar =  createBottomTabNavigator({
  Home:{
    screen:HomeStack,
    navigationOptions:{
      header:null
    }
  },
    // Videos:{
    //   screen:VideoStack,
    //   navigationOptions:{
    //     header:null
    //   }
    // },
    Audios:{
      screen:AudiosStack,

      navigationOptions: ({navigation}) => ({
        title: 'Audios',
        tabBarVisible: isTabsHidden(navigation),

      }),


    },
    Books:{
      screen:BooksStack,
      navigationOptions:{
        header:null
      }
    },
    // Calender:{
    //   screen:CalenderStack,
    //   navigationOptions:{
    //     header:null
    //   }
    // }
});




const navigate = createStackNavigator({
  // LogScreen:{
  //       screen: LogInStack,
  //       navigationOptions: {
  //          header:null
  //       }
  //   } ,
    // navigateBar:{
    //   screen:navigateBar,
    //
    //   navigationOptions:{
    //      header:null
    //   }
    // },
    //   AudioPlayScreen: AudioPlayScreen,
    //   ContinueSafa:ContinueSafa,
    //   SchemsScreen:SchemsScreen,
    //   RetailersScreen:RetailersScreen,
    //   Feedback:Feedback,
    //   ModifyScreen:ModifyScreen,
    //   CameraScreens:CameraScreens,
    Home:{
      screen:HomeStack,
      navigationOptions:{
        header:null
      }
    },
      // Videos:{
      //   screen:VideoStack,
      //   navigationOptions:{
      //     header:null
      //   }
      // },
      Audios:{
        screen:AudiosStack,

        navigationOptions: ({navigation}) => ({
          title: 'Audios',
          tabBarVisible: isTabsHidden(navigation),

        }),


      },
      Books:{
        screen:BooksStack,
        navigationOptions:{
          header:null
        }
      },

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

    Share:{
        screen: ShareStack,
        navigationOptions: {
            drawerLabel: () => null
       }
    },

    Contact:{
        screen: ContactStack,
        navigationOptions: {
            drawerLabel: () => null
       }
    },

    Help:{
        screen: HelpStack,
        navigationOptions: {
            drawerLabel: () => null
       }
    },

    Settings:{
        screen: SettingsStack,
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
