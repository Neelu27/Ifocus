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
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';

class RegisterScreen extends React.Component {

  static navigationOptions = {
    header:null,
  }


  constructor(props) {
    super(props);
    this.state = {
        email:'',
        password:'',
        date: new Date(),
        address:'',
        DOB:'',
        landmark:'',
        mobile:'',
        name:'',
        phone:'',
        pincode:'',
        Gender:'',
    }
  }

  getOtp=async()=> {
      // var data = new FormData();
      // data.append( "mobile", this.state.mobile );
      var data={
        address	:this.state.address,
        DOB	:"1990-06-15",
        email	:this.state.email,
        landmark:	this.state.landmark,
        mobile:	this.state.mobile,
        name:	this.state.name,
        phone:	this.state.phone,
        pincode	:this.state.pincode,
        Gender:'Female',
      }
      var csrf = await AsyncStorage.getItem('csrf');
      const sessionid = await AsyncStorage.getItem('sessionid');
      console.log(sessionid,data,'data',csrf,)
      // fetch( 'https://218e5969.ngrok.io/api/homepage/registration/', {
      //   method: 'POST',
      //   body: JSON.stringify(data),
      //         // headers: {
      //         // }
      //   headers: {
      //        "Cookie" :'csrf=ak47NEsmCfpLiw2rVhThboF14P3E6ImjLHVBg4hkPwpUrm8pahngKjLCka06GbEE',
      //        'Accept': 'application/json, text/plain, */*',
      //        'Content-Type':'application/json;charset=utf-8',
      //        'X-CSRFToken':'ak47NEsmCfpLiw2rVhThboF14P3E6ImjLHVBg4hkPwpUrm8pahngKjLCka06GbEE',
      //        'Referer': 'https://218e5969.ngrok.io/register',
      //            },
      // })
      // .then((response) =>{console.log(response.status)
      //   console.log(response)
      //   if(response.status == 200 || response.status==201 ){
      //     var d = response.json()
      //     // this.setState({ needOTP: true })
      //     return response.json()
      //   }else{
      //     // this.refs.toast.show('Mobile No Already register with user ');
      //     Alert.alert('server error found....');
      //     this.setState({address:'',date:'',email:'',landmark:'',mobile:'',name:'',phone:'',Gender:'',pincode:''})
      //     ToastAndroid.show('Mobile No Already register with user ', ToastAndroid.SHORT);
      //   }
      // })
      // .then((responseJson) => {
      //   console.log(responseJson,'responce')
      //    this.setState({ userPk: responseJson.pk,token:responseJson.token,mobile:responseJson.mobile,username:this.state.mobileNo });
      //    AsyncStorage.setItem("userpk", responseJson.pk + '')
      //    this.props.navigation.navigate('HomeScreen')
      //    // this.props.navigation.navigate('OtpScreen',{
      //    //   username:this.state.mobileNo,
      //    //   screen:'',
      //    //   userPk:responseJson.pk,
      //    //   token:responseJson.token,
      //    //   mobile:responseJson.mobile,
      //    // });
      //  })
      // .catch((error) => {
      //   return
      // });
      fetch('https://vyasa.cioc.in/api/homepage/registration/',{
            method:"POST",
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
          })
        .then((response)=>{
          console.log(response.status,'responce')
          if(response.status == 201){
            console.log(response,'xxxxxxxxx');
            this.setState({showProcess:false,otp:true,});
            this.setState({address:'',date:'',email:'',landmark:'',mobile:'',name:'',phone:'',Gender:'',pincode:''})
            this.props.navigation.navigate('HomeScreen')
          }
          this.setState({disableSignUp:false});
          console.log(response,'yyyyyyyyyyy');
          return response.json()
        }).then((json)=>{
          console.log(json,'json')
          AsyncStorage.setItem("csrf", json.csrf)
          this.setState({token:json.token,csrf:json.csrf,reg:json.pk})
          return
        }).then((err)=>{
          this.setState({disableSignUp:false,showProcess:false})
        })
  }



  render() {
    const Gender=[{value: 'male',}, {value: 'female',}]
    const Mode=[{value:'Dine in'},{value:'Tack away'},{value:'Both'}]
    return (

      <View style={{flex:1}}>

            <Toast style={{backgroundColor: 'grey'}} textStyle={{color: '#fff'}} ref="toast" position = 'top'/>
            <View style={{height:Constants.statusBarHeight,backgroundColor:'#CF4F07'}} />
            <View style={{  flexDirection: 'row',backgroundColor:'#CF4F07',borderWidth:0, height:50,alignItems:'flex-start',fontSize:20,paddingLeft:4,paddingTop:10,paddingBottom:6}}>
                 <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                   <MaterialIcons name={'arrow-back'} size={30} color={'#fff'} />
               </TouchableOpacity>
                  <Text style={{fontSize:20,marginLeft:width*0.3,color:'#fff'}}>REGISTER</Text>
            </View>
            <View style={{flex:1,justifyContent:'center',borderWidth:0,backgroundColor:'#f3f3f3'}}>
                {/* <View style={{borderWidth:0,position:'absolute',top:width*0.06,alignSelf:'center',left:width*0.4}}>
                    <Text style={{fontSize:22,textAlign:'center',color:'#fff'}}>REGISTER</Text>
                </View> */}
                <ScrollView>
                <View style={{justifyContent:'center',borderWidth:0,marginHorizontal:10,alignSelf:'center',}}>
                    <View style={{borderWidth:0}}>
                        <Text style={{fontSize:16,paddingVertical:10}}>Name</Text>
                        <TextInput
                            style={{fontSize:16,paddingVertical:10,borderColor:'#000',
                                    shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                    shadowOffset:{height:2,width:0},elevation:5,
                                    backgroundColor:'#fff',paddingHorizontal:10,borderRadius:7}}
                            value={this.state.name	}
                            onChangeText={(name)=>{this.setState({name})}}>
                        </TextInput>
                    </View>
                    <View style={{borderWidth:0}}>
                        <Text style={{fontSize:16,paddingVertical:10}}>DOB</Text>
                        {/* <TextInput
                            style={{fontSize:16,paddingVertical:10,borderColor:'#000',borderRadius:7,
                                    shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                    shadowOffset:{height:2,width:0},elevation:5,backgroundColor:'#fff',
                                    paddingHorizontal:10}}
                            value={this.state.email}
                            onChangeText={(email)=>{this.setState({email})}}>
                        </TextInput> */}
                        <DatePicker
                               style={{width:width*0.91,fontSize:28,marginHorizontal:5,marginTop:6,borderWidth:0,borderRadius:7,shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                               shadowOffset:{height:2,width:0},elevation:5,}}
                               date={this.state.date}
                               mode="datetime"

                               minDate="2016-01-01 "
                               maxDate="2050-01-01"
                               confirmBtnText="Confirm"
                               cancelBtnText="Cancel"
                               showIcon={true}
                               customStyles={{
                                 dateIcon: {
                                   position: 'absolute',
                                   right: 0,
                                   top: 4,
                                   marginLeft: 0,
                                   },
                                 dateInput: {
                                   marginRight: 0,
                                   backgroundColor: '#fff',
                                   fontSize:28,
                                   paddingLeft:20,
                                   alignItems:'flex-start',
                                   paddingHorizontal:10,
                                   color:'black',
                                   marginRight:4,
                                   borderWidth:0,borderRadius:7,
                                 }
                               }}
                               onDateChange={(date) => {this.setState({date})}}/>
                    </View>
                    <View style={{borderWidth:0}}>
                        <Text style={{fontSize:16,paddingTop:10}}>Gender</Text>
                        <Dropdown
                              value={this.state.Gender}
                              data={Gender}
                              disabled={false}
                              dropdownOffset={{top:8}}
                              containerStyle={{borderWidth:0,borderRadius:7,paddingLeft:0,paddingVertical:10,
                                               fontSize:16,borderRadius:7,placeholder:'unitType',placeholderTextColor:'#737272',
                                               borderColor:'#f2f2f2',width:width*0.92}}
                              rippleCentered={true}
                              onChangeText={(Gender)=>this.setState({Gender:'',valutext:''})}
                              inputContainerStyle={{shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,borderRadius:7,
                              shadowOffset:{height:2,width:0},elevation:5,paddingVertical:10,placeholder:'unitType',placeholderTextColor:'#737272',
                                                    fontSize:16,paddingLeft:6,padding:4,paddingTop:-10,borderWidth: 0.2,
                                                    backgroundColor:'#fff',borderColor:'#f2f2f2',width:width*0.92}}
                              pickerStyle={{shadowColor:"#fefefe",borderWidth:0,borderRadius:10,
                                            rippleColor:'#fff', paddingLeft:10,width:width*0.35 ,
                                            marginLeft:width*0.5,marginTop:width*0.18,color:'#000'}}
                              itemColor={'#000'}
                              itemTextStyle={{color:'#000'}}
                              selectedItemColor={'#000'}

                        />
                        {/* <TextInput
                            style={{fontSize:16,paddingVertical:10,borderColor:'#000',
                                    shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                    shadowOffset:{height:2,width:0},elevation:5,
                                    backgroundColor:'#fff',paddingHorizontal:10}}
                            value={this.state.email}
                            onChangeText={(email)=>{this.setState({email})}}>
                        </TextInput> */}
                    </View>
                    <View style={{borderWidth:0}}>
                        <Text style={{fontSize:16,paddingVertical:10}}>Email</Text>
                        <TextInput
                            style={{fontSize:16,paddingVertical:10,borderColor:'#000',borderRadius:7,
                                    shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                    shadowOffset:{height:2,width:0},elevation:5,backgroundColor:'#fff',
                                    paddingHorizontal:10}}
                            value={this.state.email}
                            onChangeText={(email)=>{this.setState({email})}}>
                        </TextInput>
                    </View>
                    <View style={{borderWidth:0}}>
                        <Text style={{fontSize:16,paddingVertical:10}}>Phone1</Text>
                        <TextInput
                            style={{fontSize:16,paddingVertical:10,borderColor:'#000',borderRadius:7,
                                    shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                    shadowOffset:{height:2,width:0},elevation:5,backgroundColor:'#fff',
                                    paddingHorizontal:10}}
                            value={this.state.mobile}
                            keyboardType={'numeric'}
                            onChangeText={(mobile)=>{this.setState({mobile})}}>
                        </TextInput>
                    </View>
                    <View style={{borderWidth:0}}>
                        <Text style={{fontSize:16,paddingVertical:10}}>Phone2</Text>
                        <TextInput
                            style={{fontSize:16,paddingVertical:10,borderColor:'#000',borderRadius:7,
                                    shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                    shadowOffset:{height:2,width:0},elevation:5,backgroundColor:'#fff',
                                    paddingHorizontal:10}}
                            value={this.state.phone}
                            keyboardType={'numeric'}
                            onChangeText={(phone)=>{this.setState({phone})}}>
                        </TextInput>
                    </View>
                    <View style={{borderWidth:0}}>
                        <Text style={{fontSize:16,paddingVertical:10}}>Pincode</Text>
                        <TextInput
                            style={{fontSize:16,paddingVertical:10,borderColor:'#000',borderRadius:7,
                                    shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                    shadowOffset:{height:2,width:0},elevation:5,backgroundColor:'#fff',
                                    paddingHorizontal:10}}
                            value={this.state.pincode}
                            keyboardType={'numeric'}
                            onChangeText={(pincode)=>{this.setState({pincode})}}>
                        </TextInput>
                    </View>
                    <View style={{borderWidth:0}}>
                        <Text style={{fontSize:16,paddingVertical:10}}>Landmark</Text>
                        <TextInput
                            style={{fontSize:16,paddingVertical:10,borderColor:'#000',borderRadius:7,
                                    shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                    shadowOffset:{height:2,width:0},elevation:5,backgroundColor:'#fff',
                                    paddingHorizontal:10}}
                            value={this.state.landmark}
                            onChangeText={(landmark)=>{this.setState({landmark})}}>
                        </TextInput>
                    </View>
                    <View style={{borderWidth:0}}>
                        <Text style={{fontSize:16,paddingVertical:10}}>Address</Text>
                        <TextInput
                            style={{fontSize:16,paddingVertical:10,borderColor:'#000',borderRadius:7,
                                    shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                    shadowOffset:{height:2,width:0},elevation:5,backgroundColor:'#fff',
                                    paddingHorizontal:10}}
                            value={this.state.address}
                            onChangeText={(address)=>{this.setState({address})}}>
                        </TextInput>
                    </View>

                    {/* <View style={{borderWidth:0,marginBottom:10}}>
                        <Text style={{fontSize:16,}}>Mode </Text>
                        <Dropdown
                              value={this.state.mode}
                              data={Mode}
                              disabled={false}
                              dropdownOffset={{top:8}}
                              containerStyle={{borderWidth:0,borderRadius:7,paddingLeft:0,paddingVertical:10,
                                               fontSize:16,borderRadius:7,placeholder:'unitType',placeholderTextColor:'#737272',
                                               borderColor:'#f2f2f2',width:width*0.9}}
                              rippleCentered={true}
                              onChangeText={(unittypetext)=>this.setState({unittypetext:'',valutext:''})}
                              inputContainerStyle={{shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,borderRadius:7,
                                                    shadowOffset:{height:2,width:0},elevation:5,
                                                    paddingVertical:10,
                                                    placeholder:'unitType',placeholderTextColor:'#737272',
                                                    paddingLeft:6,padding:4,paddingTop:-10,borderWidth: 0.2,
                                                    fontSize:16,backgroundColor:'#0FCCD8',borderColor:'#f2f2f2',width:width*0.7}}
                              pickerStyle={{borderWidth:0,borderRadius:10,
                                            rippleColor:'#0FD2D8', paddingLeft:10,
                                            width:width*0.7 ,marginLeft:width*0.1,
                                            marginTop:width*0.18,color:'#0FD2D8',backgroundColor:'#0FD2D8'}}
                              itemColor={'#000'}
                              itemTextStyle={{color:'#000'}}
                              selectedItemColor={'#000'}

                        />
                        {/* <TextInput
                            style={{fontSize:16,paddingVertical:10,borderColor:'#000',
                                    shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                    shadowOffset:{height:2,width:0},elevation:5,
                                    backgroundColor:'#fff',paddingHorizontal:10}}
                            value={this.state.password}
                            onChangeText={(password)=>{this.setState({password})}}>
                        </TextInput> */}
                    {/* </View> */}

                    <View style={{borderWidth:0,marginTop:25,alignItems:'center'}}>
                      <TouchableOpacity style={{borderWidth:0,backgroundColor:'#CF4F07',borderRadius:7,
                                                shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                                shadowOffset:{height:2,width:0},elevation:5,}}
                                        onPress={()=>{this.getOtp()}}>
                          <Text style={{fontSize:18,paddingHorizontal:45,paddingVertical:8,color:'#fff'}}>Register</Text>
                      </TouchableOpacity>
                    </View>
                    {/* <View style={{borderWidth:0,marginTop:15,alignItems:'center'}}>
                      <Text style={{fontSize:14}}>Already have an account?</Text>
                      <TouchableOpacity style={{borderWidth:0,marginTop:10}}
                                        onPress={()=>{this.props.navigation.navigate('AppLoginScreen')}}>
                          <Text style={{fontSize:18,paddingVertical:4}}>Login</Text>
                      </TouchableOpacity>
                    </View> */}
                </View>
                {/* <View style={{borderWidth:0,position:'absolute',bottom:width*0.05,alignSelf:'center',left:width*0.27,}}>
                    <Text style={{fontSize:14,textAlign:'center',color:'#fff'}}>By continuing you are accepting</Text>
                      <Text style={{fontSize:14,textAlign:'center',color:'#fff'}}>the Terms and conditions</Text>
                </View> */}
                </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
