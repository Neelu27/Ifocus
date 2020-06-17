// import React from 'react';
// import {
//   Image,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Dimensions,ImageBackground,
//   TextInput, FlatList, AsyncStorage, Alert, Linking, PermissionsAndroid, ToastAndroid,ActivityIndicator
// } from 'react-native';
// import Toast, {DURATION} from 'react-native-easy-toast';
// import { FontAwesome,MaterialIcons,Entypo ,Ionicons} from '@expo/vector-icons';
// import { MonoText } from '../components/StyledText';
// import  Constants  from 'expo-constants';
// import {SearchBar}from 'react-native-elements';
// import SmsListener from 'react-native-android-sms-listener'
// import * as Expo from 'expo';
// import * as Permissions from 'expo-permissions';
// import * as Google from 'expo-google-app-auth';
// import * as Facebook from 'expo-facebook';
// import settings from '../constants/Settings.js';
// const { width } = Dimensions.get('window');
// const height = width * 0.8
// const SERVER_URL = settings.url
// const themeColor = settings.themeColor
// import { connect } from 'react-redux';
// import * as actions from '../actions/index';
// import * as actionTypes from '../actions/actionTypes';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Dropdown } from 'react-native-material-dropdown';
// import DatePicker from 'react-native-datepicker';
// import { Slider } from 'react-native-elements';
// // import {Slider} from 'react-native-slider';
// // import VolumeSlider from 'react-native-volume-slider';
// // import { Player } from 'react-native-audio-streaming';
// import { Audio } from 'expo-av';
// import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview';
// import TabBar from '../components/TabBar';
// import SellerOrderCompo from '../components/SellerOrderCompo';
// import SellerOrderAnnounce from '../components/SellerOrderAnnounce';
// import   Insurence from'../screens/Insurence';
// class Notification extends React.Component {
//
//   static navigationOptions = {
//     header:null,
//   }
//
//   constructor(props) {
//     super(props);
//     this.state = {
//         email:'',
//         password:'',
//         date: new Date(),
//         play:false,
//         value:0,
//         isPlaying: false,
//         playbackInstance: new Audio.Sound(),
//         currentIndex: 0,
//         volume: 1.0,
//         isBuffering: false,
//         favoriteTopics:[],
//         color:'#000',
//         favorite:false,
//         color1:'red',
//         like: 23,
//          dislike: 3,
//          likeActive: false,
//          dislikeActive: false,
//          prod:[{name:'New products Detail',ite:'items:22',value:'22 min ago',img:require('../assets/video/v.png')},
//               {name:'New products Detail Doc',ite:'items:22',value:'22 min ago',img:require('../assets/video/word.png')},
//               {name:'New products Detail',ite:'items:22',value:'22 min ago',img:require('../assets/video/powerpoint.png')},
//               {name:'New products Detail Doc',ite:'items:22',value:'22 min ago',img:require('../assets/video/v.png')},
//               {name:'New products Detail Doc',ite:'items:22',value:'22 min ago',img:require('../assets/video/word.png')},
//               {name:'New products Detail',ite:'items:22',value:'22 min ago',img:require('../assets/video/powerpoint.png')},
//               {name:'New products Detail',ite:'items:22',value:'22 min ago',img:require('../assets/video/v.png')},
//                    {name:'New products Detail Doc',ite:'items:22',value:'22 min ago',img:require('../assets/video/word.png')},
//                    {name:'New products Detail',ite:'items:22',value:'22 min ago',img:require('../assets/video/powerpoint.png')},
//                    {name:'New products Detail Doc',ite:'items:22',value:'22 min ago',img:require('../assets/video/v.png')},
//                    {name:'New products Detail Doc',ite:'items:22',value:'22 min ago',img:require('../assets/video/word.png')},
//                    {name:'New products Detail',ite:'items:22',value:'22 min ago',img:require('../assets/video/powerpoint.png')}]
//     }
//     this.playbackInstance = null;
//   }
//
//   render() {
//     const audio=this.props.navigation.getParam('item',null);
//     console.log(audio,'audio');
//     return (
//       <View style={{flex:1}}>
//           <View style={{height:Constants.statusBarHeight,backgroundColor:'#103368'}}></View>
//           <View  style={{justifyContent:'space-between',backgroundColor:'#fff',borderBottomWidth:0.5,
//             height:55,width:width,flexDirection:'row',alignItems:'center'}}>
//               <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
//                    <MaterialIcons name={'arrow-back'} size={30} color={'#000'} style={{paddingLeft:10}}/>
//               </TouchableOpacity>
//                 <Text style={{fontSize:20,color:'#000',alignItems:'center',paddingTop:10,paddingBottom:6,marginRight:width*0.7}}>Alert</Text>
//                 {/* <TouchableOpacity style={{ marginHorizontal: 10 }}   >
//                    <Image source={require('../AllImage/Icons-POI/notification.png')} style={{height:22,width:20,tintColor:'#fff'}}  />
//                 </TouchableOpacity> */}
//           </View>
//           <ScrollableTabView
//                 refreshControlStyle={{backgroundColor: 'red'}}
//                 tabBarBackgroundColor={'#fff'}
//                 tabBarActiveTextColor={'#000'}
//                 tabBarInactiveTextColor={'#000'}
//                 tabBarTextStyle={{fontSize: 16}}
//                 style={{flex:1,}}
//                 tabBarUnderlineStyle={{ backgroundColor: 'blue', height: 3,}}
//                 goToPage={(tabView) => { this.tabView = tabView; }}
//                 renderTabBar={() => <ScrollableTabBar />}
//                 ovescroll={true}
//                 initialPage={0}>
//
//                 <ScrollView  tabLabel="Notification " style={{backgroundColor:'#fff',marginTop:-20}} >
//                     <SellerOrderAnnounce navigation={this.props.navigation} />
//                 </ScrollView>
//
//                 <ScrollView tabLabel="Announcement" style={{backgroundColor:'#fff',marginTop:-20}}>
//                  <Insurence navigation={this.props.navigation}   />
//                 </ScrollView>
//
//             </ScrollableTabView>
//      </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//  container: {
//   flex: 1,
//   backgroundColor: '#fff',
//   alignItems: 'center',
//   justifyContent: 'center'
//  },
//  albumCover: {
//   width: 250,
//   height: 250
//  },
//  trackInfo: {
//   padding: 40,
//   backgroundColor: '#fff'
//  },
//  trackInfoText: {
//   textAlign: 'center',
//   flexWrap: 'wrap',
//   color: '#550088'
//  },
//  largeText: {
//   fontSize: 22
//  },
//  smallText: {
//   fontSize: 16
//  },
//  control: {
//   margin: 20
//  },
//  controls: {
//   flexDirection: 'row'
//  }
// })
//
// const mapStateToProps =(state) => {
//     return {}
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {};
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Notification);



import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,Animated,Picker,
  TouchableOpacity,
  View,TouchableWithoutFeedback,
  Slider,Keyboard,
  Dimensions,ActivityIndicator,
  TextInput,FlatList,AsyncStorage,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import  Constants  from 'expo-constants';
import { Card } from 'react-native-elements';
import GridLayout from 'react-native-layout-grid';
import settings from '../constants/Settings.js';

const { width,height } = Dimensions.get('window');
const SERVER_URL = settings.url
const themeColor = settings.themeColor

import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import NetInfo from '@react-native-community/netinfo';
import Toast, {DURATION} from 'react-native-easy-toast';
import moment from 'moment'

const data = [
  {notification:'Note the subtle difference between e.g. British Airways "reasonably believing" there is no travel documentation and the Regulations requirement that there be "reasonable grounds [such as] inadequate travel documentation". With the latter the court will be looking to see whether or not the travel documentations you presented were in fact adequate, as opposed to what BA reasonably believed was the case',
  status:'Order Update',amount:5000,created:new Date()},
  {notification:'The passenger is responsible for having proper documentation. ',status:'Order Update',amount:1000,created:new Date()},
  {notification:'The passenger is responsible for having proper documentation. ',status:'Promotion',amount:2000,created:new Date()},
  {notification:'The passenger is responsible for having proper documentation. ',status:'Order Update',amount:5000,created:new Date()},
  {notification:'The passenger is responsible for having proper documentation. ',status:'Order Update',amount:5000,created:new Date()},
]

const tabs = [{name:'Notifications',},{name:'Announcements',},]

class Notification extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      title: 'Notifications',
      headerStyle: {
        backgroundColor: themeColor,
      },
      headerTitleStyle: {
        flex:0.8,
        alignSelf:'center',
        textAlign:'center',
      },
      headerTintColor: '#fff',
    }
  };


  constructor(props){
    super(props);
    this.state = {
      store:props.store,
      myStore:props.myStore,
      keyboardOffset:0,
      keyboardOpen:false,
      loadingVisible:false,
      data:[],
      announcements:[],
      scrollX : new Animated.Value(0),
      scrollY: new Animated.Value(0),
      selectedTab:0,
      offsetNotifications:0,
      offsetAnnouncement:0,
      loadMoreNotify:true,
      loadMoreAnnouncement:true,
    }
    Keyboard.addListener('keyboardDidHide',this.keyboardDidHide)
    Keyboard.addListener( 'keyboardDidShow', this.keyboardDidShow)
  }

  keyboardDidShow=(event)=> {
    this.setState({
      keyboardOffset: event.endCoordinates.height+27,
      keyboardOpen:true,
    })
  }

  keyboardDidHide=()=> {
    this.setState({
      keyboardOffset: 27,
      keyboardOpen:false,
    })
  }

  componentDidMount() {
    // this.props.navigation.setParams({
    //   themeColor:themeColor,
    // });
    // this.setState({unsubscribe:NetInfo.addEventListener(state =>{
    //    this.handleConnectivityChange(state);
    //  })})
     this.getNotification(0)
     this.getAnnouncements(0)
  }

  getNotification=async(offset)=>{
    const sessionid = await AsyncStorage.getItem('sessionid');
    const csrf = await AsyncStorage.getItem('csrf');
    await fetch(SERVER_URL+'/api/PIM/notification/?alerts=true&offset='+offset+'&limit=10',{
      method:'GET',
      headers:{
        "Cookie" :"csrftoken="+csrf+";sessionid=" + sessionid +";",
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': SERVER_URL,
        'X-CSRFToken': csrf
      }
    })
    .then((response)=>{
      console.log(response.status,'ggfhfhghg');
      return response.json()
    }).then((json)=>{
      console.log(json,'result');
      if(json==undefined){
        return
      }
      var data = this.state.data
      var loadMoreNotify = true
      json.results.forEach((i)=>{
        data.push(i)
      })
      if(json.count==data.length){
        var loadMoreNotify = false
      }
      this.setState({data:data,offsetNotifications:offset+10,loadMoreNotify:loadMoreNotify})
   })
  }

  getAnnouncements=async(offset)=>{
    const sessionid = await AsyncStorage.getItem('sessionid');
    const csrf = await AsyncStorage.getItem('csrf');
    await fetch(SERVER_URL+'/api/PIM/notification/?announcement=true&offset='+offset+'&limit=10',{
      method:'GET',
      headers:{
        "Cookie" :"csrftoken="+csrf+";sessionid=" + sessionid +";",
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': SERVER_URL,
        'X-CSRFToken': csrf
      }
    })
    .then((response)=>{
      console.log(response.status,'ggfhfhghg');
      return response.json()
    }).then((json)=>{
      console.log(json,'result');
      if(json==undefined){
        return
      }
      var announcements = this.state.announcements
      var loadMoreAnnouncement = true
      json.results.forEach((i)=>{
        announcements.push(i)
      })
      if(json.count==announcements.length){
        var loadMoreAnnouncement = false
      }
      this.setState({announcements:announcements,offsetAnnouncement:offset+10,loadMoreAnnouncement:loadMoreAnnouncement})
   })
  }

  gotoPage=()=>{}

  handlePageChange=(e)=>{
    var offset = e.nativeEvent.contentOffset;
    if(offset) {
      var page = Math.round(offset.x / width) ;
      this.setState({selectedTab:page})
    }
    this.setState({scrollY:new Animated.Value(0)})
  }

  onLayout = event => {
    if (this.state.dimensions) return
    let {width, height} = event.nativeEvent.layout
    this.setState({dimensions: {width, height}})
  }

  handleConnectivityChange=(state)=>{
    if(state.isConnected){
       this.setState({connectionStatus : true})
    }else{
      this.setState({connectionStatus : false})
      this.showNoInternet()
    }
  }

  showNoInternet=()=>{
    if(this.refs.toast!=undefined){
      this.refs.toast.show('No Internet Connection')
    }
  }

  // componentWillUnmount=()=>{
  //   var unsubscribe = this.state.unsubscribe;
  //   // unsubscribe()
  // }

  render() {
    let left = this.state.scrollX.interpolate({
       inputRange: [0,1*width, ],
       outputRange: [0, width*0.5,],
       extrapolate: 'clamp'
     });
    return(
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <Animated.View style={{flexDirection: 'row',}}>
        {tabs.map((item, i) => {
            return (
              <TouchableOpacity key={i} onPress={()=>{this.setState({selectedTab:i});this.scroll.scrollTo({ x: (i)*width });this.setState({scrollY:new Animated.Value(0)})}} style={{flex:1,borderBottomWidth: 1,borderColor:'#f2f2f2',alignItems: 'center',justifyContent: 'center',height:45}} >
               <Text   style={{fontSize:16,fontWeight:'700',color:this.state.selectedTab==i?'#000':'grey'}}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
          <Animated.View
          style={{ height: 2, width: '50%', backgroundColor: themeColor,position: 'absolute',bottom: 0,left:0,
          transform: [{translateX:left}]}}
          />
        </Animated.View>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }]  )}
          scrollEventThrottle={16}
          onMomentumScrollEnd={this.handlePageChange}
          ref={(node) => {this.scroll = node}}
          style={{flex:1}}
          onContentSizeChange={() =>this.scroll.scrollTo({ x: (this.state.selectedTab)*width })}
          >

          {tabs.map((item, i) => {
              return (
                <View key={i} style={{flex:1,backgroundColor: '#fff',width:width*1,}} >
                {i==0&&this.state.selectedTab==0&&
                   <View style={{flex:1,}}>
                    <ScrollView>
                    <FlatList
                        data={this.state.announcements}
                        keyExtractor={(item,index) => {
                          return index.toString();
                        }}
                        extraData={this.state}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                        renderItem={({item, index}) =>{
                           return (
                               <View style={{flex:1,backgroundColor:'#f2f2f2',borderBottomWidth:5,borderColor:'#f2f2f2'}}>
                                <TouchableWithoutFeedback onPress={()=>{}}>
                                  <Card containerStyle={[styles.shadow, {borderWidth: 1, borderColor: '#fff', width:width,margin:0,padding:0,backgroundColor:'#fff'}]}>
                                     <View style={{height:'100%',}}>
                                       <View style={{flex:1,}}>
                                       <View style={{flexDirection:'row',marginHorizontal:15,marginVertical:10}}>
                                           <View style={{flex:1,alignItems:'flex-start',}}>
                                              <Text   style={{color:'#000',fontSize:16,fontWeight:'700'}}>{item.shortInfo}</Text>
                                           </View>
                                           <View style={{flex:1,alignItems:'flex-end'}}>
                                           <Text   style={{color:'#000',fontSize:14,}}>{moment(item.created).format('MMM DD YYYY')}</Text>
                                             {/*<View style={{backgroundColor:'#f2f2f2',paddingVertical:5,paddingHorizontal:10,borderRadius:15}}>
                                                <Text   style={{color:'#000',fontSize:14,}}>{item.status}</Text>
                                             </View>*/}
                                           </View>
                                         </View>
                                          <View style={{flexDirection:'row',marginHorizontal:15,marginBottom:10}}>
                                            <View style={{flex:1}}>
                                              <Text   style={{color:'#000',fontSize:16,}}>{item.message}</Text>
                                            </View>
                                          </View>
                                       </View>
                                     </View>
                                  </Card>
                                  </TouchableWithoutFeedback>
                             </View>
                        )}}
                      />
                      <View style={{alignItems:'center',justifyContent:'center',paddingVertical:20}}>
                        { this.state.loadMoreNotify&&
                          <TouchableOpacity onPress={()=>this.getNotification(this.state.offsetNotifications)}  style={{padding:7,borderWidth:1,backgroundColor:themeColor,borderColor:themeColor,}} >
                            <Text   style={{color:'#fff',fontSize:15}}>Load More</Text>
                          </TouchableOpacity>
                        }
                          {! this.state.loadMoreNotify&&
                            <View   style={{}} >
                              <Text   style={{color:'#000',fontSize:15}}>No More Notifications</Text>
                            </View>
                          }
                      </View>
                    </ScrollView>
                   </View>
                }
                {i==1&&this.state.selectedTab==1&&
                  <View style={{flex:1,}}>
                   <ScrollView>
                   <FlatList
                       data={this.state.data}
                       keyExtractor={(item,index) => {
                         return index.toString();
                       }}
                       extraData={this.state}
                       showsVerticalScrollIndicator={false}
                       nestedScrollEnabled={true}
                       renderItem={({item, index}) =>{
                          return (
                              <View style={{flex:1,backgroundColor:'#f2f2f2',borderBottomWidth:5,borderColor:'#f2f2f2'}}>
                               <TouchableWithoutFeedback onPress={()=>{}}>
                                 <Card containerStyle={[styles.shadow, {borderWidth: 1, borderColor: '#fff', width:width,margin:0,padding:0,backgroundColor:'#fff'}]}>
                                    <View style={{height:'100%',}}>
                                      <View style={{flex:1,}}>
                                      <View style={{flexDirection:'row',marginHorizontal:15,marginVertical:10}}>
                                          <View style={{flex:1,alignItems:'flex-start'}}>
                                              <Text   style={{color:'#000',fontSize:16,fontWeight:'700'}}>{item.shortInfo}</Text>
                                          </View>
                                          <View style={{flex:1,alignItems:'flex-end'}}>
                                              <Text   style={{color:'#000',fontSize:14,}}>{moment(item.created).format('DD MMM')}</Text>
                                            {/*<View style={{backgroundColor:'#f2f2f2',paddingVertical:5,paddingHorizontal:10,borderRadius:15}}>
                                               <Text   style={{color:'#000',fontSize:14,}}>{item.status}</Text>
                                            </View>*/}
                                          </View>
                                        </View>
                                         <View style={{flexDirection:'row',marginHorizontal:15,marginBottom:10}}>
                                           <View style={{flex:1}}>
                                             <Text   style={{color:'#000',fontSize:16,}}>{item.message}</Text>
                                           </View>
                                        </View>
                                      </View>
                                    </View>
                                 </Card>
                                 </TouchableWithoutFeedback>
                            </View>
                       )}}
                     />
                     <View style={{alignItems:'center',justifyContent:'center',paddingVertical:20}}>
                     { this.state.loadMoreAnnouncement&&
                         <TouchableOpacity onPress={()=>this.getAnnouncements(this.state.offsetAnnouncement)}  style={{padding:7,borderWidth:1,backgroundColor:themeColor,borderColor:themeColor,}} >
                           <Text   style={{color:'#fff',fontSize:15}}>Load More</Text>
                         </TouchableOpacity>
                       }
                       {!this.state.loadMoreAnnouncement&&
                         <View   style={{}} >
                           <Text   style={{color:'#000',fontSize:15}}>No More Announcements</Text>
                         </View>
                       }
                     </View>

                   </ScrollView>

                  </View>
                }

                </View>
              );
            })}

        </ScrollView>
      </View>
    )
   }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 0,
    },

  });


  const mapStateToProps =(state) => {
      return {

    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {



    };
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Notification);
