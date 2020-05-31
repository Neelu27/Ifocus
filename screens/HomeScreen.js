import React from 'react';
import {
  Image,Platform,Switch,
  ScrollView,StyleSheet,
  Text,Button,TextInput,
  TouchableOpacity,View,
  Slider,ImageBackground,TouchableWithoutFeedback,
  Dimensions, Alert,StatusBar,
  FlatList, AppState, BackHandler ,LayoutAnimation,
  AsyncStorage,ActivityIndicator,NativeModules,
  ToastAndroid,RefreshControl} from 'react-native';
import { createDrawerNavigator,DrawerItems, } from 'react-navigation-drawer';
import {SearchBar,Card}from 'react-native-elements';
import {Fontisto, FontAwesome,Entypo,MaterialIcons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import  Constants  from 'expo-constants';
import { withNavigationFocus,DrawerActions ,DrawerNavigator} from 'react-navigation';
import settings from '../constants/Settings.js';
import CaroselScreen from '../components/CaroselScreen';
import Toast, {DURATION} from 'react-native-easy-toast';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
// import Video from 'react-native-video';
import Timeline from '../index1';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFont from 'react-native-vector-icons/FontAwesome';
import ModalBox from 'react-native-modalbox';
// import { Switch } from 'react-native-switch';
// import Video from 'react-native-af-video-player';
import {Video} from 'expo-av';


const { width } = Dimensions.get('window');
const height = width * 0.8
const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      product:[{name:'Hotel Empire',type:'non-veg',rs:'200/',off:'30%',uri:require('../assets/images/11.jpeg'),rate:4.1,vote:'233 vote'},
                {name:'Biryani House',type:'non-veg',rs:'100/',off:'40%',uri:require('../assets/images/12.jpeg'),rate:4.2,vote:'75676 vote'},
                {name:'Behrouz Biryani',type:'non-veg',rs:'300/',off:'30%',uri:require('../assets/images/13.jpeg'),rate:3.7,vote:'5678 vote'},
                {name:'Hotel Udepy Sagar',type:'non-veg',rs:'200/',off:'30%',uri:require('../assets/images/14.jpeg'),rate:3.1,vote:'578 vote'},
                {name:'Indus',type:'non-veg',rs:'200/',off:'30%',uri:require('../assets/images/15.jpeg'),rate:4.1,vote:'233 vote'},
                {name:'RajBhog',type:'non-veg',rs:'200/',off:'30%',uri:require('../assets/images/16.jpeg'),rate:4.4,vote:'1244 vote'},
                {name:'Panjabi Dhaba',type:'non-veg',rs:'200/',off:'30%',uri:require('../assets/images/17.jpeg'),rate:4.5,vote:'3578 vote'},
                {name:'Kabab Point',type:'non-veg',rs:'200/',off:'30%',uri:require('../assets/images/18.jpeg'),rate:4.5,vote:'4000 vote'}],
      products:[{name:require('../assets/images/off1.jpeg'),img:require('../assets/video/bhag4.jpg'),uri:'https://www.dropbox.com/s/df2d2gf1dvnr5uj/Sample_1280x720_mp4.mp4',namei:'BhagwatGita',},
                {name:require('../assets/images/off3.jpeg'),img:require('../assets/video/ram1.jpg'),uri:'https://www.dropbox.com/s/s1rc65usypfacde/Sample_1280x720_webm.webm',namei:'Ramayana',},
                {name:require('../assets/images/off2.jpeg'),img:require('../assets/video/maha1.jpg'),uri:'https://www.dropbox.com/s/y0ry2w3i7q59ozx/Sample_854x480.mp4',namei:'Mahabhart',},
                {name:require('../assets/images/off1.jpeg'),img:require('../assets/video/bhag1.jpg'),uri:'https://www.dropbox.com/s/swjjl14kcamsodn/Sample_640x360.mp4',namei:'BhagwatGita part-1',},
                {name:require('../assets/images/off3.jpeg'),img:require('../assets/video/bhag2.png'),uri:'https://www.dropbox.com/s/0x2ke57h7wv49ll/Sample_512x288.mp4',namei:'BhagwatGita part-2',},
                {name:require('../assets/images/off2.jpeg'),img:require('../assets/video/maha2.jpg'),uri:'https://www.dropbox.com/s/df2d2gf1dvnr5uj/Sample_1280x720_mp4.mp4',namei:'Mahabhart part-1',},
                {name:require('../assets/images/off1.jpeg'),img:require('../assets/video/maha3.jpg'),uri:'https://www.dropbox.com/s/0x2ke57h7wv49ll/Sample_512x288.mp4',namei:'Mahabhart part-2',},
                {name:require('../assets/images/off3.jpeg'),img:require('../assets/video/bhag3.jpeg'),uri:'https://www.dropbox.com/s/0x2ke57h7wv49ll/Sample_512x288.mp4',namei:'BhagwatGita',count:'x1',},
                {name:require('../assets/images/off2.jpeg'),img:require('../assets/video/ram2.jpg'),uri:'https://www.dropbox.com/s/0x2ke57h7wv49ll/Sample_512x288.mp4',namei:'Ramayana',count:'x1',}],
      images : [{name:'Primary',value:'Rs. 4,000/-',},
                {name:'Premium',value:'Rs. 10,000/-',},
                {name:'Platnum',value:'Rs. 20,000/-',}],
      enabled:false,
      switchValue: false,
      prod:[{uri:require('../assets/ifocus/Multivitamins.png'),name:'Multivitamins'},
            {uri:require('../assets/ifocus/Oralcare.png'),name:'Oral care'},
            {uri:require('../assets/ifocus/Familynutrition.png'),name:'Family nutrition'},
            {uri:require('../assets/ifocus/Diapers.png'),name:'Diapers'},],
      prod1:[{uri:require('../assets/ifocus/SanitizerHandwash.png'),name:'Sanitizer & Handwash'},
            {uri:require('../assets/ifocus/Thermometers.png'),name:'Thermometers'},
            {uri:require('../assets/ifocus/Masks.png'),name:'Masks'},
            {uri:require('../assets/ifocus/Faceshield.png'),name:'Faceshield'},],
      play:false,
      attachOpen:false,
      st:false,
      st1:false,
      st2:false,
      st3:false,
      }
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        console.log(params,'params')
        return {header:null}
      };

  search(){
     LayoutAnimation.spring();
     var search = !this.state.search
     this.setState({search:!this.state.search})
   }

  render() {
    return (
      <View style={{flex:1}}>
           <Toast style={{backgroundColor: 'grey'}} textStyle={{color: '#fff'}} ref="toast" position = 'top'/>
           <View style={{height:Constants.statusBarHeight,backgroundColor:'#103368'}} />
           <View style={{borderWidth:0,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:15,paddingTop:15,paddingBottom:4}}>
               <View style={{flexDirection:'row',alignItems:'center'}}>
                   <TouchableOpacity onPress={()=>{this.props.navigation.openDrawer();}}>
                       <FontAwesome name={'bars'} size={20} style={{height:20,width:20,tintColor:'#000'}} color={'#000'} />
                   </TouchableOpacity>
                   <View style={{ marginHorizontal: 10 }} >
                      <Image source={require('../assets/ifocus/logo.png')} style={{height:30,width:30}}  />
                   </View>
               </View>
               <View style={{flexDirection:'row',alignItems:'center'}}>
                   <TouchableOpacity style={{ marginHorizontal: 8 }} onPress={()=>this.props.navigation.navigate('Notification')}  >
                      <Image source={require('../assets/ifocus/Notification.png')} style={{height:22,width:20}}  />
                   </TouchableOpacity>
                   <TouchableOpacity style={{ marginHorizontal: 10 ,paddingRight:5}} onPress={()=>this.props.navigation.navigate('CartScreen')}  >
                      <Image source={require('../assets/ifocus/cart.png')}style={{height:22,width:20}}  />
                   </TouchableOpacity>
              </View>
           </View>
           <View style={{flex:1,justifyContent:'center',borderWidth:0,paddingTop:10}}>
               <View style={{width:width*0.92,paddingHorizontal:0,borderWidth:0,borderRadius:17,marginVertical:6,alignSelf:'center'}}>
                   <SearchBar
                   placeholder="Search for health product and policy"
                   onChange={(text)=>{this.props.navigation.navigate('SearchScreen')}}
                   searchIcon={{
                     size:27
                   }}
                   clearIcon={{
                     size:27
                   }}
                   containerStyle={{borderWidth:1,borderRadius:17,backgroundColor:'#f2f2f2',borderColor:'#f2f2f2',
                   borderBottomColor: '#f2f2f2',borderTopColor:'#f2f2f2',padding:0,}}
                   inputContainerStyle={{borderWidth:1,borderRadius:17,margin:0,width:'100%',backgroundColor:'#fefefe',borderColor:'#fff',borderBottomWidth:1,borderBottomColor: '#f2f2f2',borderTopColor:'#f2f2f2'}}
                   />
               </View>
               <View style={{flexDirection:'row',justifyContent:'space-between',width:width*0.92,paddingHorizontal:0,borderWidth:0,borderRadius:0,marginVertical:6,alignSelf:'center'}}>
                   <TouchableOpacity
                        style={{borderWidth:0,height:width*0.25,width:width*0.25,alignItems:'center',justifyContent:'center'}}
                        onPress={()=>this.props.navigation.navigate('HealthProduct')}>
                       <Image source={require('../assets/ifocus/healthproducts.png')} style={{width:50,height:50}}/>
                       <Text style={{fontSize:14,paddingTop:6,textAlign:'center'}}>Health Product</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                        style={{borderWidth:0,height:width*0.25,width:width*0.25,alignItems:'center',justifyContent:'center'}}
                        onPress={()=>this.props.navigation.navigate('HealthPolicy')}>
                        <Image source={require('../assets/ifocus/healthproducts.png')} style={{width:50,height:50}}/>
                        <Text style={{fontSize:14,paddingTop:6,textAlign:'center'}}>Health Policy</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                         style={{borderWidth:0,height:width*0.25,width:width*0.25,alignItems:'center',justifyContent:'center'}}
                         onPress={()=>this.props.navigation.navigate('Survey')}>
                         <Image source={require('../assets/ifocus/healthproducts.png')} style={{width:50,height:50}}/>
                         <Text style={{fontSize:14,paddingTop:6,textAlign:'center'}}>Survey</Text>
                   </TouchableOpacity>
               </View>
               <View style={{shadowColor:"#fefefe",borderWidth:0.2,borderColor:'#fefefe',
               shadowOpacity:0.2,shadowRadius:15,
               shadowOffset:{height:2,width:0},elevation:5,}}/>
               <ScrollView style={{paddingTop:10}}>
                 <MyCarousel/>

                 <View style={{borderWidth:0,marginHorizontal:12}}>
                     <View style={{justifyContent:'space-between',flexDirection:'row',paddingBottom:4,paddingTop:8}}>
                         <Text style={{fontSize:18}}>Daily Essential</Text>
                         <TouchableOpacity onPress={()=>this.props.navigation.navigate('HealthProduct')}>
                           <Text style={{fontSize:18,color:'#55CED2'}}>See All</Text>
                         </TouchableOpacity>
                     </View>
                     <FlatList
                         data={this.state.prod}
                         showsHorizontalScrollIndicator={false}
                         extraData={this.state.prod}
                         style={{}}
                         inverted={false}
                         scrollToEnd={true}
                         horizontal={true}
                         nestedScrollEnabled={true}
                         keyExtractor={(item, index) => index.toString()}
                         renderItem={({item, index})=>{
                        return(
                      <View style={{flex:1,backgroundColor:'#fff',paddingLeft:index==0?10:0,paddingRight:15,paddingTop:8}}>
                        <TouchableWithoutFeedback  onPress={()=>this.props.navigation.navigate('Multivitamins',{item:item})} >
                          <View>
                            <Card containerStyle={[ {borderWidth: 0, borderColor: '#fff',borderRadius:15,height:width*0.33,width:width*0.33,margin:0,padding:0,marginRight:0,marginLeft:0}]}>
                               <View style={{height:'100%'}}>
                                 <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,}}>
                                       <Image source={item.uri} style={{width:'100%', height:'100%',marginTop:0,borderRadius:15,backgroundColor:'#fff'}}/>
                                 </View>
                               </View>
                            </Card>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center',height:40,width:width*0.33}}>
                                <Text style={{ fontSize: 14, color: 'grey', fontWeight: '300', marginHorizontal: 20,textAlign:'center' }} numberOfLines={1}>{item.name}</Text>
                            </View>
                          </View>
                          </TouchableWithoutFeedback>
                        </View>
                      ) }}
                      />
                    </View>
                    <View style={{borderWidth:0,marginHorizontal:12}}>

                      <View style={{justifyContent:'space-between',flexDirection:'row',paddingBottom:4,paddingTop:8}}>
                          <Text style={{fontSize:18}}>Sanetizer,Marsk & Thermometers</Text>
                          <TouchableOpacity onPress={()=>this.props.navigation.navigate('HealthProduct')}>
                            <Text style={{fontSize:18,color:'#55CED2'}}>See All</Text>
                          </TouchableOpacity>
                      </View>
                      <FlatList
                          data={this.state.prod1}
                          showsHorizontalScrollIndicator={false}
                          extraData={this.state.prod1}
                          style={{}}
                          inverted={false}
                          scrollToEnd={true}
                          horizontal={true}
                          nestedScrollEnabled={true}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({item, index})=>{
                         return(
                       <View style={{flex:1,backgroundColor:'#fff',paddingLeft:index==0?10:0,paddingRight:15,paddingTop:8}}>
                         <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('SenitizerScreen',{item:item})}>
                           <View>
                             <Card containerStyle={[ {borderWidth: 0, borderColor: '#fff',borderRadius:15,height:width*0.33,width:width*0.33,margin:0,padding:0,marginRight:0,marginLeft:0}]}>
                                <View style={{height:'100%'}}>
                                  <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,}}>
                                        <Image source={item.uri} style={{width:'100%', height:'100%',marginTop:0,borderRadius:15,backgroundColor:'#fff'}}/>
                                  </View>
                                </View>
                             </Card>
                             <View style={{flex:1,alignItems:'center',justifyContent:'center',height:40,width:width*0.33}}>
                                 <Text style={{ fontSize: 14, color: 'grey', fontWeight: '300', marginHorizontal: 20,textAlign:'center' }} numberOfLines={1}>{item.name}</Text>
                             </View>
                           </View>
                           </TouchableWithoutFeedback>
                         </View>
                       ) }}
                       />
                       </View>
               </ScrollView>
            </View>
     </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backgroundVideo: {
   position: 'absolute',
   top: 0,
   left: 0,
   bottom: 0,
   right: 0,
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

class MyCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      activeSlide:0,
      entries : [{img:require('../assets/ifocus/banner1.png')},
                 {img:require('../assets/ifocus/banner1.png')},
                 {img:require('../assets/ifocus/banner1.png')}]
      }
    }
    _renderItem ({item, index}) {
        return <View

                  style={{width:width*0.95,height:width*0.25,borderWidth:0,
                          justifyContent:'center',
                          borderRadius:10,alignItems:'center'}}>

                  <View style={{width:width*0.95,height:width*0.25,borderWidth:0,borderColor:'#fff',alignSelf:'center',marginLeft:8}}>
                      <Image  source={require('../assets/ifocus/banner1.png')} style={{width:'100%',height:'100%'}}/>
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
