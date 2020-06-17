import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,ToastAndroid,
  TouchableOpacity,
  View,ActivityIndicator,
  TouchableWithoutFeedback,
  Dimensions,ImageBackground,
  TextInput, FlatList, AsyncStorage, Alert, Linking, PermissionsAndroid,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import { FontAwesome,MaterialIcons,Entypo ,Ionicons} from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import  Constants  from 'expo-constants';
import {SearchBar,Card}from 'react-native-elements';
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
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Audio } from 'expo-av';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview';
import TabBar from '../components/TabBar';
import SellerOrderCompo from '../components/SellerOrderCompo';
import SellerOrderAnnounce from '../components/SellerOrderAnnounce';
import Modal from "react-native-modal";

const { width } = Dimensions.get('window');
const height = width * 0.8
const SERVER_URL = settings.url
const themeColor = settings.themeColor

class MyAddress extends React.Component {

  static navigationOptions = {
    header:null,
  }

  constructor(props) {
    super(props);
    var address=this.props.navigation.getParam('address',null);
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
        prod:[{uri:require('../assets/ifocus/products_sanitizer.png'),name:'sanitizer & handwash'},],
        add:false,
        count:1,
        model3:false,
        select:false,
        add:(address==true?true:false),
    }
    this.playbackInstance = null;
  }

  next=(item)=>{
    console.log('ddddddddddddddddddddd')
    if(item.name=='sanitizer & handwash'){
      this.props.navigation.navigate('SenitizerScreen',{item:item});
    }
    else if(item.name=='multivitamins'){
      this.props.navigation.navigate('Multivitamins',{item:item});
    }
    else if(item.name=='cough & cold'){
      this.props.navigation.navigate('CoughcoldScreen',{item:item});
    }else{
      Alert.alert('page not found');
    }
  }

  minus = ()=>{
    if(this.state.count==1){
      this.state.add = false;
      this.setState({count:this.state.count})
      return
    }
    this.state.count = this.state.count-1;
    this.setState({count:this.state.count})
  }

  plus = ()=>{
    this.state.count = this.state.count+1;
    this.setState({count:this.state.count})
  }

  nextScreen=(address)=>{
    if(address==true){
      this.props.navigtion.goBack()
    }else{
      return
    }
  }

  modal=()=>{
    return(
      <Modal isVisible={this.state.model3}
              animationIn="fadeIn" animationOut="fadeOut" hasBackdrop={true}
              backdropColor={'#f0f0f0'} >
              <View style={[styles.modalView,{paddingVertical:20,justifyContent:'center',
                            alignItems:'center',paddingHorizontal:0,backgroundColor:'#fff'}]}>
                  <View style={{justifyContent:'center',alignItems:'center',width:width*0.6,height:width*0.8,backgroundColor:'#fff'}}>
                      <View style={{paddingVertical:6,paddingHorizontal:15}}>
                        <Text style={{fontSize:18,marginVertical:6}}>Street</Text>
                        <TextInput style={{backgroundColor:'#ffffff',
                                          borderRadius:7,
                                          paddingHorizontal:0,
                                          paddingVertical:4,
                                          fontSize:16,
                                          width:width*0.7,
                                          borderBottomWidth:1,
                                          borderColor:'#bdbdbd',marginBottom:10,
                                          marginTop:0,backgroundColor:'#fff'}}
                                     onChangeText={(name)=>this.setState({name})}
                                     value={this.state.name}
                                     placeholder={'Name'}>
                        </TextInput>
                        <Text style={{fontSize:18,marginVertical:6}}>Landmark</Text>
                        <TextInput style={{backgroundColor:'#ffffff',
                                          borderRadius:7,
                                          paddingHorizontal:0,
                                          paddingVertical:4,
                                          fontSize:16,
                                          width:width*0.7,
                                          borderBottomWidth:1,
                                          borderColor:'#bdbdbd',marginBottom:10,
                                          marginTop:0,backgroundColor:'#fff'}}
                                     onChangeText={(city)=>this.setState({city})}
                                     value={this.state.city}
                                     placeholder={'City'}>
                        </TextInput>
                        <Text style={{fontSize:18,marginVertical:6}}>Pincode</Text>
                        <TextInput style={{backgroundColor:'#ffffff',
                                          borderRadius:7,
                                          paddingHorizontal:0,
                                          paddingVertical:4,
                                          fontSize:16,
                                          width:width*0.7,
                                          borderBottomWidth:1,
                                          borderColor:'#bdbdbd',marginBottom:10,
                                          marginTop:0,backgroundColor:'#fff'}}
                                     onChangeText={(state)=>this.setState({state})}
                                     value={this.state.state}
                                     placeholder={'State'}>
                        </TextInput>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <TouchableOpacity
                            onPress={()=>{this.setState({model3:false,add:false});}}
                            style={{marginVertical:20,backgroundColor:'#5599D2',borderRadius:10,justifyContent:'center',alignSelf:'center',alignItems:'center'}}>
                            <Text style={{fontSize:18,color:'#fff',paddingHorizontal:15,paddingVertical:2}}>cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{this.setState({model3:false,add:true});}}
                            style={{marginVertical:20,backgroundColor:'#5599D2',borderRadius:10,justifyContent:'center',alignSelf:'center',alignItems:'center'}}>
                            <Text style={{fontSize:18,color:'#fff',paddingHorizontal:15,paddingVertical:2}}>Submeet</Text>
                        </TouchableOpacity>
                      </View>
                  </View>
               </View>
            </View>
        </Modal>
    )
  }

  render() {
    const audio=this.props.navigation.getParam('item',null);
    const address=this.props.navigation.getParam('address',null);
    console.log(address,'address');
    return (
      <View style={{flex:1}}>
      {this.modal()}
          <View style={{height:Constants.statusBarHeight,backgroundColor:'#103368'}}></View>
          <View  style={{justifyContent:'space-between',backgroundColor:'#fff',borderBottomWidth:0.5,
                          height:55,width:width,flexDirection:'row',alignItems:'center'}}>
              <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                   <MaterialIcons name={'arrow-back'} size={30} color={'#000'} style={{paddingLeft:10}}/>
              </TouchableOpacity>
              <Text style={{fontSize:20,marginHorizontal:10}}>MyAddress</Text>
              </View>
              <TouchableOpacity onPress={()=>{this.setState({model3:true});}}
              style={{flexDirection:'row',marginRight:15}}>
                   <FontAwesome name={'plus'} size={18}/>
                   <Text>Add</Text>
              </TouchableOpacity>
          </View>

          <ScrollView style={{marginVertical:0,backgroundColor:'#fff',paddingBottom:200}}>
            {this.state.add==true?<FlatList
                data={this.state.prod}
                showsHorizontalScrollIndicator={false}
                extraData={this.state.prod}
                style={{}}
                inverted={false}
                scrollToEnd={true}
                horizontal={false}
                nestedScrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index})=>{
               return(
             <TouchableOpacity style={{flex:1,borderWidth:1,borderColor:'#C7C7C7',
                                       width:width*0.95,backgroundColor:'#fff',
                                       paddingHorizontal:10,paddingTop:8,
                                       marginVertical:8,marginHorizontal:10}}>
               <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('Checkout',{add:true});}} >
                   <View style={{flex:1,alignItems:'center',width:width*0.9,flexDirection:'row',paddingBottom:6,justifyContent:'space-between'}}>
                       <Text style={{ fontSize: 16, color: 'grey', fontWeight: '300',textAlign:'left' }} >Back/Door no</Text>
                       <View style={{flexDirection:'row',alignItems:'center',color: 'grey',paddingHorizontal:2,backgroundColor:'#fff',}}><Text>City:Bangalore</Text></View>
                   </View>
                   <View style={{flex:1,alignItems:'center',width:width*0.9,flexDirection:'row',paddingBottom:6,justifyContent:'space-between'}}>
                       <Text style={{ fontSize: 16, color: 'grey', fontWeight: '300',textAlign:'left' }} >14 cross road,Madiwla</Text>
                       <View style={{flexDirection:'row',alignItems:'center',color: 'grey',paddingHorizontal:2,backgroundColor:'#fff',}}><Text>State: Karnatka</Text></View>
                   </View>
                   <View style={{flex:1,alignItems:'center',width:width*0.9,flexDirection:'row',paddingBottom:6,justifyContent:'space-between'}}>
                       <Text style={{ fontSize: 16, color: 'grey', fontWeight: '300',textAlign:'left' }} >Landmark:Safa super market</Text>
                       <View style={{flexDirection:'row',alignItems:'center',color: 'grey',paddingHorizontal:2,backgroundColor:'#fff',}}><Text>Country: India</Text></View>
                   </View>
                   <View style={{borderWidth:0}}>
                       <Text style={{ fontSize: 16, color: 'grey',textAlign:'left' }} >Pincode:560068</Text>
                   </View>
                   <View style={{borderWidth:0,justifyContent:'space-between',flexDirection:'row',marginVertical:10}}>
                      <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}
                        onPress={()=>this.setState({select:!this.state.select})}>
                        {this.state.select==true?<Ionicons name={'md-radio-button-on'} size={16}/>:<Ionicons name={'md-radio-button-off'} size={16}/>}
                        <Text>select</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                        <FontAwesome name={'edit'} size={16}/>
                        <Text>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                        <FontAwesome name={'trash-o'} size={16}/>
                        <Text>Delete</Text>
                      </TouchableOpacity>
                   </View>
                 </TouchableOpacity>
               </TouchableOpacity>
             ) }}
           />:<View></View>}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyAddress);
