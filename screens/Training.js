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

class Training extends React.Component {

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
         prod:[{date:'Date:30-12-2020',name:'Safa Super Market',ite:'items:22',value:'10 days ago',img:require('../assets/video/v.png')},
              {date:'Date:30-12-2020',name:'Kundan Electronics',ite:'items:22',value:'10 days ago',img:require('../assets/video/word.png')},
              {date:'Date:30-12-2020',name:'More Market',ite:'items:22',value:'10 days ago',img:require('../assets/video/powerpoint.png')},
              {date:'Date:30-12-2020',name:'Retailers name',ite:'items:22',value:'10 days ago',img:require('../assets/video/v.png')},
              {date:'Date:30-12-2020',name:'Safa Super Market',ite:'items:22',value:'10 days ago',img:require('../assets/video/word.png')},
              {date:'Date:30-12-2020',name:'Safa Super Market',ite:'items:22',value:'10 days ago',img:require('../assets/video/powerpoint.png')}]
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
              <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                   <MaterialIcons name={'arrow-back'} size={30} color={'#fff'} />
              </TouchableOpacity>
                <Text style={{fontSize:20,color:'#fff',alignItems:'center',paddingTop:10,paddingBottom:6}}>Training</Text>
                <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={()=>this.props.navigation.navigate('Notification')}  >
                   <Image source={require('../AllImage/Icons-POI/notification.png')} style={{height:22,width:20,tintColor:'#fff'}}  />
                </TouchableOpacity>
            </ImageBackground>
          </View>
          <ScrollView style={{marginVertical:0,backgroundColor:'#CECECF',paddingBottom:100}}>
          <View style={{flex:1,
                        height:width*0.4,
                        marginTop:10,
                        alignItems:'center',
                        borderWidth:0,
                        paddingHorizontal:2,
                        paddingVertical:2,
                        width:width*0.9,
                        borderColor:'#000',
                        justifyContent:'center',alignSelf:'center',
                        borderRadius:0,backgroundColor:'#fff',shadowColor:"#fefefe",
                        shadowOpacity:0.2,shadowRadius:15,
                        shadowOffset:{height:2,width:0},elevation:5,}}>
              <View style={{paddingVertical:0,paddingHorizontal:10,alignSelf:'center',}}>
                  <View style={{height:width*0.3,width:width*0.9,paddingVertical:0,}}>
                   <Image source={require('../assets/video/12.jpeg')} style={{height:'100%',width:'100%'}}/>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:10,}}>

                      <Text style={{fontSize:14,color:'#000'}}>New Product Details Doc</Text>
                      <Text style={{fontSize:14,color:'#000'}}>10 days ago</Text>
                  </View>

              </View>
          </View>
            <FlatList
                data={this.state.prod}
                extraData={this.state}
                showsHorizontalScrollIndicator={false}
                inverted={false}
                scrollToEnd={true}

                nestedScrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index})=>{
                  return(
                <View style={{flex:1,
                              height:width*0.25,
                              marginTop:10,
                              alignItems:'center',
                              borderWidth:0,
                              paddingHorizontal:2,
                              paddingVertical:2,
                              width:width*0.9,
                              borderColor:'#000',
                              justifyContent:'center',alignSelf:'center',
                              borderRadius:17,backgroundColor:'#fff',shadowColor:"#fefefe",
                              shadowOpacity:0.2,shadowRadius:15,
                              shadowOffset:{height:2,width:0},elevation:5,}}>
                    <View style={{paddingVertical:10,paddingHorizontal:10,alignSelf:'center',flexDirection:'row'}}>
                        <View style={{flex:0.7,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{height:22,width:22}}>
                        <Image source={item.img} style={{height:'100%',width:'100%'}}/>
                        </View>
                            <Text style={{fontSize:14,color:'#000'}}>New Product Details Doc</Text>
                        </View>
                        <View style={{flex:0.3,}}>
                              <FontAwesome name={'check-circle'} size={22} color={'green'} style={{alignSelf:'flex-end'}}/>
                            <Text style={{fontSize:14,color:'#000',paddingTop:15,alignSelf:'flex-end'}}>{item.value}</Text>
                        </View>
                    </View>
                </View>) }}
                />
          </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Training);
