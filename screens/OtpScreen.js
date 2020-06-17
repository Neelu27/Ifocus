import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,Image,
  Text,ActivityIndicator,
  TouchableOpacity,
  View,ToastAndroid,
  Slider,Alert,Button,PermissionsAndroid,
  Dimensions,Keyboard,Clipboard,
  TextInput,FlatList,AsyncStorage,TouchableHighlight,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import  Constants  from 'expo-constants';
const { width } = Dimensions.get('window');
import constants  from '../constants/Settings.js';
import Toast, {DURATION} from 'react-native-easy-toast';
import OTPInputView from 'react-native-otp-input';
import SmsListener from 'react-native-android-sms-listener';
import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import CountDown from 'react-native-countdown-component';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import Loader from '../components/Loader';
import { createBottomTabNavigator,createAppContainer,createSwitchNavigator,NavigationActions } from 'react-navigation';

const serverURL = constants.url;
const themeColor= constants.themeColor;

class OtpScreen extends React.Component {

  static navigationOptions =  {
    header:null
  }

  constructor(props){
    super(props);
    const screen = this.props.navigation.getParam('screen',null)
    const username = this.props.navigation.getParam('username',undefined)
    console.log(screen,'screen1111112')
    this.state = {
      username:username,
      otp:'',
      needOTP:true,
      text:'',
      screen:screen,
      mobileno:'',
      checked:true,
      store:this.props.store,
      selectedStore:this.props.selectedStore,
      csrf:null,
      cartItems:this.props.cart,
      sessionid:null,
      loadingVisible:false,
    };
    this.SMSReadSubscription = {};
  }


  componentDidMount(){
    var screen = this.props.navigation.getParam('screen',null)
    console.log(screen,'screen111111')
    var username = this.props.navigation.getParam('username',null)
    var userPk = this.props.navigation.getParam('userPk',null)
    var token = this.props.navigation.getParam('token',null)
    var mobile = this.props.navigation.getParam('mobile',null)
    var csrf = this.props.navigation.getParam('csrf',null)
    console.log(this.state.cartItems,'ghjjjjjjjjj');
    // if(screen == 'LogInScreen'){
    //   this.setState({text:'Login to VyasaMadhwa',screen:'login',username:username})
    // }else{
    //   // this.setState({text:'Register to VyasaMadhwa',screen:'register',username:username,mobileno:username})
    //   this.setState({userPk: userPk,token:token,mobile:mobile,mobileno:username,csrf:csrf})
    // }
  }

  copyCodeFromClipBoardOnAndroid=()=>{
    if (Platform.OS === "android") {
          this.checkPinCodeFromClipBoard()
          this._timer = setInterval(() => {
            this.checkPinCodeFromClipBoard()
        }, 400)
    }
  }

  checkPinCodeFromClipBoard=()=>{
    Clipboard.getString().then(code => {
        if ( this.state.clipboard !== code) {
            this.setState({clipboard:code})
        }
      })
  }

  resend(){
    this.refs.toast.show('request sent!');
    if(this.state.screen == 'LoginScreenV2'){
      var data = new FormData();
      data.append("id", this.state.username);
      fetch(serverURL + '/generateOTP/', {
        method: 'POST',
        body: data
      })
      .then((response) => {
        console.log(data,response.status,'jjjjjjjjjjjjj')
        if (response.status == 200) {
          this.setState({ username: this.state.username })
          this.setState({ needOTP: true })
          return response.json()
        }
      })
      .then((responseJson) => {
        console.log(responseJson,'responseJson')
        if (responseJson == undefined){
          this.refs.toast.show('No user found , Please register');
        }else{
          return
        }
      })
      .catch((error) => {
        this.refs.toast.show(error.toString());
        return
      });
    }
    else{
      var data = new FormData();
      data.append( "mobile", this.state.mobileno );
      fetch( serverURL + '/api/homepage/registration/', {
        method: 'POST',
        body: data
      })
      .then((response) =>{
        if(response.status == 200 || response.status==201 ){
          var d = response.json()
          this.setState({ needOTP: true })
          return d
        }else{
          this.refs.toast.show('Mobile No Already register with user ');
        }
      })
      .then((responseJson) => {
        this.setState({ userPk: responseJson.pk,token:responseJson.token,mobile:responseJson.mobile,username:this.state.mobileno })
        })
      .catch((error) => {
        return
      });
    }
  }

  requestPost=(item,sessionid,csrf)=>{
    var data = {
      product:item.product,
      productVariant:item.productVariant,
      store:item.store,
      qty:item.count,
    }
    return new Promise(resolve => {
      fetch(serverURL + '/api/POS/cart/',{
        method: 'POST',
        headers:{
          "Cookie" :"csrftoken="+csrf+";sessionid=" + sessionid +";",
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Referer': serverURL,
          'X-CSRFToken': csrf
        },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        resolve();
      });
    })
  }

  requestPatch =(item,count,sessionid,csrf)=>{
    var data = {
      qty:count,
    }
    return new Promise(resolve => {
      fetch(serverURL + '/api/POS/cart/'+item.pk+'/',{
        method: 'PATCH',
        headers:{
          "Cookie" :"csrftoken="+csrf+";sessionid=" + sessionid +";",
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Referer': serverURL,
          'X-CSRFToken': csrf
        },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        resolve();
      });
    })
  }

  logIn=()=>{
    console.log(this.state.screen,'this.state.screen')
    if(this.state.needOTP==false){
      var data = {
        username: this.state.email,
        password: this.state.password,
      }
      console.log(data);
      this.setState({disableSignUp:true});
      fetch(serverURL+'/login/?mode=api',{
        method:"POST",
        body: JSON.stringify(data)
      })
      .then((response)=>{
        console.log(response.status,'kkkkkkkkkwithout otp');
        if(response.status == 200){
          this.setState({error1:false,disableSignUp:false});
          var sessionid = response.headers.get('set-cookie').split('sessionid=')[1].split(';')[0]
          this.setState({ sessionid: sessionid })
          AsyncStorage.setItem("sessionid", sessionid)
          return response.json()
        }
        else{
          this.setState({error1:true,disableSignUp:false});
          this.refs.toast.show('Incorrect OTP');
          return
        }
      }).then((responseJson)=>{
        if (responseJson!=undefined) {
          var userPkk = responseJson.pk
          AsyncStorage.setItem("userpk", userPkk + '')
          AsyncStorage.setItem("csrf", responseJson.csrf_token)
          console.log(userPkk,responseJson.csrf_token,this.state.sessionid);
          Keyboard.dismiss()
          AsyncStorage.setItem("login", JSON.stringify(true)).then(res => {
            return this.props.navigation.navigate('Home')
          })
        }
      return
      }).then(()=>{
        this.setState({disableSignUp:false,email:'',password:''})
      })
      this.setState({disableSignUp:false,})
    }else {
      var data = new FormData();
      data.append("username", this.state.username);
      data.append("otp", this.state.otp);
      fetch(serverURL + '/login/?otpMode=True&mode=api', {
        method: 'POST',
        body: data,
      }).then((response) => {
        console.log(response.status,'kkkkkkkkk');
        if(response.status == 200){
          this.setState({error1:false,disableSignUp:false});
          return response.json()
        }
        else{
          this.setState({error1:true,disableSignUp:false});
          return
        }
      }).then((responseJson)=>{
        console.log(responseJson,'responseJson')
        if (responseJson!=undefined) {
          var userPkk = responseJson.pk
          AsyncStorage.setItem("userpk", userPkk + '')
          AsyncStorage.setItem("csrf", responseJson.csrf_token)
          Keyboard.dismiss()
          AsyncStorage.setItem("login", JSON.stringify(true)).then(res => {
          console.log(this.state.screen,'screenscreen')
            // if(this.state.screen!=null){
            // var screen=this.state.screen
            // console.log('llllllllllllllllllllllllllll')
            // this.props.navigation.navigate(screen.screenProp,{screenProp:screen.screenProp,account:screen.account,paymentScreen:screen.paymentScreen,item:screen.item,product:screen.product}, NavigationActions.navigate({ routeName: screen.routeName}))
            // return
            // }else{
              // return 
              this.props.navigation.navigate('Home')
            // }
          })
        }
      }).then(()=>{
        this.setState({disableSignUp:false,email:'',password:''})
      })
      this.setState({disableSignUp:false,})
    }
  }

  render(){
    var {loadingVisible} = this.state
    return(
      <View style={{flex:1,backgroundColor: '#f2f2f2'}}>
        <Loader
          modalVisible = {loadingVisible}
          animationType="fade"
        />
        <Toast style={{backgroundColor: 'grey'}} textStyle={{color: '#fff'}} ref="toast" position = 'top'/>
        <View style={{height:Constants.statusBarHeight,backgroundColor:themeColor}}></View>
        <ScrollView style={{flex:0.64,paddingHorizontal:25,backgroundColor: '#f2f2f2'}}>
            <TouchableOpacity style={{marginTop:20  }} onPress={() => this.props.navigation.goBack()}  >
              <Ionicons name="md-arrow-back" size={28} color="#000" />
            </TouchableOpacity  >
            <MonoText style={{color:'#000',fontSize: 22,fontWeight:'700', marginTop: 30}}>Hi! </MonoText>
            <MonoText style={{color:'grey',fontSize: 22,fontWeight:'700'}}>{this.state.username}</MonoText>
            <MonoText style={{color:'#000',fontSize: 20,alignSelf:'flex-start',marginTop:40}}>Enter OTP</MonoText>
            <View style={{flex:1,alignItems:'center',justifyContent:'flex-start',marginTop:30}}>
              <TextInput style={{ borderBottomWidth: 2,
                                 borderColor: themeColor, width: '100%',
                                 height: 60, color: '#000', fontSize: 22 ,
                                 paddingVertical: 10}}
                        autoFocus={true}
                        keyboardType='numeric'
                        value={this.state.password}
                        placeholderTextColor='#000'
                        onChangeText={query => {this.setState({ otp: query });}}/>
            </View>
            <View style={{flex:1,alignItems:'flex-end',justifyContent:'flex-start',}}>
              <TouchableOpacity  onPress={() => this.resend()} >
                <MonoText style={{ color: '#000', fontSize: 15, fontWeight: '700', marginVertical: 10 ,}}>Resend OTP</MonoText>
              </TouchableOpacity>
            </View>
            <View style={{flex:1,alignItems:'flex-start',justifyContent:'flex-start'}}>
              <TouchableOpacity  onPress={() => {this.logIn() }} style={{width:'100%',}}>
              <MonoText style={{ color: '#fff', fontSize: 20, fontWeight: '700', textAlign: 'center', borderWidth: 1, borderRadius: 3, borderColor: themeColor,  paddingVertical: 9, paddingHorizontal: 10, backgroundColor: '#194079' }}>VERIFY</MonoText>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Pages',{url:'terms-of-use'})}}    style={{alignItems:'center',justifyContent:'center',}}>
              <MonoText style={{ color:'grey',fontSize:15,textAlign:'center',marginTop:5 }}>By Verifying I'm accepting the terms and conditions.</MonoText>
            </TouchableOpacity>
            <View style={{flex:0.37,marginHorizontal:20,}}>
              <View style={{marginTop:15}}>
              </View>
              <View style={{marginTop:10,justifyContent:'flex-end',alignItems:'flex-end'}}>
              </View>
            </View>
        </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#fff',
  },
  underlineStyleBase:{
    width: 40,
    height:45,
    borderWidth:2,
    borderColor: "#a2a2a2",
    marginHorizontal:25,
  },
  underlineStyleHighLighted: {
    borderColor: themeColor,
  },
  button:{
    backgroundColor:themeColor,
  },
  buttonText:{
  },
});

const mapStateToProps =(state) => {
    return {
    counter: state.cartItems.counter,
    cart : state.cartItems.cartItem,
    store:state.cartItems.store,
    selectedStore:state.cartItems.selectedStore,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTocartFunction:  (args) => dispatch(actions.addToCart(args)),
    decreaseFromCartFunction:  (args) => dispatch(actions.decreaseFromCart(args)),
    increaseCartFunction:  (args) => dispatch(actions.increaseCart(args)),
    setInitialFunction:  (cart,counter,totalAmount) => dispatch(actions.setInitial(cart,counter,totalAmount)),
    emptyCartFunction:()=>dispatch(actions.emptyCart()),
    setMyStoreFunction:(myStore,storeRole)=>dispatch(actions.setMyStore(myStore,storeRole)),
    removeMyStoreFunction:()=>dispatch(actions.removeMyStore()),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OtpScreen);
