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

const { width } = Dimensions.get('window');
const height = width * 0.8
const SERVER_URL = settings.url
const themeColor = settings.themeColor

class PaidScreen extends React.Component {
  constructor(props) {
    super(props);
    var touchhotel=this.props.navigation.getParam('item',null)
    console.log(touchhotel,'touchhotel')
    this.state={
      product:(touchhotel=!null?touchhotel:''),
      products:[{name:'Kadai Chicken',rs:'200/',quantity:1},
                {name:'Kadai Chicken Boneless',rs:'200/',quantity:2},
                {name:'Hydrabadi Chicken',rs:'300/',quantity:3},
                {name:'Chicken Mughlai',rs:'200/',quantity:1},
                {name:'Pepper Chickn',rs:'200/',quantity:1},
                {name:'Kadai Chicken',rs:'200/',quantity:2},
              ],
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

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#f3f3f3'}}>
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
                  <Text style={{marginRight:width*0.3,fontSize:20,color:'#fff'}}>{this.state.product.name}</Text>

            </View>

            <View style={{flex:1,borderWidth:0,marginHorizontal:10}}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10,marginHorizontal:4}}>
              <Text style={{fontSize:20}}>Item</Text>
              <Text style={{fontSize:20}}>Order no:8745</Text>
            </View>

            <View style={{borderWidth:0,flex:0.6}}>
              <FlatList
                  data={this.state.products}
                  showsVerticalScrollIndicator={false}
                  extraData={this.state}
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
                                borderWidth:0,
                                paddingHorizontal:10,
                                paddingVertical:10,
                                width:width*0.94,
                                backgroundColor:'transparent',
                                borderColor:'#000',
                                borderBottomLeftRadius:10,
                                borderTopRightRadius:10,
                                borderRadius:10}}>
                      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderWidth:0,width:width*0.6}}>
                            <Text style={{fontSize:18,}}>{item.name}</Text>

                            <Text style={{paddingHorizontal:10}}>x {item.quantity}</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                              <FontAwesome name={'rupee'} size={20}/>
                              <Text style={{fontSize:16,marginRight:width*0.04,paddingHorizontal:10}}>{item.rs}</Text>
                          </View>
                      </View>
                  </TouchableOpacity>) }}
                  />
            </View>




            </View>
            <View style={{flex:0.4}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginVertical:6,marginHorizontal:10}}>
                <Text style={{fontSize:18}}>SubTotal</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <FontAwesome name={'rupee'} size={16}/>
                  <Text style={{fontSize:18}}>690/-</Text>
               </View>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginVertical:6,marginHorizontal:10}}>
                <View>
                  <Text style={{fontSize:18}}>Mode of Payment</Text>
                  <Text style={{fontSize:14}}>Cash</Text>
               </View>
               <TouchableOpacity style={{borderWidth:0,borderRadius:10,backgroundColor:'#ED9309'}}>
                 <Text style={{fontSize:18,textAlign:'center',paddingHorizontal:20,color:'#fff'}}>Paid</Text>
              </TouchableOpacity>
             </View>
              <View style={{justifyContent:'space-between',alignItems:'flex-start',marginVertical:6,marginHorizontal:10}}>
                <Text style={{fontSize:18}}>Deliverd at</Text>
                <Text style={{fontSize:16}}>Sai Meadow Enclave</Text>
                <Text style={{fontSize:16}}>Kudlu Gate Road</Text>
                <Text style={{fontSize:16}}>Bangalore-560068</Text>
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
});

const mapStateToProps =(state) => {
    return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaidScreen);
