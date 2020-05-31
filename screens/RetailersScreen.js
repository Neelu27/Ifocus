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



class RetailersScreen extends React.Component {

  static navigationOptions = {
    header:null,

  }


  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    const audio=this.props.navigation.getParam('item',null);
    console.log(audio,'audio');
    return (
      <View style={{flex:1}}>
          <View style={{height:Constants.statusBarHeight,backgroundColor:'#F5F5F5'}}></View>
          <ImageBackground source={require('../assets/video/back1.png')} style={{flexDirection:'row',justifyContent:'space-between',width:'101%',height:'100%',alignItems:'center'}}>
          <ScrollView>
            <View style={{height:width*2,width:width*0.89,marginVertical:15,
                          borderRadius:17,alignItems:'center',alignSelf:'center',
                          backgroundColor:'#fff'}}>
              <Text style={{fontSize:20,textAlign:'center',paddingVertical:4,marginVertical:10}}>Safa Super Market</Text>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:10}}>
                  <View style={{height:120,borderWidth:1,flex:0.3}}></View>
                  <View style={{borderWidth:1,flex:0.7}}>
                    <Text style={{fontSize:18}}>184,kamgarpur road gate</Text>
                    <Text style={{fontSize:18}}>Kuadlu</Text>
                    <Text style={{fontSize:18}}>Kudlu gate</Text>
                    <Text style={{fontSize:18}}>560068</Text>
                  </View>
              </View>
              <TouchableOpacity style={{paddingVertical:6,borderRadius:17,paddingHorizontal:15,borderWidth:0,backgroundColor:'#5586D2',alignSelf:'center'}}>
                <Text style={{color:'#fff',fontSize:20}}>Update Location</Text>
              </TouchableOpacity>
              <View style={{borderWidth:0,marginHorizontal:10,width:width*0.8}}>
                  <View style={{borderWidth:0}}>
                      <Text style={{fontSize:16,paddingVertical:10}}>Key Contact</Text>
                      <TextInput
                          style={{fontSize:16,paddingVertical:10,borderColor:'#000',
                                  shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                  shadowOffset:{height:2,width:0},elevation:5,
                                  backgroundColor:'#fff',paddingHorizontal:10,borderRadius:7}}
                          value={this.state.name	}
                          onChangeText={(name)=>{this.setState({name})}}>
                      </TextInput>
                  </View>


                  <View style={{borderWidth:0}}>
                      <Text style={{fontSize:16,paddingVertical:10}}>Email</Text>
                      <TextInput
                          style={{fontSize:16,paddingVertical:10,borderColor:'#000',borderRadius:7,
                                  shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                  shadowOffset:{height:2,width:0},elevation:5,backgroundColor:'#fff',
                                  paddingHorizontal:10}}
                          value={this.state.email}
                          onChangeText={(email)=>{this.setState({email})}}>
                      </TextInput>
                  </View>
                  <View style={{borderWidth:0}}>
                      <Text style={{fontSize:18,paddingVertical:10}}>Phone</Text>

                  </View>
                  <View style={{borderWidth:0}}>
                      <Text style={{fontSize:16,paddingVertical:10}}>Primary</Text>
                      <TextInput
                          style={{fontSize:16,paddingVertical:10,borderColor:'#000',borderRadius:7,
                                  shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                  shadowOffset:{height:2,width:0},elevation:5,backgroundColor:'#fff',
                                  paddingHorizontal:10}}
                          value={this.state.mobile}
                          keyboardType={'numeric'}
                          onChangeText={(mobile)=>{this.setState({mobile})}}>
                      </TextInput>
                  </View>
                  <View style={{borderWidth:0}}>
                      <Text style={{fontSize:16,paddingVertical:10}}>Secondry</Text>
                      <TextInput
                          style={{fontSize:16,paddingVertical:10,borderColor:'#000',borderRadius:7,
                                  shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                  shadowOffset:{height:2,width:0},elevation:5,backgroundColor:'#fff',
                                  paddingHorizontal:10}}
                          value={this.state.phone}
                          keyboardType={'numeric'}
                          onChangeText={(phone)=>{this.setState({phone})}}>
                      </TextInput>
                  </View>





                  <View style={{borderWidth:0,marginTop:25,justifyContent:'center'}}>
                    <TouchableOpacity style={{borderWidth:0,backgroundColor:'#5586D2',borderRadius:7,
                                              shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                              shadowOffset:{height:2,width:0},elevation:5,alignSelf:'center'}}
                                      onPress={()=>this.props.navigation.navigate('ContinueSafa')}>
                        <Text style={{fontSize:18,paddingHorizontal:15,paddingVertical:8,color:'#fff',textAlign:'center'}}>Done</Text>
                    </TouchableOpacity>
                  </View>

              </View>

            </View>
          </ScrollView>
          </ImageBackground>
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

export default connect(mapStateToProps, mapDispatchToProps)(RetailersScreen);
