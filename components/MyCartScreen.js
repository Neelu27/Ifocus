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
import { FontAwesome,Entypo ,MaterialIcons} from '@expo/vector-icons';
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

class MyCartScreen extends React.Component {
  constructor(props) {
    super(props);
    var touchhotel=this.props.navigation.getParam('item',null)
    console.log(touchhotel,'touchhotel')
    this.state={
      product:touchhotel,
      products:[{name:'Kadai Chicken',rs:'200/',count:1},
                {name:'Kadai Chicken Boneless',rs:'200/',count:1},
                {name:'Hydrabadi Chicken',rs:'300/',count:1},
                {name:'Chicken Mughlai',rs:'200/',count:1},
                {name:'Pepper Chickn',rs:'200/',count:1},
                {name:'Kadai Chicken',rs:'200/',count:1},
                {name:'Kadai Chicken Boneless',rs:'200/',count:1},
                {name:'Hydrabadi Chicken',rs:'300/',count:1},
                {name:'Chicken Mughlai',rs:'200/',count:1},
                {name:'Pepper Chickn',rs:'200/',count:1},],
      images : [{name:'Primary',value:'Rs. 4,000/-',},
                {name:'Premium',value:'Rs. 10,000/-',},
                {name:'Platnum',value:'Rs. 20,000/-',}],
      enabled:false,
      add:false,
      prod:[{name:'continental'},{name:'north-indian'},{name:'south-indian'},{name:'continental'},{name:'north-indian'},{name:'south-indian'}]
      }
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        console.log(params,'params')
        return {header:null}
      };

  componentDidMount(){}
  minus = (item,index)=>{
      // if(this.state.count==0){
      //   this.setState({count:this.state.count})
      //   return
      // }
      // this.setState({count:this.state.count-1})

      if(this.state.products[index].count==1){
        // this.state.products[index].add = false;
        this.setState({products:this.state.products})
        return


      }
      this.state.products[index].count = this.state.products[index].count-1;
      this.setState({products:this.state.products})
   }

  plus = (item,index)=>{
      // this.setState({count:this.state.count+1})
      this.state.products[index].count = this.state.products[index].count+1;
      this.setState({products:this.state.products})
   }
  render() {
    return (
      <View style={{flex:1,backgroundColor:'#f3f3f3'}}>
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
                          justifyContent:'space-between',alignItems:'center',borderWidth:0 ,
                          paddingVertical:6,paddingHorizontal:6}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                  <MaterialIcons name="arrow-back" size={30} color={'#fff'}/>
                    {/* <Image source={require('../assets/images/bar.png')} style={{height:20,width:20,tintColor:'#000',marginLeft:10}}  /> */}
                </TouchableOpacity>
                  <Text style={{marginRight:width*0.3,fontSize:20,color:'#fff'}}>Hotel Empire</Text>

            </View>

            <View style={{flex:1,borderWidth:0,marginHorizontal:10,backgroundColor:'#f3f3f3'}}>
            {/* <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10,marginHorizontal:10}}>
              <Text style={{fontSize:20}}>Food Menu</Text>
              <Switch
                      value={this.state.enabled}
                      onValueChange={(value)=> this.setState({enabled:true})}
                      height={24}
                      width={40}
                      containerStyle={{alignSelf:'flex-end',justifyContent:'flex-end',alignItems:'flex-end',paddingLeft:width*0.12,paddingVertical:2,width:40,height:24,borderWidth:1,borderColor:'#b4b4b4'}}
                        backgroundActive={'#0f0f0f'}
                        backgroundInactive={'#f7f7f7'}
                        circleActiveColor={'#ffffff'}
                        circleInActiveColor={'#ffffff'}
                        circleBorderWidth={1}
                        outerCircleStyle={{borderColor:'#f0f0f0'}}
                        changeValueImmediately={true}
                />
            </View> */}
            <View style={{borderWidth:0,height:width*0.4,width:width*0.89 ,margin:10,justifyContent:'center',alignItems:'center'}}>
              <View style={{height:width*0.4,width:width*0.6,alignSelf:'center'}}>
                <Image source={require('../assets/images/MyCart.png')} style={{height:'100%',width:'100%'}}/>
              </View>
            </View>
            <TouchableOpacity style={{borderWidth:0,marginHorizontal:10,
                                      justifyContent:'center',borderRadius:10,
                                      backgroundColor:'#ED9309'}}
                            onPress={()=>{this.setState({model3:true})}}>
              <Text style={{fontSize:20,paddingVertical:4,paddingHorizontal:10,textAlign:'center',color:'#fff'}}>CIOC</Text>
            </TouchableOpacity>
            <View style={{marginHorizontal:10}}>
              <Text style={{fontSize:18,}}>My Cart</Text>
              <FlatList
              showsVerticalScrollIndicator={false}
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

                                marginTop: 5,
                                marginLeft:width*0.04,
                                marginRight:width*0.04,
                                borderBottomWidth:0,
                                borderTopWidth:0,
                                paddingHorizontal:10,
                                paddingVertical:10,
                                width:width*0.8,
                                backgroundColor:'transparent',
                                borderColor:'#000',
                                borderBottomLeftRadius:0,
                                borderTopRightRadius:0,
                                borderRadius:0}}>
                      <View style={{}}>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flex:0.1,justifyContent:'center',alignItems:'center',borderWidth:1,borderRadius:7}}>

                            <TouchableOpacity onPress={()=>{this.minus(item,index)}} style={{borderWidth:0,paddingVertical:0,paddingHorizontal:0}}>
                              <Text style={{paddingHorizontal:4,fontSize:22}}>-</Text>
                            </TouchableOpacity>

                            <Text style={{paddingHorizontal:8}}>{item.count}</Text>
                            <TouchableOpacity onPress={()=>{this.plus(item,index)}}style={{borderWidth:0,paddingVertical:0,paddingHorizontal:0}}>
                              <Text style={{paddingHorizontal:4,fontSize:22}}>+</Text>
                              </TouchableOpacity>
                          </View>

                            <View style={{flex:0.8}}>
                              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={{fontSize:18}}>{item.name}</Text>
                                <FontAwesome name={'trash'} size={20}/>
                            {/* <View style={{borderWidth:0,height:22,width:22}}>
                              <Image source={require('../assets/images/trash.png')} style={{height:'100%',width:'100%'}}/>
                            </View> */}
                          </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                              <FontAwesome name={'rupee'} size={20}/>
                              <Text style={{fontSize:16,marginRight:width*0.04,paddingHorizontal:10}}>{item.rs}</Text>
                          </View>

                            </View>

                          </View>
                      </View>
                  </TouchableOpacity>) }}
                  />
            </View>




            </View>

        {/* </ImageBackground> */}
        <View style={{position:'absolute',left:0,bottom:0,right:0,
                      borderWidth:0,justifyContent:'space-between',backgroundColor:'#f3f3f3',
                      flexDirection:'row',paddingVertical:10,paddingHorizontal:0}}>
            <TouchableOpacity style={{borderWidth:0,borderTopRightRadius:10,width:width*0.34,
                                      borderBottomRightRadius:10,alignItems:'center'}}>
                    <Text style={{paddingVertical:0,paddingHorizontal:10,fontSize:20}}>Total Item</Text>
                    <View style={{borderWidth:0}}><Text style={{fontSize:16}}>3</Text></View>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth:0,borderTopLeftRadius:10,width:this.state.product==true?width*0.5:width*0.34,
                                      borderBottomLeftRadius:10,alignItems:'center',backgroundColor:'#ED9309'}}
                              onPress={()=>this.props.navigation.navigate('OrderedScreen')}>
                              {this.state.product==true?<Text style={{paddingVertical:15,paddingHorizontal:10,fontSize:20,color:'#fff'}}>Pick up in 25 min</Text>:
                    <Text style={{paddingVertical:15,paddingHorizontal:10,fontSize:20,color:'#fff'}}>Order</Text>}

            </TouchableOpacity>
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
});

const mapStateToProps =(state) => {
    return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCartScreen);
