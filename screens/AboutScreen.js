import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
TouchableWithoutFeedback,
  Dimensions,ImageBackground,
  TextInput, FlatList, AsyncStorage, Alert, Linking, PermissionsAndroid, ToastAndroid,ActivityIndicator
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import { FontAwesome,MaterialIcons,Entypo ,Ionicons} from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import  Constants  from 'expo-constants';
import {SearchBar,Card}from 'react-native-elements';
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
import Carousel, { Pagination } from 'react-native-snap-carousel';
// import {Slider} from 'react-native-slider';
// import VolumeSlider from 'react-native-volume-slider';
// import { Player } from 'react-native-audio-streaming';
import { Audio } from 'expo-av';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview';
import TabBar from '../components/TabBar';
import SellerOrderCompo from '../components/SellerOrderCompo';
import SellerOrderAnnounce from '../components/SellerOrderAnnounce';
class AboutScreen extends React.Component {

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
         prod:[{uri:require('../assets/ifocus/products_sanitizer.png'),name:'sanitizer & handwash'},],
      add:false,
      count:1,
    }
    this.playbackInstance = null;
  }


  // componentDidMount=async()=>{
  //   this.getStore()
  // }


next=(item)=>{
  console.log('ddddddddddddddddddddd')
  if(item.name=='sanitizer & handwash'){
    this.props.navigation.navigate('SenitizerScreen',{item:item});
  }
  else if(item.name=='multivitamins'){
    this.props.navigation.navigate('Multivitamins',{item:item});
  }
  else if(item.name=='cough & cold'){
    this.props.navigation.navigate('CoughcoldScreen',{item:item});
  }else{
    Alert.alert('page not found');
  }
}


minus = ()=>{
         // if(this.state.count==0){
         //   this.setState({count:this.state.count})
         //   return
         // }
         // this.setState({count:this.state.count-1})

         if(this.state.count==1){
           this.state.add = false;
           this.setState({count:this.state.count})
           return


         }
         this.state.count = this.state.count-1;
         this.setState({count:this.state.count})
      }

     plus = ()=>{
         // this.setState({count:this.state.count+1})
         this.state.count = this.state.count+1;
         this.setState({count:this.state.count})
      }

1
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
              <Text style={{fontSize:20,marginRight:width*0.6}}>About us</Text>


          </View>

          {/* <View style={{paddingHorizontal:15,paddingVertical:10,marginVertical:15}}><Text style={{fontSize:25}}>Health Product</Text></View> */}
          <ScrollView style={{marginVertical:0,backgroundColor:'#fff',paddingBottom:200}}>


            {/* <FlatList
                data={this.state.prod}
                showsHorizontalScrollIndicator={false}
                extraData={this.state.prod}
                style={{}}
                inverted={false}
                scrollToEnd={true}
                horizontal={false}

                nestedScrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index})=>{
               return(
             <TouchableOpacity style={{flex:1,borderWidth:1,borderColor:'#C7C7C7',width:width*0.95,backgroundColor:'#fff',paddingHorizontal:10,paddingTop:8,marginBottom:8,marginHorizontal:10}}
                            >
               <TouchableOpacity   >


                   <View style={{flex:1,alignItems:'center',width:width*0.9,flexDirection:'row',paddingBottom:6,justifyContent:'space-between'}}>
                       <Text style={{ fontSize: 18, color: 'grey', fontWeight: '300',textAlign:'left' }} >Naveen Kumar Ready</Text>
                       <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:2,backgroundColor:'#fff',}}><Text>10 May 2020</Text></View>
                   </View>
                   <View style={{borderWidth:0}}>
                       <Text style={{ fontSize: 14, color: 'grey',textAlign:'left' }} >14 cross road,Madiwala</Text>
                        <Text style={{ fontSize: 14, color: 'grey',textAlign:'left' }} >Landmark: Safa super market</Text>
                         <Text style={{ fontSize: 14, color: 'grey',textAlign:'left' }} >Insured By: HDFC</Text>
                          <Text style={{ fontSize: 14, color: 'grey',textAlign:'left' }} >5 Years</Text>

                   </View>

                 </TouchableOpacity>
               </TouchableOpacity>
             ) }}
             /> */}
             <Text style={{fontSize:22,paddingHorizontal:20,paddingVertical:15}}>About iFocus</Text>

             <Text style={{paddingHorizontal:20,fontSize:18,paddingVertical:10}}>iFocus Systec expertizes in assisting companies with
               faster and more efficient “Faster to market” strategies and helps in
               driving down the operational cost with aberrant Product Engineering
               and Quality Assurance Services across industries ...
               We are a technology and process-driven organization, focused,
               fast, and flexible. We invest sufficient time and resources to
               understand customer requirements, and build role-based curricula
               towards setting up a ‘Customer University’ of sorts,
               specific to business needs.</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutScreen);
