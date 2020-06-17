import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Dimensions,ImageBackground,
  TextInput, FlatList, AsyncStorage, Alert, Linking, PermissionsAndroid, ToastAndroid,ActivityIndicator
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
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Audio } from 'expo-av';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview';
import TabBar from '../components/TabBar';
import SellerOrderCompo from '../components/SellerOrderCompo';
import SellerOrderAnnounce from '../components/SellerOrderAnnounce';
class CheckoutScreen extends React.Component {

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
         prod:[{uri:require('../assets/ifocus/products_sanitizer.png'),name:'sanitizer & handwash'},
               {uri:require('../assets/ifocus/products_immunity.png'),name:'immunity booster'},
               {uri:require('../assets/ifocus/products_multivitamins.png'),name:'multivitamins'},
               {uri:require('../assets/ifocus/product_ayurveda.png'),name:'ayurveda'},],
      add:false,
      count:1,
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


  minus=()=>{
    if(this.state.count==1){
      this.state.add = false;
      this.setState({count:this.state.count})
      return
    }
    this.state.count = this.state.count-1;
    this.setState({count:this.state.count})
  }

  plus=()=>{
    this.state.count = this.state.count+1;
    this.setState({count:this.state.count})
  }

  reviews=()=>{
    return(
      <FlatList
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
                                    backgroundColor:'#fff',paddingHorizontal:10,
                                    paddingTop:8,marginBottom:8,marginHorizontal:10}}>
           <TouchableOpacity >
               <View style={{flex:1,alignItems:'center',width:width*0.92,flexDirection:'row',paddingBottom:6}}>
                   <Text style={{ fontSize: 18, color: 'grey', fontWeight: '300',textAlign:'left' }} >Sudeepready garu</Text>
                   <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:2,backgroundColor:'#47BFD4',marginLeft:20,}}>
                       <Text>4.3</Text>
                       <FontAwesome name={'star'}/>
                   </View>
               </View>
               <View style={{flex:1,alignItems:'center',width:width*0.92}}>
                   <Text style={{ fontSize: 14, color: 'grey', fontWeight: '300',textAlign:'left' }} >Hatts off to you guys to
                     delivering this in just two days.Even during these times you are striving to deliver essential to people .
                     Thank you for your service...specialy the last mile delivery exclucive.</Text>
               </View>
             </TouchableOpacity>
           </TouchableOpacity>
        ) }}
      />
    )
  }

  saftyInfo=()=>{
    return(
      <View style={{paddingHorizontal:10}}>
        <Text style={{fontSize:14}}>-Do not exceeds the recomended date</Text>
        <Text style={{fontSize:14}}>-Do not exceeds the recomended date</Text>
        <Text style={{fontSize:14}}>-Do not exceeds the recomended date</Text>
      </View>
    )
  }

  productDesc=()=>{
    return(
      <View>
        <Text style={{fontSize:16}}>Revaital H women is a nutrician suliment for </Text>
        <Text style={{fontSize:16}}>Revaital H women is a nutrician suliment for </Text>
        <Text style={{fontSize:16}}>Revaital H women is a nutrician suliment for </Text>
        <Text style={{fontSize:16}}>Revaital H women is a nutrician suliment for </Text>
        <Text style={{fontSize:16}}>Revaital H women is a nutrician suliment for </Text>
        <Text style={{fontSize:16}}>Revaital H women is a nutrician suliment for </Text>
      </View>
    )
  }

  render() {
    const Item1=this.props.navigation.getParam('item',null);
    console.log(Item1,'Item1');
    return (
      <View style={{flex:1}}>
        <View style={{height:Constants.statusBarHeight,backgroundColor:'#103368'}}></View>
        <View  style={{justifyContent:'space-between',backgroundColor:'#fff',borderBottomWidth:0.5,
                      height:55,width:width,flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                   <MaterialIcons name={'arrow-back'} size={30} color={'#000'} style={{paddingLeft:10}}/>
              </TouchableOpacity>

            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SearchScreen')}}>
                    <FontAwesome name={'search'} size={20}/>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 10 ,paddingRight:5}} onPress={()=>this.props.navigation.navigate('CartScreen')}   >
                    <Image source={require('../assets/ifocus/cart.png')}style={{height:22,width:20}} resizeMode={'contain'} />
                </TouchableOpacity>
            </View>
        </View>
        <ScrollView style={{marginVertical:0,backgroundColor:'#fff',paddingBottom:200}}>
            <MyCarousel1 navigation={this.props.navigation} render={Item1}/>
            <View style={{borderWidth:0,marginHorizontal:10}}>
                <Text style={{fontSize:18,paddingVertical:2}}>Revital H Vitamin Tablet</Text>
                <Text style={{paddingVertical:2}}>Multivitamins</Text>
                <View style={{flexDirection:'row',paddingVertical:2}}>
                    <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:2,backgroundColor:'#47BFD4'}}>
                        <Text>4.3</Text>
                        <FontAwesome name={'star'}/>
                    </View>
                    <Text>  455 rating</Text>
                </View>
                <View style={{borderWidth:0,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:4}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                     <FontAwesome name={'rupee'} size={20}/>
                        <Text style={{fontSize:22}}>120</Text>
                        <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:6}}>
                          <FontAwesome name={'rupee'} size={16}/>
                          <Text style={{fontSize:16,}}>120</Text>
                        </View>
                    </View>
                    {this.state.add==true?
                      <View style={{width:width*0.3,flexDirection:'row',
                                    justifyContent:'center',alignItems:'center',
                                    borderWidth:1,borderRadius:17}}>
                            <TouchableOpacity onPress={()=>{this.minus()}} style={{borderWidth:0,paddingVertical:0,paddingHorizontal:6}}>
                                <Text style={{paddingHorizontal:4,fontSize:22}}>-</Text>
                            </TouchableOpacity>
                            <Text style={{paddingHorizontal:10}}>{this.state.count}</Text>
                            <TouchableOpacity onPress={()=>{this.plus()}}style={{borderWidth:0,paddingVertical:0,paddingHorizontal:6}}>
                                <Text style={{paddingHorizontal:4,fontSize:22}}>+</Text>
                            </TouchableOpacity>
                      </View>:
                      <TouchableOpacity onPress={()=>{this.setState({add:true})}}
                                style={{flexDirection:'row',alignItems:'center',backgroundColor:'#204C71',paddingVertical:2,paddingHorizontal:4}}>
                          <Text style={{fontSize:16,color:'#fff',paddingHorizontal:2}}>Add To Cart</Text>
                          <Image source={require('../assets/ifocus/cart.png')}resizeMode={'contain'}
                                style={{height:22,width:20,tintColor:'#fff',marginHorizontal:2}}/>
                      </TouchableOpacity>
                    }
                </View>
                <Text style={{fontSize:22,fontWeight:'400'}}>Product Description</Text>
                {this.productDesc()}
                <Text style={{fontSize:20,fontWeight:'400',paddingTop:10}}>Quantity</Text>
                <Text style={{fontSize:14,paddingVertical:2}}>10 no's</Text>
                <Text style={{fontSize:20,fontWeight:'400'}}>Mfg Date</Text>
                <Text style={{fontSize:14,paddingVertical:2}}>10 May 2020</Text>
                <Text style={{fontSize:20,fontWeight:'400',paddingTop:10}}>Expire on</Text>
                <Text style={{fontSize:14,paddingVertical:2}}>10 May 2020</Text>
                <Text style={{fontSize:20,fontWeight:'400',paddingTop:10}}>Safty information</Text>
                {this.saftyInfo()}
                <Text style={{fontSize:20,fontWeight:'400',paddingTop:6}}>Reviews</Text>
            </View>
            {this.reviews()}
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen);
class MyCarousel1 extends React.Component {
  constructor(props) {
    super(props);
    const Item1=this.props.navigation.getParam('item',null);
    this.state={
      activeSlide:0,
      entries :[Item1],
      // [{img:require('../assets/ifocus/cart_Revital.png')},
      //            {img:require('../assets/ifocus/cart_Revital.png')},
      //            {img:require('../assets/ifocus/cart_Revital.png')}]
      }
    }
    _renderItem ({item, index}) {
      return <View
                  style={{width:width*0.95,height:width*0.55,borderWidth:0,
                          justifyContent:'center',
                          borderRadius:10,alignItems:'center'}}>

                  <View style={{width:width*0.95,height:width*0.55,borderWidth:0,borderColor:'#fff',alignSelf:'center',marginLeft:8}}>
                    <Image  source={item.uri} style={{width:'100%',height:'100%',justifyContent:'center'}}resizeMode={'contain'}/>
                  </View>
          </View>
    }
    get pagination () {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={entries.length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: 'trasnparent' }}
              dotStyle={{
                  width: 8,
                  height: 8,
                  borderRadius:4,
                  marginHorizontal:1,
                  backgroundColor: '#d21850',
                  borderWidth:0.2
              }}
              inactiveDotStyle={{
                  width: 8,
                  height: 8,
                  borderRadius:4,
                  marginHorizontal:1,
                  backgroundColor: '#cfcfcf',
                  borderWidth:0.5
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }
    render () {
        return (
            <View>
                <Carousel
                  data={this.state.entries}
                  renderItem={this._renderItem}
                  onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                />
                {/* { this.pagination } */}
            </View>
      );
  }
}
const sliderWidth=width*1;
const itemWidth=width*0.95;
