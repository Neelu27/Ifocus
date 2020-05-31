import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Slider,Animated,Easing,
  Dimensions,ImageBackground,
  TextInput, FlatList, AsyncStorage, Alert, Linking, PermissionsAndroid, ToastAndroid,ActivityIndicator
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import { FontAwesome,MaterialIcons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import  Constants  from 'expo-constants';
import SmsListener from 'react-native-android-sms-listener'
import * as Expo from 'expo';
import * as Permissions from 'expo-permissions';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import settings from '../constants/Settings.js';
const { width } = Dimensions.get('window');
const height = width * 0.8
const SERVER_URL = settings.url
const themeColor = settings.themeColor
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import { LinearGradient } from 'expo-linear-gradient';
class firstScreen extends React.Component {

  static navigationOptions = {
    header:null,
  }


  constructor(props) {
    super(props);
    this.state = {
      needOTP: false,
      username: '',
      sessionid: '',
      name: '',
      token: '',
      loginname: '',
      password: '',
      serverCart: '',
      csrf: '',
      // store: this.props.store,
      // cartItems : this.props.cart,
      loader:false,
      mobileNo:'',

    }
    this.animatedValue = new Animated.Value(0)
  }
  handleAnimation = () => {
      console.log('hhhhhhhhhhh')
          Animated.timing(this.animatedValue, {
              toValue: 1,
              duration: 1000,
              // easing: Easing.ease
          }).start( ()=>{
    this.props.navigation.navigate('LogInScreen');Animated.timing(this.animatedValue,{
      toValue : 0,
      duration : 1000
    }).start()})
    console.log('fffffffffffffffffffffffffffffffffffffff')
      }

  render() {
    const { navigation } = this.props;
    // const color = this.props.store.themeColor

    if(this.state.loader){
      return(
        <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
          <ActivityIndicator size="large" color={'#7185cc'} />
        </View>
      )
    }else{
    return (

      <View style={{flex:1}}>
          {/* <View style={{height:Constants.statusBarHeight,backgroundColor:'#fff'}}></View> */}

          {/* <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> */}
            <TouchableOpacity onPress={()=>this.handleAnimation()}
              style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Animated.Image source={require('../assets/video/Startup.png')} style={{width:'101%',height:'100%',
            alignItems:'center',
            transform: [

                              {
                                  translateY: this.animatedValue.interpolate({
                                    inputRange: [0, 1],
                outputRange: [1, -700]
                                  })
                              }]}}>

          </Animated.Image>

  </TouchableOpacity>
          {/* </View> */}
      </View>
    );
  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',

  },
});

const mapStateToProps =(state) => {
    return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {



  };
}

export default connect(mapStateToProps, mapDispatchToProps)(firstScreen);
