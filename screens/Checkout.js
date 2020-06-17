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
class checkout extends React.Component {

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
      add:false,
      select1:false,
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
    const add=this.props.navigation.getParam('add',null);
    console.log(add,'add');
    return (
      <View style={{flex:1}}>

          <View style={{height:Constants.statusBarHeight,backgroundColor:'#103368'}}></View>
          <View  style={{justifyContent:'space-between',backgroundColor:'#fff',borderBottomWidth:0.5,
                          height:55,width:width,flexDirection:'row',alignItems:'center'}}>
              <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                   <MaterialIcons name={'arrow-back'} size={30} color={'#000'} style={{paddingLeft:10}}/>
              </TouchableOpacity>
              <Text style={{fontSize:20,marginHorizontal:10,marginRight:width*0.6}}>Checkout</Text>
              </View>

          </View>

          <ScrollView style={{marginVertical:0,backgroundColor:'#fff',paddingBottom:200,marginHorizontal:15}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:10}}>
              <View style={{alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:16,}}>Total Item</Text>
                <Text>3</Text>
             </View>
              <View style={{alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:16,}}>Saved</Text>
                <Text>&#8377;90/-</Text></View>
              <View style={{alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:16,}}>Delivery</Text>
                <Text>&#8377;0/-</Text>
              </View>
              <View style={{alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:16,}}>Total</Text>
                <Text >&#8377;360/-</Text></View>
          </View>
          <Text style={{fontSize:20}}>Deliver To</Text>
          {add==true?<View style={{marginVertical:10}}><View style={{flex:1,alignItems:'center',width:width*0.9,flexDirection:'row',paddingBottom:4,justifyContent:'space-between'}}>
              <Text style={{ fontSize: 16, color: 'grey', fontWeight: '300',textAlign:'left' }} >Back/Door no</Text>
          </View>
          <View style={{flex:1,alignItems:'center',width:width*0.9,flexDirection:'row',paddingBottom:4,justifyContent:'space-between'}}>
              <Text style={{ fontSize: 16, color: 'grey', fontWeight: '300',textAlign:'left' }} >14 cross road,Madiwla</Text>
          </View>
          <View style={{flex:1,alignItems:'center',width:width*0.9,flexDirection:'row',paddingBottom:4,justifyContent:'space-between'}}>
              <Text style={{ fontSize: 16, color: 'grey', fontWeight: '300',textAlign:'left' }} >Landmark:Safa super market</Text>
          </View>
          <View style={{borderWidth:0}}>
              <Text style={{ fontSize: 16, color: 'grey',textAlign:'left' }} >Pincode:560068</Text>
          </View></View>:
          <TouchableOpacity style={{hieght:width*0.2,borderWidth:1,justifyContent:'center',marginVertical:10}}
            onPress={()=>this.props.navigation.navigate('MyAddress',{address:true})}>
                <Text style={{alignSelf:'center',color:'gray',paddingVertical:15}}>click to select address</Text>
          </TouchableOpacity>}
          <Text style={{fontSize:20,paddingVertical:6}}>Coupan code</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <TextInput style={{width:width*0.7,borderWidth:1,paddingVertical:4,borderColor:'gray'}}
                  onChangeText={(state)=>this.setState({state})}
                  value={this.state.state}
                    ></TextInput>
              <TouchableOpacity style={{paddingVertical:4,paddingHorizontal:4,width:width*0.25,borderWidth:0,backgroundColor:'#477FD4'}}>
                <Text style={{fontSize:18,textAlign:'center',color:'#fff'}}>Apply</Text>
              </TouchableOpacity>
        </View>
        <Text style={{fontSize:20,paddingVertical:6}}>Payment Option</Text>
        <View>
          <View style={{flexDirection:'row',paddingVertical:4,paddingHorizontal:10}}>
            <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}
              onPress={()=>this.setState({select:!this.state.select,select1:false})}>
              {this.state.select==true?<Ionicons name={'md-radio-button-on'} size={18}/>:<Ionicons name={'md-radio-button-off'} size={18}/>}
              </TouchableOpacity>
              <Text style={{fontSize:18,paddingHorizontal:10}}>Cash on Delivery</Text>
          </View>
          <View style={{flexDirection:'row',paddingVertical:4,paddingHorizontal:10}}>
            <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}
              onPress={()=>this.setState({select1:!this.state.select1,select:false})}>
              {this.state.select1==true?<Ionicons name={'md-radio-button-on'} size={18}/>:<Ionicons name={'md-radio-button-off'} size={18}/>}
              </TouchableOpacity>
              <Text style={{fontSize:18,paddingHorizontal:10}}>Cradit/Debit Card</Text>
            </View>
        </View>
          </ScrollView>
          <TouchableOpacity style={{backgroundColor:'#477FD4',position:'absolute',left:0,right:0,bottom:0}}
            onPress={()=>{this.props.navigation.navigate('Checkout')}}>
            <Text style={{alignSelf:'center',textAlign:'center',fontSize:20,paddingVertical:10,color:'#fff'}}>Place the Order</Text>
          </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(checkout);
