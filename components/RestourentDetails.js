import React from 'react';
import {
  Image,Platform,
  ScrollView,StyleSheet,
  Text,Button,TextInput,
  TouchableOpacity,View,
  Slider,ImageBackground,
  Dimensions, Alert,StatusBar,
  FlatList, AppState, BackHandler ,
  AsyncStorage,ActivityIndicator,Switch,
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
// import { Switch } from 'react-native-switch';

const { width } = Dimensions.get('window');
const height = width * 0.8
const SERVER_URL = settings.url
const themeColor = settings.themeColor

class RestourentDetails extends React.Component {
  constructor(props) {
    super(props);
    var touchhotel=this.props.navigation.getParam('item',null)
    console.log(touchhotel,'touchhotel')
    this.state={
      product:(touchhotel=!null?touchhotel:''),
      products:[{name:'Kadai Chicken',rs:'200/-'},
                {name:'Kadai Chicken Boneless',rs:'200/-'},
                {name:'Hydrabadi Chicken',rs:'300/-'},
                {name:'Chicken Mughlai',rs:'200/-'},
                {name:'Pepper Chickn',rs:'200/-'},
                {name:'Kadai Chicken',rs:'200/-'},
                {name:'Kadai Chicken Boneless',rs:'200/-'},
                {name:'Hydrabadi Chicken',rs:'300/-'},
                {name:'Chicken Mughlai',rs:'200/-'},
                {name:'Pepper Chickn',rs:'200/-'},],
      images : [{name:'Primary',value:'Rs. 4,000/-',},
                {name:'Premium',value:'Rs. 10,000/-',},
                {name:'Platnum',value:'Rs. 20,000/-',}],
      enabled:false,
      switchValue:false,
      prod:[{name:'continental'},{name:'north-indian'},{name:'south-indian'},{name:'continental'},{name:'north-indian'},{name:'south-indian'}]
      }
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        console.log(params,'params')
        return {header:null}
      };

  componentDidMount(){}
  toggleSwitch = value => {
    //onValueChange of the switch this function will be called
    this.setState({ switchValue: value });
    //state changes according to switch
    //which will result in re-render the text
  };
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

            <View style={{flex:1,borderWidth:0,marginHorizontal:10,backgroundColor:'#f3f3f3'}}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10,marginHorizontal:10}}>
              <Text style={{fontSize:20}}>Food Menu</Text>
              {/* <Switch
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
                /> */}
                <Switch
                    style={{ marginTop: 0 }}
                    onValueChange={this.toggleSwitch}
                    value={this.state.switchValue}
                  />
            </View>
            <View style={{borderWidth:0,height:width*0.4,width:width*0.89 ,margin:10}}>
                <Image source={require('../assets/images/11.jpeg')} style={{height:'100%',width:'100%'}}/>
            </View>
            <View>
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
                            <Text style={{fontSize:18}}>{item.name}</Text>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                              <FontAwesome name={'rupee'} size={20}/>
                              <Text style={{fontSize:16,marginRight:width*0.04,paddingHorizontal:10}}>{item.rs}</Text>
                          </View>
                      </View>
                  </TouchableOpacity>) }}
                  />
            </View>




            </View>

        {/* </ImageBackground> */}
        <View style={{position:'absolute',left:0,bottom:0,right:0,backgroundColor:'#f3f3f3',
                      borderWidth:0,justifyContent:'space-between',backgroundColor:'#f3f3f3',
                      flexDirection:'row',paddingVertical:10,paddingHorizontal:0}}>
            <TouchableOpacity style={{borderWidth:0,borderTopRightRadius:10,width:width*0.4,
                                      borderBottomRightRadius:10,alignItems:'center',backgroundColor:'#ED9309'}}
                              onPress={()=>{this.props.navigation.navigate('AddFoodScreen',{item:true})}}>
                    <Text style={{paddingVertical:15,paddingHorizontal:10,fontSize:18,color:'#fff'}}>Take Away</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth:0,borderTopLeftRadius:10,width:width*0.4,
                                      borderBottomLeftRadius:10,alignItems:'center',backgroundColor:'#ED9309'}}
                              onPress={()=>this.props.navigation.navigate('ContactMenu',{item:false})}>
                    <Text style={{paddingVertical:15,paddingHorizontal:10,fontSize:18,color:'#fff'}}>Dine in</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(RestourentDetails);
