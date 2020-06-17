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
class InsurencehelthPolicy extends React.Component {

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
    }
    this.playbackInstance = null;
  }

  render() {
    const audio=this.props.navigation.getParam('item',null);
    console.log(audio,'audio');
    return (
      <View style={{flex:1}}>
          <View style={{height:Constants.statusBarHeight,backgroundColor:'#103368'}}></View>
          <View  style={{justifyContent:'space-between',backgroundColor:'#D5F3FF',borderBottomWidth:0,
            height:55,width:width,flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                   <MaterialIcons name={'arrow-back'} size={30} color={'#000'} style={{paddingLeft:10}}/>
              </TouchableOpacity>
                <Text style={{fontSize:24,color:'#000',alignItems:'center',paddingTop:10,paddingBottom:6,marginRight:width*0.3}}>Individual Health</Text>
          </View>
          <View style={{backgroundColor:'#D5F3FF',paddingHorizontal:10}}>
            <Text style={{textAlign:'center',fontSize:24,paddingBottom:10}}>Insurence Plan</Text>
            <Text style={{textAlign:'center',fontSize:14}}>Health Insurence to cover all related expences</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:10,paddingHorizontal:15}}>
              <View>
                <Text style={{fontSize:18,textAlign:'center'}}>5 Years</Text>
                <Text style={{fontSize:14,textAlign:'center'}}>Policy Duration</Text>
            </View>
            <View>
              <Text style={{fontSize:18,textAlign:'center'}}>549/-</Text>
              <Text style={{fontSize:14,textAlign:'center'}}>Annual Expences</Text>
          </View>
          <View>
            <Text style={{fontSize:18,textAlign:'center'}}>HDFC</Text>
            <Text style={{fontSize:14,textAlign:'center'}}>Ensured by</Text>
        </View>
            </View>
          </View>
          <ScrollableTabView
                refreshControlStyle={{backgroundColor: 'red'}}
                tabBarBackgroundColor={'#D5F3FF'}
                tabBarActiveTextColor={'#000'}
                tabBarInactiveTextColor={'#000'}
                tabBarTextStyle={{fontSize: 16}}
                style={{flex:1,}}
                tabBarUnderlineStyle={{ backgroundColor: 'blue', height: 3,}}
                goToPage={(tabView) => { this.tabView = tabView; }}
                renderTabBar={() => <ScrollableTabBar />}
                ovescroll={true}
                initialPage={0}>

                <ScrollView  tabLabel="Features Covered" style={{backgroundColor:'#fff',marginTop:-20}} >
                    <Insurence navigation={this.props.navigation} />
                </ScrollView>

                <ScrollView tabLabel="Features Not Covered" style={{backgroundColor:'#fff',marginTop:-20}}>
                    <Insurence navigation={this.props.navigation}  />
                </ScrollView>
            </ScrollableTabView>
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

export default connect(mapStateToProps, mapDispatchToProps)(InsurencehelthPolicy);
