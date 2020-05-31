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
import {SearchBar}from 'react-native-elements';
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
// import { Player } from 'react-native-audio-streaming';
import { Audio } from 'expo-av';
class AudioScreen extends React.Component {

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
        RecentSongs:[{img:require('../assets/sound/s3.jpeg'),name:'Safa Super Market'},
                     {img:require('../assets/sound/s4.jpeg'),name:'Kundan Electronics'},
                     {img:require('../assets/sound/s2.jpeg'),name:'Retailers name'},
                     {img:require('../assets/sound/s11.jpeg'),name:'Retailers name'},
                     {img:require('../assets/sound/s1.jpeg'),name:'Retailers name'},
                     {img:require('../assets/sound/s2.jpeg'),name:'Retailers name'},
                     {img:require('../assets/sound/s11.jpeg'),name:'Retailers name'},
                     {img:require('../assets/sound/s1.jpeg'),name:'Retailers name'},

                     {img:require('../assets/sound/s11.jpeg'),name:'More Market',rs:'1700/-',ite:true},
                     {img:require('../assets/sound/s1.jpeg'),name:'Retailers name',rs:'1700/-',ite:true},],
        artist:[{img:require('../assets/sound/anu.jpeg'),name:'Retailers name'},
                {img:require('../assets/sound/hari.jpg'),name:'Retailers name'},
                {img:require('../assets/sound/jag.jpeg'),name:'Retailers name'},
                {img:require('../assets/sound/shan.jpeg'),name:'Retailers name'},
                {img:require('../assets/sound/shre.jpg'),name:'Retailers name'},
                {img:require('../assets/sound/hari.jpeg'),name:'Retailers name'},],
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
    asd=(item)=>{
      if(item.ite)
      this.props.navigation.navigate('AudioPlayScreen',{item:item})
    }

  render() {
    return (
      <View style={{flex:1}}>
          <View style={{height:Constants.statusBarHeight,backgroundColor:'#103368'}}></View>
          <View  style={{justifyContent:'center',backgroundColor:'#fff',borderWidth:0,
            height:55,width:width}}>
              <ImageBackground source={require('../assets/video/back1.png')} style={{flexDirection:'row',justifyContent:'space-between',width:'101%',height:'100%',alignItems:'center'}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.openDrawer();}}>
                   <MaterialIcons name={'arrow-back'} size={30} color={'#fff'} />
              </TouchableOpacity>
                <Text style={{fontSize:20,color:'#fff',alignItems:'center',paddingTop:10,paddingBottom:6}}>My Visit</Text>
                <TouchableOpacity style={{ marginHorizontal: 10 }}   >
                   <Image source={require('../AllImage/Icons-POI/notification.png')} style={{height:22,width:20,tintColor:'#fff'}}  />
                </TouchableOpacity>
            </ImageBackground>
          </View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#ECECEC'}}>
            <View style={{}}>
              <Text style={{fontSize:20,textAlign:'center'}}>Today's plan - 34 visits</Text>
              <Text style={{textAlign:'center'}}>Wednwsday, 09 march 20</Text>
            </View>
            <View style={{width:width*0.9,paddingHorizontal:0,borderWidth:0,borderRadius:17,marginVertical:4,alignSelf:'center'}}>
              <SearchBar
              ref={input => { this.inputRef = input && input.focus()}}
              placeholder="Search"
              onChangeText={(text)=>{}}
              searchIcon={{
                size:27
              }}
              clearIcon={{
                size:27
              }}
              value={this.state.searchText}
              containerStyle={{borderWidth:1,borderRadius:17,backgroundColor:'#f2f2f2',borderColor:'#f2f2f2',shadowColor:"#fefefe",
              shadowOpacity:0.2,shadowRadius:17,
              shadowOffset:{height:2,width:0},elevation:5,borderBottomColor: '#f2f2f2',borderTopColor:'#f2f2f2',padding:0,}}
              inputContainerStyle={{borderWidth:1,borderRadius:17,margin:0,width:'100%',backgroundColor:'#fff',borderColor:'#fff',borderBottomWidth:1,borderBottomColor: '#f2f2f2',borderTopColor:'#f2f2f2'}}
              />
            </View>
            <FlatList
                data={this.state.RecentSongs}
                showsHorizontalScrollIndicator={false}
                extraData={this.state}
                inverted={false}
                scrollToEnd={true}

                nestedScrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index})=>{
                  return(
                    <TouchableOpacity  onPress={()=>item.ite?this.props.navigation.navigate('ContinueSafa',{item:item}):this.props.navigation.navigate('AudioPlayScreen',{item:item})}>
                <View  style={{flex:1,
                              marginTop: 10,
                              marginLeft:0,
                              marginRight:0,
                              borderWidth:0,
                              marginHorizontal:4,
                              paddingHorizontal:6,
                              paddingVertical:10,
                              width:width*0.9,

                              flexDirection:'row',
                              borderColor:'#000',
                              backgroundColor:'#fff',
                              borderRadius:17,
                              marginHorizontal:10,
                              shadowColor:"#fefefe",
                              shadowOpacity:0.2,shadowRadius:17,
                              shadowOffset:{height:2,width:0},elevation:5,
                              justifyContent:'space-between'}}>

                      <Text style={{fontSize:18,textAlign:'left'}}>{item.name}</Text>
                      {item.rs&&<View style={{flexDirection:'row'}}>
                        <FontAwesome name={'rupee'} size={20} />
                        <Text>{item.rs}</Text>
                      </View>}
                      {item.ite&&<View style={{flexDirection:'row',backgroundColor:'green',borderRadius:50,width:22,height:22}}>
                        <FontAwesome name={'check'} size={16} color={'#fff'}style={{paddingTop:3,paddingLeft:3}}/>

                      </View>}
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
});

const mapStateToProps =(state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioScreen);


{/* <View style={{flex:1}}>
      <Toast style={{backgroundColor: 'grey'}} textStyle={{color: '#fff'}} ref="toast" position = 'top'/>
      <View style={{height:Constants.statusBarHeight,backgroundColor:'#CF4F07'}} />
      <View style={{  flexDirection: 'row',backgroundColor:'#CF4F07',borderWidth:0, height:50,alignItems:'flex-start',fontSize:20,paddingLeft:4,paddingTop:10,paddingBottom:6}}>
           <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
             <MaterialIcons name={'arrow-back'} size={30} color={'#fff'} />
         </TouchableOpacity>
            <Text style={{fontSize:20,marginLeft:width*0.3,color:'#fff'}}>Audios</Text>
      </View>
      <ScrollView>
      <View style={{flex:1,justifyContent:'center',borderWidth:0,backgroundColor:'#f3f3f3',marginHorizontal:10,paddingVertical:10}}>
        <View style={{borderWidth:0}}>
        <Text style={{fontSize:20}}>Recently played</Text>
        <FlatList
            data={this.state.RecentSongs}
            showsHorizontalScrollIndicator={false}
            extraData={this.state}
            inverted={false}
            scrollToEnd={true}
            horizontal={true}
            nestedScrollEnabled={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index})=>{
              return(
                <TouchableOpacity  onPress={()=>this.props.navigation.navigate('AudioPlayScreen',{item:item})}>
            <View  style={{flex:1,
                          marginTop: 10,
                          marginLeft:0,
                          marginRight:width*0.04,
                          borderWidth:0,
                          paddingHorizontal:0,
                          paddingVertical:0,
                          width:width*0.3,
                          height:width*0.4,
                          flexDirection:'column',
                          borderColor:'#000',

                          borderRadius:17,
                          marginHorizontal:10,
                          alignItems:'center',
                          justifyContent:'space-between'}}>
                      <View style={{width:width*0.3,height:width*0.3,
                        justifyContent:'space-between',flexDirection:'row',
                        paddingHorizontal:0,paddingVertical:0,alignItems:'center'}}>
                        <Image source={item.img} style={{height:'100%',width:'100%',borderRadius:17,}}/>
                     {/* <Text style={{fontSize:18}}>{item.aud_title}</Text>
                       {this.state.play==false? <TouchableOpacity  onPress={()=>this.audio(item)}>
                         <FontAwesome
                            name={'play'}
                            size={18}
                          />
                        </TouchableOpacity>:
                        <TouchableOpacity  onPress={()=>this.audio1(item)}>
                            <FontAwesome
                               name={'pause'}
                               size={18}
                             />
                    </TouchableOpacity>} */}
          //         </View>
          //         <Text style={{fontSize:14,textAlign:'center'}}>{item.name}</Text>
          //   </View>
          // </TouchableOpacity>) }}
          //   />
          // </View>
          // <View style={{borderWidth:0,marginTop:10}}>
          // <Text style={{fontSize:20}}>Recommended for you</Text>
          // <FlatList
          //     data={this.state.RecentSongs}
          //     showsHorizontalScrollIndicator={false}
          //     extraData={this.state}
          //     inverted={false}
          //     scrollToEnd={true}
          //     horizontal={true}
          //     nestedScrollEnabled={true}
          //     keyExtractor={(item, index) => index.toString()}
          //     renderItem={({item, index})=>{
          //       return(
          //         <TouchableOpacity onPress={()=>this.props.navigation.navigate('Audiogroup',{item:item})}>
          //     <View  style={{flex:1,
          //                   marginTop: 10,
          //                   marginLeft:0,
          //                   marginRight:width*0.04,
          //                   borderWidth:0,
          //                   paddingRight:0,
          //                   paddingVertical:10,
          //                   width:width*0.45,
          //                   height:width*0.55,
          //                   flexDirection:'column',
          //                   borderColor:'#000',
          //
          //                   borderRadius:17,
          //                   marginHorizontal:10,
          //                   alignItems:'center',
          //                   justifyContent:'space-between'}}>
          //               <View style={{width:width*0.45,height:width*0.45,borderWidth:0,
          //                 justifyContent:'space-between',flexDirection:'row',
          //                 paddingVertical:0,alignItems:'center'}}>
          //                 <Image source={item.img} style={{height:'100%',width:'100%',borderRadius:17,}}/>
                       {/* <Text style={{fontSize:18}}>{item.aud_title}</Text>
                         {this.state.play==false? <TouchableOpacity  onPress={()=>this.audio(item)}>
                           <FontAwesome
                              name={'play'}
                              size={18}
                            />
                          </TouchableOpacity>:
                          <TouchableOpacity  onPress={()=>this.audio1(item)}>
                              <FontAwesome
                                 name={'pause'}
                                 size={18}
                               />
                      </TouchableOpacity>} */}
            //         </View>
            //         <Text style={{fontSize:14,textAlign:'center'}}>{item.name}</Text>
            //   </View>
            // </TouchableOpacity>) }}
            //   />
            // </View>
            // <View style={{borderWidth:0,marginTop:10}}>
            // <Text style={{fontSize:20}}>Recommended Artists</Text>
            // <FlatList
            //     data={this.state.artist}
            //     showsHorizontalScrollIndicator={false}
            //     extraData={this.state}
            //     inverted={false}
            //     scrollToEnd={true}
            //     horizontal={true}
            //     nestedScrollEnabled={true}
            //     keyExtractor={(item, index) => index.toString()}
            //     renderItem={({item, index})=>{
            //       return(
            //     <View  style={{flex:1,
            //                   marginTop: 10,
            //                   marginLeft:0,
            //                   marginRight:width*0.04,
            //                   borderWidth:0,
            //                   paddingRight:0,
            //                   paddingVertical:10,
            //                   width:width*0.25,
            //                   height:width*0.35,
            //                   flexDirection:'column',
            //                   borderColor:'#000',
            //
            //                   borderRadius:50,
            //                   marginHorizontal:10,
            //                   alignItems:'center',
            //                   justifyContent:'center'}}>
            //               <View style={{width:width*0.25,height:width*0.25,borderWidth:0,
            //                 justifyContent:'space-between',flexDirection:'row',
            //                 paddingVertical:0,alignItems:'center'}}>
            //                 <Image source={item.img} style={{height:'100%',width:'100%',borderRadius:50,}}/>
                         {/* <Text style={{fontSize:18}}>{item.aud_title}</Text>
                           {this.state.play==false? <TouchableOpacity  onPress={()=>this.audio(item)}>
                             <FontAwesome
                                name={'play'}
                                size={18}
                              />
                            </TouchableOpacity>:
                            <TouchableOpacity  onPress={()=>this.audio1(item)}>
                                <FontAwesome
                                   name={'pause'}
                                   size={18}
                                 />
                        </TouchableOpacity>} */}
              //         </View>
              //         <Text style={{fontSize:14,textAlign:'center'}}>{item.name}</Text>
              //   </View>) }}
              //   />
              // </View>
              // <View style={{borderWidth:0,marginTop:10}}>
              // <Text style={{fontSize:20}}>Treanding Songs</Text>
              // <FlatList
              //     data={this.state.RecentSongs}
              //     showsHorizontalScrollIndicator={false}
              //     extraData={this.state}
              //     inverted={false}
              //     scrollToEnd={true}
              //     horizontal={false}
              //     nestedScrollEnabled={true}
              //     keyExtractor={(item, index) => index.toString()}
              //     renderItem={({item, index})=>{
              //       return(
              //     <View  style={{flex:1,
              //                   marginTop: 10,
              //                   marginLeft:0,
              //                   marginRight:width*0.04,
              //                   borderWidth:0,
              //                   paddingRight:0,
              //                   paddingVertical:10,
              //                   width:width*0.97,
              //                   height:width*0.2,
              //                   flexDirection:'row',
              //                   borderColor:'#000',
              //
              //                   borderRadius:17,
              //                   marginHorizontal:10,
              //                   alignItems:'center',
              //                   justifyContent:'space-between'}}>
              //               <View style={{width:width*0.2,height:width*0.2,borderWidth:0,
              //                 justifyContent:'space-between',flexDirection:'row',
              //                 paddingVertical:0,alignItems:'center'}}>
              //                 <Image source={item.img} style={{height:'100%',width:'100%',borderRadius:17,}}/>
                           {/* <Text style={{fontSize:18}}>{item.aud_title}</Text>
                             {this.state.play==false? <TouchableOpacity  onPress={()=>this.audio(item)}>
                               <FontAwesome
                                  name={'play'}
                                  size={18}
                                />
                              </TouchableOpacity>:
                              <TouchableOpacity  onPress={()=>this.audio1(item)}>
                                  <FontAwesome
                                     name={'pause'}
                                     size={18}
                                   />
                          </TouchableOpacity>} */}
//                         </View>
//                         <Text style={{fontSize:14,textAlign:'center'}}>{item.name}</Text>
//                   </View>) }}
//                   />
//                 </View>
//       </View>
//     </ScrollView>
// </View> */}
