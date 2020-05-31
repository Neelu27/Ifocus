import React from 'react';
import { Platform,
  AsyncStorage,
  StyleSheet,ScrollView,
  View,Image,Dimensions,
  StatusBar,Alert,TouchableOpacity,
  TouchableNativeFeedback} from 'react-native';
import {createBottomTabNavigator,
        createAppContainer,
        createSwitchNavigator,
        NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import Constants from 'expo-constants';
import SafeAreaView from 'react-native-safe-area-view';
import { FontAwesome ,MaterialCommunityIcons,MaterialIcons,SimpleLineIcons} from '@expo/vector-icons';
import constants  from '../constants/Settings.js';
import { Text, TouchableRipple } from 'react-native-paper';
const mainUrl = constants.url;
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import settings from '../constants/Settings';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const SERVER_URL = settings.url
const themeColor = settings.themeColor

class DrawerContent  extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
         login:true,
        }
    }

    render(){

      return(
        <ScrollView containerStyle={{backgroundColor: '#12318B'}} showsVerticalScrollIndicator={false}>
            <SafeAreaView style={{backgroundColor: '#12318B'}} forceInset={{ }}>
                <View style={{height: Constants.statusBarHeight,  backgroundColor: '#55CED2',}}>
                    <StatusBar  translucent={true} barStyle="light-content" networkActivityIndicatorVisible={false}/>
                </View>
                <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('UseProfile')}
                        style={{backgroundColor: '#55CED2',
                               height: 80,
                               alignItems: 'center',
                               justifyContent: 'space-between',flexDirection:'row',paddingHorizontal:15}}>
                      {/* // <Text style={{color:'#fff',fontSize:22,paddingRight:30}}>General</Text> */}
                      <Image source={require('../assets/images/6.png')} style={{height:50,width:50,borderRadius:50,}}/>
                      <Text style={{fontSize:20,paddingRight:20}}>Naveen Kumar</Text>
                      <Image source={require('../assets/ifocus/penciledit.png')} style={{height:22,width:22,borderRadius:0,}}/>
                </TouchableOpacity>
                <View style={{minHeight: height-180,backgroundColor:'#fff', alignItems: 'center',}}>
                   <DrawerItems {...this.props}
                         inactiveTintColor={'#b83655'}
                         iconContainerStyle={{color:'#CF4F07',opacity:1}}/>

                    {Platform.OS === 'android' &&
                       <TouchableNativeFeedback
                            centered={true}
                            background={TouchableNativeFeedback.Ripple('grey')}
                            onPress={()=>this.props.navigation.navigate('MyOrder')}>
                           <View style={{flexDirection: 'row',paddingVertical:20,paddingBottom: 10,
                                         backgroundColor: 'transparent', alignItems: 'center',}}>
                               <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
                                    <Image
                                        source={require('../AllImage/Icons-POI/home1.png')}
                                        style={{height:23,width:23,tintColor:'#fff'}}/>
                                    {/* <FontAwesome  name={'home'} size={22} color={'#fff'}/> */}
                               </View>
                               <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
                                   <Text style={{color:'#000',fontWeight:'400',fontSize:20,}} >My Orders</Text>
                               </View>
                           </View>
                       </TouchableNativeFeedback>}

                    {Platform.OS === 'android' &&
                       <TouchableNativeFeedback
                            centered={true}
                            background={TouchableNativeFeedback.Ripple('grey')}
                            onPress={()=>this.props.navigation.navigate('MyPolicy')}>
                           <View style={{flexDirection: 'row',paddingVertical:20,paddingBottom: 10,
                                          backgroundColor:'transparent', alignItems: 'center',}}>
                                <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
                                    <Image
                                        source={require('../assets/ifocus/surveyoverallhealth.png')}
                                        style={{height:30,width:30,}}/>
                                        {/* <FontAwesome  name={'cutlery'} size={22} color={'#fff'}/> */}
                                </View>
                                <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
                                    <Text style={{color:'#000',fontWeight:'400',fontSize:20}} >My Policy</Text>
                                </View>
                         </View>
                     </TouchableNativeFeedback>}

                   {Platform.OS === 'android' &&
                     <TouchableNativeFeedback
                           centered={true}
                           background={TouchableNativeFeedback.Ripple('grey')}
                           onPress={()=>this.props.navigation.navigate('MyAddress')}
                           >
                           <View style={{flexDirection: 'row',paddingVertical:20,paddingBottom: 10,
                                          backgroundColor: 'transparent', alignItems: 'center',}}>
                                <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
                                    {/* <Image
                                        source={require('../assets/images/order.png')} style={{height:25,width:25,tintColor:'#fff'}}/> */}
                                        {/* <FontAwesome  name={'list-alt'} size={22} color={'#fff'}/> */}
                               </View>
                               <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
                                    <Text style={{color:'#000',fontWeight:'400',fontSize:20}} >My Address</Text>
                              </View>
                          </View>
                    </TouchableNativeFeedback>}

                   {Platform.OS === 'android' &&
                     <TouchableNativeFeedback
                           centered={true}
                           background={TouchableNativeFeedback.Ripple('grey')}   onPress={()=>{this.props.navigation.navigate('AboutScreen')}}>
                           <View style={{flexDirection: 'row',paddingVertical:20,paddingBottom: 10,
                                        backgroundColor: 'transparent', alignItems: 'center',}}>
                               <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
                                     {/* <Image
                                         source={require('../AllImage/Icons-POI/share.png')} style={{height:25,width:25,tintColor:'#fff'}}/> */}
                                         {/* <FontAwesome  name={'share-alt'} size={22} color={'#fff'}/> */}
                               </View>
                               <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
                                   <Text style={{color:'#000',fontWeight:'400',fontSize:20}} >About Us</Text>
                              </View>
                          </View>
                    </TouchableNativeFeedback>}
                    {Platform.OS === 'android' &&
                       <TouchableNativeFeedback
                             centered={true}
                             background={TouchableNativeFeedback.Ripple('grey')}   onPress={()=>{this.props.navigation.navigate('HomeScreen')}}>
                            <View style={{flexDirection: 'row',paddingVertical:20,paddingBottom: 10,
                                          backgroundColor: 'transparent', alignItems: 'center',}}>
                                 <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
                                      {/* <Image
                                          source={require('../assets/images/qrcode.png')} style={{height:25,width:25,tintColor:'#fff'}}/> */}
                                          {/* <FontAwesome  name={'qrcode'} size={22} color={'#fff'}/> */}
                                 </View>
                               <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
                                   <Text style={{color:'#000',fontWeight:'400',fontSize:20}} >Logout</Text>
                               </View>
                           </View>
                       </TouchableNativeFeedback>}

                  {/* {Platform.OS === 'android' &&
                     <TouchableNativeFeedback
                           centered={true}
                           background={TouchableNativeFeedback.Ripple('grey')}   onPress={()=>{this.props.navigation.navigate('CalenderScreen')}}>
                          <View style={{flexDirection: 'row',paddingVertical:20,paddingBottom: 10,
                                        backgroundColor: 'transparent', alignItems: 'center',}}>
                               <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
                                    {/* <Image
                                        source={require('../assets/images/qrcode.png')} style={{height:25,width:25,tintColor:'#fff'}}/> */}
                                        {/*}<FontAwesome  name={'qrcode'} size={22} color={'#fff'}/>
                               </View>
                             <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
                                 <Text style={{color:'#fff',fontWeight:'400',fontSize:20}} >Calender</Text>
                             </View>
                         </View>
                     </TouchableNativeFeedback>} */}
                     {/* {Platform.OS === 'android' &&
                        <TouchableNativeFeedback
                              centered={true}
                              background={TouchableNativeFeedback.Ripple('grey')}   onPress={()=>{this.props.navigation.navigate('SettingsScreen')}}>
                             <View style={{flexDirection: 'row',paddingVertical:20,paddingBottom: 10,
                                           backgroundColor: 'transparent', alignItems: 'center',}}>
                                  <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
                                       {/* <Image
                                           source={require('../assets/images/qrcode.png')} style={{height:25,width:25,tintColor:'#fff'}}/> */}
                                        {/*}   <FontAwesome  name={'qrcode'} size={22} color={'#fff'}/>
                                  </View>
                                <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
                                    <Text style={{color:'#fff',fontWeight:'400',fontSize:20}} >Contact Us</Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>} */}


             </View>
             <View style={{position:'absolute',bottom:150,left:45,flexDirection:'column',
                            justifyContent: 'flex-end',backgroundColor:'#fff',}}>
                 {/* <TouchableOpacity style={{  alignItems: 'center',justifyContent: 'flex-end' ,borderWidth:1,borderColor:'#fff'}}>
                     <Text style={{fontSize:20,color:'#fff',paddingHorizontal:10,paddingVertical:2}}>Kanada</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{  alignItems: 'center',justifyContent: 'flex-end' ,borderWidth:1,borderColor:'#fff'}}>
                     <Text style={{fontSize:20,color:'#fff',paddingHorizontal:10,paddingVertical:2}}>Kanada</Text>
                 </TouchableOpacity> */}
                  <Text style={{fontSize:20,color:'#fff',paddingHorizontal:10,paddingVertical:2}}>Powered by mAbler</Text>
                  <View style={{  alignItems: 'center',justifyContent: 'flex-end' }}>
                      <Text style={{fontSize:15,color:'#000'}}>App version {Constants.manifest.version}</Text>
                  </View>

             </View>
             <View style={{justifyContent: 'flex-end',backgroundColor:'#fff',paddingBottom:150}}>

             </View>




         </SafeAreaView>
     </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar:{
    height:Constants.statusBarHeight,
  }
});

const mapStateToProps =(state) => {
    return {
      counter: state.cartItems.counter,
      cart : state.cartItems.cartItem,
      store:state.cartItems.store
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTocartFunction:  (args) => dispatch(actions.addToCart(args)),
    decreaseFromCartFunction:  (args) => dispatch(actions.decreaseFromCart(args)),
    increaseCartFunction:  (args) => dispatch(actions.increaseCart(args)),
    setInitialFunction:  (cart,counter) => dispatch(actions.setInitial(cart,counter)),
    emptyCartFunction:()=>dispatch(actions.emptyCart()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
