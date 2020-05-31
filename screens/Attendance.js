import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Slider,
  Dimensions,ImageBackground,
  TextInput, FlatList, AsyncStorage, Alert, Linking, PermissionsAndroid, ToastAndroid,ActivityIndicator
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
class Attendance extends React.Component {

  static navigationOptions = {
    header:null,
  }


  constructor(props) {
    super(props);
    this.state = {
        email:'',
        password:'',
        text1:'',
        text2:'',
        text3:'',
        text4:'',
        username:'',
        screen:'',
        userPk:'',
        token:'',
        mobile:'',
        date:"24 april 2020",
    }
  }

  getOtp() {
    if(this.state.mobileNo == undefined){
      // this.refs.toast.show('Mobile no was incorrect ');
       ToastAndroid.show('Mobile no was incorrect ', ToastAndroid.SHORT);
    }
    // else if(this.state.checked == false){
    //   this.refs.toast.show('Agree the Terms And Condition ');
    //   ToastAndroid.show('Agree the Terms And Condition ', ToastAndroid.SHORT);
    // }
    else{
      var data = new FormData();
      data.append( "mobile", this.state.mobileNo );
      fetch( SERVER_URL + '/api/homepage/registration/', {
        method: 'POST',
        body: data
      })
      .then((response) =>{console.log(response.status)
        if(response.status == 200 || response.status==201 ){
          var d = response.json()
          // this.setState({ needOTP: true })
          return d
        }else{
          // this.refs.toast.show('Mobile No Already register with user ');
          ToastAndroid.show('Mobile No Already register with user ', ToastAndroid.SHORT);
        }
      })
      .then((responseJson) => {
         this.setState({ userPk: responseJson.pk,token:responseJson.token,mobile:responseJson.mobile,username:this.state.mobileNo });
         AsyncStorage.setItem("userpk", responseJson.pk + '')
         this.props.navigation.navigate('OtpScreen',{
           username:this.state.mobileNo,
           screen:'',
           userPk:responseJson.pk,
           token:responseJson.token,
           mobile:responseJson.mobile,
         });
       })
      .catch((error) => {
        return

      });
    }
  }



  render() {
    return (

      <View style={{flex:1}}>
        {/* <ImageBackground source={require('../assets/images/apploginbg.png')} style={{width: '100%', height: '100%'}}> */}
            <Toast style={{backgroundColor: 'grey'}} textStyle={{color: '#fff'}} ref="toast" position = 'top'/>
            <View style={{height:Constants.statusBarHeight,backgroundColor:'#103368'}} />
            <View  style={{justifyContent:'center',backgroundColor:'#fff',borderWidth:0,
              height:55,width:width}}>
                <ImageBackground source={require('../assets/video/back1.png')} style={{width:'101%',height:'100%',alignItems:'center'}}>
                  <Text style={{fontSize:20,color:'#fff',alignItems:'center',paddingTop:10,paddingBottom:6}}>Attendance</Text>
              </ImageBackground>
            </View>
            <View style={{flex:1,justifyContent:'center',borderWidth:0,}}>
              <View style={{height:width*0.9,width:width*0.8,alignSelf:'center',marginTop:100}}>
                <Image source={require('../assets/video/attend.png')} style={{width:'100%',height:'100%'}}/>
              </View>
                <View style={{justifyContent:'center',borderWidth:0,width:width*0.7,alignSelf:'center',marginBottom:120}}>
                    {/* <View style={{borderWidth:0,alignItems:'center'}}>
                        <Text style={{fontSize:18,paddingVertical:20}}>Enter OTP</Text>
                    </View>
                    <View style={{borderWidth:0,alignItems:'center',marginVertical:10}}>
                        <Text style={{fontSize:16,paddingVertical:2}}>One Time Password has been sent to</Text>
                        <Text style={{fontSize:16,paddingVertical:2}}>your mobile number +916369724601</Text>
                    </View> */}

                    <View style={{borderWidth:0,width:width*0.6,alignSelf:'center',flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
                        {/* <TextInput style={{borderWidth:0,height:40,
                                      width:40,borderRadius:0,
                                      backgroundColor:'#fff',
                                      shadowColor:"#fefefe",shadowOpacity:0.2,
                                      shadowRadius:15,
                                      shadowOffset:{height:2,width:0},
                                      elevation:5,}}
                                      onChangeText={(text1)=>this.setState({text1})}
                                      value={this.state.text1}/>
                        <TextInput style={{borderWidth:0,height:40,
                                      width:40,borderRadius:0,
                                      backgroundColor:'#fff',
                                      shadowColor:"#fefefe",shadowOpacity:0.2,
                                      shadowRadius:15,
                                      shadowOffset:{height:2,width:0},
                                      elevation:5,}}
                                      onChangeText={(text2)=>this.setState({text2})}
                                      value={this.state.text2}/>
                        <TextInput style={{borderWidth:0,height:40,width:40,
                                      borderRadius:0,backgroundColor:'#fff',
                                      shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                      shadowOffset:{height:2,width:0},elevation:5,}}
                                      onChangeText={(text3)=>this.setState({text3})}
                                      value={this.state.text3}/>
                        <TextInput style={{borderWidth:0,height:40,width:40,
                                      borderRadius:0,backgroundColor:'#fff',
                                      shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                      shadowOffset:{height:2,width:0},elevation:5,}}
                                      onChangeText={(text4)=>this.setState({text4})}
                                      value={this.state.text4}/> */}

                    </View>
                    <View style={{borderWidth:0,marginTop:0,alignItems:'center'}}>
                        <Text>MARK MY ATTENDANCE</Text>
                        <Text style={{fontSize:14,paddingVertical:10}}>{this.state.date}</Text>
                          <Text style={{fontSize:14,paddingVertical:10}}>Thursday</Text>
                    </View>

                    <View style={{borderWidth:0,marginTop:10,alignItems:'space-between',flexDirection:'row',alignSelf:'center'}}>
                      <TouchableOpacity style={{marginRight:20,borderWidth:0,backgroundColor:'#12318B',borderRadius:35,shadowColor:"#fefefe",shadowOpacity:0.2,
                      shadowRadius:15,
                      shadowOffset:{height:2,width:0},
                      elevation:5,}}
                                        onPress={()=>{this.props.navigation.navigate('HomeScreen')}}>
                          {/* <MaterialIcons name={'arrow-forward'} size={22}color={'#fff'}style={{paddingHorizontal:22,paddingVertical:20}}/> */}
                          <Text style={{fontSize:22,paddingHorizontal:25,paddingVertical:5,color:'#fff'}}>yes</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{marginLeft:20,borderWidth:0,backgroundColor:'#12318B',borderRadius:35,shadowColor:"#fefefe",shadowOpacity:0.2,
                      shadowRadius:15,
                      shadowOffset:{height:2,width:0},
                      elevation:5,}}
                                        onPress={()=>{this.props.navigation.navigate('AttendanceNo')}}>
                          {/* <MaterialIcons name={'arrow-forward'} size={22}color={'#fff'}style={{paddingHorizontal:22,paddingVertical:20}}/> */}
                          <Text style={{fontSize:22,paddingHorizontal:25,paddingVertical:5,color:'#fff'}}>no</Text>
                      </TouchableOpacity>
                    </View>

                </View>

            </View>

        {/* </ImageBackground> */}



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

export default connect(mapStateToProps, mapDispatchToProps)(Attendance);
