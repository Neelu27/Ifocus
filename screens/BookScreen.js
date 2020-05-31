import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Slider,LayoutAnimation,NativeModules,
  Dimensions,ImageBackground,
  TextInput, FlatList, AsyncStorage, Alert, Linking, PermissionsAndroid, ToastAndroid,ActivityIndicator
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import {SearchBar}from 'react-native-elements';
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
const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class BookScreen extends React.Component {

  static navigationOptions = {
    header:null,
  }


  constructor(props) {
    super(props);
    this.state = {
        email:'',
        password:'',
        date: new Date(),
        products:[],
        product:[{name:require('../assets/images/off1.jpeg'),img:require('../assets/video/bhag4.jpg'),uri:'https://www.dropbox.com/s/df2d2gf1dvnr5uj/Sample_1280x720_mp4.mp4',namei:'All',},
                  {name:require('../assets/images/off1.jpeg'),img:require('../assets/video/bhag4.jpg'),uri:'https://www.dropbox.com/s/df2d2gf1dvnr5uj/Sample_1280x720_mp4.mp4',namei:'BhagwatGita',},
                  {name:require('../assets/images/off3.jpeg'),img:require('../assets/video/ram1.jpg'),uri:'https://www.dropbox.com/s/s1rc65usypfacde/Sample_1280x720_webm.webm',namei:'Ramayana',},
                  {name:require('../assets/images/off2.jpeg'),img:require('../assets/video/maha1.jpg'),uri:'https://www.dropbox.com/s/y0ry2w3i7q59ozx/Sample_854x480.mp4',namei:'Mahabhart',},
                  {name:require('../assets/images/off1.jpeg'),img:require('../assets/video/bhag1.jpg'),uri:'https://www.dropbox.com/s/swjjl14kcamsodn/Sample_640x360.mp4',namei:'BhagwatGita part-1',},
                  {name:require('../assets/images/off3.jpeg'),img:require('../assets/video/bhag2.png'),uri:'https://www.dropbox.com/s/0x2ke57h7wv49ll/Sample_512x288.mp4',namei:'BhagwatGita part-2',},
                  {name:require('../assets/images/off2.jpeg'),img:require('../assets/video/maha2.jpg'),uri:'https://www.dropbox.com/s/df2d2gf1dvnr5uj/Sample_1280x720_mp4.mp4',namei:'Mahabhart part-1',},
                  {name:require('../assets/images/off1.jpeg'),img:require('../assets/video/maha3.jpg'),uri:'https://www.dropbox.com/s/0x2ke57h7wv49ll/Sample_512x288.mp4',namei:'Mahabhart part-2',},
                  {name:require('../assets/images/off3.jpeg'),img:require('../assets/video/bhag3.jpeg'),uri:'https://www.dropbox.com/s/0x2ke57h7wv49ll/Sample_512x288.mp4',namei:'BhagwatGita',count:'x1',},
                  {name:require('../assets/images/off2.jpeg'),img:require('../assets/video/ram2.jpg'),uri:'https://www.dropbox.com/s/0x2ke57h7wv49ll/Sample_512x288.mp4',namei:'Ramayana',count:'x1',}],
    }
  }

  getStore=async()=>{
          var csrf = await AsyncStorage.getItem('csrf');
          const userToken = await AsyncStorage.getItem('userpk');
          const sessionid = await AsyncStorage.getItem('sessionid');
          await fetch('https://vyasa.cioc.in/api/homepage/book/',{
            method: 'GET',
            headers: {
              "Cookie" :"csrf="+csrf+";sessionid=" + sessionid+";",
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken':csrf,
              'Referer': 'https://vyasa.cioc.in'
            },
          }).then((response) => {
            console.log(response.status,'response')
            return response.json()
            console.log(response,'response')
          })
            .then((responseJson) => {
              console.log(responseJson,'responseJson')
              this.setState({products:responseJson})
              this.setState({prod:responseJson})
              console.log(this.state.products,'this.state.products')
              console.log(this.state.prod,'this.state.prod')
            })
            .catch((error) => {
              console.error(error);
          });
      }

    componentDidMount=async()=>{
      this.getStore()
    }
    search(){
       LayoutAnimation.spring();
       var search = !this.state.search
       this.setState({search:!this.state.search})
     }

  render() {
    return (
      <View style={{flex:1}}>
       <ImageBackground source={require('../assets/video/1.png')} style={{width: '100%', height: '100%',marginTop:0}}>
           <Toast style={{backgroundColor: 'grey'}} textStyle={{color: '#fff'}} ref="toast" position = 'top'/>
           <View style={{height:Constants.statusBarHeight,backgroundColor:'#103368'}} />
           <View style={{  flexDirection: 'row', alignItems: 'center',marginLeft:15 ,marginTop:15}}>
               <TouchableOpacity onPress={()=>{this.props.navigation.openDrawer();}}>
                   <MaterialIcons name={'arrow-back'} size={30} color={'#fff'} />
               </TouchableOpacity>
               <TouchableOpacity style={{marginLeft:130}}>
                  <Text style={{color:'#fff',fontSize:22}}>Profile</Text>
               </TouchableOpacity>

           </View>
           <View style={{flex:1,justifyContent:'center',borderWidth:0,}}>


               <View style={{borderWidth:0,width:width,alignSelf:'center',marginTop:-80}}>

                 <View style={{height:width*0.17,width:width*0.17,borderWidth:0,borderRadius:50,alignSelf:'center'}}  >
                      <Image source={require('../assets/images/61.png')} style={{height:'100%',width:'100%',borderWidth:1,borderRadius:50}}  />
                 </View>
                 <View style={{alignSelf:'center'}}>
                   <Text style={{textAlign:'center',paddingHorizontal:4,fontSize:20,paddingBottom:0,color:'#fff'}}>Prashant</Text>

                 </View>
                 {/* <View style={{borderWidth:0,borderRadius:0,width:width*0.7,height:width*0.25,
                               marginTop:40,alignSelf:'center',shadowColor:"#fefefe",
                               shadowOpacity:0.2,shadowRadius:15,paddingVertical:15,paddingHorizontal:15,
                               shadowOffset:{height:2,width:0},elevation:5,
                               backgroundColor:'#383636',flexDirection:'row'}}>
                     <View style={{flex:0.6}}>
                        <Text style={{textAlign:'left',paddingHorizontal:10,color:'#fff',fontSize:18,paddingBottom:5}}>Hi Surya</Text>
                        <View style={{borderWidth:0.5,borderColor:'#fff',marginHorizontal:10,width:width*0.3}}></View>
                        <Text style={{textAlign:'left',paddingHorizontal:10,color:'#fff',fontSize:18,paddingTop:6}}>Rs.4,000/-</Text>
                     </View>
                     <View style={{flex:0.4,borderWidth:0,alignItems:'center'}}>
                         <View style={{height:width*0.17,width:width*0.17,borderWidth:0,borderRadius:50}}  >
                              <Image source={require('../assets/images/61.png')} style={{height:'100%',width:'100%',borderWidth:1,borderRadius:50}}  />
                         </View>
                    </View>
                 </View> */}

                 <View style={{borderWidth:0,borderRadius:10,width:width*0.8,flexDirection:'row',justifyContent:'space-between',
                               marginTop:40,alignSelf:'center',shadowColor:"#fefefe",
                               shadowOpacity:0.2,shadowRadius:15,paddingVertical:12,paddingHorizontal:6,
                               shadowOffset:{height:2,width:0},elevation:5,backgroundColor:'#fff'}}>

                        <View style={{borderWidth:0,alignItems:'center',justifyContent:'flex-start',paddingRight:10,paddingLeft:10}}>
                          <Text style={{paddingTop:4,paddingBottom:6,fontSize:20}}>Location</Text>
                            <Text style={{paddingBottom:4,paddingTop:6,fontSize:18,color:'#bababa'}}>Bangalore</Text>
                       </View>
                       <View style={{paddingTop:4,paddingRight:10}}><FontAwesome name={'pencil'} size={20}/></View>
                 </View>
                 <View style={{borderWidth:0,borderRadius:10,width:width*0.8,flexDirection:'row',justifyContent:'space-between',
                               marginTop:10,alignSelf:'center',shadowColor:"#fefefe",
                               shadowOpacity:0.2,shadowRadius:15,paddingVertical:12,paddingHorizontal:6,
                               shadowOffset:{height:2,width:0},elevation:5,backgroundColor:'#fff'}}>

                        <View style={{borderWidth:0,alignItems:'center',justifyContent:'flex-start',paddingRight:10,paddingLeft:10}}>
                          <Text style={{paddingTop:4,paddingBottom:6,fontSize:20}}>Manager</Text>
                            <Text style={{paddingBottom:4,paddingTop:6,fontSize:18,color:'#bababa'}}>Krishna</Text>
                       </View>
                       <View style={{paddingTop:4,paddingRight:10}}><FontAwesome name={'pencil'} size={20}/></View>
                 </View>

                 <View style={{borderWidth:0,borderRadius:10,width:width*0.8,flexDirection:'row',justifyContent:'space-between',
                               marginTop:10,alignSelf:'center',shadowColor:"#fefefe",
                               shadowOpacity:0.2,shadowRadius:15,paddingVertical:12,paddingHorizontal:6,
                               shadowOffset:{height:2,width:0},elevation:5,backgroundColor:'#fff'}}>

                        <View style={{borderWidth:0,justifyContent:'flex-start',paddingRight:10,paddingLeft:10}}>
                          <Text style={{paddingTop:4,paddingBottom:6,fontSize:20}}>Phone no</Text>
                            <Text style={{paddingBottom:4,paddingTop:6,fontSize:18,color:'#bababa'}}>6369787601</Text>
                       </View>
                       <View style={{paddingTop:4,paddingRight:10}}><FontAwesome name={'pencil'} size={20}/></View>
                 </View>
                 <View style={{borderWidth:0,borderRadius:10,width:width*0.8,flexDirection:'row',justifyContent:'space-between',
                               marginTop:10,alignSelf:'center',shadowColor:"#fefefe",
                               shadowOpacity:0.2,shadowRadius:15,paddingVertical:12,paddingHorizontal:6,
                               shadowOffset:{height:2,width:0},elevation:5,backgroundColor:'#fff'}}>

                        <View style={{borderWidth:0,justifyContent:'flex-start',paddingRight:10,paddingLeft:10}}>
                          <Text style={{paddingTop:4,paddingBottom:6,fontSize:20}}>Email-Id</Text>
                            <Text style={{paddingBottom:4,paddingTop:6,fontSize:18,color:'#bababa'}}>cioc1234@gmail.com</Text>
                       </View>
                       <View style={{paddingTop:4,paddingRight:10}}><FontAwesome name={'pencil'} size={20}/></View>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookScreen);

// <View style={{flex:1}}>
//     <View style={{height:Constants.statusBarHeight,backgroundColor:'#fff'}}></View>
//     <View  style={{justifyContent:'center',backgroundColor:'#fff',borderWidth:0,
//       height:55,width:width}}>
//         <ImageBackground source={require('../assets/video/back1.png')} style={{flexDirection:'row',justifyContent:'space-between',width:'101%',height:'100%',alignItems:'center'}}>
//         <TouchableOpacity onPress={()=>{this.props.navigation.openDrawer();}}>
//              <MaterialIcons name={'arrow-back'} size={30} color={'#fff'} />
//         </TouchableOpacity>
//           <Text style={{fontSize:20,color:'#fff',alignItems:'center',paddingTop:10,paddingBottom:6}}>My Visit</Text>
//           <TouchableOpacity style={{ marginHorizontal: 10 }}   >
//              <Image source={require('../AllImage/Icons-POI/notification.png')} style={{height:22,width:20,tintColor:'#fff'}}  />
//           </TouchableOpacity>
//       </ImageBackground>
//     </View>
//     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//       <View style={{}}>
//         <Text>Today's plan - 34 visit</Text>
//         <Text>Wednwsday,09 march 20</Text>
//       </View>
//
//
//     </View>
// </View>

// {name:require('../assets/images/off1.jpeg'),users:3,item:'Chicken Grill',count:'x1',item1:'Lemonade',count1:'x2',status:'unpaid'},
//           {name:require('../assets/images/off3.jpeg'),users:4,item:'Chicken Tandoori',count:'x1',item1:'Strawberry Mlk Shk',count1:'x2',status:'paid'},
//           {name:require('../assets/images/off2.jpeg'),users:5,item:'Shawarma',count:'x1',item1:'Donne briyani',count1:'x2',status:'paid'}
