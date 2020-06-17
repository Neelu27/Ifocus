import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,PermissionsAndroid,
  TouchableOpacity,ToastAndroid,
  View,Alert,Linking,
  TouchableWithoutFeedback,
  Dimensions,ImageBackground,
  TextInput,FlatList,AsyncStorage,ActivityIndicator
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
import constants  from '../constants/Settings.js';
const serverURL = constants.url;
const themeColor= constants.themeColor;
const { width } = Dimensions.get('window');
const height = width * 0.8
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import { LinearGradient } from 'expo-linear-gradient';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import { Slider } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Audio } from 'expo-av';
import moment from 'moment';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview';
import TabBar from '../components/TabBar';
import SellerOrderCompo from '../components/SellerOrderCompo';
import SellerOrderAnnounce from '../components/SellerOrderAnnounce';
class MyOrder extends React.Component {

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
        prod:[{uri:require('../assets/ifocus/products_sanitizer.png'),name:'sanitizer & handwash'},],
        add:false,
        count:1,
        order:[]
    }
    this.playbackInstance = null;
  }

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
    if(this.state.count==1){
      this.state.add = false;
      this.setState({count:this.state.count})
      return
    }
    this.state.count = this.state.count-1;
    this.setState({count:this.state.count})
  }

  plus = ()=>{
    this.state.count = this.state.count+1;
    this.setState({count:this.state.count})
  }

  orderDetails=async()=>{
    const userToken = await AsyncStorage.getItem('userpk');
    const sessionid = await AsyncStorage.getItem('sessionid');
    const csrf = await AsyncStorage.getItem('csrf');
    fetch(serverURL+'/api/POS/order/?status=newOrder&limit=10&offset=0&is_member=false', {
      headers: {
         "Cookie" :"csrf="+csrf+"; sessionid=" + sessionid +";",
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Referer': serverURL,
         'X-CSRFToken': csrf
      }
    }).then((response) =>{
      console.log(response.status,'response')
       return response.json()})
    .then((responseJson) => {
       console.log(responseJson.results,'responseJson')
       this.setState({order:responseJson.results})
    })
    .catch((error) => {
      return
    });
  }

  componentDidMount=()=>{
    this.orderDetails()
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
                   <MaterialIcons name={'arrow-back'} size={30} color={'#000'} style={{paddingLeft:10}}/>
              </TouchableOpacity>
              <Text style={{fontSize:20,marginRight:width*0.6}}>My Order</Text>
          </View>

          <ScrollView style={{marginVertical:0,backgroundColor:'#fff',paddingBottom:200}}>
            <FlatList
                data={this.state.order}
                showsHorizontalScrollIndicator={false}
                extraData={this.state.order}
                style={{}}
                inverted={false}
                scrollToEnd={true}
                horizontal={false}
                nestedScrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index})=>{
               return(
             <TouchableOpacity style={{flex:1,borderWidth:1,borderColor:'#C7C7C7',width:width*0.95,backgroundColor:'#fff',paddingHorizontal:10,paddingTop:8,marginVertical:8,marginHorizontal:10}}>
               <TouchableOpacity  onPress={()=>this.props.navigation.navigate('MyOrderDetails',{item:item})} >
                   <View style={{flex:1,alignItems:'center',width:width*0.9,flexDirection:'row',paddingBottom:6,justifyContent:'space-between'}}>
                       <Text style={{ fontSize: 16, color: 'grey', fontWeight: '300',textAlign:'left' }} >Order id: {item.pk}</Text>
                       <View style={{flexDirection:'row',alignItems:'center',color: 'grey',paddingHorizontal:2,backgroundColor:'#fff',}}>
                         <Text>Date: {moment(item.created).format('YYYY-MM-DD')}</Text>
                       </View>
                   </View>
                   <View style={{flex:1,alignItems:'center',width:width*0.9,flexDirection:'row',paddingBottom:6,justifyContent:'space-between'}}>
                       <Text style={{ fontSize: 16, color: 'grey', fontWeight: '300',textAlign:'left' }} >Total Amount: &#8377;{item.totalAmount}/-</Text>
                       <View style={{flexDirection:'row',alignItems:'center',color: 'grey',paddingHorizontal:2,backgroundColor:'#fff',}}>
                         <Text>State: {item.state}</Text>
                       </View>
                   </View>
                   <View style={{borderWidth:0}}>
                       <Text style={{ fontSize: 16, color: 'grey',textAlign:'left' }} >Payment Mode:{item.paymentMode}</Text>
                        <Text style={{ fontSize: 16, color: 'grey',textAlign:'left' }} >{item.total} Items</Text>
                   </View>
                   <View style={{borderWidth:0,justifyContent:'flex-end'}}>
                       <Text style={{ fontSize: 12, color: 'grey',textAlign:'right' }} >{item.quotation_status}</Text>
                   </View>
                 </TouchableOpacity>
               </TouchableOpacity>
             ) }}
             />
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

export default connect(mapStateToProps, mapDispatchToProps)(MyOrder);
