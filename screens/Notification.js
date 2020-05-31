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
import SellerOrderCompo from '../components/SellerOrderCompo';
import SellerOrderAnnounce from '../components/SellerOrderAnnounce';
// import   Insurence from'../screens/Insurence';
class Notification extends React.Component {

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
          <View  style={{justifyContent:'space-between',backgroundColor:'#fff',borderBottomWidth:0.5,
            height:55,width:width,flexDirection:'row',alignItems:'center'}}>

              <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                   <MaterialIcons name={'arrow-back'} size={30} color={'#000'} style={{paddingLeft:10}}/>
              </TouchableOpacity>
                <Text style={{fontSize:20,color:'#000',alignItems:'center',paddingTop:10,paddingBottom:6,marginRight:width*0.7}}>Alert</Text>
                {/* <TouchableOpacity style={{ marginHorizontal: 10 }}   >
                   <Image source={require('../AllImage/Icons-POI/notification.png')} style={{height:22,width:20,tintColor:'#fff'}}  />
                </TouchableOpacity> */}

          </View>
          <ScrollableTabView
                refreshControlStyle={{backgroundColor: 'red'}}
                tabBarBackgroundColor={'#fff'}
                tabBarActiveTextColor={'#000'}
                tabBarInactiveTextColor={'#000'}
                tabBarTextStyle={{fontSize: 16}}
                style={{flex:1,}}
                tabBarUnderlineStyle={{ backgroundColor: 'blue', height: 3,}}
                goToPage={(tabView) => { this.tabView = tabView; }}
                renderTabBar={() => <ScrollableTabBar />}
                ovescroll={true}
                initialPage={0}>

                <ScrollView  tabLabel="Notification " style={{backgroundColor:'#fff',marginTop:-20}} >
                    <SellerOrderAnnounce navigation={this.props.navigation} />
                </ScrollView>

                <ScrollView tabLabel="Announcement" style={{backgroundColor:'#fff',marginTop:-20}}>
                 <Insurence navigation={this.props.navigation}   />
                </ScrollView>



            </ScrollableTabView>
          {/* <ScrollView style={{marginVertical:0,backgroundColor:'#CECECF',paddingBottom:100}}>
            <FlatList
                data={this.state.prod}
                extraData={this.state}
                showsHorizontalScrollIndicator={false}
                inverted={false}
                scrollToEnd={true}

                nestedScrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index})=>{
                  return(
                <View style={{flex:1,

                              marginTop:10,
                              alignItems:'center',
                              borderWidth:0,
                              paddingHorizontal:2,
                              paddingVertical:2,
                              width:width*0.9,
                              borderColor:'#000',
                              justifyContent:'center',alignSelf:'center',
                              borderRadius:17,backgroundColor:'#fff',shadowColor:"#fefefe",
                              shadowOpacity:0.2,shadowRadius:15,
                              shadowOffset:{height:2,width:0},elevation:5,}}>
                    <View style={{paddingVertical:10,paddingHorizontal:4,width:width*0.85,alignSelf:'center',flexDirection:'row',justifyContent:'space-between'}}>
                            <View style={{height:22,width:22}}>
                            <Image source={item.img} style={{height:'100%',width:'100%'}}/>
                            </View>
                            <Text style={{fontSize:14,color:'#000'}}>{item.name}</Text>
                            <Text style={{fontSize:14,color:'#000'}}>{item.value}</Text>


                    </View>
                </View>) }}
                />
          </ScrollView> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
