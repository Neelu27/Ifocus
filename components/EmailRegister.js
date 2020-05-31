import React from 'react';
import {
  Image,Platform,
  ScrollView,StyleSheet,
  Text,TouchableOpacity,
  View,Slider,
  Dimensions,ImageBackground,
  TextInput,FlatList,AsyncStorage,
  Alert,Linking,PermissionsAndroid,
  ToastAndroid,ActivityIndicator
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import { FontAwesome } from '@expo/vector-icons';
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
class EmailRegister extends React.Component {

  static navigationOptions = {
    header:null,
  }

  constructor(props) {
    super(props);
    this.state = {
        email:'',
        password:'',
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <ImageBackground source={require('../assets/images/apploginbg.png')} style={{width: '100%', height: '100%'}}>
            <Toast style={{backgroundColor: 'grey'}} textStyle={{color: '#fff'}} ref="toast" position = 'top'/>
            <View style={{height:Constants.statusBarHeight}} />
            <View style={{flex:1,justifyContent:'center',borderWidth:0,}}>
                <View style={{justifyContent:'center',borderWidth:0,width:width*0.7,alignSelf:'center',marginBottom:150}}>
                    <View style={{borderWidth:0}}>
                        <Text style={{fontSize:16,paddingVertical:10}}>Enter Email Address</Text>
                        <TextInput
                            style={{fontSize:16,paddingVertical:10,borderColor:'#000',
                                    shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                    shadowOffset:{height:2,width:0},elevation:15,
                                    backgroundColor:'#fff',paddingHorizontal:10}}
                            value={this.state.email}
                            onChangeText={(email)=>{this.setState({email})}}>
                        </TextInput>
                    </View>
                    <View style={{borderWidth:0,marginTop:25,alignItems:'center'}}>
                      <TouchableOpacity style={{borderWidth:0,backgroundColor:'#dd245c'}}
                                        onPress={()=>{this.props.navigation.navigate('Otpemail')}}>
                          <Text style={{fontSize:18,paddingHorizontal:60,paddingVertical:10,color:'#fff'}}>Send OTP</Text>
                      </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
      </View>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(EmailRegister);
