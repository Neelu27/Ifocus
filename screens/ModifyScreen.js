import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,ToastAndroid,ActivityIndicator,
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
import { FloatingAction } from "react-native-floating-action";
// import {Slider} from 'react-native-slider';
// import VolumeSlider from 'react-native-volume-slider';
// import { Player } from 'react-native-audio-streaming';
import { Audio } from 'expo-av';
import Modal from "react-native-modal";

class ModifyScreen extends React.Component{

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
                {img:require('../assets/sound/jag.jpeg'),name:'Jagjit Singh'},
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
        model:false,
        model1:false,
        model2:false,
        mode:false
    }
    this.playbackInstance = null;
  }
  componentWillReceiveProps({navigation}) {
        console.log(navigation,'rrrrrrrrrrrrrrrr');
        var update = navigation.getParam('item',null)
        if(update == true){
          this.setState({model:true})
        }
        var update2 = navigation.getParam('item1',null)
        if(update2 == true){
          this.setState({model1:true})
        }

      }

  render() {

    return (
      <View style={{flex:1}}>
        <Modal isVisible={this.state.mode} animationIn="fadeIn" animationOut="fadeOut" hasBackdrop={true} backdropColor={'#5586D2'} >
              <View style={[styles.modalView,
                    {width:width*0.6,height:width*0.6,borderRadius:17,backgroundColor:'#fff',
                    alignSelf:'center',paddingVertical:15,paddingHorizontal:10,backdropColor:'#fff',borderWidth:0,}]}>
                  <View style={{backgroundColor:'#5586D2',marginHorizontal:-10,marginTop:-15}}>
                    <Text  style={{fontSize:20,color:'#fff',textAlign:'center',paddingVertical:4}}>Enter Today's Collections</Text>
                  </View>
                  <Text  style={{fontSize:18,color:'#000',marginTop:20,textAlign:'center'}}>Outstanding  23,000</Text>
                  <Text style={{textAlign:'center',fontSize:18,color:'#000',}}> Collected  10,000</Text>
                  <View style={{paddingHorizontal:6,ignItems:'center',justifyContent:'space-between',flexDirection:'row',marginTop:40}}>
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
        <Modal isVisible={this.state.model} animationIn="fadeIn" animationOut="fadeOut" hasBackdrop={true} backdropColor={'#5586D2'} >
              <View style={[styles.modalView,
                    {width:width*0.6,height:width*0.6,borderRadius:17,backgroundColor:'#fff',
                    alignSelf:'center',paddingVertical:15,paddingHorizontal:10,backdropColor:'#fff',borderWidth:0,}]}>
                  <Text  style={{fontSize:20,color:'#000',fontWeight:'600',textAlign:'center'}}>Merchandise</Text>
                  <Text  style={{fontSize:18,color:'#000',marginTop:20,textAlign:'center'}}>Do you want to add</Text>
                  <Text style={{textAlign:'center',fontSize:18,color:'#000',}}> merchandise photo?</Text>
                  <View style={{paddingHorizontal:15,ignItems:'center',justifyContent:'space-between',flexDirection:'row',marginTop:40}}>
                      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CameraScreens');this.setState({model:false})}}
                          style={{borderRadius:10,backgroundColor: "#5586D2",paddingHorizontal:30,paddingVertical:6}}>
                          <Text  style={{fontSize:18,color:'#fff',fontWeight:'600',alignSelf:'center',}}>Yes</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{this.setState({model1:true})}}
                        style={{borderRadius:10,backgroundColor: "#5586D2",paddingHorizontal:30,paddingVertical:6,}}>
                          <Text  style={{fontSize:18,color:'#fff',fontWeight:'600',alignSelf:'center',}}>No</Text>
                      </TouchableOpacity>
                  </View>
                </View>
          </Modal>
          <Modal isVisible={this.state.model1} animationIn="fadeIn" animationOut="fadeOut" hasBackdrop={true} backdropColor={'#5586D2'} >
                <View style={[styles.modalView,
                      {width:width*0.6,height:width*0.6,borderRadius:17,backgroundColor:'#fff',
                      alignSelf:'center',paddingVertical:15,paddingHorizontal:10,backdropColor:'#fff',borderWidth:0,}]}>
                    <Text  style={{fontSize:20,color:'#000',fontWeight:'600',textAlign:'center'}}>Collections</Text>
                    <Text  style={{fontSize:18,color:'#000',marginTop:20,textAlign:'center'}}>Do you want to add</Text>
                    <Text style={{textAlign:'center',fontSize:18,color:'#000',}}> collections detail?</Text>
                    <View style={{paddingHorizontal:15,ignItems:'center',justifyContent:'space-between',flexDirection:'row',marginTop:40}}>
                        <TouchableOpacity onPress={()=>this.setState({mode:true})}
                            style={{borderRadius:10,backgroundColor: "#5586D2",paddingHorizontal:30,paddingVertical:6}}>
                            <Text  style={{fontSize:18,color:'#fff',fontWeight:'600',alignSelf:'center',}}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.setState({model2:true})}}
                          style={{borderRadius:10,backgroundColor: "#5586D2",paddingHorizontal:30,paddingVertical:6,}}>
                            <Text  style={{fontSize:18,color:'#fff',fontWeight:'600',alignSelf:'center',}}>No</Text>
                        </TouchableOpacity>
                    </View>
                  </View>
            </Modal>

            <Modal isVisible={this.state.model2} animationIn="fadeIn" animationOut="fadeOut" hasBackdrop={true} backdropColor={'#5586D2'} >
                  <View style={[styles.modalView,
                        {width:width*0.6,height:width*0.8,borderRadius:17,backgroundColor:'#fff',
                        alignSelf:'center',paddingVertical:15,paddingHorizontal:10,backdropColor:'#fff',borderWidth:0,}]}>
                        <TouchableOpacity style={{alignSelf:'center'}}>
                          <FontAwesome name={'check-circle'} size={62} color={'green'}/>
                        </TouchableOpacity>
                      <Text  style={{fontSize:20,color:'#000',fontWeight:'600',textAlign:'center'}}>You have successfully</Text>
                      <Text  style={{fontSize:20,color:'#000',fontWeight:'600',textAlign:'center'}}>completed the visit.</Text>
                      <Text  style={{fontSize:18,color:'#000',marginTop:10,textAlign:'center'}}>Your Next Store is</Text>
                      <Text style={{textAlign:'center',fontSize:18,color:'#000',}}>Kundan Electronics</Text>
                      <Text style={{textAlign:'center',fontSize:18,color:'#000',}}>Do you want to visit?</Text>

                      <View style={{paddingHorizontal:15,ignItems:'center',justifyContent:'space-between',flexDirection:'row',marginTop:40}}>
                          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('AudioPlayScreen')}}
                              style={{borderRadius:10,backgroundColor: "#5586D2",paddingHorizontal:30,paddingVertical:6}}>
                              <Text  style={{fontSize:18,color:'#fff',fontWeight:'600',alignSelf:'center',}}>Yes</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={()=>this.props.navigation.navigate('ContinueSafa')}
                            style={{borderRadius:10,backgroundColor: "#5586D2",paddingHorizontal:30,paddingVertical:6,}}>
                              <Text  style={{fontSize:18,color:'#fff',fontWeight:'600',alignSelf:'center',}}>No</Text>
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
                  <TouchableOpacity style={{marginHorizontal:10}}>
                       <Image source={require('../AllImage/Icons-POI/notification.png')} style={{height:22,width:20,tintColor:'#fff'}}  />
                  </TouchableOpacity>
             </ImageBackground>
          </View>
          <View style={{marginVertical:0}}>
            <View style={{backgroundColor:'#CECECF'}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:20,paddingVertical:10,alignItems:'center'}}>
                   <Text style={{fontSize:18,color:'#1A55AF'}}>Order no: 123</Text>
                   <Text style={{fontSize:16,color:'#1A55AF'}}>9-3-2020</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',borderWidth:0,marginVertical:0,paddingHorizontal:10,backgroundColor:'#fff'}}>
                <View style={{flex:0.5,borderWidth:0}}>
                    <Text>products name</Text>
                </View>
                <View style={{flex:0.25,borderLeftWidth:1,borderRightWidth:1,alignItems:'center'}}>
                    <Text>Rate</Text>
                </View>
                <View style={{flex:0.25,borderWidth:0}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>Stock</Text>
                        <Text>Qty</Text>
                    </View>
                </View>
            </View>
            <View style={{flexDirection:'row',borderWidth:0,marginVertical:0,paddingHorizontal:10,backgroundColor:'#D4D8D7'}}>
                <View style={{flex:0.5,borderWidth:0,paddingVertical:10}}>
                    <Text style={{paddingVertical:6}}>Cashew 500g</Text>
                    <Text style={{paddingVertical:6}}>KinderJoy</Text>
                </View>
                <View style={{flex:0.25,borderLeftWidth:1,borderRightWidth:1,alignItems:'center',paddingVertical:10}}>
                    <Text style={{paddingVertical:6}}>500</Text>
                    <Text style={{paddingVertical:6}}>30</Text>
                </View>
                <View style={{flex:0.25,borderWidth:0,paddingVertical:10}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{paddingVertical:6}}>40</Text>
                        <Text style={{paddingVertical:6}}>10</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{paddingVertical:6}}>30</Text>
                        <Text style={{paddingVertical:6}}>10</Text>
                    </View>
                </View>
            </View>
        </View>
        <View style={{position:'absolute',bottom:0,left:0,right:0}}>
            <View style={{height:50,borderWidth:0,borderTopLeftRadius:10,borderTopRightRadius:10,paddingHorizontal:15,
                          backgroundColor:'#4C4D4C',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                {/* <FontAwesome name={'plus'} size={20} color={'#fff'}/> */}
                <View style={{flexDirection:'row',alignItems:'center',}}>
                    <FontAwesome name={'rupee'} size={20} color={'#fff'}/>
                    <Text style={{color:'#fff'}}>6,890</Text>
               </View>
               <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={{paddingHorizontal:15,paddingVertical:4,backgroundColor:'#000',borderRadius:10}}
                                  onPress={()=>this.props.navigation.navigate('ContinueSafa')}>
                    <Text style={{color:'#fff',fontSize:20}}>Modify Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:4,paddingHorizontal:15,paddingVertical:4,backgroundColor:'green',borderRadius:10}}
                                  onPress={()=>this.setState({model:true})}>
                    <Text style={{color:'#fff',fontSize:20}}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
       </View>
     </View>
    );
  }
}


const styles = StyleSheet.create({
 container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
 },
 albumCover:{
    width: 250,
    height: 250
 },
 trackInfo:{
    padding: 40,
    backgroundColor: '#fff'
 },
 trackInfoText:{
    textAlign: 'center',
    flexWrap: 'wrap',
    color: '#550088'
 },
 largeText:{
   fontSize: 22
 },
 smallText:{
   fontSize: 16
 },
 control:{
   margin: 20
 },
 controls:{
   flexDirection: 'row'
 },
})

const mapStateToProps =(state) => {
    return {}
}

const mapDispatchToProps =(dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyScreen);
