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

class BookReading extends React.Component {

  static navigationOptions = {
    header:null,
  }


  constructor(props) {
    super(props);
    this.state = {
        email:'',
        password:'',
        date: new Date(),
        products:[],
    }
  }

  getStore=async()=>{
          var csrf = await AsyncStorage.getItem('csrf');
          const userToken = await AsyncStorage.getItem('userpk');
          const sessionid = await AsyncStorage.getItem('sessionid');
          await fetch('https://vyasa.cioc.in/api/homepage/book/',{
            method: 'GET',
            headers: {
              "Cookie" :"csrf="+csrf+";sessionid=" + sessionid+";",
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken':csrf,
              'Referer': 'https://vyasa.cioc.in'
            },
          }).then((response) => {
            console.log(response.status,'response')
            return response.json()
            console.log(response,'response')
          })
            .then((responseJson) => {
              console.log(responseJson,'responseJson')
              this.setState({products:responseJson})
              this.setState({prod:responseJson})
              console.log(this.state.products,'this.state.products')
              console.log(this.state.prod,'this.state.prod')
            })
            .catch((error) => {
              console.error(error);
          });
      }

// componentDidMount=async()=>{
//   this.getStore()
// }

  render() {
const item=this.props.navigation.getParam('item',null)
console.log(item,'item')
    return (

      <View style={{flex:1}}>

            <Toast style={{backgroundColor: 'grey'}} textStyle={{color: '#fff'}} ref="toast" position = 'top'/>
            <View style={{height:Constants.statusBarHeight,backgroundColor:'#CF4F07'}} />
            <View style={{  flexDirection: 'row',backgroundColor:'#CF4F07',borderWidth:0, height:50,alignItems:'flex-start',fontSize:20,paddingLeft:4,paddingTop:10,paddingBottom:6}}>
                 <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                   <MaterialIcons name={'arrow-back'} size={30} color={'#fff'} />
               </TouchableOpacity>
                  <Text style={{fontSize:20,marginLeft:width*0.3,color:'#fff'}}>Books</Text>
            </View>
            <View style={{flex:1,borderWidth:0,backgroundColor:'#f3f3f3'}}>
              {/* <View style={{width:width,height:width*0.6}}>
                  <Image source={{uri:item.image}} style={{height:'100%',width:'100%',borderRadius:0}}/>
              </View> */}
              <Text style={{fontSize:24,textAlign:'center'}}>{item.title}</Text>
              <View style={{paddingHorizontal:20,fontSize:18}}>
                  <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy textLorem Ipsum is
                        simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy textLorem Ipsum is
                        simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy textLorem Ipsum is
                        simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy textLorem Ipsum is
                        simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text</Text>
              </View>
              {/* <View style={{flexDirection:'row',position:'absolute',bottom:50,left:20}}>
                <TouchableOpacity style={{borderWidth:0,backgroundColor:'#08AF0D'}}
                                  onPress={()=>this.props.navigation.navigate('BookReading',{item:item})}>
                  <Text style={{fontSize:18,paddingHorizontal:15,paddingVertical:8}}>read</Text>
                </TouchableOpacity>
                <TouchableOpacity></TouchableOpacity>
              </View> */}

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

export default connect(mapStateToProps, mapDispatchToProps)(BookReading);

// {name:require('../assets/images/off1.jpeg'),users:3,item:'Chicken Grill',count:'x1',item1:'Lemonade',count1:'x2',status:'unpaid'},
//           {name:require('../assets/images/off3.jpeg'),users:4,item:'Chicken Tandoori',count:'x1',item1:'Strawberry Mlk Shk',count1:'x2',status:'paid'},
//           {name:require('../assets/images/off2.jpeg'),users:5,item:'Shawarma',count:'x1',item1:'Donne briyani',count1:'x2',status:'paid'}
