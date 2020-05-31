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
import Modal from "react-native-modal";
class CartScreen extends React.Component {

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
        prod:[{img:require('../assets/ifocus/himalayannhandwash.png'),name:''}],
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
        prod:[{uri:require('../assets/ifocus/cart_himalayan.png'),add:false,count:1,name:'sanitizer & handwash',name2:'senitizer & handwash'},
              {uri:require('../assets/ifocus/Cofsils.png'),add:false,count:1,name:'Cofsils 10 tablet',name2:'Cough & Cold'},
              {uri:require('../assets/ifocus/cart_Revital.png'),add:false,count:1,name:'Revital H vitamin tablet',name2:'Multivitamins'},],
      add:false,
      count:1,
      model3:false,
      select:false,
      add:false
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


     minus = (item,index)=>{
         // if(this.state.count==0){
         //   this.setState({count:this.state.count})
         //   return
         // }
         // this.setState({count:this.state.count-1})

         if(this.state.prod[index].count==1){
           this.state.prod[index].add = false;
           this.setState({prod:this.state.prod})
           return


         }
         this.state.prod[index].count = this.state.prod[index].count-1;
         this.setState({prod:this.state.prod})
      }

     plus = (item,index)=>{
         // this.setState({count:this.state.count+1})
         this.state.prod[index].count = this.state.prod[index].count+1;
         this.setState({prod:this.state.prod})
      }
      add=(item,index)=>{
        this.state.prod[index].add = true;
        this.setState({prod:this.state.prod})
      }


  render() {
    const audio=this.props.navigation.getParam('item',null);
    console.log(audio,'audio');
    return (
      <View style={{flex:1}}>

          <View style={{height:Constants.statusBarHeight,backgroundColor:'#103368'}}></View>
          <View  style={{justifyContent:'space-between',backgroundColor:'#fff',borderBottomWidth:0.5,
                          height:55,width:width,flexDirection:'row',alignItems:'center'}}>
              <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                   <MaterialIcons name={'arrow-back'} size={30} color={'#000'} style={{paddingLeft:10}}/>
              </TouchableOpacity>
              <Text style={{fontSize:20,marginHorizontal:10,marginRight:width*0.6}}>CartItem</Text>
              </View>

          </View>

          {/* <View style={{paddingHorizontal:15,paddingVertical:10,marginVertical:15}}><Text style={{fontSize:25}}>Health Product</Text></View> */}
          <ScrollView style={{marginVertical:0,backgroundColor:'#fff',paddingBottom:200}}>


       <FlatList
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
             <TouchableOpacity style={{flex:1,borderWidth:1,borderColor:'#C7C7C7',width:width*0.95,backgroundColor:'#fff',paddingHorizontal:10,paddingTop:8,marginVertical:8,marginHorizontal:10}}
                            >
               <TouchableOpacity >
                 <View style={{flex:1,flexDirection:'row',paddingVertical:8}}>
                   <View style={{flex:0.3,}}>
                     <View style={{width:width*0.2,height:width*0.2,borderWidth:0}}>
                       <Image source={item.uri} style={{height:'100%',width:'100%'}}/>
                     </View>
                   </View>
                   <View style={{flex:0.5,}}>
                     <Text style={{ fontSize: 18, color: 'grey', fontWeight: '300',textAlign:'left' }}>{item.name}</Text>
                     <Text style={{ fontSize: 16, color: 'grey', fontWeight: '300',textAlign:'left' }}>{item.name2}</Text>
                     <Text style={{ fontSize: 16, color: 'grey', fontWeight: '300',textAlign:'left' }}>&#8377;120&#8377;150</Text>
                   </View>
                   <View style={{flex:0.2,}}>
                     <View style={{width:width*0.2,flexDirection:'row',justifyContent:'center',alignItems:'center',borderWidth:1,borderRadius:17}}>
                                <TouchableOpacity onPress={()=>{this.minus(item,index)}} style={{borderWidth:0,paddingVertical:0,paddingHorizontal:6}}>
                                  <Text style={{paddingHorizontal:4,fontSize:22}}>-</Text>
                                </TouchableOpacity>

                                <Text style={{paddingHorizontal:10}}>{item.count}</Text>
                                <TouchableOpacity onPress={()=>{this.plus(item,index)}}style={{borderWidth:0,paddingVertical:0,paddingHorizontal:6}}>
                                  <Text style={{paddingHorizontal:4,fontSize:22}}>+</Text>
                                  </TouchableOpacity>
                              </View>
                   </View>
                 </View>

                 </TouchableOpacity>
               </TouchableOpacity>
             ) }}
           />
          </ScrollView>
          <TouchableOpacity style={{backgroundColor:'#477FD4',position:'absolute',left:0,right:0,bottom:0}}
            onPress={()=>{this.props.navigation.navigate('Checkout')}}>
            <Text style={{alignSelf:'center',textAlign:'center',fontSize:20,paddingVertical:10,color:'#fff'}}>Proceed to checkout</Text>
          </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
