import React from 'react';
import {
  Image,
  Platform,ActivityIndicator,
  ScrollView,
  StyleSheet,ToastAndroid,
  Text,Alert,Linking,
  TouchableOpacity,
  View,PermissionsAndroid,
  Dimensions,ImageBackground,
  TextInput,FlatList,AsyncStorage,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import { FontAwesome,MaterialIcons,Entypo ,Ionicons} from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import  Constants  from 'expo-constants';
import {SearchBar}from 'react-native-elements';
import SmsListener from 'react-native-android-sms-listener'
import * as Expo from 'expo';
import * as Permissions from 'expo-permissions';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import constants from '../constants/Settings.js';
const { width } = Dimensions.get('window');
const height = width * 0.8
const serverURL = constants.url;
const themeColor= constants.themeColor;
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import { LinearGradient } from 'expo-linear-gradient';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import { Slider } from 'react-native-elements';
import { Audio } from 'expo-av';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview';
import TabBar from '../components/TabBar';
import SellerOrderCompo from '../components/SellerOrderCompo';
import SellerOrderAnnounce from '../components/SellerOrderAnnounce';
class UseProfile extends React.Component {

  static navigationOptions = {
    header:null,
  }

  constructor(props) {
    super(props);
    this.state = {
        email:'',
        password:'',
        date: new Date(),
        play:false,
        value:0,
        isPlaying: false,
        playbackInstance: new Audio.Sound(),
        currentIndex: 0,
        volume: 1.0,
        isBuffering: false,
        favoriteTopics:[],
        color:'#000',
        favorite:false,
        color1:'red',
        like: 23,
        dislike: 3,
        likeActive: false,
        dislikeActive: false,
        prod:[{name:'A+ve',color:'#fff',col:'#000',sel:false},
              {name:'A-ve',color:'#fff',col:'#000',sel:false},
              {name:'B+ve',color:'#fff',col:'#000',sel:false},
              {name:'B-ve',color:'#fff',col:'#000',sel:false},
              {name:'AB+ve',color:'#fff',col:'#000',sel:false},
              {name:'AB-ve',color:'#fff',col:'#000',sel:false},
              {name:'O+ve',color:'#fff',col:'#000',sel:false},
              {name:'O-ve',color:'#fff',col:'#000',sel:false},
              ],
        firstname:'',
        lastname:'',
        mobile:'',
        city:'',
        state:'',
        text:'',
        select:false,
        select1:true,
    }
    this.playbackInstance = null;
  }

  selectgroup=(item,index)=>{
    this.state.prod[index].sel = true;
    this.setState({prod:this.state.prod})
  }

  profile=async()=>{
    var data={
      companyName:"",
      deliveryCharge:0,
      email:this.state.email,
      first_name:this.state.firstname,
      gstin:"",
      is_active:true,
      is_staff:false,
      isCod:false,
      last_name:this.state.lastname,
      memberExpiryDate:"2020-06-16",
      mobile:this.state.mobile,
      noofDeliveryinamonth:0,
      password:"123",
      username:"admin1",
    }
    const sessionid = await AsyncStorage.getItem('sessionid');
    const csrf = await AsyncStorage.getItem('csrf');
    await fetch(serverURL+'/api/HR/usersAdminMode/',{
      method:'POST',
      headers:{
        "Cookie" :"csrftoken="+csrf+";sessionid=" + sessionid +";",
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': serverURL,
        'X-CSRFToken': csrf
      },
      data:JSON.stringify(data)
    })
    .then((response)=>{
      console.log(response.status,'ggfhfhghg');
      return response.json()
    }).then((json)=>{
      console.log(json,'result');
      // if(json==undefined){
      //   return
      // }
      // var data = this.state.data
      // var loadMoreNotify = true
      // json.results.forEach((i)=>{
      //   data.push(i)
      // })
      // if(json.count==data.length){
      //   var loadMoreNotify = false
      // }
      // this.setState({data:data,offsetNotifications:offset+10,loadMoreNotify:loadMoreNotify})
   })
  }

  render() {
    const audio=this.props.navigation.getParam('item',null);
    console.log(audio,'audio');
    return (
      <View style={{flex:1}}>
          <View style={{height:Constants.statusBarHeight,backgroundColor:'#103368'}}></View>
          <View  style={{justifyContent:'space-between',backgroundColor:'#fff',borderBottomWidth:0.5,
            height:55,width:width,flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                   <MaterialIcons name={'arrow-back'} size={30} color={'#000'} style={{paddingLeft:10}} />
              </TouchableOpacity>
                <Text style={{fontSize:20,color:'#000',alignItems:'center',paddingTop:10,paddingBottom:6,marginRight:width*0.4}}>Profile</Text>
                {/* <TouchableOpacity style={{ marginHorizontal: 10 }}   >
                   <Image source={require('../AllImage/Icons-POI/notification.png')} style={{height:22,width:20,tintColor:'#fff'}}  />
                </TouchableOpacity> */}
          </View>

          <ScrollView style={{paddingVertical:10,paddingHorizontal:15}}>
            <View style={{justifyContent:'center',alignItems:'center',marginVertical:10,paddingVertical:10}}>
                <View style={{height:width*0.2,width:width*0.2,borderRadius:37,alignSelf:'center'}}>
                  <Image source={require('../assets/images/6.png')} style={{height:'100%',width:'100%',borderRadius:37}}resizeMode={'contain'}/>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View>
                <Text style={{fontSize:18,marginVertical:6}}>First Name</Text>
                <TextInput style={{backgroundColor:'#ffffff',
                                  borderRadius:7,
                                  paddingHorizontal:0,
                                  paddingVertical:10,
                                  fontSize:16,
                                  width:width*0.4,
                                  borderBottomWidth:1,
                                  borderColor:'#bdbdbd',marginBottom:10,
                                  marginTop:0,backgroundColor:'#fff'}}
                             onChangeText={(name)=>this.setState({name})}
                             value={this.state.firstname}
                             placeholder={'First Name'}>
                </TextInput>
              </View>
              <View>
                <Text style={{fontSize:18,marginVertical:6}}>Last Name</Text>
                <TextInput style={{backgroundColor:'#ffffff',
                                  borderRadius:7,
                                  paddingHorizontal:0,
                                  paddingVertical:10,
                                  fontSize:16,
                                  width:width*0.4,
                                  borderBottomWidth:1,
                                  borderColor:'#bdbdbd',marginBottom:10,
                                  marginTop:0,backgroundColor:'#fff'}}
                             onChangeText={(name)=>this.setState({name})}
                             value={this.state.lastname}
                             placeholder={'Last Name'}>
                </TextInput>
              </View>
            </View>
            <Text style={{fontSize:18,marginVertical:6}}>Gender</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:width*0.17}}>
                <View style={{flexDirection:'row'}}>
                      <TouchableOpacity style={{justifyContent:'center',alignItems:'center',paddingHorizontal:10}}
                      onPress={()=>this.setState({select:!this.state.select,select1:false})}>
                      {this.state.select==true?<Ionicons name={'md-radio-button-on'} size={18}/>:<Ionicons name={'md-radio-button-off'} size={18}/>}
                      </TouchableOpacity>
                      <Image source={require('../assets/ifocus/female.png')} style={{height:width*0.16,width:width*0.16}}resizeMode={'contain'}/>
                </View>
                <View style={{flexDirection:'row'}}>
                      <TouchableOpacity style={{justifyContent:'center',alignItems:'center',paddingHorizontal:10}}
                      onPress={()=>this.setState({select1:!this.state.select1,select:false})}>
                      {this.state.select1==true?<Ionicons name={'md-radio-button-on'} size={18}/>:<Ionicons name={'md-radio-button-off'} size={18}/>}
                      </TouchableOpacity>
                      <Image source={require('../assets/ifocus/male.png')} style={{height:width*0.16,width:width*0.16}}resizeMode={'contain'}/>
                </View>
            </View>
            <Text style={{fontSize:18,marginVertical:6}}>Mobile No</Text>
            <TextInput style={{backgroundColor:'#ffffff',
                              borderRadius:7,
                              paddingHorizontal:0,
                              paddingVertical:10,
                              fontSize:16,
                              width:width*0.7,
                              borderBottomWidth:1,
                              borderColor:'#bdbdbd',marginBottom:10,
                              marginTop:0,backgroundColor:'#fff'}}
                         onChangeText={(mobile)=>this.setState({mobile})}
                         value={this.state.mobile}
                         placeholder={'Mobile no'}>
            </TextInput>
            <Text style={{fontSize:18,marginVertical:6}}>Email</Text>
            <TextInput style={{backgroundColor:'#ffffff',
                              borderRadius:7,
                              paddingHorizontal:0,
                              paddingVertical:10,
                              fontSize:16,
                              width:width*0.7,
                              borderBottomWidth:1,
                              borderColor:'#bdbdbd',marginBottom:10,
                              marginTop:0,backgroundColor:'#fff'}}
                         onChangeText={(email)=>this.setState({email})}
                         value={this.state.email}
                         placeholder={'Email'}>
            </TextInput>
            <Text style={{fontSize:18,marginVertical:6}}>Blood Group</Text>
            <FlatList
                     data={this.state.prod}
                     showsHorizontalScrollIndicator={false}
                     extraData={this.state.prod}
                     style={{}}
                     inverted={false}
                     scrollToEnd={true}
                     horizontal={true}
                     nestedScrollEnabled={true}
                     keyExtractor={(item, index) => index.toString()}
                     renderItem={({item, index})=>{
                    return(
                  <TouchableOpacity style={{flex:1,borderWidth:1,borderColor:'#C7C7C7',
                                    backgroundColor:'#fff',paddingHorizontal:10,backgroundColor:item.sel==true?'#477FD4':'#fff',
                                    marginVertical:8,marginHorizontal:10,borderRadius:10}}>
                    <TouchableOpacity onPress={()=>this.selectgroup(item,index)}>
                      <Text style={{paddingVertical:2,paddingHorizontal:6,color:item.sel==true?'#fff':'#000'}}>{item.name}</Text>
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ) }}
                />
            <TouchableOpacity
              onPress={()=>{this.profile()}}
              style={{marginVertical:50,backgroundColor:'#5599D2',borderRadius:10,justifyContent:'center',alignSelf:'center',alignItems:'center'}}>
              <Text style={{fontSize:20,color:'#fff',paddingHorizontal:35,paddingVertical:8}}>Update</Text>
            </TouchableOpacity>
          </ScrollView>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  albumCover: {
    width: 250,
    height: 250
  },
  trackInfo: {
    padding: 40,
    backgroundColor: '#fff'
  },
  trackInfoText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    color: '#550088'
  },
  largeText: {
    fontSize: 22
  },
  smallText: {
    fontSize: 16
  },
  control: {
    margin: 20
  },
  controls: {
    flexDirection: 'row'
  }
})

const mapStateToProps =(state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(UseProfile);
