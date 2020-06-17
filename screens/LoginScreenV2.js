import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Platform, Image,AsyncStorage,Alert,ScrollView ,Clipboard,ToastAndroid,Dimensions,FlatList,BackHandler,TextInput,KeyboardAvoidingView,Keyboard} from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Toast, {DURATION} from 'react-native-easy-toast';
import { Icon } from "react-native-elements";
import { withNavigation,NavigationActions } from 'react-navigation';
import { Card } from 'react-native-elements';
import { Octicons ,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons} from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import constants  from '../constants/Settings.js';
import FloatingScreen from '../components/FloatingScreen';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import { withNavigationFocus } from 'react-navigation';
import { MonoText } from '../components/StyledText';

const serverURL = constants.url;
const mainUrl= constants.mainUrl;
const themeColor= constants.themeColor;
const deviceId = Constants.deviceId ;
const { width,height } = Dimensions.get('window');

class LoginScreenV2 extends React.Component {

    static navigationOptions =  {
        header:null
    }

    constructor(props) {
      super(props);

      var data = props.navigation.getParam('data',null)
      this.state = {
        email:'',
        password:'',
        mobileno:'',
        scrollHeight:Dimensions.get('window').height-100,
        keyboardOpen : false,
        keyboardHeight:0,
        disableSignUp:false,
        error1:false,
        screen:'',
        screenData:data,
        needOTP:false,
      };
      Keyboard.addListener(
             'keyboardDidHide',
             this.showKeyboard
      )

      Keyboard.addListener(
             'keyboardDidShow', this.hideKeyboard
      )
    }

    handleBackButtonClick=()=> {
      this.props.navigation.navigate('Main');
      return true;
    };

    componentDidUpdate(prevProps) {
      if (prevProps.isFocused !== this.props.isFocused) {
        this.setState({disableSignUp:false,error1:false,email:'',password:'',});
      }
    }

    showKeyboard =()=>{
        this.setState({keyboardOpen : false})
        this.setState({scrollHeight:this.state.scrollHeight+500})

    }

    hideKeyboard =(e)=>{
        this.setState({keyboardOpen : true})
        this.setState({
            keyboardHeight:
              e.endCoordinates.height
        });
        try {
          this.setState({scrollHeight:this.state.scrollHeight-500})
        } catch (e) {

        } finally {

        }
    }

    sendOtp() {
      // var screen = this.props.navigation.getParam('screenDetails',null)
      // console.log(screen,'screenllllllllllllll')
      var mob = /^[1-9]{1}[0-9]{9}$/;
      if (this.state.mobileno == undefined || mob.test(this.state.mobileno) == false) {
        this.refs.toast.show('Enter Correct Mobile No');
      } else {
        var data = new FormData();
        data.append("id", this.state.mobileno);
        fetch(serverURL +'/generateOTP/', {
          method: 'POST',
          body: data
        })
        .then((response) => {
          console.log(response.status,'response.status')
          if (response.status == 200) {
            this.refs.toast.show('OTP request sent.');
            this.setState({ username: this.state.mobileno })
            this.setState({ needOTP: true })
            return response.json()
          }
        })
        .then((responseJson) => {
          if (responseJson == undefined){
            this.getOtp()
          }else{
            this.setState({ OTP: responseJson })
            this.props.navigation.navigate('OtpScreen',{
              screen:'LoginScreenV2',
              username:this.state.mobileno,
            });
            return
          }
        })
        .catch(()=>{
            this.refs.toast.show('server error.');
        });
      }
    }

    componentDidMount(){
      this.setState({disableSignUp:false,error1:false,email:'',password:''})
    }

    onChangeText=(text)=>{
      this.setState({email:text,error1:false})
    }

    render(){

      return(
        <View style={{flex:1,backgroundColor: '#f8fafb',}}>
          <Toast style={{backgroundColor: 'grey'}} textStyle={{color: '#fff'}} ref="toast" position = 'top'/>
          <View style={[styles.statusBar,{backgroundColor:themeColor}]} />
          <ScrollView contentContainerStyle={{flex:1,backgroundColor:themeColor}}>
            <View style={{flex:1}}>
              <View style={{flex:0.6}}>
                <View style={{flex:0.5,alignItems:'center',justifyContent:'center'}}>
                  <MonoText   style={{color:'#fff',fontSize:30,fontWeight:'700'}}></MonoText>
                  <MonoText   style={{color:'#fff',fontSize:30,fontWeight:'700'}}></MonoText>
                </View>
                <View style={{flex:0.5,justifyContent:'flex-end',alignItems:'center'}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                      <MonoText   style={{ color: '#000', fontSize: 16, borderWidth: 1, borderTopLeftRadius: 7,
                        width: width * 0.15,     borderBottomLeftRadius: 7, borderColor: '#f2f2f2', height: 50,paddingVertical: 14, paddingHorizontal: 10, backgroundColor: '#f2f2f2' }}>+91</MonoText>
                      <TextInput style={{ borderWidth: 1,borderTopRightRadius: 7,borderBottomRightRadius: 7,
                        borderColor: '#fff', width: width * 0.7, height: 50, paddingHorizontal: 10,
                        backgroundColor: '#fff', color: '#000', fontSize: 16 }}
                        placeholder="Enter mobile no"
                        placeholderTextColor='black'
                        keyboardType={'numeric'}
                        onChangeText={query => {
                          this.setState({ mobileno: query });
                          this.setState({ username: query })
                        }}
                        value={this.state.username} />
                    </View>
                    <View style={{}}>
                      <TouchableOpacity onPress={()=>{this.sendOtp();}} style={{justifyContent: 'center', alignItems: 'center',width: width * 0.85, textAlign: 'center',borderWidth: 1, borderRadius: 7, borderColor: themeColor, height: 50,marginVertical: 20,backgroundColor: '#194079' }}>
                        <MonoText   style={{ color: '#fff', fontSize: 20, fontWeight: '700',
                        }}>Sign in with OTP</MonoText>
                     </TouchableOpacity>
                    </View>
                </View>
              </View>
              <View style={{flex:0.4,justifyContent:'flex-end',alignItems:'center'}}>
                 <MonoText   style={{color:'#fff',fontSize:18,fontWeight:'700'}}></MonoText>
                 <View style={{flexDirection:'row',height:60}}>
                   <View style={{flex:0.4,alignItems:'flex-end',justifyContent:'center'}}>
                      {/* <Image source={require('../assets/video/protection.png')} style={{ width:60,height:60,resizeMode: 'contain'}}/> */}
                   </View>
                   <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                      <MonoText   style={{color:'#000',fontSize:13,fontWeight:'700',marginLeft:5,marginTop:-10}}></MonoText>
                   </View>
                 </View>
              </View>
            </View>
          </ScrollView>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusBar: {
    backgroundColor: "#032757",
    height: Constants.statusBarHeight,
  },
  inputStyle:{
    height: 50,
    width:'100%',
    borderRadius:5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 16,
    flexDirection: 'row',
  },
  login:{
    height: 40,
    backgroundColor:'#032757',
    width:'100%',
    borderRadius:5,
    borderTopLeftRadius:20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn:{
    borderRadius:10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    flexDirection: 'row',
    paddingHorizontal: 15,
  }
})

export default withNavigationFocus(LoginScreenV2)
