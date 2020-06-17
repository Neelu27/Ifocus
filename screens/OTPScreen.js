import React from 'react';
import {
  Image,Platform,
  ScrollView,
  StyleSheet,ActivityIndicator,
  Text,Alert,Linking,
  TouchableOpacity,
  View,ToastAndroid,
  Slider,PermissionsAndroid,
  Dimensions,ImageBackground,
  TextInput,FlatList,AsyncStorage,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import { FontAwesome ,MaterialIcons} from '@expo/vector-icons';
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
class OTPScreen extends React.Component {

  static navigationOptions = {
    header:null,
  }

  constructor(props) {
    super(props);
    this.state = {
        text1:'',
        text2:'',
        text3:'',
        text4:'',
    }
  }
  verify=()=>{
    AsyncStorage.setItem("login", JSON.stringify(true))
    this.props.navigation.navigate('HomeScreen')
  }

  render() {
    const ItmMobile=this.props.navigation.getParam('item',null);
    console.log('ItmMobile',ItmMobile);
    return (
      <View style={{flex:1}}>
            <Toast style={{backgroundColor: 'grey'}} textStyle={{color: '#fff'}} ref="toast" position = 'top'/>
            <View style={{height:Constants.statusBarHeight,backgroundColor:'#12318B'}} />
            <View style={{flex:1,justifyContent:'center',borderWidth:0,}}>
                <View style={{justifyContent:'center',borderWidth:0,width:width*0.7,alignSelf:'center',marginBottom:100}}>
                    <View style={{marginHorizontal:0,alignSelf:'flex-start'}}>
                        <Text style={{fontSize:28,textAlign:'left',alignSelf:'flex-start',marginBottom:10}}>Hi!</Text>
                        <Text style={{fontSize:20,textAlign:'left',alignSelf:'flex-start',marginBottom:40}}>{ItmMobile.mobileNo}</Text>
                        <Text style={{fontSize:22,textAlign:'left',alignSelf:'flex-start',marginBottom:0}}>Enter OTP</Text>
                    </View>
                    <View style={{borderWidth:0,width:width*0.6,alignSelf:'center',flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
                        <TextInput style={{borderBottomWidth:1,height:40,
                                      width:40,borderRadius:0,
                                      backgroundColor:'#fff',
                                      }}
                                      onChangeText={(text1)=>this.setState({text1})}
                                      keyboardType={'numeric'}
                                      maxLength={1}
                                      textAlign={'center'}
                                      value={this.state.text1}/>
                        <TextInput style={{borderBottomWidth:1,height:40,
                                      width:40,borderRadius:0,
                                      backgroundColor:'#fff',
                                      }}
                                      onChangeText={(text2)=>this.setState({text2})}
                                      keyboardType={'numeric'}
                                      maxLength={1}
                                      textAlign={'center'}
                                      value={this.state.text2}/>
                        <TextInput style={{borderBottomWidth:1,height:40,width:40,
                                      borderRadius:0,backgroundColor:'#fff',
                                      }}
                                      onChangeText={(text3)=>this.setState({text3})}
                                      keyboardType={'numeric'}
                                      maxLength={1}
                                      textAlign={'center'}
                                      value={this.state.text3}/>
                        <TextInput style={{borderBottomWidth:1,height:40,width:40,
                                      borderRadius:0,backgroundColor:'#fff',
                                      }}
                                      onChangeText={(text4)=>this.setState({text4})}
                                      keyboardType={'numeric'}
                                      maxLength={1}
                                      textAlign={'center'}
                                      value={this.state.text4}/>
                    </View>
                    <View style={{borderWidth:0,marginTop:0,alignItems:'center'}}>
                        <Text style={{fontSize:16,paddingVertical:10}}>If you didn't recieve the code? Resend </Text>
                    </View>
                    <View style={{borderWidth:0,marginTop:10,alignItems:'center'}}>
                        <TouchableOpacity
                            style={{borderWidth:0,backgroundColor:'#12318B',
                                    borderRadius:20,shadowColor:"#fefefe",shadowOpacity:0.2,
                                    shadowRadius:15,
                                    shadowOffset:{height:2,width:0},
                                    elevation:5,}}
                            onPress={()=>{this.verify()}}>
                            {/* <MaterialIcons name={'arrow-forward'} size={22}color={'#fff'}style={{paddingHorizontal:22,paddingVertical:20}}/> */}
                            <Text style={{fontSize:18,paddingHorizontal:30,paddingVertical:10,color:'#fff'}}>Verify Code</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(OTPScreen);
