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

const { width } = Dimensions.get('window');
const height = width * 0.8
const SERVER_URL = settings.url
const themeColor = settings.themeColor
class Multivitamins extends React.Component {

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
        prod:[{uri:require('../assets/ifocus/cart_Revital.png'),name:'cart_Revital'},
              {uri:require('../assets/ifocus/nutrafirstvitamin.png'),name:'nutrafirst vitamin'},
              {uri:require('../assets/ifocus/nutrilitevitamin.png'),name:'nutrilite vitamin'},
              {uri:require('../assets/ifocus/inlifevitamin.png'),name:'inlife vitamin'},
              {uri:require('../assets/ifocus/cart_Revital.png'),name:'cart_Revital'},
              {uri:require('../assets/ifocus/nutrafirstvitamin.png'),name:'nutrafirst vitamin'},
              {uri:require('../assets/ifocus/nutrilitevitamin.png'),name:'nutrilite vitamin'},
              {uri:require('../assets/ifocus/inlifevitamin.png'),name:'inlife vitamin'},
              {uri:require('../assets/ifocus/cart_Revital.png'),name:'cart_Revital'},
              {uri:require('../assets/ifocus/nutrafirstvitamin.png'),name:'nutrafirst vitamin'},
              {uri:require('../assets/ifocus/nutrilitevitamin.png'),name:'nutrilite vitamin'},
              {uri:require('../assets/ifocus/inlifevitamin.png'),name:'inlife vitamin'},           ],
    }
    this.playbackInstance = null;
  }

  render() {
    const prod=this.props.navigation.getParam('item',null);
    console.log(prod,'audio');
    return (
      <View style={{flex:1}}>
          <View style={{height:Constants.statusBarHeight,backgroundColor:'#103368'}}></View>
          <View  style={{justifyContent:'space-between',backgroundColor:'#fff',borderBottomWidth:0.5,
                          height:55,width:width,flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                   <MaterialIcons name={'arrow-back'} size={30} color={'#000'} style={{paddingLeft:10}}/>
              </TouchableOpacity>
              <Text style={{fontSize:18,marginRight:width*0.4}}>{prod.name}</Text>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <TouchableOpacity
                    onPress={()=>{this.props.navigation.navigate('SearchScreen')}}
                    style={{}}>
                    <FontAwesome name={'search'} size={22} />
             </TouchableOpacity>
             <TouchableOpacity style={{ marginHorizontal: 10 ,paddingRight:5}}  onPress={()=>this.props.navigation.navigate('CartScreen')}  >
                   <Image source={require('../assets/ifocus/cart.png')}style={{height:22,width:20}}resizeMode={'contain'}  />
             </TouchableOpacity>
           </View>
          </View>

          <ScrollView style={{marginVertical:0,backgroundColor:'#fff',paddingBottom:100}}>
            <FlatList
                data={this.state.prod}
                showsHorizontalScrollIndicator={false}
                extraData={this.state.prod}
                style={{}}
                inverted={false}
                scrollToEnd={true}
                horizontal={false}
                numColumns={2}
                nestedScrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index})=>{
               return(
             <TouchableOpacity  onPress={()=>this.props.navigation.navigate('CheckoutScreen',{item:item})}
                    style={{flex:1,borderWidth:0.2,backgroundColor:'#fff',
                            marginLeft:10,marginRight:10,paddingVertical:15,
                            marginVertical:8,borderColor:"#fefefe",shadowColor:"#fefefe",
                            shadowOpacity:0.2,shadowRadius:15,
                            shadowOffset:{height:2,width:0},elevation:5,}}>
                   <View style={[{marginTop:10,borderWidth:0,alignSelf:'center',
                                  alignItems:'center',justifyContent:'center',
                                  borderColor:'#000',borderRadius:0,height:width*0.4,
                                  width:width*0.4,paddingHorizontal:15,paddingVertical:15}]}>
                       <ImageBackground source={require('../assets/ifocus/blobvector.png')} style={{flexDirection:'row',justifyContent:'center',width:'100%',height:'100%',alignItems:'center'}}>
                            <View style={{height:width*0.25,width:width*0.23,alignSelf:'center',borderWidth:0}}>
                               <Image source={item.uri} style={{width:'100%', height:'100%',marginTop:0,borderRadius:0,}}resizeMode={'contain'}/>
                           </View>
                      </ImageBackground>
                   </View>
                   <View style={{borderWidth:0,width:width*0.4,justifyContent:'center',alignSelf:'center'}}>
                       <Text style={{paddingHorizontal:10, fontSize: 16, color: 'grey', fontWeight: '300',textAlign:'left' }} >{item.name}</Text>
                       <View style={{alignItems:'center',justifyContent:'space-between',width:width*0.4,flexDirection:'row',paddingHorizontal:10}}>
                           <View style={{flexDirection:'row',alignItems:'center'}}>
                               <FontAwesome name={'rupee'} size={16}/>
                               <Text style={{ fontSize: 16, color: 'grey', fontWeight: '300',textAlign:'center' }} >153</Text>
                           </View>
                           <Text style={{ fontSize: 16, color: 'grey',color:'#55CED2', fontWeight: '300',textAlign:'center' }} >Add</Text>
                      </View>
                 </View>
               </TouchableOpacity>
             )}}
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

export default connect(mapStateToProps, mapDispatchToProps)(Multivitamins);
