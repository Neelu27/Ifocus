import React from 'react';
import {
  Image,Platform,
  ScrollView,StyleSheet,
  Text,Button,TextInput,
  TouchableOpacity,View,
  Slider,ImageBackground,
  Dimensions, Alert,StatusBar,
  FlatList, AppState, BackHandler ,
  AsyncStorage,ActivityIndicator,
  ToastAndroid,RefreshControl} from 'react-native';
import { createDrawerNavigator,DrawerItems, } from 'react-navigation-drawer';
import {SearchBar}from 'react-native-elements';
import { FontAwesome,Feather,Entypo ,MaterialIcons} from '@expo/vector-icons';
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
import { Switch } from 'react-native-switch';
import Modal from "react-native-modal";

const { width } = Dimensions.get('window');
const height = width * 0.8
const SERVER_URL = settings.url
const themeColor = settings.themeColor

class OrderedScreen extends React.Component {
  constructor(props) {
    super(props);
    var touchhotel=this.props.navigation.getParam('item',null)
    console.log(touchhotel,'touchhotel')
    this.state={
      product:(touchhotel=!null?touchhotel:''),
      products:[{name:'Kadai Chicken',rs:'200/'},
                {name:'Pepper Chicken ',rs:'200/'},
                {name:'Hydrabadi Chicken',rs:'300/'},
                {name:'Chicken Mughlai',rs:'200/'},
                {name:'Pepper Chickn',rs:'200/'},
                {name:'Kadai Chicken',rs:'200/'},],

      images : [{name:'Primary',value:'Rs. 4,000/-',},
                {name:'Premium',value:'Rs. 10,000/-',},
                {name:'Platnum',value:'Rs. 20,000/-',}],
      enabled:false,
      add:false,
      prod:[{name:'continental'},
            {name:'north-indian'},
            {name:'south-indian'},
            {name:'continental'},
            {name:'north-indian'},
            {name:'south-indian'}]
      }
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        console.log(params,'params')
        return {header:null}
      };

  componentDidMount(){}

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#f3f3f3'}}>
        <Modal isVisible={this.state.model1}
          animationIn="fadeIn" animationOut="fadeOut" hasBackdrop={true}
          backdropColor={'#f0f0f0'} onBackdropPress={()=>{this.setState({model1:false});}}>
                  <View style={[styles.modalView,{paddingVertical:15,justifyContent:'center',alignItems:'center',paddingHorizontal:10}]}>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:25,marginVertical:4}}>Total</Text>
                        <View style={{flexDirection:'row',marginVertical:4,alignItems:'center'}}>
                          <FontAwesome name={'rupee'} size={18}/>
                          <Text style={{fontSize:18}}>720/-</Text>
                      </View>
                      <TouchableOpacity >
                        <Text style={{textDecorationLine: "underline",fontSize:14,marginVertical:4}}>Share link</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>this.setState({model2:true,model1:false})}
                        style={{borderWidth:0,backgroundColor:'#ED9309',borderRadius:10,marginVertical:4,width:width*0.3,alignItems:'center'}}>
                        <Text style={{fontSize:20,paddingVertical:10,paddingHorizontal:30,color:'#fff'}}>Pay</Text>
                      </TouchableOpacity>
                    </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.model2}
                  animationIn="fadeIn" animationOut="fadeOut" hasBackdrop={true}
                  backdropColor={'#f0f0f0'} onBackdropPress={()=>{this.setState({model2:false,model1:false});
                  this.props.navigation.navigate('HomeScreen')}}>
                          <View style={[styles.modalView,{paddingVertical:15,justifyContent:'center',alignItems:'center',paddingHorizontal:10}]}>
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                <View style={{borderWidth:0,borderRadius:50,backgroundColor:'#62B317'}}>
                                    <Feather name={'check'} size={20} color='#fff'style={{paddingVertical:4,paddingHorizontal:4}}/>
                                </View>
                                <Text style={{fontSize:16,marginVertical:4}}>Amount</Text>
                                <View style={{flexDirection:'row',marginVertical:4,alignItems:'center'}}>
                                  <FontAwesome name={'rupee'} size={18}/>
                                  <Text style={{fontSize:18}}>720/-</Text>
                              </View>


                            </View>
                            </View>
                  </Modal>
                  <Modal isVisible={this.state.model3}
                    animationIn="fadeIn" animationOut="fadeOut" hasBackdrop={true}
                    backdropColor={'#f0f0f0'} onBackdropPress={()=>{this.setState({model3:false});
                    }}>
                            <View style={[styles.modalView,{paddingVertical:20,justifyContent:'center',alignItems:'center',paddingHorizontal:0,backgroundColor:'#fff'}]}>
                              <View style={{justifyContent:'center',alignItems:'center',width:width*0.6,height:width*0.6,backgroundColor:'#fff'}}>
                                  <Image source={require('../assets/images/scan.png')} style={{height:'100%',width:'100%'}}/>


                              </View>
                              </View>
                    </Modal>

        {/* <ImageBackground source={require('../assets/images/62.png')} style={{width: '100%', height: '100%',marginTop:0}}> */}
            <Toast style={{backgroundColor:'grey'}} textStyle={{color: '#fff'}} ref="toast" position = 'top'/>
            <View style={{height:Constants.statusBarHeight,backgroundColor:'#ED9309'}}/>
            <View style={{flexDirection:'row',backgroundColor:'#ED9309',
                          justifyContent:'space-between',alignItems:'center',borderWidth:0.2 ,
                          paddingVertical:6,paddingHorizontal:6}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                  <MaterialIcons name="arrow-back" size={30} color={'#fff'}/>
                </TouchableOpacity>
                <Text style={{marginRight:width*0.3,fontSize:20,color:'#fff'}}>Hotel Empire</Text>
            </View>

            <View style={{flex:1,borderWidth:0,backgroundColor:'#f3f3f3'}}>
                <View style={{borderWidth:0,justifyContent:'center',alignItems:'center',height:width*0.4,width:width*0.94 ,margin:10}}>
                  <View style={{height:width*0.4,width:width*0.4}}>
                    <Image source={require('../assets/images/cart.png')} style={{height:'100%',width:'100%'}}/>
                </View>
                </View>
                <TouchableOpacity style={{borderWidth:0,marginHorizontal:10,
                                          justifyContent:'center',borderRadius:10,
                                          backgroundColor:'#ED9309'}}
                                  onPress={()=>{this.setState({model3:true})}}>
                  <Text style={{fontSize:20,paddingVertical:4,paddingHorizontal:10,textAlign:'center',color:'#fff'}}>CIOC</Text>
                </TouchableOpacity>
                <View style={{marginHorizontal:10}}>
                  <Text style={{fontSize:18,}}>Item ordered</Text>
                  <ScrollView style={{height:width*0.7}} showsVerticalScrollIndicator={false}>
                    <FlatList
                        data={this.state.products}
                        extraData={this.state}
                        showsVerticalScrollIndicator={false}
                        inverted={false}
                        scrollToEnd={true}
                        nestedScrollEnabled={true}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index})=>{
                          return(
                        <TouchableOpacity style={{flex:1,

                                marginTop: 4,
                                marginLeft:width*0.01,
                                marginRight:width*0.01,
                                borderWidth:0,
                                paddingHorizontal:0,
                                paddingVertical:5,
                                width:width*0.9,
                                backgroundColor:'transparent',
                                borderColor:'#000',
                                borderBottomLeftRadius:10,
                                borderTopRightRadius:10,
                                borderRadius:10}}>
                          <View style={{}}>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                              <View style={{flex:0.2,justifyContent:'center',alignItems:'center',height:width*0.15,borderWidth:0,borderRadius:7}}>
                                <Image source={require('../assets/images/images4.jpeg')} style={{height:'100%',width:'100%'}}/>
                              </View>
                              <Text style={{flex:0.1}}>1 x</Text>
                              <View style={{flex:0.7,borderWidth:0}}>
                                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                      <Text style={{fontSize:18}}>{item.name}</Text>
                                      <View style={{flexDirection:'row',justifyContent:'flex-end',
                                        alignItems:'center',alignSelf:'flex-end',borderWidth:0}}>
                                          <FontAwesome name={'rupee'} size={20}/>
                                          <Text style={{fontSize:16,marginRight:width*0.04,paddingHorizontal:4}}>{item.rs}</Text>
                                      </View>
                                </View>
                            </View>
                          </View>
                      </View>
                  </TouchableOpacity>) }}
                  />
                </ScrollView>

            </View>
            <View style={{marginHorizontal:10,position:'absolute',left:0,bottom:width*0.3,right:0,}}>
              <View style={{flexDirection:'row',justifyContent:'center',marginHorizontal:10,alignItems:'center'}}>
                  <Text style={{fontSize:16}}>Promo code</Text>
                  <TextInput style={{backgroundColor:'#ffffff',
                                      borderRadius:17,
                                      marginHorizontal:10,
                                      paddingHorizontal:20,

                                       fontSize:16,
                                       borderRadius:7,
                                       width:width*0.4,
                                       borderWidth:0,
                                       borderColor:'#bdbdbd',
                                     marginVertical:0,backgroundColor:'#fff'}}
                               onChangeText={(taxratetext)=>this.setState({taxratetext})}
                               value={this.state.taxratetext}></TextInput>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                  <Text style={{fontSize:18}}>Item Total</Text>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <FontAwesome name={'rupee'} size={20}/>
                    <Text style={{fontSize:18}}>750/</Text>
                  </View>
            </View>
          </View>
            <View style={{position:'absolute',left:0,bottom:0,right:0,
                          borderWidth:0,justifyContent:'space-between',backgroundColor:'#f3f3f3',
                          flexDirection:'row',paddingVertical:10,paddingHorizontal:0}}>
                <TouchableOpacity style={{borderWidth:0,borderTopRightRadius:10,width:width*0.34,
                                                    borderBottomRightRadius:10,alignItems:'center',backgroundColor:'#ED9309'}}
                                                    onPress={()=>this.setState({model1:true})}>
                    <Text style={{paddingVertical:15,paddingHorizontal:10,fontSize:20,color:'#fff'}}>Pay</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderWidth:0,borderTopLeftRadius:10,width:width*0.34,
                                          borderBottomLeftRadius:10,alignItems:'center',backgroundColor:'#ED9309'}}
                                  onPress={()=>this.props.navigation.navigate('AddFoodScreen')}>
                        <Text style={{paddingVertical:15,paddingHorizontal:10,fontSize:20,color:'#fff'}}>Add More</Text>
                </TouchableOpacity>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderedScreen);
