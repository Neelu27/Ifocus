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
import Modal from "react-native-modal";
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import { LinearGradient } from 'expo-linear-gradient';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import { Slider } from 'react-native-elements';
import { FloatingAction } from "react-native-floating-action";
// import {Slider} from 'react-native-slider';
// import VolumeSlider from 'react-native-volume-slider';
// import { Player } from 'react-native-audio-streaming';
import { Audio } from 'expo-av';
import ActionButton from 'react-native-action-button';
//Import ActionButton
import Icon from 'react-native-vector-icons/Ionicons';

const audioBookPlaylist = [
 {
  title: 'Hamlet - Act I',
  author: 'William Shakespeare',
  source: 'Librivox',
  uri:
      'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3',
    imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
 },
 {
  title: 'Hamlet - Act II',
  author: 'William Shakespeare',
  source: 'Librivox',
  uri:
      'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act2_shakespeare.mp3',
    imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
 },
 {
  title: 'Hamlet - Act III',
  author: 'William Shakespeare',
  source: 'Librivox',
    uri: 'http://www.archive.org/download/hamlet_0911_librivox/hamlet_act3_shakespeare.mp3',
    imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
 },
 {
  title: 'Hamlet - Act IV',
  author: 'William Shakespeare',
  source: 'Librivox',
  uri:
      'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act4_shakespeare.mp3',
    imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
 },
 {
  title: 'Hamlet - Act V',
  author: 'William Shakespeare',
  source: 'Librivox',
  uri:
      'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3',
    imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
 }
]

class ContinueSafa extends React.Component {

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
         mod:false,
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

  // componentDidMount=async()=>{
  //   this.getStore()
  // }

  audio=async(item)=>{
      this.setState({play:!this.state.play});
      console.log(item,'item')
      const soundObject = new Audio.Sound();
      try {
      await soundObject.loadAsync(require('../assets/sound/hello.mp3'));//{uri:item.audFile}

        // this.setState({play:false});
      console.log(item.audFile)

      if(this.state.play==false){
        await soundObject.pauseAsync();
      }else{
        await soundObject.playAsync();
      }



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
      await soundObject.UnloadAsync(require('../assets/sound/hello.mp3'));//{uri:item.audFile}
      await soundObject.stopAsync();//pauseAsync();
        // this.setState({play:true});
      console.log(item.audFile)
      // Your sound is playing!
      } catch (error) {
      // An error occurred!
      console.log(error)
    }
    }

    async componentDidMount() {
      try {
       await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
       })
       this.loadAudio()
      } catch (e) {
       console.log(e)
      }
     }

    async loadAudio() {
      const {currentIndex, isPlaying, volume} = this.state
      try {
        const playbackInstance = new Audio.Sound()
        const source = {
          uri: audioBookPlaylist[currentIndex].uri
        }
        const status = {
          shouldPlay: isPlaying,
          volume
        }
        playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
        await playbackInstance.loadAsync(source, status, false)
        this.setState({playbackInstance})
      } catch (e) {
          console.log(e)
        }
      }

onPlaybackStatusUpdate = status => {
 this.setState({
  isBuffering: status.isBuffering
 })
}

    handlePlayPause = async () => {
  const { isPlaying, playbackInstance } = this.state
  isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

  this.setState({
   isPlaying: !isPlaying
  })
 }

  handlePreviousTrack = async () => {
  let { playbackInstance, currentIndex } = this.state
  if (playbackInstance) {
   await playbackInstance.unloadAsync()
   currentIndex < audioBookPlaylist.length - 1 ? (currentIndex -= 1) : (currentIndex = 0)
   this.setState({
    currentIndex
   })
   this.loadAudio()
  }
 }

 handleNextTrack = async () => {
  let { playbackInstance, currentIndex } = this.state
  if (playbackInstance) {
   await playbackInstance.unloadAsync()
   currentIndex < audioBookPlaylist.length - 1 ? (currentIndex += 1) : (currentIndex = 0)
   this.setState({
    currentIndex
   })
   this.loadAudio()
  }
 }

    renderFileInfo=()=> {
  const { playbackInstance, currentIndex } = this.state
  return playbackInstance ? (
   <View style={styles.trackInfo}>
    <Text style={[styles.trackInfoText, styles.largeText]}>
     {audioBookPlaylist[currentIndex].title}
    </Text>
    <Text style={[styles.trackInfoText, styles.smallText]}>
     {audioBookPlaylist[currentIndex].author}
    </Text>
    <Text style={[styles.trackInfoText, styles.smallText]}>
     {audioBookPlaylist[currentIndex].source}
    </Text>
   </View>
  ) : null
 }


 setDislike() {
 this.setState({
   dislikeActive: !this.state.dislikeActive,
   dislike: this.state.dislikeActive
     ? this.state.dislike - 1
     : this.state.dislike + 1
 });
}
setLike() {
 this.setState({
   likeActive: !this.state.likeActive,
   like: this.state.likeActive ? this.state.like - 1 : this.state.like + 1
 });
}

handleLike() {
 if (this.state.dislikeActive) {
   this.setLike();
   this.setDislike();
 }
 this.setLike();
}

handleDislike() {
 if (this.state.likeActive) {
   this.setDislike();
   this.setLike();
 }
 this.setDislike();
}
clickHandler = (name)=>{
          if (name == "bt_performance") {
            Alert.alert('sdsfdgfhg');
            this.props.navigation.navigate('AudioPlayScreen');
          }
          else if (name == "bt_retailer") {
            this.props.navigation.navigate('RetailersScreen');
          }
          else{
            this.props.navigation.navigate('Feedback');
          }
      }
      clickHandler1 = (name)=>{
                if (name == "bt_performance") {
                  Alert.alert('sdsfdgfhg');
                  this.props.navigation.navigate('AudioPlayScreen');
                }
                else if (name == "bt_retailer") {
                  this.props.navigation.navigate('RetailersScreen');
                }
                else if (name == "bt_merchandise") {
                  this.props.navigation.navigate('CameraScreens');
                }  else if (name == "bt_collections") {
                    this.setState({mod:true});
                  }
                else{
                  this.props.navigation.navigate('Feedback');
                }
            }

  render() {
    const actions = [

                  {
                    text: "Retailer Details",
                    icon: <FontAwesome name={"users"} size={16} color={'#fff'} />,
                    name: "bt_retailer",
                    position: 2,
                    color:'#5599D2',
                    buttonSize:30,
                    textStyle:{paddingHorizontal:4}
                  },
                  {
                    text: "Performance",
                    icon: <FontAwesome name={"file-text"} size={16} color={'#fff'} />,
                    name: "bt_performance",
                    position: 1,
                    color:'#5599D2',
                    buttonSize:30,
                    textStyle:{paddingHorizontal:4}
                  },
                  {
                    text: "Feedback",
                    icon: <FontAwesome name={"dollar"} size={16} color={'#fff'} />,
                    name: "bt_feedback",
                    position:3,
                    color:'#5599D2',
                    buttonSize:30,
                    textStyle:{paddingHorizontal:4}
                  },

              ];
              const actions1 = [

                            {
                              text: "Retailer Details",
                              icon: <FontAwesome name={"users"} size={16} color={'#fff'} />,
                              name: "bt_retailer",
                              position: 2,
                              color:'#5599D2',
                              buttonSize:30,
                              textStyle:{paddingHorizontal:4}
                            },
                            {
                              text: "Merchandise",
                              icon: <FontAwesome name={"file-text"} size={16} color={'#fff'} />,
                              name: "bt_merchandise",
                              position: 3,
                              color:'#5599D2',
                              buttonSize:30,
                              textStyle:{paddingHorizontal:4}
                            },
                            {
                              text: "Collections",
                              icon: <FontAwesome name={"file-text"} size={16} color={'#fff'} />,
                              name: "bt_collections",
                              position: 4,
                              color:'#5599D2',
                              buttonSize:30,
                              textStyle:{paddingHorizontal:4}
                            },
                            {
                              text: "Performance",
                              icon: <FontAwesome name={"file-text"} size={16} color={'#fff'} />,
                              name: "bt_performance",
                              position: 1,
                              color:'#5599D2',
                              buttonSize:30,
                              textStyle:{paddingHorizontal:4}
                            },
                            {
                              text: "Feedback",
                              icon: <FontAwesome name={"dollar"} size={16} color={'#fff'} />,
                              name: "bt_feedback",
                              position:5,
                              color:'#5599D2',
                              buttonSize:30,
                              textStyle:{paddingHorizontal:4}
                            },

                        ];
    const audio=this.props.navigation.getParam('item',null);
    console.log(audio,'audio');
    return (
      <View style={{flex:1}}>
        <Modal isVisible={this.state.mode} animationIn="fadeIn" animationOut="fadeOut" hasBackdrop={true} backdropColor={'#5586D2'} >
              <View style={[styles.modalView,
                    {width:width*0.6,height:width*0.6,borderRadius:17,backgroundColor:'#fff',
                    alignSelf:'center',paddingVertical:15,paddingHorizontal:10,backdropColor:'#fff',borderWidth:0,}]}>
                  <Text  style={{fontSize:20,color:'#000',fontWeight:'600',textAlign:'center'}}>Enter Today's Collections</Text>
                  <Text  style={{fontSize:18,color:'#000',marginTop:20,textAlign:'center'}}>Outstanding  23,000</Text>
                  <Text style={{textAlign:'center',fontSize:18,color:'#000',}}> Collected  10,000</Text>
                  <View style={{paddingHorizontal:15,ignItems:'center',justifyContent:'space-between',flexDirection:'row',marginTop:40}}>
                      <TouchableOpacity onPress={()=>{this.setState({mode:false})}}
                          style={{borderRadius:10,backgroundColor: "#5586D2",paddingHorizontal:30,paddingVertical:6}}>
                          <Text  style={{fontSize:18,color:'#fff',fontWeight:'600',alignSelf:'center',}}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{this.setState({mode:false})}}
                        style={{borderRadius:10,backgroundColor: "#5586D2",paddingHorizontal:30,paddingVertical:6,}}>
                          <Text  style={{fontSize:18,color:'#fff',fontWeight:'600',alignSelf:'center',}}>Ok</Text>
                      </TouchableOpacity>
                  </View>
                </View>
          </Modal>
          <View style={{height:Constants.statusBarHeight,backgroundColor:'#103368'}}></View>
          <View  style={{justifyContent:'center',backgroundColor:'#fff',borderWidth:0,
            height:55,width:width}}>
              <ImageBackground source={require('../assets/video/back1.png')} style={{flexDirection:'row',justifyContent:'space-between',width:'101%',height:'100%',alignItems:'center'}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                   <MaterialIcons name={'arrow-back'} size={30} color={'#fff'} />
              </TouchableOpacity>
                <Text style={{fontSize:20,color:'#fff',alignItems:'center',paddingTop:10,paddingBottom:6}}>Safa Super Market</Text>
                <TouchableOpacity style={{ marginHorizontal: 10 }}   >
                   <Image source={require('../AllImage/Icons-POI/notification.png')} style={{height:22,width:20,tintColor:'#fff'}}  />
                </TouchableOpacity>
            </ImageBackground>
          </View>
          <View style={{marginVertical:0}}>
            <View style={{backgroundColor:'#CECECF'}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:20,marginVertical:10}}>
                    <View style={{borderWidth:0,paddingVertical:6,paddingHorizontal:15,borderRadius:10,backgroundColor:'#fff',shadowColor:"#fefefe",
                    shadowOpacity:0.2,shadowRadius:15,
                    shadowOffset:{height:2,width:0},elevation:5,}}>
                        <Text style={{textAlign:'center'}}>Last visit</Text>
                        <View style={{borderWidth:0.2}}></View>
                        <Text style={{textAlign:'center'}}>4 july</Text>
                   </View>
                    <View style={{borderWidth:0,paddingVertical:6,paddingHorizontal:15,borderRadius:10,backgroundColor:'#fff',shadowColor:"#fefefe",
                    shadowOpacity:0.2,shadowRadius:15,
                    shadowOffset:{height:2,width:0},elevation:5,}}>
                        <Text style={{textAlign:'center'}}>Last Order</Text>
                        <View style={{borderWidth:0.2}}></View>
                        <Text style={{textAlign:'center'}}>4 july</Text>
                    </View>
                    <View style={{borderWidth:0,paddingVertical:6,paddingHorizontal:15,borderRadius:10,backgroundColor:'#fff',shadowColor:"#fefefe",
                    shadowOpacity:0.2,shadowRadius:15,
                    shadowOffset:{height:2,width:0},elevation:5,}}>
                        <Text style={{textAlign:'center'}}>Last Order value</Text>
                        <View style={{borderWidth:0.2}}></View>
                        <Text style={{textAlign:'center'}}>40,000</Text>
                    </View>
                </View>
                <View style={{borderWidth:0,flexDirection:'row',justifyContent:'space-between',
                              alignItems:'center',marginHorizontal:20,marginVertical:6,shadowColor:"#fefefe",
                              shadowOpacity:0.2,shadowRadius:15,
                              shadowOffset:{height:2,width:0},elevation:5,
                              paddingVertical:6,borderRadius:10,paddingHorizontal:10,backgroundColor:'#fff'}}>
                    <Text style={{fontSize:10}}>TAP ON SCHEMES TO VIEW ALL BEST OFFERS </Text>
                    <TouchableOpacity style={{borderWidth:0,paddingHorizontal:15,paddingVertical:4,
                                              borderRadius:10,backgroundColor:'#1A55AF'}}
                                      onPress={()=>this.props.navigation.navigate('SchemsScreen')}>
                      <Text style={{color:'#fff'}}>SCHEMES</Text>
                    </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:20,paddingVertical:4,alignItems:'center'}}>
                   <Text style={{fontSize:20,color:'#1A55AF'}}>Stock and Order Book</Text>
                   <Text style={{fontSize:18,color:'#1A55AF'}}>9 march 2020</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',paddingVertical:2,borderWidth:0,marginVertical:0,paddingHorizontal:10,backgroundColor:'#fff'}}>
                <View style={{flex:0.55,borderWidth:0}}>
                    <Text>Products Name</Text>
                </View>
                <View style={{flex:0.2,borderLeftWidth:1,borderRightWidth:1,alignItems:'center'}}>
                    <Text>Rate</Text>
                </View>
                <View style={{flex:0.25,borderWidth:0,paddingHorizontal:4}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>Stock</Text>
                        <Text>Qty</Text>
                    </View>
                </View>
            </View>
            <View style={{flexDirection:'row',borderWidth:0,marginVertical:0,paddingHorizontal:10,backgroundColor:'#D4D8D7'}}>
                <View style={{flex:0.55,borderWidth:0,paddingVertical:10}}>
                    <Text style={{paddingVertical:6}}>Cashew 500g</Text>
                    <Text style={{paddingVertical:6}}>KinderJoy</Text>
                </View>
                <View style={{flex:0.2,borderLeftWidth:0.2,borderRightWidth:0.2,alignItems:'center',paddingVertical:10}}>
                    <Text style={{paddingVertical:6}}>500</Text>
                    <Text style={{paddingVertical:6}}>30</Text>
                </View>
                <View style={{flex:0.25,borderWidth:0,paddingVertical:10,paddingHorizontal:4}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{backgroundColor:'#fff',marginVertical:6,paddingHorizontal:2}}>
                          <Text style={{}}>40</Text>
                        </View>
                        <View style={{backgroundColor:'#fff',marginVertical:6,paddingHorizontal:2}}>
                          <Text style={{}}>10</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                      <View style={{backgroundColor:'#fff',marginVertical:6,paddingHorizontal:2}}>
                        <Text style={{}}>30</Text>
                      </View>
                      <View style={{backgroundColor:'#fff',marginVertical:6,paddingHorizontal:2}}>
                        <Text style={{}}>10</Text>
                      </View>
                    </View>
                </View>
            </View>

        </View>

        <View style={{position:'absolute',bottom:0,left:0,right:0}}>
          <SearchBar

              placeholder="Search more product here"
              onChangeText={(text)=>{}}
              searchIcon={{size:27}}
              clearIcon={{size:27}}
              value={this.state.searchText}
              containerStyle={{borderWidth:1,borderRadius:17,backgroundColor:'#f2f2f2',borderColor:'#f2f2f2',borderBottomColor: '#f2f2f2',borderTopColor:'#f2f2f2',padding:0,}}
              inputContainerStyle={{borderWidth:1,borderRadius:17,margin:0,width:'100%',backgroundColor:'#fff',borderColor:'#fff',borderBottomWidth:1,borderBottomColor: '#f2f2f2',borderTopColor:'#f2f2f2'}}
          />

          <View style={{height:50,borderWidth:0,borderTopLeftRadius:10,borderTopRightRadius:10,paddingHorizontal:15,
                        backgroundColor:'#4C4D4C',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>


              {/* <FontAwesome name={'plus'} size={20} color={'#fff'}/> */}

              {audio!=null?<FloatingAction
                        actions={actions1}

                        onPressItem={
                                  (name) => {
                                    if (name == 'bt_performance') {
                                      Alert.alert('gfjdhjjjjjjjjjjjjjjjjh')
                                    } if (name == 'bt_retailer') {
                                      Alert.alert('gfjdhjjjjjjjjjjjjjjjjhtyyyyyyyyyyyyyyyyyyyyyyyyy')
                                    }
                                  }
                                }
                        style={{position:'absolute',bottom:-10,left:-8}}
                        position='left'
                        buttonSize={40}
                        margin={0}
                        color={'transparent'}
                        distanceToEdge={10}
                        overlayColor={'transparent'}
                      />:<FloatingAction
                                actions={actions}
                                onPressItem={name => this.clickHandler(name)}
                                style={{position:'absolute',bottom:-10,left:-8}}
                                position='left'
                                buttonSize={40}
                                margin={0}
                                color={'transparent'}
                                distanceToEdge={10}
                                overlayColor={'transparent'}
                              />}
                              
            <View style={{flexDirection:'row',alignItems:'center',marginLeft:width*0.4}}>
              <FontAwesome name={'rupee'} size={20} color={'#fff'}/>
              <Text style={{color:'#fff'}}>6,890</Text>
           </View>
            <TouchableOpacity style={{paddingHorizontal:15,paddingVertical:4,backgroundColor:'green',borderRadius:17}}
              onPress={()=>  this.props.navigation.navigate('ModifyScreen')}>
              <Text style={{color:'#fff'}}>Confirm</Text>
            </TouchableOpacity>
          </View>
       </View>
     </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//
//   },
//   slider: {
//     height: 30,
//     marginLeft: 7,
//   }
// });
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
},
actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
})

const mapStateToProps =(state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ContinueSafa);
