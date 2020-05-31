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

class AudioPlayScreen extends React.Component {

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
         dislikeActive: false
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
  render() {
    const audio=this.props.navigation.getParam('item',null);
    console.log(audio,'audio');
    return (
      <View style={{flex:1}}>
          <View style={{height:Constants.statusBarHeight,backgroundColor:'#103368'}}></View>
          <View  style={{justifyContent:'center',backgroundColor:'#fff',borderWidth:0,
            height:55,width:width}}>
              <ImageBackground source={require('../assets/video/back1.png')} style={{flexDirection:'row',justifyContent:'space-between',width:'101%',height:'100%',alignItems:'center'}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.openDrawer();}}>
                   <MaterialIcons name={'arrow-back'} size={30} color={'#fff'} />
              </TouchableOpacity>
                <Text style={{fontSize:20,color:'#fff',alignItems:'center',paddingTop:10,paddingBottom:6}}>Safa Super Market</Text>
                <TouchableOpacity style={{ marginHorizontal: 10 }}   >
                   <Image source={require('../AllImage/Icons-POI/notification.png')} style={{height:22,width:20,tintColor:'#fff'}}  />
                </TouchableOpacity>
            </ImageBackground>
          </View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#ECECEC',paddingBottom:100}}>
            <View style={{marginTop:0}}>
              <Text style={{fontSize:20,textAlign:'center'}}>Dashboard</Text>
              <Text style={{textAlign:'center'}}>Wednwsday,09 march 20</Text>
            </View>
            <TouchableOpacity onPress={()=>this.setState({st:true})}style={{borderWidth:0,borderRadius:10,width:width*0.9,
                          marginTop:40,alignSelf:'center',shadowColor:"#fefefe",
                          shadowOpacity:0.2,shadowRadius:15,paddingVertical:12,paddingHorizontal:6,
                          shadowOffset:{height:2,width:0},elevation:5,backgroundColor:'#fff'}}>
                 <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                  <View style={{borderWidth:0,paddingLeft:10,paddingVertical:6,flex:0.3,marginTop:10}}>
                       <View><Image source={require('../assets/video/building.png')}/></View>
                       <Text style={{fontSize:20}}>Visit</Text>
                   </View>
                   <View style={{flexDirection:'row',borderWidth:0,alignItems:'center',justifyContent:'space-between',paddingRight:10,flex:0.7}}>
                     <View style={{alignItems:'center',borderWidth:0}}>
                       <Text style={{paddingTop:10,paddingBottom:10,textAlign:'right'}}>last visit</Text>
                       <Text style={{paddingBottom:0,paddingTop:10,textAlign:'right'}}>MTD visits (no's)</Text>
                       <Text style={{paddingBottom:0,paddingTop:10,textAlign:'right'}}>Total Bills (no's)</Text>
                       <Text style={{paddingBottom:0,paddingTop:10,textAlign:'right'}}>visit Efficiency</Text>
                     </View>
                     <View style={{alignItems:'flex-start',borderWidth:0}}>
                       <Text style={{paddingTop:10,paddingBottom:10,textAlign:'left'}}>:07 march 2020</Text>
                       <Text style={{paddingBottom:0,paddingTop:10,textAlign:'left'}}>:4</Text>
                       <Text style={{paddingBottom:0,paddingTop:10,textAlign:'left'}}>:2</Text>
                       <Text style={{paddingBottom:0,paddingTop:10,textAlign:'left'}}>:50%</Text>
                     </View>
                  </View>
                </View>

            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.setState({st2:true})}style={{borderWidth:0,borderRadius:10,width:width*0.9,
                          marginTop:20,alignSelf:'center',shadowColor:"#fefefe",
                          shadowOpacity:0.2,shadowRadius:15,paddingVertical:12,paddingHorizontal:6,
                          shadowOffset:{height:2,width:0},elevation:5,backgroundColor:'#fff'}}>
                          <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                          <View style={{borderWidth:0,paddingLeft:10,paddingVertical:6,flex:0.4,marginTop:10}}>
                               <View><Image source={require('../assets/video/order.png')}/></View>
                               <Text style={{fontSize:20}}>Order Values</Text>
                           </View>
                           <View style={{flexDirection:'row',borderWidth:0,alignItems:'center',justifyContent:'space-between',paddingRight:10,flex:0.6}}>
                             <View style={{alignItems:'center',borderWidth:0}}>
                               <Text style={{paddingTop:10,paddingBottom:10,textAlign:'right'}}>Last Bill </Text>
                               <Text style={{paddingTop:0,paddingBottom:10,textAlign:'right'}}>MTD Value </Text>
                               <Text style={{paddingTop:0,paddingBottom:10,textAlign:'right'}}>Target </Text>
                               <Text style={{paddingTop:0,paddingBottom:10,textAlign:'right'}}>% Ach </Text>
                             </View>
                             <View style={{alignItems:'flex-start',borderWidth:0,marginRight:40}}>
                               <Text style={{paddingTop:10,paddingBottom:10,textAlign:'left'}}>:2,300</Text>
                               <Text style={{paddingTop:0,paddingBottom:10,textAlign:'left'}}>:56,789</Text>
                               <Text style={{paddingTop:0,paddingBottom:10,textAlign:'left'}}>:56,789</Text>
                               <Text style={{paddingTop:0,paddingBottom:10,textAlign:'left'}}>:56,789</Text>
                              </View>
                          </View>
                        </View>

            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth:0,paddingVertical:6,
                                      paddingHorizontal:15,backgroundColor:'#103368',
                                      marginTop:100,borderRadius:10
                                    }}
                                    onPress={()=>this.props.navigation.navigate('ContinueSafa')}>
                    <Text style={{color:'#fff',fontSize:20}}>continue</Text>
                  </TouchableOpacity>
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
 }
})

const mapStateToProps =(state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayScreen);
// <View style={{flex:1}}>
//       <Toast style={{backgroundColor: 'grey'}} textStyle={{color: '#fff'}} ref="toast" position = 'top'/>
//       <View style={{height:Constants.statusBarHeight,backgroundColor:'#CF4F07'}} />
//       <View style={{justifyContent:'space-between' , flexDirection: 'row',backgroundColor:'#CF4F07',borderWidth:0, height:50,alignItems:'flex-start',fontSize:20,paddingLeft:4,paddingTop:10,paddingBottom:6}}>
//            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
//              <MaterialIcons name={'expand-more'} size={30} color={'#fff'} />
//          </TouchableOpacity>
//             <Text style={{fontSize:20,marginLeft:width*0.1,color:'#fff'}}>{audio.name}</Text>
//             <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
//               <MaterialIcons name={'more-vert'} size={30} color={'#fff'} />
//           </TouchableOpacity>
//       </View>
//
//       <View style={{flex:1,justifyContent:'center',borderWidth:0,backgroundColor:'#f3f3f3',marginHorizontal:10,paddingVertical:10}}>
//       {/* <View style={{marginVertical:25,marginHorizontal:15,width:width*0.6,height:width*0.6,borderWidth:1,alignSelf:'center'}}>
//       </View>
//       <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
//         <Text style={{fontSize:18}}>{audio.name}</Text>
//       </View>
//
//       <Slider
//           value={this.state.value}
//           onValueChange={(value) => this.setState({value})}
//           thumbTintColor={'#000'}
//           style={{width:width*0.8,alignSelf:'center',marginHorizontal:10}}/>
//
//       <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
//           <TouchableOpacity style={{marginHorizontal:20}}><FontAwesome name={'step-backward'} size={30} color={'#000'} /></TouchableOpacity>
//           <TouchableOpacity style={{marginHorizontal:10}}
//                                                     onPress={()=>{this.audio(audio)}}>
//             {this.state.play==false?
//             <FontAwesome name={'play-circle-o'} size={50} color={'#000'} />:
//             <FontAwesome name={'pause-circle-o'} size={50} color={'#000'} />}
//           </TouchableOpacity>
//             {/* <TouchableOpacity style={{marginHorizontal:10}} onPress={()=>{this.setState({play:false});}}>
//               <FontAwesome name={'pause-circle-o'} size={50} color={'#000'} />
//             </TouchableOpacity>} */}
//           {/* <TouchableOpacity style={{marginHorizontal:20}}><FontAwesome name={'step-forward'} size={30} color={'#000'} /></TouchableOpacity> */}
//
//         <View style={styles.container}>
//            <Image
//             style={styles.albumCover}
//                  source={{ uri: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg' }}
//            />
//            {this.renderFileInfo()}
//            <View style={styles.controls}>
//             <TouchableOpacity style={styles.control} onPress={this.handlePreviousTrack}>
//              <Ionicons name='ios-skip-backward' size={48} color='#444' />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
//              {this.state.isPlaying ? (
//               <Ionicons name='ios-pause' size={48} color='#444' />
//              ) : (
//               <Ionicons name='ios-play-circle' size={48} color='#444' />
//              )}
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.control} onPress={this.handleNextTrack}>
//              <Ionicons name='ios-skip-forward' size={48} color='#444' />
//             </TouchableOpacity>
//            </View>
//
//           </View>
//
//       </View>
//       <View style={{flexDirection:'row',paddingHorizontal:15,
//                     paddingVertical:10,borderWidth:0,
//                     justifyContent:'space-between',position:'absolute',
//                     bottom:0,left:0,right:0}}>
//             <TouchableOpacity><Entypo name={'shuffle'} size={20} color={'#000'} /></TouchableOpacity>
//             <TouchableOpacity><MaterialIcons name={'arrow-downward'} size={20} color={'#000'} /></TouchableOpacity>
//             <TouchableOpacity><FontAwesome name={'diamond'} size={20} color={'#000'} /></TouchableOpacity>
//             <TouchableOpacity onPress={()=>this.handleDislike()}><MaterialIcons name={'favorite'} size={20} color={!this.state.dislikeActive?this.state.color:this.state.color1} /></TouchableOpacity>
//             <TouchableOpacity><MaterialIcons name={'list'} size={20} color={'#000'} /></TouchableOpacity>
//       </View>
// </View>
