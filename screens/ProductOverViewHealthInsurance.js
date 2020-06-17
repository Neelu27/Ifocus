import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,ActivityIndicator,
  Text,ToastAndroid,Image,
  TouchableOpacity,Linking,
  View,AsyncStorage,Alert,
  Dimensions,ImageBackground,
  TextInput,FlatList,PermissionsAndroid
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import { FontAwesome,MaterialIcons,Entypo ,Ionicons,MaterialCommunityIcons,AntDesign} from '@expo/vector-icons';
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
import { Audio } from 'expo-av';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview';
import TabBar from '../components/TabBar';

import InsurenceLog from '../screens/InsurenceLog';
import InsurenceLogNotCover from '../screens/InsurenceLogNotCover';
class ProductOverViewHealthInsurance extends React.Component {

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
        click:false,
    }
    this.playbackInstance = null;
  }

  postHeading=()=>{
    return(
      <View>
      <View style={{borderWidth:1,borderRadius:15,shadowColor:"#fefefe",paddingHorizontal:20,paddingVertical:10,
                    marginVertical:10,marginHorizontal:10,borderColor:"#7d7d7d",alignSelf:'center'}}>
              <Text style={{textAlign:'center',fontSize:18,paddingTop:10}}>Health Insurence</Text>
              <View style={{flexDirection:'row',borderWidth:0,alignItems:'center',alignSelf:'center'}}>
                  <View style={{height:40,width:65,borderWidth:0.5}}></View>
                  <Text style={{textAlign:'center',fontSize:18,paddingHorizontal:10}}>Post-Heading</Text>
              </View>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between',borderWidth:0,paddingVertical:10,paddingHorizontal:30}}>
         <Text style={{fontSize:14,color:'#585858',textAlign:'center'}}>Total Premium amount</Text>
         <Text style={{fontSize:16,color:'#000',textAlign:'center'}}>&#8377; 5,561</Text>
      </View>
    </View>
    )
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
                <Text style={{fontSize:22,color:'#000',alignItems:'center',paddingTop:10,paddingBottom:6,paddingRight:width*0.42}}></Text>
          </View>

          <View style={{backgroundColor:'#D0F2FF',paddingHorizontal:10}}>
            <Text style={{textAlign:'center',fontSize:18,paddingRight:width*0.17,color:'#5d5d5d',paddingBottom:10}}></Text>
          </View>
          <ScrollView style={{borderWidth:0}}>
              {this.postHeading()}
              <View style={{margin:15,paddingBottom:80}}>
                <Text style={{fontSize:18,paddingBottom:10}}>Date of Birth</Text>
                <View style={{flexDirection:'row'}}>
                  <TextInput style={{backgroundColor:'#ffffff',
                                    borderRadius:0,
                                    paddingHorizontal:20,
                                    paddingVertical:10,
                                    fontSize:16,
                                    width:width*0.92,
                                    borderWidth:1,
                                    borderColor:'#000',marginBottom:40,
                                    marginTop:0,backgroundColor:'#fff'}}
                               onChangeText={(mobileNo)=>this.setState({mobileNo})}
                               value={this.state.mobileNo}
                               placeholder={'Father'}
                               >
                  </TextInput>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <View>
                    <Text style={{fontSize:18}}>Height</Text>
                    <TextInput style={{backgroundColor:'#ffffff',
                                      borderRadius:7,
                                      paddingHorizontal:0,
                                      paddingVertical:10,
                                      fontSize:16,
                                      width:width*0.4,
                                      borderBottomWidth:1,
                                      borderColor:'#000',marginBottom:40,
                                      marginTop:0,backgroundColor:'#fff'}}
                                 onChangeText={(mobileNo)=>this.setState({mobileNo})}
                                 value={this.state.mobileNo}
                                 placeholder={'Height in cms'}
                                 keyboardType={'numeric'}>
                    </TextInput>
                  </View>
                  <View>
                    <Text style={{fontSize:18}}>Weight</Text>
                    <TextInput style={{backgroundColor:'#ffffff',
                                      borderRadius:7,
                                      paddingHorizontal:0,
                                      paddingVertical:10,
                                      fontSize:16,
                                      width:width*0.4,
                                      borderBottomWidth:1,
                                      borderColor:'#000',marginBottom:40,
                                      marginTop:0,backgroundColor:'#fff'}}
                                 onChangeText={(mobileNo)=>this.setState({mobileNo})}
                                 value={this.state.mobileNo}
                                 placeholder={'Weight in cms'}
                                 keyboardType={'numeric'}>
                    </TextInput>
                  </View>
                </View>
                <Text style={{fontSize:18,paddingBottom:10}}>Occupation</Text>
                <TextInput style={{backgroundColor:'#ffffff',
                                  borderRadius:0,
                                  paddingHorizontal:20,
                                  paddingVertical:10,
                                  fontSize:16,
                                  width:width*0.92,
                                  borderWidth:1,
                                  borderColor:'#000',marginBottom:40,
                                  marginTop:0,backgroundColor:'#fff'}}
                             onChangeText={(mobileNo)=>this.setState({mobileNo})}
                             value={this.state.mobileNo}
                             placeholder={'Select'}
                             keyboardType={'numeric'}>
                </TextInput>
                <Text style={{fontSize:18,paddingBottom:10}}>Address line #1</Text>
                <TextInput style={{backgroundColor:'#ffffff',
                                  borderRadius:7,
                                  paddingHorizontal:20,
                                  paddingVertical:10,
                                  fontSize:16,
                                  width:width*0.92,
                                  borderBottomWidth:1,
                                  borderColor:'#000',marginBottom:40,
                                  marginTop:0,backgroundColor:'#fff'}}
                             onChangeText={(mobileNo)=>this.setState({mobileNo})}
                             value={this.state.mobileNo}
                             placeholder={'Your Address here'}
                             >
                </TextInput>
                <TextInput style={{backgroundColor:'#ffffff',
                                  borderRadius:7,
                                  paddingHorizontal:20,
                                  paddingVertical:10,
                                  fontSize:16,
                                  width:width*0.92,
                                  borderBottomWidth:1,
                                  borderColor:'#000',marginBottom:40,
                                  marginTop:0,backgroundColor:'#fff'}}
                             onChangeText={(mobileNo)=>this.setState({mobileNo})}
                             value={this.state.mobileNo}
                             placeholder={'Your Address here'}
                             >
                </TextInput>
                <View style={{flexDirection:'row',borderWidth:0,alignItems:'center',marginTop:10}}>
                  <View style={{flex:0.1,borderWidth:0,alignSelf:'flex-start',alignItems:'flex-start'}}>{this.state.click?<TouchableOpacity onPress={()=>this.setState({click:false})}>
                    <AntDesign name={'checksquareo'} size={32}/>
                  </TouchableOpacity>:<TouchableOpacity onPress={()=>this.setState({click:true})}>
                    <MaterialCommunityIcons name={'square-outline'} size={32}/>
                  </TouchableOpacity>}</View>
                  <View style={{flex:0.88}}>
                  <Text style={{fontSize:16,paddingHorizontal:4}}>I here by declare the . Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacinia consectetur amet bibendum gravida sed quis. Vitae ut cras et velit pellentesque elit imperdiet. Aliquam quis venenatis risus, vulputate mauris imperdiet consequat, velit elit.</Text></View>
                </View>
              </View>

              <View style={{position:'absolute',left:0,right:0,bottom:0,borderWidth:0,
                            flexDirection:'row',alignItems:'center',justifyContent:'center',
                            shadowColor:"#fefefe",backgroundColor:'#194079',
                            shadowOpacity:0.5,shadowRadius:15,
                            shadowOffset:{height:2,width:0},elevation:5,}}>
                  <TouchableOpacity
                      onPress={()=>{this.props.navigation.navigate('HomeScreen')}}
                      style={{marginVertical:0,
                              borderRadius:0,justifyContent:'center',alignSelf:'center',
                              alignItems:'center',paddingVertical:15,
                              paddingHorizontal:10,flexDirection:'row'}}>
                      <Text style={{fontSize:20,color:'#fff',paddingHorizontal:10,}}>Proceed to pay</Text>
                      <View style={{height:22,width:22,marginLeft:10}}>
                        <Image source={require('../assets/ifocus/Proceed.png')}resizeMode={'contain'}/>
                      </View>
                  </TouchableOpacity>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductOverViewHealthInsurance);
