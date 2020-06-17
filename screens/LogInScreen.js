import React from 'react';
import {
  Image,Platform,
  ScrollView,
  StyleSheet, Alert, Linking,
  Text,ActivityIndicator,
  TouchableOpacity,
  View,ToastAndroid,
  Slider, PermissionsAndroid,
  Dimensions,ImageBackground,
  TextInput, FlatList, AsyncStorage,
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
class LogInScreen extends React.Component {

  static navigationOptions = {
    header:null,
  }


  constructor(props) {
    super(props);
    this.state = {
      loader:false,
      mobileNo:''
    }
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
          <View style={{height:Constants.statusBarHeight,backgroundColor:'#fff'}}></View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <View style={{marginHorizontal:20,alignSelf:'flex-start'}}>
                  <Text style={{fontSize:28,textAlign:'left',alignSelf:'flex-start',marginBottom:50}}>Welcome Back!</Text>
                  <Text style={{fontSize:22,textAlign:'left',alignSelf:'flex-start',marginBottom:50}}>Sign in</Text>
              </View>
              <TextInput style={{backgroundColor:'#ffffff',
                                borderRadius:7,
                                paddingHorizontal:20,
                                paddingVertical:10,
                                fontSize:16,
                                width:width*0.89,
                                borderBottomWidth:1,
                                borderColor:'#bdbdbd',marginBottom:40,
                                marginTop:0,backgroundColor:'#fff'}}
                           onChangeText={(mobileNo)=>this.setState({mobileNo})}
                           value={this.state.mobileNo}
                           keyboardType={'numeric'}>

              </TextInput>
              <FontAwesome
                    name={'mobile'}
                    size={30}
                    style={{alignSelf:'flex-start',position:'absolute',left:25,bottom:350}}/>
              <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('OTPScreen',{item:{mobileNo:this.state.mobileNo}})}
                    style={{borderWidth:0,borderRadius:20,backgroundColor:'#12318B',
                            marginBottom:width*0.1,shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                            shadowOffset:{height:2,width:0},elevation:5,}}>
                  
                    <Text style={{paddingVertical:10,paddingHorizontal:50,fontSize:18,color:'#fff'}}>Send OTP</Text>
              </TouchableOpacity>
          </View>
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
    return {}
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInScreen);
