import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,ToastAndroid,
  Text,ActivityIndicator,
  TouchableOpacity,
  View,Alert,Linking,PermissionsAndroid,
  Dimensions,ImageBackground,
  TextInput,FlatList,AsyncStorage,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import { FontAwesome,MaterialIcons,Entypo ,Ionicons} from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import  Constants  from 'expo-constants';
import {SearchBar}from 'react-native-elements';
import SmsListener from 'react-native-android-sms-listener';
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

class Feedback extends React.Component {

  static navigationOptions = {
    header:null,
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(){
    const audio=this.props.navigation.getParam('item',null);
    console.log(audio,'audio');
    const Package=[{value:'Packaging'},{value:'Price'},{value:'Brand'},{value:'Delivery'}]
    return(
      <View style={{flex:1}}>
          <View style={{height:Constants.statusBarHeight,backgroundColor:'#F5F5F5'}}></View>
          <ImageBackground source={require('../assets/video/back1.png')} style={{flexDirection:'row',justifyContent:'space-between',width:'101%',height:'100%',alignItems:'center'}}>
          <ScrollView>
            <View style={{height:width*1.8,width:width*0.89,borderRadius:17,marginVertical:15,alignItems:'center',alignSelf:'center',backgroundColor:'#fff'}}>
              <Text style={{fontSize:20,marginVertical:10}}>Post your feedback and query here</Text>
              <View style={{justifyContent:'center',borderWidth:0,marginHorizontal:10,alignSelf:'center',}}>
                  <View style={{borderWidth:0}}>
                      <Dropdown
                            value={this.state.Package}
                            data={Package}
                            disabled={false}
                            dropdownOffset={{top:8}}
                            containerStyle={{borderWidth:0,borderRadius:7,paddingLeft:0,paddingVertical:10,
                                             fontSize:16,borderRadius:7,placeholder:'unitType',placeholderTextColor:'#737272',
                                             borderColor:'#f2f2f2',width:width*0.82}}
                            rippleCentered={true}
                            onChangeText={(Gender)=>this.setState({Gender:'',valutext:''})}
                            inputContainerStyle={{shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,borderRadius:7,
                            shadowOffset:{height:2,width:0},elevation:5,paddingVertical:10,placeholder:'unitType',placeholderTextColor:'#737272',
                                                  fontSize:16,paddingLeft:6,padding:4,paddingTop:-10,borderWidth: 0.2,
                                                  backgroundColor:'#fff',borderColor:'#f2f2f2',width:width*0.82}}
                            pickerStyle={{shadowColor:"#fefefe",borderWidth:0,borderRadius:10,
                                          rippleColor:'#fff', paddingLeft:10,width:width*0.35 ,
                                          marginLeft:width*0.5,marginTop:width*0.18,color:'#000'}}
                            itemColor={'#000'}
                            itemTextStyle={{color:'#000'}}
                            selectedItemColor={'#000'}
                      />
                  </View>
                  <View style={{borderWidth:0}}>
                      <Text style={{fontSize:20,paddingVertical:10}}>Sub Categroy</Text>
                  </View>
                  <View style={{borderWidth:0,marginBottom:10}}>
                      <Dropdown
                            value={this.state.Package}
                            data={Package}
                            disabled={false}
                            dropdownOffset={{top:8}}
                            containerStyle={{borderWidth:0,borderRadius:7,paddingLeft:0,paddingVertical:10,
                                             fontSize:16,borderRadius:7,placeholder:'unitType',placeholderTextColor:'#737272',
                                             borderColor:'#f2f2f2',width:width*0.82}}
                            rippleCentered={true}
                            onChangeText={(unittypetext)=>this.setState({unittypetext:'',valutext:''})}
                            inputContainerStyle={{shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,borderRadius:7,
                                                  shadowOffset:{height:2,width:0},elevation:5,
                                                  paddingVertical:10,
                                                  placeholder:'unitType',placeholderTextColor:'#737272',
                                                  paddingLeft:6,padding:4,paddingTop:-10,borderWidth: 0.2,
                                                  fontSize:16,backgroundColor:'#0FCCD8',borderColor:'#f2f2f2',width:width*0.82}}
                            pickerStyle={{borderWidth:0,borderRadius:10,
                                          rippleColor:'#0FD2D8', paddingLeft:10,
                                          width:width*0.82 ,marginLeft:width*0.1,
                                          marginTop:width*0.18,color:'#0FD2D8',backgroundColor:'#0FD2D8'}}
                            itemColor={'#000'}
                            itemTextStyle={{color:'#000'}}
                            selectedItemColor={'#000'}
                      />
                   </View>
                   <View style={{borderWidth:0}}>
                       <Text style={{fontSize:18,paddingVertical:10}}>Comment</Text>
                       <TextInput
                           style={{fontSize:16,paddingVertical:10,borderColor:'#000',borderRadius:7,
                                   shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                   shadowOffset:{height:2,width:0},elevation:5,backgroundColor:'#fff',
                                   paddingHorizontal:10}}
                           value={this.state.mobile}
                           keyboardType={'numeric'}
                           minHeight={300}
                           onChangeText={(mobile)=>{this.setState({mobile})}}>
                       </TextInput>
                   </View>
                  <View style={{borderWidth:0,marginTop:25,alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
                    <TouchableOpacity style={{borderWidth:0,backgroundColor:'#fff',borderRadius:7,
                                              shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                              shadowOffset:{height:2,width:0},elevation:5,}}
                                      onPress={()=>{this.props.navigation.navigate('ContinueSafa')}}>
                        <Text style={{fontSize:18,paddingHorizontal:15,paddingVertical:8,color:'#000'}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderWidth:0,backgroundColor:'#5586D2',borderRadius:7,
                                              shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                              shadowOffset:{height:2,width:0},elevation:5,}}
                                      onPress={()=>{this.props.navigation.navigate('ContinueSafa')}}>
                        <Text style={{fontSize:18,paddingHorizontal:15,paddingVertical:8,color:'#fff'}}>Upload</Text>
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
    justifyContent: 'center',
 },
 albumCover: {
    width: 250,
    height: 250,
 },
 trackInfo: {
    padding: 40,
    backgroundColor: '#fff',
 },
 trackInfoText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    color: '#550088',
 },
 largeText: {
   fontSize: 22,
 },
 smallText: {
   fontSize: 16,
 },
 control: {
   margin: 20,
 },
 controls: {
  flexDirection: 'row',
 }
})

const mapStateToProps =(state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps,mapDispatchToProps)(Feedback);
