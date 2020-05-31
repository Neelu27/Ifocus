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
import {SearchBar,CheckBox}from 'react-native-elements';
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

class ContactMenu extends React.Component {
  constructor(props) {
    super(props);
    var touchhotel=this.props.navigation.getParam('item',null)
    console.log(touchhotel,'touchhotel')
    this.state={
      product:touchhotel,
      products:[{name:'Kadai Chicken',rs:'200/'},
                {name:'Kadai Chicken Boneless',rs:'200/'},
                {name:'Hydrabadi Chicken',rs:'300/'},
                {name:'Chicken Mughlai',rs:'200/'},
                {name:'Pepper Chickn',rs:'200/'},
                {name:'Kadai Chicken',rs:'200/'},
                {name:'Kadai Chicken Boneless',rs:'200/'},
                {name:'Hydrabadi Chicken',rs:'300/'},
                {name:'Chicken Mughlai',rs:'200/'},
                {name:'Pepper Chickn',rs:'200/'},],
      images : [{name:'Primary',value:'Rs. 4,000/-',},
                {name:'Premium',value:'Rs. 10,000/-',},
                {name:'Platnum',value:'Rs. 20,000/-',}],
      enabled:false,
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
                  <Text style={{marginRight:width*0.3,fontSize:20,color:'#fff'}}>Hotel Empire</Text>

            </View>

            <View style={{flex:1,borderWidth:0,backgroundColor:'#f3f3f3'}}>
            <View style={{marginTop:10,marginHorizontal:10}}>
              <Text style={{fontSize:20}}>Group ID</Text>
              <TextInput style={{backgroundColor:'#ffffff',
                                  borderRadius:7,
                                  shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                  shadowOffset:{height:2,width:0},elevation:5,
                                  paddingHorizontal:20,
                                  paddingVertical:10,
                                   fontSize:16,
                                   borderRadius:7,
                                   width:width*0.92,
                                   borderWidth:0.2,
                                   borderColor:'#bdbdbd',
                                 marginVertical:15,}}
                           onChangeText={(taxratetext)=>this.setState({taxratetext})}
                           value={this.state.taxratetext}>
              </TextInput>
            </View>
            <View style={{marginTop:10,marginHorizontal:10}}>
              <Text style={{fontSize:20}}>Near Me</Text>
              <View>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CheckBox/>
                    <Text style={{fontSize:18,paddingHorizontal:10}}>Pradeep</Text>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CheckBox/>
                    <Text style={{fontSize:18,paddingHorizontal:10}}>Pradeep</Text>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CheckBox/>
                    <Text style={{fontSize:18,paddingHorizontal:10}}>Pradeep</Text>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CheckBox/>
                    <Text style={{fontSize:18,paddingHorizontal:10}}>Pradeep</Text>
                  </View>
              </View>
            </View>
            <View style={{marginTop:10,marginHorizontal:10}}>
              <Text style={{fontSize:20}}>All Contact</Text>
              <View>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CheckBox/>
                    <Text style={{fontSize:18,paddingHorizontal:10}}>Pradeep</Text>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CheckBox/>
                    <Text style={{fontSize:18,paddingHorizontal:10}}>Pradeep</Text>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CheckBox/>
                    <Text style={{fontSize:18,paddingHorizontal:10}}>Pradeep</Text>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CheckBox/>
                    <Text style={{fontSize:18,paddingHorizontal:10}}>Pradeep</Text>
                  </View>
              </View>
            </View>
            <View style={{justifyContent:'center'}}>
              <Text style={{fontSize:18,textAlign:'center'}}>4 contact selected</Text>
            </View>
            </View>

        {/* </ImageBackground> */}
        <View style={{position:'absolute',left:0,bottom:0,right:0,
                      borderWidth:0,justifyContent:'center',backgroundColor:'#ED9309',
                      flexDirection:'row',paddingVertical:15,paddingHorizontal:6}}>
            <TouchableOpacity style={{backgroundColor:'#ED9309'}}onPress={()=>this.props.navigation.navigate('AddFoodScreen',{item:this.state.product})}>
                <Text style={{fontSize:18,textAlign:'center',color:'#fff'}} >Go To Menu</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactMenu);
