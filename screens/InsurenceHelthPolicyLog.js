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

import InsurenceLog from '../screens/InsurenceLog';
import InsurenceLogNotCover from '../screens/InsurenceLogNotCover';
import constants  from '../constants/Settings.js';
const serverURL = constants.url;
const themeColor= constants.themeColor;
const { width } = Dimensions.get('window');
const height = width * 0.8

class InsurenceHelthPolicyLog extends React.Component {

  static navigationOptions = {
    header:null,
  }

  constructor(props) {
    super(props);
    const policyFeature=this.props.navigation.getParam('item',null)
    console.log(policyFeature,'policyFeature')
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
        pk:policyFeature.pk,
        policies:[]
    }
    this.playbackInstance = null;
  }

  policiesFetures=async()=>{
    const userToken = await AsyncStorage.getItem('userpk');
    const sessionid = await AsyncStorage.getItem('sessionid');
    const csrf = await AsyncStorage.getItem('csrf');
    fetch(serverURL+'/api/POS/policy/'+this.state.pk+'/', {
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
       console.log(responseJson,'responseJson')
       this.setState({policies:responseJson})
    })
    .catch((error) => {
      return
    });
  }

  componentDidMount=()=>{
    this.policiesFetures();
  }

  render() {
    return (
      <View style={{flex:1}}>
          <View style={{height:Constants.statusBarHeight,backgroundColor:'#103368'}}></View>
          <View  style={{justifyContent:'space-between',backgroundColor:'#D0F2FF',borderBottomWidth:0,
            height:55,width:width,flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                   <MaterialIcons name={'arrow-back'} size={30} color={'#000'} style={{paddingLeft:10}}/>
              </TouchableOpacity>
                <Text style={{fontSize:22,color:'#000',alignItems:'center',paddingTop:10,paddingBottom:6,paddingRight:40}}>Individual Health insurence plan</Text>
          </View>

          <View style={{backgroundColor:'#D0F2FF',paddingHorizontal:10}}>
            <Text style={{textAlign:'center',fontSize:14}}>{this.state.policies.categories}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:10,paddingHorizontal:15}}>
              <View>
                <Text style={{fontSize:18,textAlign:'center'}}>{this.state.policies.policyDuration} Years</Text>
                <Text style={{fontSize:14,textAlign:'center'}}>Policy Duration</Text>
            </View>
            <View>
              <Text style={{fontSize:18,textAlign:'center'}}>&#8377;{this.state.policies.premiumPrice}/-</Text>
              <Text style={{fontSize:14,textAlign:'center'}}>Annual Expences</Text>
          </View>
          <View>
            <Text style={{fontSize:18,textAlign:'center'}}>{this.state.policies.insuredBy}</Text>
            <Text style={{fontSize:14,textAlign:'center'}}>Ensured by</Text>
        </View>
            </View>
          </View>
          <ScrollableTabView
                refreshControlStyle={{backgroundColor: 'red'}}
                tabBarBackgroundColor={'#D0F2FF'}
                tabBarActiveTextColor={'#000'}
                tabBarInactiveTextColor={'#000'}
                tabBarTextStyle={{fontSize: 16}}
                style={{flex:1,}}
                tabBarUnderlineStyle={{ backgroundColor: 'blue', height: 3,}}

                renderTabBar={() => <ScrollableTabBar />}
                ovescroll={true}
                initialPage={0}>

                <ScrollView  tabLabel="Features Covered" style={{backgroundColor:'#fff',marginTop:-20}} >
                    <InsurenceLog navigation={this.props.navigation} render={this.state.policies.featuresCovered} />
                </ScrollView>

                <ScrollView tabLabel="Features Not Covered" style={{backgroundColor:'#fff',marginTop:-20}}>
                    <InsurenceLogNotCover navigation={this.props.navigation} render={this.state.policies.featuresunCovered} />
                </ScrollView>

            </ScrollableTabView>
            <View style={{position:'absolute',left:0,right:0,bottom:0,borderWidth:0,
                          flexDirection:'row',alignItems:'center',justifyContent:'space-between',
                          shadowColor:"#fefefe",
                          shadowOpacity:0.2,shadowRadius:15,
                          shadowOffset:{height:2,width:0},elevation:5,}}>
                <TouchableOpacity
                      style={{width:width*0.5,marginVertical:0,backgroundColor:'#fff',borderRadius:0,
                              justifyContent:'center',alignSelf:'center',alignItems:'center',
                              paddingVertical:15,flexDirection:'row',paddingHorizontal:10}}>
                      <Text style={{fontSize:16,color:'#000',paddingHorizontal:0,paddingHorizontal:6}}>You pay </Text>
                      <Text style={{fontSize:20,color:'#000',paddingHorizontal:0,}}>&#8377;{this.state.policies.monthlyPrice}/-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{this.props.navigation.navigate('ProductOverView')}}
                    style={{width:width*0.5,marginVertical:0,backgroundColor:'#194079',
                            borderRadius:0,justifyContent:'center',alignSelf:'center',
                            alignItems:'center',paddingVertical:15,
                            paddingHorizontal:10,flexDirection:'row'}}>
                    <Text style={{fontSize:20,color:'#fff',paddingHorizontal:10,}}>Proceed</Text>
                    <View style={{height:22,width:22,marginLeft:10}}>
                      <Image source={require('../assets/ifocus/Proceed.png')}resizeMode={'contain'}/>
                    </View>
                </TouchableOpacity>
          </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(InsurenceHelthPolicyLog);
