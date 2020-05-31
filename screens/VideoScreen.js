import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Slider,
  Dimensions,ImageBackground,
  TextInput, FlatList, AsyncStorage, Alert, Linking, PermissionsAndroid, ToastAndroid,ActivityIndicator
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import { FontAwesome,MaterialIcons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import  Constants  from 'expo-constants';
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

class VideoScreen extends React.Component {

  static navigationOptions = {
    header:null,
  }


  constructor(props) {
    super(props);
    this.state = {
        email:'',
        password:'',
        date: new Date()
    }
  }





  render() {

    return (

      <View style={{flex:1}}>

            <Toast style={{backgroundColor: 'grey'}} textStyle={{color: '#fff'}} ref="toast" position = 'top'/>
            <View style={{height:Constants.statusBarHeight,backgroundColor:'#CF4F07'}} />
            <View style={{  flexDirection: 'row',backgroundColor:'#CF4F07',borderWidth:0, height:50,alignItems:'flex-start',fontSize:20,paddingLeft:4,paddingTop:10,paddingBottom:6}}>
                 <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                   <MaterialIcons name={'arrow-back'} size={30} color={'#fff'} />
               </TouchableOpacity>
                  <Text style={{fontSize:20,marginLeft:width*0.3,color:'#fff'}}>Video</Text>
            </View>
            <View style={{flex:1,justifyContent:'center',borderWidth:0,backgroundColor:'#f3f3f3'}}>
                <Text>VideoScreen</Text>
            </View>





      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',

  },
});

const mapStateToProps =(state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoScreen);
