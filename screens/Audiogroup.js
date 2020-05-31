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
import { FontAwesome,MaterialIcons,Entypo } from '@expo/vector-icons';
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
import { Slider } from 'react-native-elements';
import ModalBox from 'react-native-modalbox';
// import {Slider} from 'react-native-slider';
// import VolumeSlider from 'react-native-volume-slider';
// import { Player } from 'react-native-audio-streaming';
import { Audio } from 'expo-av';
class Audiogroup extends React.Component {

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
        attachOpen:false,
        RecentSongs:[{img:require('../assets/sound/s3.jpeg'),name:'25 Essentials Shiva'},
                     {img:require('../assets/sound/s4.jpeg'),name:'Sunderkand'},
                     {img:require('../assets/sound/s2.jpeg'),name:'Top Chalisha Collection'},
                     {img:require('../assets/sound/s11.jpeg'),name:'BhagwatGita'},
                     {img:require('../assets/sound/s1.jpeg'),name:'Bhajan Sangrah'},],
        artist:[{img:require('../assets/sound/anu.jpeg'),name:'Anuradha Paudwal'},
                {img:require('../assets/sound/hari.jpg'),name:'Hariharan'},
                {img:require('../assets/sound/jag.jpeg'),name:'Jagjit Singh '},
                {img:require('../assets/sound/shan.jpeg'),name:'Shankar Mahadevan'},
                {img:require('../assets/sound/shre.jpg'),name:'Shreya Ghoshal'},
                {img:require('../assets/sound/hari.jpeg'),name:'Hariharan'},],
    }
    this.playbackInstance = null;
  }
    getStore=async()=>{
            var csrf = await AsyncStorage.getItem('csrf');
            const userToken = await AsyncStorage.getItem('userpk');
            const sessionid = await AsyncStorage.getItem('sessionid');
            await fetch('https://vyasa.cioc.in/api/homepage/audio/',{
              method: 'GET',
              headers: {
                "Cookie" :"csrf="+csrf+";sessionid=" + sessionid+";",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken':csrf,
                'Referer': 'https://vyasa.cioc.in'
              },
            }).then((response) => {
              console.log(response.status,'responseAudio')
              return response.json()
              console.log(response,'response')
            })
              .then((responseJson) => {
                console.log(responseJson,'responseJsonAudio')
                this.setState({products:responseJson})
                this.setState({prod:responseJson})
                console.log(this.state.products,'this.state.products')
                console.log(this.state.prod,'this.state.prod')
              })
              .catch((error) => {
                console.error(error);
            });
        }

  componentDidMount=async()=>{
    this.getStore()
  }

  audio=async(item)=>{
      this.setState({play:true});
      console.log(item,'item')
      const soundObject = new Audio.Sound();
      try {
      await soundObject.loadAsync(require('../assets/sound/hello.mp3'));//{uri:item.audFile}
      await soundObject.playAsync();
        this.setState({play:false});
      console.log(item.audFile)
      // Your sound is playing!
      } catch (error) {
      // An error occurred!
      console.log(error)
      }
    }
    audio1=async(item)=>{
      this.setState({play:false});
      console.log(item,'item')
      const soundObject = new Audio.Sound();
      try {
      // await soundObject.loadAsync(require('../assets/sound/hello.mp3'));//{uri:item.audFile}
      await soundObject.stopAsync();//pauseAsync();
        this.setState({play:true});
      console.log(item.audFile)
      // Your sound is playing!
      } catch (error) {
      // An error occurred!
      console.log(error)
    }
    }

  render() {
    const audio=this.props.navigation.getParam('item',null);
    const audioplay=this.props.navigation.getParam('item',null);
    console.log(audio,'audio');
    return (
      <View style={{flex:1}}>
        <ModalBox
          style={{height:250,borderTopRightRadius:17,borderTopLeftRadius:17}}
          position={'bottom'}
          ref={'attachModal'}
          isOpen={this.state.attachOpen}
          onClosed={()=>{this.setState({attachOpen:false})}}>
            <View style={{flex:1,justifyContent:'flex-start',paddingHorizontal:15}}>
                <TouchableOpacity><Text style={{fontSize:16,paddingVertical:10}}>Play later</Text></TouchableOpacity>
                <TouchableOpacity><Text style={{fontSize:16,paddingVertical:10}}>Add to</Text></TouchableOpacity>
                <TouchableOpacity><Text style={{fontSize:16,paddingVertical:10}}>Share</Text></TouchableOpacity>
                <TouchableOpacity><Text style={{fontSize:16,paddingVertical:10}}>Favourite</Text></TouchableOpacity>
                <TouchableOpacity><Text style={{fontSize:16,paddingVertical:10}}>Download</Text></TouchableOpacity>
            </View>
          </ModalBox>
            <Toast style={{backgroundColor: 'grey'}} textStyle={{color: '#fff'}} ref="toast" position = 'top'/>
            <View style={{height:Constants.statusBarHeight,backgroundColor:'#CF4F07'}} />
            <View style={{justifyContent:'space-between' , flexDirection: 'row',
                          backgroundColor:'#CF4F07',borderWidth:0, height:50,
                          alignItems:'center',fontSize:20,paddingLeft:4,paddingTop:0,paddingBottom:6}}>
                 <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                   <MaterialIcons name={'chevron-left'} size={30} color={'#fff'} />
               </TouchableOpacity>

                  {/* <Text style={{fontSize:20,marginLeft:width*0.1,color:'#fff'}}>{audio.name}</Text>
                  <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                    <MaterialIcons name={'more-vert'} size={30} color={'#fff'} />
                </TouchableOpacity> */}
            </View>

            <View style={{flex:1,justifyContent:'center',borderWidth:0,backgroundColor:'#f3f3f3',marginHorizontal:10,paddingVertical:0}}>
              <View style={{height:width*0.35,
                                      marginTop: 0,
                                      marginLeft:0,
                                      marginRight:0,
                                      borderWidth:0,
                                      alignSelf:'center',
                                      paddingHorizontal:10,
                                      paddingVertical:15,
                                      width:width*0.95,
                                      backgroundColor:'#fff',
                                      borderColor:'#000',
                                      borderBottomLeftRadius:0,
                                      borderTopRightRadius:0,
                                      borderRadius:0}}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:3,justifyContent:'space-between',borderWidth:0}}>
                                    <View style={{height:width*0.27,width:width*0.27}}><Image source={audioplay.img} style={{
                                      height:'100%',width:'100%',borderRadius:7
                                    }}/></View>
                                </View>
                                <View style={{flex:7,marginHorizontal:12,paddingLeft:10,borderWidth:0}} >
                                  <Text style={{fontSize:20,color:'#000'}}>{audioplay.name}</Text>
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                      <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <FontAwesome name={'headphones'} size={16} style={{}}/>
                                        <Text style={{fontSize:16,marginRight:width*0.04,paddingHorizontal:10}}>139.43M</Text>
                                      </View>
                                      <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <FontAwesome name={'heart-o'} size={16} style={{}}/>
                                        <Text style={{fontSize:16,marginRight:width*0.04,paddingHorizontal:10}}>12.3k</Text>
                                      </View>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                      <Text style={{fontSize:16,color:'#A2A1A1'}}>2015</Text>
                                    </View>
                              </View>
                            </View>
                        </View>
                  <View style={{marginTop:10,flexDirection:'row',marginHorizontal:10,justifyContent:'space-between',alignSelf:'center'}}>
                    <TouchableOpacity style={{alignItems:'center',marginHorizontal:15}}>
                      <FontAwesome name={'share-square-o'} size={30}/>
                      <Text style={{fontSize:14}}>Share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems:'center',marginHorizontal:15}}>
                      <MaterialIcons name={'arrow-downward'} size={30}/>
                      <Text style={{fontSize:14}}>Download</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems:'center',marginHorizontal:15}}>
                      <FontAwesome name={'heart-o'} size={30}/>
                      <Text style={{fontSize:14}}>Favourite</Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                      data={this.state.RecentSongs}
                      showsHorizontalScrollIndicator={false}
                      extraData={this.state}
                      inverted={false}
                      scrollToEnd={true}
                      horizontal={false}
                      nestedScrollEnabled={true}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index})=>{
                        return(
                          <TouchableOpacity onPress={()=>this.props.navigation.navigate('AudioPlayScreen',{item:item})}>
                      <View  style={{flex:1,
                                    marginTop: 10,
                                    marginLeft:0,
                                    marginRight:width*0.04,
                                    borderWidth:0,
                                    paddingRight:0,
                                    paddingVertical:10,
                                    width:width*0.95,
                                    borderBottomWidth:0.2,
                                    flexDirection:'column',
                                    borderColor:'#000',
                                    flexDirection:'row',
                                    borderRadius:17,
                                    marginHorizontal:10,
                                    alignItems:'center',
                                    justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row'}}>
                              <Text>{item.no}</Text>
                              <Text style={{fontSize:14,textAlign:'center',paddingLeft:10}}>{item.name}</Text>
                          </View>
                            <TouchableOpacity onPress={()=>this.setState({attachOpen:true})}>
                              <MaterialIcons name={'more-vert'} size={30} color={'#000'} />
                          </TouchableOpacity>
                      </View>
                    </TouchableOpacity>) }}
                      />
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
  slider: {
    height: 30,
    marginLeft: 7,
  }
});

const mapStateToProps =(state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Audiogroup);
