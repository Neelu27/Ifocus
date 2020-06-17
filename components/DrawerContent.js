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
import { MonoText } from './StyledText';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const SERVER_URL = settings.url
const themeColor = settings.themeColor

class DrawerContent  extends React.Component {

  constructor(props) {
  super(props);
  this.state ={
      name:'',
      login:false,
      userinfo:null
    }
  }

  componentDidMount(){
    AsyncStorage.getItem('login').then(login => {
      if(JSON.parse(login) == 'true' || JSON.parse(login) == true){
        this.setState({login:true})
        this.getUserAsync()
      }else{
        AsyncStorage.clear();
        AsyncStorage.setItem("login", JSON.stringify(false))
        this.setState({login:false})
        return
      }
    }).done();
  }

  getUserAsync = async () => {
    const userToken = await AsyncStorage.getItem('userpk');
    const sessionid = await AsyncStorage.getItem('sessionid');
    const csrf = await AsyncStorage.getItem('csrf');
    if(userToken == null){
      AsyncStorage.clear();
      AsyncStorage.setItem("login", JSON.stringify(false))
      this.setState({login:false})
      return
  }
  fetch(mainUrl+'/api/HR/users/'+ userToken + '/', {
    headers: {
       "Cookie" :"csrf="+csrf+"; sessionid=" + sessionid +";",
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Referer': mainUrl,
       'X-CSRFToken': csrf
    }
  }).then((response) => response.json())
    .then((responseJson) => {
       this.setState({userinfo:responseJson,first_name:responseJson.first_name,last_name:responseJson.last_name})
    })
    .catch((error) => {
      AsyncStorage.clear();
      AsyncStorage.setItem("login", JSON.stringify(false))
      this.setState({login:false})
      return
    });
  }

  UNSAFE_componentWillReceiveProps() {
    AsyncStorage.getItem('login').then(userToken => {
      if(userToken == 'true' || userToken == true){
        this.setState({login:true})
        this.getUserAsync()
      }else{
        this.setState({login:false})
      }
    }).done();
  }

  logout = ()=>{
    Alert.alert(
        'Log out',
        'Do you want to logout?',
        [
          {text: 'Cancel', onPress: () => {
            console.log(this.props.navigation);
            // this.props.navigation.
            return null
          }},
          {text: 'Confirm', onPress: () => {
            AsyncStorage.clear();
            AsyncStorage.setItem("login", JSON.stringify(false))
            this.setState({login:false})
            this.getUserAsync()
            // this.props.navigation.setParams({  });
            // this.props.navigation.navigate('Courses',{'login':false})
            // this.props.navigation.navigate('CoursesScreen', {'login':false}, NavigationActions.navigate({ routeName: 'Courses' }))
            // const navigateAction = NavigationActions.navigate({ routeName: 'Courses' });
            // this.props.navigation.closeDrawer();
            // this.props.navigation.dispatch(navigateAction);
            // this.props.navigation.closeDrawer();
          }},
        ],
        { cancelable: false }
      )
  }

  render(){
    var routeName = this.props.items.find(it => it.key === this.props.activeItemKey)
    var homeroute = ['Home','Event','Book','Video','Audio','Product']
    if(homeroute.includes(routeName.routeName)){
      var homeShow =true
    }else{
      var homeShow = false
    }
    return(
        <ScrollView containerStyle={{backgroundColor: '#12318B'}} showsVerticalScrollIndicator={false}>
            <SafeAreaView style={{backgroundColor: '#12318B'}} forceInset={{ }}>
                <View style={{height: Constants.statusBarHeight,  backgroundColor: '#55CED2',}}>
                    <StatusBar  translucent={true} barStyle="light-content" networkActivityIndicatorVisible={false}/>
                </View>
                {/* <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('UseProfile')}
                        style={{backgroundColor: '#D5F3FF',
                               height: 80,
                               alignItems: 'center',
                               justifyContent: 'space-between',flexDirection:'row',paddingHorizontal:15}}>

                      {this.state.login&&<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}><Image source={require('../assets/images/6.png')} style={{height:50,width:50,borderRadius:50,}}/>
                      <Text style={{fontSize:20,paddingRight:20}}>Naveen Kumar</Text>
                      <Image source={require('../assets/ifocus/penciledit.png')} style={{height:22,width:22,borderRadius:0,}}/></View>}
                      {!this.state.login&&<Text style={{fontSize:20,paddingRight:20}}>Welcome User</Text>}
                </TouchableOpacity> */}
                <View style={{flexDirection:'row',backgroundColor: '#D5F3FF',
                       height: 80,
                       alignItems: 'center',
                       justifyContent: 'space-between',flexDirection:'row',paddingHorizontal:15}}>
                {this.state.login&&
                      <View style={{}}>
                       {this.state.userinfo!=null&&this.state.userinfo.profile.displayPicture!=null&&
                        <Image
                        source={{uri:this.state.userinfo.profile.displayPicture}}
                         style={{height:60,width:60,borderRadius:30, }}
                         />
                       }
                       {this.state.userinfo!=null&&this.state.userinfo.profile.displayPicture==null&&

                         <Image
                         source={require('../assets/images/6.png')}
                         style={{height:60,width:60,borderRadius:30, }}
                        />
                       }
                       </View>
                     }
                       {this.state.login&&
                         <View style={{flex:0.7,justifyContent:'center',height:60,paddingLeft:5}}>
                         <MonoText style={{color:'#000',fontSize:18}} noOfLines={1}> {this.state.first_name} {this.state.last_name}</MonoText>
                         </View>
                       }
                       {this.state.login&&
                         <View style={{flex:0.3,justifyContent:'center',height:60,alignItems:'flex-end',paddingRight:10}}>
                           <TouchableOpacity onPress={()=>this.props.navigation.navigate('UseProfile')}>
                             <MonoText style={{color:'#000',fontSize:18}} noOfLines={1}>Edit</MonoText>
                           </TouchableOpacity >
                         </View>
                       }
                       {!this.state.login&&<Text style={{fontSize:20,paddingRight:20}}>Welcome User</Text>}
                  </View>
                <View style={{minHeight: height-180,backgroundColor:'#fff', alignItems: 'center',}}>
                   <DrawerItems {...this.props}
                         inactiveTintColor={'#b83655'}
                         iconContainerStyle={{color:'#CF4F07',opacity:1}}/>

                    {this.state.login&&Platform.OS === 'android' &&
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

                    {this.state.login&&Platform.OS === 'android' &&
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

                   {this.state.login&&Platform.OS === 'android' &&
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
                    {!this.state.login&&Platform.OS === 'android' &&
                      <TouchableNativeFeedback
                            centered={true}
                            background={TouchableNativeFeedback.Ripple('grey')}   onPress={()=>{this.props.navigation.navigate('LoginScreenV2')}}>
                            <View style={{flexDirection: 'row',paddingVertical:20,paddingBottom: 10,
                                         backgroundColor: 'transparent', alignItems: 'center',}}>
                                <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
                                      {/* <Image
                                          source={require('../AllImage/Icons-POI/share.png')} style={{height:25,width:25,tintColor:'#fff'}}/> */}
                                          {/* <FontAwesome  name={'share-alt'} size={22} color={'#fff'}/> */}
                                </View>
                                <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
                                    <Text style={{color:'#000',fontWeight:'400',fontSize:20}} >Login</Text>
                               </View>
                           </View>
                     </TouchableNativeFeedback>}
                    {this.state.login&&Platform.OS === 'android' &&
                       <TouchableNativeFeedback
                             centered={true}
                             background={TouchableNativeFeedback.Ripple('grey')}   onPress={()=>{this.logout()}}>
                            <View style={{flexDirection: 'row',paddingVertical:20,paddingBottom: 10,
                                          backgroundColor: 'transparent', alignItems: 'center',}}>
                                 <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>

                                 </View>
                               <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
                                   <Text style={{color:'#000',fontWeight:'400',fontSize:20}} >Logout</Text>
                               </View>
                           </View>
                       </TouchableNativeFeedback>}
             </View>
             <View style={{position:'absolute',bottom:150,left:45,flexDirection:'column',
                            justifyContent: 'flex-end',backgroundColor:'#fff',}}>
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


//         <ScrollView>
//       <View style={styles.statusBar} />
//       <View
//       style={styles.container}
//       forceInset={{ top: 'always', horizontal: 'never' }}>
//       <View>
//       <View
//       style={{
//         backgroundColor: themeColor,
//         height: 70,
//         flexDirection:'row',
//         paddingVertical:5,paddingHorizontal:5
//       }}
//       >
//       {this.state.login&&
//       <View style={{}}>
//        {this.state.userinfo!=null&&this.state.userinfo.profile.displayPicture!=null&&
//         <Image
//         source={{uri:this.state.userinfo.profile.displayPicture}}
//         style={{height:60,width:60,borderRadius:30, }}
//         />
//       }
//       {this.state.userinfo!=null&&this.state.userinfo.profile.displayPicture==null&&
//
//         <Image
//         source={require('../assets/images/6.png')}
//         style={{height:60,width:60,borderRadius:30, }}
//         />
//       }
//       </View>
//     }
//       {this.state.login&&
//         <View style={{flex:0.7,justifyContent:'center',height:60,paddingLeft:5}}>
//         <MonoText style={{color:'#fff',fontSize:18}} noOfLines={1}> {this.state.first_name} {this.state.last_name}</MonoText>
//         </View>
//       }
//       {this.state.login&&
//         <View style={{flex:0.3,justifyContent:'center',height:60,alignItems:'flex-end',paddingRight:10}}>
//           <TouchableOpacity onPress={()=>{this.props.navigation.navigate('MyAccountScreen')}}>
//             <MonoText style={{color:'#fff',fontSize:18}} noOfLines={1}>Edit</MonoText>
//           </TouchableOpacity >
//         </View>
//       }
//
//       </View>
//
//
//
//
//       {!this.state.login&&Platform.OS === 'android' &&
//         <TouchableNativeFeedback  centered={true} background={TouchableNativeFeedback.Ripple('grey')}  onPress={()=>{console.log(this.props.navigation);this.props.navigation.navigate('LoginScreenV2')}}>
//         <View style={{flex:1,flexDirection: 'row',paddingVertical:15,paddingBottom: 10,backgroundColor: routeName.routeName=='LogIn'?'#f2f2f2':'#fff'}}>
//           <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
//             <FontAwesome name="user" size={25} color={routeName.routeName=='LogIn'?this.props.activeTintColor:this.props.inactiveTintColor} />
//           </View>
//           <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
//             <MonoText style={{color:routeName.routeName=='LogIn'?this.props.activeTintColor:this.props.inactiveTintColor,fontWeight:'700'}} >Login</MonoText>
//           </View>
//         </View>
//         </TouchableNativeFeedback>}
//         {!this.state.login&&Platform.OS === 'ios' &&
//         <TouchableOpacity   onPress={()=>{console.log(this.props.navigation);this.props.navigation.navigate('LogIn')}}>
//         <View style={{flex:1,flexDirection: 'row',paddingVertical:15,paddingBottom: 10,backgroundColor: routeName.routeName=='LogIn'?'#f2f2f2':'#fff'}}>
//           <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
//             <FontAwesome name="user" size={25} color={routeName.routeName=='LogIn'?this.props.activeTintColor:this.props.inactiveTintColor} />
//           </View>
//           <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
//             <MonoText style={{color:routeName.routeName=='LogIn'?this.props.activeTintColor:this.props.inactiveTintColor,fontWeight:'700'}} >LogIn</MonoText>
//           </View>
//         </View>
//         </TouchableOpacity>
//       }
//       {this.state.login&&Platform.OS === 'android' &&
//         <TouchableNativeFeedback  centered={true} background={TouchableNativeFeedback.Ripple('grey')}  onPress={()=>{console.log(this.props.navigation);this.props.navigation.navigate('OrderScreen')}}>
//         <View style={{flex:1,flexDirection: 'row',paddingVertical:15,paddingBottom: 10,backgroundColor: routeName.routeName=='Order'?'#f2f2f2':'#fff'}}>
//           <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
//             <FontAwesome name="shopping-bag" size={25} color={routeName.routeName=='Order'?this.props.activeTintColor:this.props.inactiveTintColor} />
//           </View>
//           <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
//             <MonoText style={{color:routeName.routeName=='Order'?this.props.activeTintColor:this.props.inactiveTintColor,fontWeight:'700'}} >Orders</MonoText>
//           </View>
//         </View>
//         </TouchableNativeFeedback>}
//         {this.state.login&&Platform.OS === 'ios' &&
//         <TouchableOpacity   onPress={()=>{console.log(this.props.navigation);this.props.navigation.navigate('OrderScreen')}}>
//         <View style={{flex:1,flexDirection: 'row',paddingVertical:15,paddingBottom: 10,backgroundColor: routeName.routeName=='Order'?'#f2f2f2':'#fff'}}>
//           <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
//             <FontAwesome name="shopping-bag" size={25} color={routeName.routeName=='Order'?this.props.activeTintColor:this.props.inactiveTintColor} />
//           </View>
//           <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
//             <MonoText style={{color:routeName.routeName=='Order'?this.props.activeTintColor:this.props.inactiveTintColor,fontWeight:'700'}} >Orders</MonoText>
//           </View>
//         </View>
//         </TouchableOpacity>
//       }
//
//
//       {Platform.OS === 'android' &&
//         <TouchableNativeFeedback  centered={true} background={TouchableNativeFeedback.Ripple('grey')}  onPress={()=>{console.log(this.props.navigation);this.props.navigation.navigate('MemberShipScreen')}}>
//         <View style={{flex:1,flexDirection: 'row',paddingVertical:15,paddingBottom: 10,backgroundColor: routeName.routeName=='MemberShip'?'#f2f2f2':'#fff'}}>
//           <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
//             <MaterialCommunityIcons name="wallet-membership" size={25} color={routeName.routeName=='MemberShip'?this.props.activeTintColor:this.props.inactiveTintColor} />
//           </View>
//           <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
//             <MonoText style={{color:routeName.routeName=='MemberShip'?this.props.activeTintColor:this.props.inactiveTintColor,fontWeight:'700'}} >Lifetime Membership</MonoText>
//           </View>
//         </View>
//         </TouchableNativeFeedback>}
//         {this.state.login&&Platform.OS === 'ios' &&
//         <TouchableOpacity   onPress={()=>{console.log(this.props.navigation);this.props.navigation.navigate('MemberShipScreen')}}>
//         <View style={{flex:1,flexDirection: 'row',paddingVertical:15,paddingBottom: 10,backgroundColor: routeName.routeName=='MemberShip'?'#f2f2f2':'#fff'}}>
//           <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
//             <MaterialCommunityIcons name="wallet-membership" size={25} color={routeName.routeName=='MemberShip'?this.props.activeTintColor:this.props.inactiveTintColor} />
//           </View>
//           <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
//             <MonoText style={{color:routeName.routeName=='MemberShip'?this.props.activeTintColor:this.props.inactiveTintColor,fontWeight:'700'}} >Lifetime Membership</MonoText>
//           </View>
//         </View>
//         </TouchableOpacity>
//       }
//
//       {Platform.OS === 'android' &&
//         <TouchableNativeFeedback  centered={true} background={TouchableNativeFeedback.Ripple('grey')}  onPress={()=>{console.log(this.props.navigation);this.props.navigation.navigate('MagazineScreen')}}>
//         <View style={{flex:1,flexDirection: 'row',paddingVertical:15,paddingBottom: 10,backgroundColor: routeName.routeName=='Magazine'?'#f2f2f2':'#fff'}}>
//           <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
//             <FontAwesome5 name="newspaper" size={25} color={routeName.routeName=='Magazine'?this.props.activeTintColor:this.props.inactiveTintColor} />
//           </View>
//           <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
//             <MonoText style={{color:routeName.routeName=='Magazine'?this.props.activeTintColor:this.props.inactiveTintColor,fontWeight:'700'}} >Subscribe To Magazine</MonoText>
//           </View>
//         </View>
//         </TouchableNativeFeedback>}
//         {this.state.login&&Platform.OS === 'ios' &&
//         <TouchableOpacity   onPress={()=>{console.log(this.props.navigation);this.props.navigation.navigate('MagazineScreen')}}>
//         <View style={{flex:1,flexDirection: 'row',paddingVertical:15,paddingBottom: 10,backgroundColor: routeName.routeName=='Magazine'?'#f2f2f2':'#fff'}}>
//           <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
//             <FontAwesome5 name="newspaper" size={25} color={routeName.routeName=='Magazine'?this.props.activeTintColor:this.props.inactiveTintColor} />
//           </View>
//           <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
//             <MonoText style={{color:routeName.routeName=='Magazine'?this.props.activeTintColor:this.props.inactiveTintColor,fontWeight:'700'}} >Subscribe Magazine</MonoText>
//           </View>
//         </View>
//         </TouchableOpacity>
//       }
//
//       <DrawerItems {...this.props} />
//
//
//       {Platform.OS === 'android' &&
//         <TouchableNativeFeedback  centered={true} background={TouchableNativeFeedback.Ripple('grey')}  onPress={()=>{Linking.openURL( 'https://www.youtube.com/vb2cool/' )}}>
//         <View style={{flex:1,flexDirection: 'row',paddingVertical:15,paddingBottom: 10,backgroundColor:'#fff'}}>
//           <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
//             <FontAwesome5 name="youtube" size={24} color={this.props.inactiveTintColor}  />
//           </View>
//           <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
//             <MonoText style={{color:this.props.inactiveTintColor,fontWeight:'700'}} >YouTube Channel</MonoText>
//           </View>
//         </View>
//         </TouchableNativeFeedback>}
//         {Platform.OS === 'ios'&&
//           <TouchableOpacity  centered={true} background={TouchableNativeFeedback.Ripple('grey')}   onPress={()=>{Linking.openURL( 'https://www.youtube.com/vb2cool/' )}}>
//           <View style={{flex:1,flexDirection: 'row',paddingVertical:15,paddingBottom: 10,}}>
//             <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
//               <FontAwesome5 name="youtube" size={24} color={this.props.inactiveTintColor}  />
//             </View>
//             <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
//               <MonoText style={{color:this.props.inactiveTintColor,fontWeight:'700'}} >YouTube Channel</MonoText>
//             </View>
//             </View>
//           </TouchableOpacity>
//         }
//
//       {this.state.login&&Platform.OS === 'android'&&
//         <TouchableNativeFeedback  centered={true} background={TouchableNativeFeedback.Ripple('grey')}   onPress={()=>this.logout()}>
//         <View style={{flex:1,flexDirection: 'row',paddingVertical:15,paddingBottom: 10,}}>
//           <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
//             <FontAwesome name="sign-out" size={25} color={this.props.inactiveTintColor} />
//           </View>
//           <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
//             <MonoText style={{color:this.props.inactiveTintColor,fontWeight:'700'}} >Logout</MonoText>
//           </View>
//           </View>
//         </TouchableNativeFeedback>
//       }
//       {this.state.login&&Platform.OS === 'ios'&&
//         <TouchableOpacity  centered={true} background={TouchableNativeFeedback.Ripple('grey')}   onPress={()=>this.logout()}>
//         <View style={{flex:1,flexDirection: 'row',paddingVertical:15,paddingBottom: 10,}}>
//           <View style={{flex:0.22,justifyContent: 'center',alignItems: 'center',}}>
//             <FontAwesome name="sign-out" size={25} color={this.props.inactiveTintColor} />
//           </View>
//           <View style={{flex:0.75,justifyContent: 'center',alignItems: 'flex-start',marginLeft:14}}>
//             <MonoText style={{color:this.props.inactiveTintColor,fontWeight:'700'}} >Logout</MonoText>
//           </View>
//           </View>
//         </TouchableOpacity>
//       }
//       <View
//       style={[styles.container,{height:'100%',marginTop:20}]}>
//       <View style={{ flex: 1, alignItems: 'center',justifyContent: 'flex-end' }}>
//       <Text style={{fontSize:15,color:this.props.activeTintColor}}>v{Constants.manifest.version}</Text>
//       </View>
//       </View>
//       </View>
//       </View>
//       </ScrollView>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
// container: {
//   flex: 1,
// },
// statusBar:{
//   height:Constants.statusBarHeight,
//   backgroundColor: '#032757',
// }
//
// });
