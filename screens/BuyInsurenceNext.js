import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,ActivityIndicator,
  Dimensions,ImageBackground,
  TextInput, FlatList, AsyncStorage, Alert, Linking, PermissionsAndroid,
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
import Insurence from '../screens/Insurence';

const { width } = Dimensions.get('window');
const height = width * 0.8
const SERVER_URL = settings.url
const themeColor = settings.themeColor

class BuyInsurenceNext extends React.Component {

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
          <View  style={{justifyContent:'space-between',backgroundColor:'#55CED2',borderBottomWidth:0,
            height:55,width:width,flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                   <MaterialIcons name={'arrow-back'} size={30} color={'#000'} style={{paddingLeft:10}}/>
              </TouchableOpacity>
                <Text style={{fontSize:24,color:'#000',alignItems:'center',paddingTop:10,paddingBottom:6,marginRight:width*0.3}}>Individual Health</Text>
                {/* <TouchableOpacity style={{ marginHorizontal: 10 }}   >
                   <Image source={require('../AllImage/Icons-POI/notification.png')} style={{height:22,width:20,tintColor:'#fff'}}  />
                </TouchableOpacity> */}
          </View>

          <View style={{backgroundColor:'#55CED2',paddingHorizontal:10}}>
            <Text style={{textAlign:'center',fontSize:24,paddingBottom:10}}>Insurence Plan</Text>
          </View>
          <ScrollView style={{marginVertical:0,backgroundColor:'#fff',paddingBottom:100,paddingTop:15,paddingHorizontal:15}}>
          <Text style={{fontSize:18,marginVertical:6}}>Enter details of the person who is insuring. The insurance policy will be issued to this person </Text>
          <TextInput style={{backgroundColor:'#ffffff',
                            borderRadius:7,
                            paddingHorizontal:0,
                            paddingVertical:10,
                            fontSize:16,
                            width:width*0.7,
                            borderBottomWidth:1,
                            borderColor:'#bdbdbd',marginBottom:10,
                            marginTop:0,backgroundColor:'#fff'}}
                       onChangeText={(name)=>this.setState({name})}
                       value={this.state.name}
                       placeholder={'Name'}>
          </TextInput>
          <TextInput style={{backgroundColor:'#ffffff',
                            borderRadius:7,
                            paddingHorizontal:0,
                            paddingVertical:10,
                            fontSize:16,
                            width:width*0.7,
                            borderBottomWidth:1,
                            borderColor:'#bdbdbd',marginBottom:10,
                            marginTop:0,backgroundColor:'#fff'}}
                       onChangeText={(name)=>this.setState({name})}
                       value={this.state.name}
                       placeholder={'Email'}>
          </TextInput>
          <TextInput style={{backgroundColor:'#ffffff',
                            borderRadius:7,
                            paddingHorizontal:0,
                            paddingVertical:10,
                            fontSize:16,
                            width:width*0.7,
                            borderBottomWidth:1,
                            borderColor:'#bdbdbd',marginBottom:10,
                            marginTop:0,backgroundColor:'#fff'}}
                       onChangeText={(name)=>this.setState({name})}
                       value={this.state.name}
                       placeholder={'Contact No'}>
          </TextInput>
          <Text style={{fontSize:18,marginVertical:6}}>Date of Birth</Text>
          <TextInput style={{backgroundColor:'#ffffff',
                            borderRadius:7,
                            paddingHorizontal:0,
                            paddingVertical:10,
                            fontSize:16,
                            width:width*0.7,
                            borderBottomWidth:1,
                            borderColor:'#bdbdbd',marginBottom:10,
                            marginTop:0,backgroundColor:'#fff'}}
                       onChangeText={(city)=>this.setState({city})}
                       value={this.state.city}
                       placeholder={'City'}>
          </TextInput>
          <Text style={{fontSize:18,marginVertical:6}}>Nominee Detail</Text>
          <TextInput style={{backgroundColor:'#ffffff',
                            borderRadius:7,
                            paddingHorizontal:0,
                            paddingVertical:10,
                            fontSize:16,
                            width:width*0.7,
                            borderBottomWidth:1,
                            borderColor:'#bdbdbd',marginBottom:10,
                            marginTop:0,backgroundColor:'#fff'}}
                       onChangeText={(city)=>this.setState({city})}
                       value={this.state.city}
                       placeholder={'Nominee Detail'}>
          </TextInput>
          <TextInput style={{backgroundColor:'#ffffff',
                            borderRadius:7,
                            paddingHorizontal:0,
                            paddingVertical:10,
                            fontSize:16,
                            width:width*0.7,
                            borderBottomWidth:1,
                            borderColor:'#bdbdbd',marginBottom:10,
                            marginTop:0,backgroundColor:'#fff'}}
                       onChangeText={(state)=>this.setState({state})}
                       value={this.state.state}
                       placeholder={'nominee Name'}>
          </TextInput>
          <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate('BuyInsurencePay')}}
            style={{marginVertical:50,backgroundColor:'#5599D2',borderRadius:10,justifyContent:'center',alignSelf:'center',alignItems:'center'}}>
            <Text style={{fontSize:20,color:'#fff',paddingHorizontal:35,paddingVertical:8}}>Next</Text>
          </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyInsurenceNext);
