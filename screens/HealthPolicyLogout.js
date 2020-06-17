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
import constants  from '../constants/Settings.js';
// import CaroselScreen from '../components/CaroselScreen';
import Toast, {DURATION} from 'react-native-easy-toast';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Timeline from '../index1';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFont from 'react-native-vector-icons/FontAwesome';
import ModalBox from 'react-native-modalbox';
import {Video} from 'expo-av';
import Modal from "react-native-modal";

const serverURL = constants.url;
const themeColor= constants.themeColor;
const { width } = Dimensions.get('window');
const height = width * 0.8
const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

class HealthPolicyLogout extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      enabled:false,
      switchValue: false,
      play:false,
      attachOpen:false,
      st:false,
      st1:false,
      st2:false,
      st3:false,
      login:false,
      modal:false,
      male:true,
      policies:[],
      // policies:[{name:'Individual Health Insurance Plan',cover:'6 L',insuredby:'HDFC ergo',validity:'1 year',amount:'4,712 / month'},
      //           {name:'Critical illness insurance',cover:'6 L',insuredby:'Star Health',validity:'1 year',amount:'4,712 / month'},
      //           {name:'Family Floater Policy',cover:'6 L',insuredby:'Maxx Life',validity:'1 year',amount:'4,712 / month'},
      //           {name:'Senior citzen health insurance plan',cover:'6 L',insuredby:'Maxx Life',validity:'1 year',amount:'4,712 / month'},
      //           {name:'Individual Health Insurance Plan',cover:'6 L',insuredby:'HDFC ergo',validity:'1 year',amount:'4,712 / month'},
      //           {name:'Critical illness insurance',cover:'6 L',insuredby:'Star Health',validity:'1 year',amount:'4,712 / month'},
      //           {name:'Family Floater Policy',cover:'6 L',insuredby:'Maxx Life',validity:'1 year',amount:'4,712 / month'},
      //           {name:'Senior citzen health insurance plan',cover:'6 L',insuredby:'Maxx Life',validity:'1 year',amount:'4,712 / month'},]

      }
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        console.log(params,'params')
        return {header:null}
    };

    healthPolicies=async()=>{
      const userToken = await AsyncStorage.getItem('userpk');
      const sessionid = await AsyncStorage.getItem('sessionid');
      const csrf = await AsyncStorage.getItem('csrf');
      fetch(serverURL+'/api/POS/policy/', {
        headers: {
           "Cookie" :"csrf="+csrf+"; sessionid=" + sessionid +";",
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Referer': serverURL,
           'X-CSRFToken': csrf
        }
      }).then((response) =>{
        console.log(response.status,'response')
         return response.json()})
      .then((responseJson) => {
         console.log(responseJson,'responseJson')
         this.setState({policies:responseJson})
      })
      .catch((error) => {
        return
      });
    }
    componentDidMount=()=>{
      this.healthPolicies()
    }

    modalFilter=()=>{
      return(
        <Modal isVisible={this.state.modal} animationIn="fadeIn" animationOut="fadeOut" hasBackdrop={true} backdropColor={'#dfe0e2'} >
              <View style={[styles.modalView,
                    {width:width*0.88,height:width*1.55,borderRadius:17,backgroundColor:'#fff',justifyContent:'center',
                    alignSelf:'center',paddingVertical:15,paddingHorizontal:10,backdropColor:'#fff',borderWidth:0,}]}>
                    <ScrollView style={{borderWidth:0,alignSelf:'center'}}>
                      <View style={{borderWidth:0}}>
                        <Text style={{fontSize:24,fontWeight:'400',paddingBottom:10}}>Filters</Text>
                      </View>
                      <View>
                        <Text style={{fontSize:18,paddingVertical:10}}>Gender</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',borderWidth:0,width:width*0.4,marginVertical:10}}>
                        <TouchableOpacity style={{borderWidth:0,borderRadius:10,borderColor:"#717070",borderWidth:1,backgroundColor:this.state.male?'#194079':'#fff'}}
                            onPress={()=>this.setState({male:true})}>
                            <Text style={{fontSize:14,paddingHorizontal:10,paddingVertical:2,color:this.state.male?'#fff':'#000'}}>Male</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{borderWidth:0,borderRadius:10,borderWidth:1,borderColor:'#717070',backgroundColor:!this.state.male?'#194079':'#fff'}}
                            onPress={()=>this.setState({male:false})}>
                            <Text style={{fontSize:14,paddingHorizontal:10,paddingVertical:2,color:!this.state.male?'#fff':'#000'}}>Female</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Text style={{fontSize:18,paddingVertical:10}}>Tell us who would you like to insure</Text>
                      <TextInput
                        style={{backgroundColor:'#ffffff',
                                          borderRadius:0,
                                          paddingHorizontal:20,
                                          paddingVertical:6,
                                          marginVertical:10,
                                          fontSize:16,
                                          width:width*0.8,
                                          borderWidth:1,
                                          }}
                                     placeholder={'Self'}
                                     onChangeText={(text)=>this.setState({text})}
                                     value={this.state.text}
                                     >
                        </TextInput>
                      <TextInput
                        style={{backgroundColor:'#ffffff',
                                          borderRadius:0,
                                          paddingHorizontal:20,
                                          paddingVertical:6,
                                          marginVertical:10,
                                          fontSize:16,
                                          width:width*0.8,
                                          borderBottomWidth:1,
                                          }}
                                     placeholder={'Enter your full name'}
                                     onChangeText={(text)=>this.setState({text})}
                                     value={this.state.text}
                                     >
                        </TextInput>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                          <Text style={{fontSize:18,paddingVertical:10}}>Age </Text>
                          <Text style={{fontSize:14,paddingVertical:10}}>(insurers age)</Text>
                        </View>
                        <TextInput
                          style={{backgroundColor:'#ffffff',
                                            borderRadius:0,
                                            paddingHorizontal:20,
                                            paddingVertical:6,
                                            marginBottom:10,
                                            fontSize:16,
                                            width:width*0.25,
                                            borderWidth:1,
                                            }}
                                       placeholder={'Choose'}
                                       onChangeText={(text)=>this.setState({text})}
                                       value={this.state.text}
                                       >
                          </TextInput>
                        <Text style={{fontSize:18,paddingVertical:10}}>Location</Text>
                        <View style={{paddingVertical:10,borderWidth:0}}>
                          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <TouchableOpacity style={{borderWidth:1,borderColor:'#838383',borderRadius:10,width:width*0.25
                              ,backgroundColor:this.state.loc?'#194079':'#fff'}}
                              onPress={()=>this.setState({loc:true,loc1:false,loc2:false,loc3:false,loc4:false,loc5:false})}>
                              <Text style={{paddingHorizontal:10,paddingVertical:2,fontSize:14,textAlign:'center'
                              ,color:this.state.loc?'#fff':'#000'}}>Bangalore</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderWidth:1,borderColor:'#838383',borderRadius:10,width:width*0.25
                            ,backgroundColor:this.state.loc1?'#194079':'#fff'}}
                              onPress={()=>this.setState({loc1:true,loc:false,loc2:false,loc3:false,loc4:false,loc5:false})}>
                              <Text style={{paddingHorizontal:10,paddingVertical:2,fontSize:14,textAlign:'center',color:this.state.loc1?'#fff':'#000'}}>Pune</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderWidth:1,borderColor:'#838383',borderRadius:10,width:width*0.25
                            ,backgroundColor:this.state.loc2?'#194079':'#fff'}}
                              onPress={()=>this.setState({loc2:true,loc1:false,loc:false,loc3:false,loc4:false,loc5:false})}>
                              <Text style={{paddingHorizontal:10,paddingVertical:2,fontSize:14,textAlign:'center',color:this.state.loc2?'#fff':'#000'}}>Chennai</Text>
                            </TouchableOpacity>
                          </View>
                          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                            <TouchableOpacity style={{borderWidth:1,borderColor:'#838383',borderRadius:10,width:width*0.25
                            ,backgroundColor:this.state.loc3?'#194079':'#fff'}}
                              onPress={()=>this.setState({loc3:true,loc1:false,loc2:false,loc:false,loc4:false,loc5:false})}>
                              <Text style={{paddingHorizontal:10,paddingVertical:2,fontSize:14,textAlign:'center',color:this.state.loc3?'#fff':'#000'}}>Delhi</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderWidth:1,borderColor:'#838383',borderRadius:10,width:width*0.25
                            ,backgroundColor:this.state.loc4?'#194079':'#fff'}}
                              onPress={()=>this.setState({loc4:true,loc1:false,loc2:false,loc3:false,loc:false,loc5:false})}>
                              <Text style={{paddingHorizontal:10,paddingVertical:2,fontSize:14,textAlign:'center',color:this.state.loc4?'#fff':'#000'}}>Mumbai</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderWidth:1,borderColor:'#838383',borderRadius:10,width:width*0.25
                            ,backgroundColor:this.state.loc5?'#194079':'#fff'}}
                              onPress={()=>this.setState({loc5:true,loc1:false,loc2:false,loc3:false,loc4:false,loc:false})}>
                              <Text style={{paddingHorizontal:10,paddingVertical:2,fontSize:14,textAlign:'center',color:this.state.loc5?'#fff':'#000'}}>Madurai</Text>
                            </TouchableOpacity>
                          </View>
                        </View>

                        <TouchableOpacity style={{borderRadius:10,borderWidth:0,marginTop:10,alignSelf:'center',backgroundColor:'#194079'}}
                          onPress={()=>{this.setState({modal:false})}}>
                          <Text style={{fontSize:14,paddingVertical:2,paddingHorizontal:15,color:'#fff'}}>Submeet</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
          </Modal>
      )
    }

    policies=()=>{
      return(
        <View style={{flex:1}}>
            <FlatList
              data={this.state.policies}
              showsHorizontalScrollIndicator={false}
              extraData={this.state.policies}
              style={{}}
              inverted={false}
              scrollToEnd={true}
              horizontal={false}
              nestedScrollEnabled={true}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index})=>{
             return(
               <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate('InsurenceHelthPolicyLog',{item:item})}}>
                 <View>
                   <Card containerStyle={[ {borderWidth: 0,alignSelf:'center',borderColor: '#000',backgroundColor:'#fff',
                                             borderRadius:15,height:width*0.33,width:width*0.87,
                                             margin:10,padding:0,marginRight:0,marginLeft:0,
                                             shadowColor:"#fefefe",borderWidth:0.2,borderColor:'#fefefe',
                                             shadowOpacity:0.2,shadowRadius:15,
                                             shadowOffset:{height:2,width:0},elevation:5,}]}>
                      <View style={{borderWidth:0,width:width*0.87,padding:10}}>
                        <Text style={{fontSize:16,fontWeight:'400'}} numberOfLines={2}>{item.title}</Text>
                      </View>
                      <View style={{flexDirection:'row',borderWidth:0,padding:10,marginTop:20,justifyContent:'space-between',}}>
                        <View style={{borderWidth:0,alignItems:'center'}}>
                          <Text style={{fontSize:12,color:'#7c7c7c'}}>Cover</Text>
                          <Text style={{fontSize:18,fontWeight:'400'}}>&#8377; {item.premiumPrice}</Text>
                        </View>
                        <View style={{borderWidth:0,alignItems:'center'}}>
                          <Text style={{fontSize:12,color:'#7c7c7c'}}>Insured by</Text>
                          <Text style={{fontSize:18,fontWeight:'400'}}>{item.insuredBy}</Text>
                        </View>
                        <View style={{borderWidth:0,alignItems:'center'}}>
                          <TouchableOpacity style={{backgroundColor:'#194079',borderRadius:7}}>
                            <Text style={{color:'#fff',fontSize:12,paddingHorizontal:6,paddingVertical:4}}>&#8377; {item.monthlyPrice}/ month</Text>
                          </TouchableOpacity>
                          <Text style={{fontSize:12,color:'#7c7c7c'}}>{item.policyDuration} year</Text>
                        </View>
                      </View>
                   </Card>
                 </View>
                 </TouchableWithoutFeedback>
             )}}
            />
        </View>
      )
    }
  render() {
    return (
      <View style={{flex:1}}>
           <Toast style={{backgroundColor: 'grey'}} textStyle={{color: '#fff'}} ref="toast" position = 'top'/>
           <View style={{height:Constants.statusBarHeight,backgroundColor:'#103368'}} />
           <View  style={{justifyContent:'space-between',backgroundColor:'#D0F2FF',borderBottomWidth:0,
                           height:55,width:width,flexDirection:'row',alignItems:'center'}}>
               <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                    <MaterialIcons name={'arrow-back'} size={30} color={'#000'} style={{paddingLeft:10}}/>
               </TouchableOpacity>
               <TouchableOpacity
                     style={{borderWidth:1,borderRadius:7,backgroundColor:'#f2f2f2',borderColor:'#f2f2f2',
                             borderBottomColor: '#f2f2f2',borderTopColor:'#f2f2f2',padding:0,width:width*0.7}}
                     onPress={()=>{this.props.navigation.navigate('SearchScreen')}}>
                     <Text style={{paddingVertical:6,paddingHorizontal:6}}>Search for health product and policy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginHorizontal: 10 ,paddingRight:5}}  onPress={()=>this.setState({modal:true})}  >
                    <Image source={require('../assets/ifocus/filter.png')}style={{height:22,width:20}} resizeMode={'contain'} />
              </TouchableOpacity>
           </View>
           <View style={{flex:1,justifyContent:'center',borderWidth:0,paddingTop:10}}>
               <ScrollView style={{paddingTop:10,backgroundColor:"#fefefe"}}>
                 {this.policies()}
               </ScrollView>
            </View>
            {this.modalFilter()}
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
  modalView: {
    backgroundColor: '#fff',
    marginHorizontal: width*0.05 ,
    borderRadius:5,
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

export default connect(mapStateToProps, mapDispatchToProps)(HealthPolicyLogout);
