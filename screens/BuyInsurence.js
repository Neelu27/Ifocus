import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,

  Dimensions,ImageBackground,
  TextInput, FlatList, AsyncStorage, Alert, Linking, PermissionsAndroid, ToastAndroid,ActivityIndicator
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
import { Slider } from 'react-native-elements';
// import {Slider} from 'react-native-slider';
// import VolumeSlider from 'react-native-volume-slider';
// import { Player } from 'react-native-audio-streaming';
import { Audio } from 'expo-av';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview';
import TabBar from '../components/TabBar';

import Insurence from '../screens/Insurence';
class BuyInsurence extends React.Component {

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
        RecentSongs:[{img:require('../assets/sound/s3.jpeg'),name:'25 Essentials Shiva'},
                     {img:require('../assets/sound/s4.jpeg'),name:'Sunderkand'},
                     {img:require('../assets/sound/s2.jpeg'),name:'Top Chalisha Collection'},
                     {img:require('../assets/sound/s11.jpeg'),name:'BhagwatGita'},
                     {img:require('../assets/sound/s1.jpeg'),name:'Bhajan Sangrah'},],
        artist:[{img:require('../assets/sound/anu.jpeg'),name:'Anuradha Paudwal'},
                {img:require('../assets/sound/hari.jpg'),name:'Hariharan'},
                {img:require('../assets/sound/jag.jpeg'),name:'Jagjit Singh '},
                {img:require('../assets/sound/shan.jpeg'),name:'Shankar Mahadevan'},
                {img:require('../assets/sound/shre.jpg'),name:'Shreya Ghoshal'},
                {img:require('../assets/sound/hari.jpeg'),name:'Hariharan'},],
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
         prod:[{name:'New products Detail',ite:'items:22',value:'22 min ago',img:require('../assets/video/v.png')},
              {name:'New products Detail Doc',ite:'items:22',value:'22 min ago',img:require('../assets/video/word.png')},
              {name:'New products Detail',ite:'items:22',value:'22 min ago',img:require('../assets/video/powerpoint.png')},
              {name:'New products Detail Doc',ite:'items:22',value:'22 min ago',img:require('../assets/video/v.png')},
              {name:'New products Detail Doc',ite:'items:22',value:'22 min ago',img:require('../assets/video/word.png')},
              {name:'New products Detail',ite:'items:22',value:'22 min ago',img:require('../assets/video/powerpoint.png')},
              {name:'New products Detail',ite:'items:22',value:'22 min ago',img:require('../assets/video/v.png')},
                   {name:'New products Detail Doc',ite:'items:22',value:'22 min ago',img:require('../assets/video/word.png')},
                   {name:'New products Detail',ite:'items:22',value:'22 min ago',img:require('../assets/video/powerpoint.png')},
                   {name:'New products Detail Doc',ite:'items:22',value:'22 min ago',img:require('../assets/video/v.png')},
                   {name:'New products Detail Doc',ite:'items:22',value:'22 min ago',img:require('../assets/video/word.png')},
                   {name:'New products Detail',ite:'items:22',value:'22 min ago',img:require('../assets/video/powerpoint.png')}]
    }
    this.playbackInstance = null;
  }


  // componentDidMount=async()=>{
  //   this.getStore()
  // }



  render() {
    const audio=this.props.navigation.getParam('item',null);
    console.log(audio,'audio');
    return (
      <View style={{flex:1}}>
          <View style={{height:Constants.statusBarHeight,backgroundColor:'#103368'}}></View>
          <View  style={{justifyContent:'space-between',backgroundColor:'#55CED2',borderBottomWidth:0,
            height:55,width:width,flexDirection:'row',alignItems:'center'}}>

              <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                   <MaterialIcons name={'arrow-back'} size={30} color={'#000'} style={{paddingLeft:10}}/>
              </TouchableOpacity>
                <Text style={{fontSize:24,color:'#000',alignItems:'center',paddingTop:10,paddingBottom:6,marginRight:width*0.3}}>Individual Health</Text>
                {/* <TouchableOpacity style={{ marginHorizontal: 10 }}   >
                   <Image source={require('../AllImage/Icons-POI/notification.png')} style={{height:22,width:20,tintColor:'#fff'}}  />
                </TouchableOpacity> */}

          </View>
          <View style={{backgroundColor:'#55CED2',paddingHorizontal:10}}>
            <Text style={{textAlign:'center',fontSize:24,paddingBottom:10}}>Insurence Plan</Text>
          </View>

          <ScrollView style={{marginVertical:0,backgroundColor:'#fff',paddingBottom:100,paddingTop:15,paddingHorizontal:15}}>
              <Text style={{fontSize:16,textAlign:'left',paddingVertical:10}}>Health insurance is an agreement between an insurance
                 provider and an individual wherein the former guarantees
                 to take care of certain medical costs of the latter based
                 on the investment made.
                 Some plans offer health insurance for individuals while
                 others offer health insurance for family and group.</Text>
              <Text style={{fontSize:18,textAlign:'left',paddingVertical:10}}>Key features </Text>
              <Text style={{fontSize:16,textAlign:'left',paddingVertical:6}}>This kind of health insurance for individuals </Text>
              <Text style={{fontSize:16,textAlign:'left',paddingVertical:6}}>offers cover only for the insured individual.</Text>
              <Text style={{fontSize:16,textAlign:'left',paddingVertical:6}}>The insurance provider covers certain medical </Text>
              <Text style={{fontSize:16,textAlign:'left',paddingVertical:6}}>costs of the insured based on the premium paid.</Text>
              <Text style={{fontSize:16,textAlign:'left',paddingVertical:6}}>costs of the insured based on the premium paid.</Text>
              <Text style={{fontSize:18,textAlign:'left',paddingVertical:10}}>Advantage </Text>
              <Text style={{fontSize:16,textAlign:'left',paddingVertical:6}}>The plan is best suited for individuals with higher health risks. </Text>
              <Text style={{fontSize:16,textAlign:'left',paddingVertical:6}}>Single individuals with family members who are already insured.</Text>
              <Text style={{fontSize:16,textAlign:'left',paddingVertical:6}}>An individual who wants to earn the benefit of the sum assured rather than floating sum assured. </Text>
              <TouchableOpacity
                onPress={()=>{this.props.navigation.navigate('BuyInsurenceNext')}}
                style={{marginVertical:20,backgroundColor:'#5599D2',borderRadius:10,justifyContent:'center',alignSelf:'center',alignItems:'center'}}>
                <Text style={{fontSize:20,color:'#fff',paddingHorizontal:width*0.15,paddingVertical:8}}>Apply</Text>
              </TouchableOpacity>
          </ScrollView>
     </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//
//   },
//   slider: {
//     height: 30,
//     marginLeft: 7,
//   }
// });
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyInsurence);
