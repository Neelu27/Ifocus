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

class DescoverScreen extends React.Component {
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
      products:[{name:'50% Offer',users:3,item:'Chicken Grill',count:'x1',item1:'Lemonade',count1:'x2',status:'unpaid'},
                {name:'20% Offer',users:4,item:'Chicken Tandoori',count:'x1',item1:'Strawberry Mlk Shk',count1:'x2',status:'paid'},
                {name:'10% Offer',users:5,item:'Shawarma',count:'x1',item1:'Donne briyani',count1:'x2',status:'paid'},
                {name:'60% Offer',users:2,item:'Chicken Grill',count:'x1',item1:'Lemonade',count1:'x2',status:'unpaid'},
                {name:'70% Offer',users:4,item:'Chicken Tandoori',count:'x1',item1:'Strawberry Mlk Shk',count1:'x2',status:'unpaid'},
                {name:'80% Offer',users:3,item:'Shawarma',count:'x1',item1:'Donne briyani',count1:'x2',status:'paid'},
                {name:'90% Offer fans',users:4,item:'Chicken Tandoori',count:'x1',item1:'Strawberry Mlk Shk',count1:'x2',status:'unpaid'},
                {name:'25% Offer',users:3,item:'Chicken Grill',count:'x1',item1:'Lemonade',count1:'x2',status:'paid'}],
      images : [{name:'Primary',value:'Rs. 4,000/-',},
                {name:'Premium',value:'Rs. 10,000/-',},
                {name:'Platnum',value:'Rs. 20,000/-',}],
      enabled:false,
      switchValue: false,
      search:false,
      prod:[{name:'continental'},{name:'north-indian'},{name:'south-indian'},{name:'continental'},{name:'north-indian'},{name:'south-indian'}]
      }
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        console.log(params,'params')
        return {header:null}
      };

  componentDidMount(){}
  Touch=(item)=>{
    this.props.navigation.navigate('RestourentDetails',{item:item})
  }
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
                  {this.state.search==false?<View style={{flexDirection:'row',  justifyContent:'space-between',}}>
                    <Text style={{marginRight:width*0.35,fontSize:20,color:'#fff'}}>Discover</Text>
                    <TouchableOpacity onPress={()=>{this.setState({search:true})}} style={{paddingRight:10}}>
                      <FontAwesome
                        reverse
                        name='search'
                        color={'#fff'}
                        size ={20}
                      />
                      {/* <Image source={require('../assets/images/bar.png')} style={{height:20,width:20,tintColor:'#000',marginLeft:10}}  /> */}
                  </TouchableOpacity>
                </View>:<View>
                  <SearchBar
                              containerStyle={{marginLeft:0,padding:0,width:width*0.65,
                                marginBottom:3,marginTop:0,color:'#ED9309',fontSize:14,
                                borderWidth:0,backgroundColor:'transparent',height:30,borderTopWidth:0,borderBottomWidth:0}}
                              inputContainerStyle={{marginLeft:0,padding:0,height:30,
                                width:width*0.65,color:'#ED9309',fontSize:14,marginTop:0,
                                marginBottom:2,backgroundColor:'#ED9309',borderWidth:0}}
                              inputStyle={{color:'#fff'}}
                              placeholder="Search here"
                              placeholderTextColor={'#fff'}
                              onChangeText={text => {this.setState({text})}}

                              value={this.state.text}
                              onEndThreshold={0}
                              textColor={'#fff'}
                              searchIcon={<FontAwesome
                                reverse
                                name='search'
                                color={'#fff'}
                                size ={16}
                              />
                              }
                              cancelIcon={<FontAwesome
                                reverse
                                name='close'
                                color={'#fff'}

                              />}
                              clearIcon={
                                <FontAwesome
                                reverse
                                name='close'
                                color={'#fff'}size ={16}
                                onPress={() => {this.setState({search:false})}}
                              />
                            }
                      />
                </View>}

            </View>


            <ScrollView style={{flex:1,borderWidth:0,marginBottom:80}}showsVerticalScrollIndicator={false}>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10,marginHorizontal:10}}>
                <Text style={{fontSize:20}}>Near Me</Text>
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
              <View style={{paddingBottom:100,marginHorizontal:12}}>
                <FlatList
                    data={this.state.product}
                    extraData={this.state}
                    inverted={false}
                    showsVerticalScrollIndicator={false}
                    scrollToEnd={true}
                    horizontal={false}
                    nestedScrollEnabled={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index})=>{
                      return(
                    <TouchableOpacity onPress={()=>{this.Touch(item)}}style={{flex:1,
                                  height:width*0.35,
                                  marginTop: 25,
                                  marginLeft:0,
                                  marginRight:width*0.04,
                                  borderWidth:0,
                                  shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:10,
                                  shadowOffset:{height:2,width:0},elevation:5,
                                  paddingHorizontal:10,
                                  paddingVertical:15,
                                  width:width*0.92,
                                  backgroundColor:'#fff',
                                  borderColor:'#000',
                                  borderBottomLeftRadius:0,
                                  borderTopRightRadius:0,
                                  borderRadius:0}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:3,justifyContent:'space-between',borderWidth:0}}>
                              <View style={{height:width*0.27,width:width*0.27}}><Image source={item.uri} style={{
                                height:'100%',width:'100%',borderRadius:7
                              }}/></View>


                            </View>
                            <View style={{flex:7,marginHorizontal:10,paddingLeft:10,borderWidth:0}} >
                              <Text style={{fontSize:24,color:'#D60202'}}>{item.name}</Text>
                                <View style={{flexDirection:'row',alignItems:'center'}}
                                  onPress={()=>{this.setState({model2:true})}}>
                                  <Image source={require('../assets/images/nonveg.png')} style={{height:16,width:16,tintColor:'#D60202',}}/>
                                  {this.state.switchValue==false&&item.type=='non-veg'&&
                                    <Text style={{fontSize:20,paddingHorizontal:10,color:'#D60202'}}>{item.type}</Text>
                                    }
                                    {this.state.switchValue==true&&item.type=='non-veg'&&
                                      <Text style={{fontSize:20,paddingHorizontal:10}}>veg</Text>
                                      }
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center'}}
                                  onPress={()=>{this.setState({model2:true})}}>
                                  <FontAwesome name={'rupee'} size={16} style={{}}/>
                                    <Text style={{fontSize:16,marginRight:width*0.04,paddingHorizontal:10}}>{item.rs}</Text>

                                </View>
                                <View style={{flexDirection:'row',}}
                                  onPress={()=>{this.setState({model2:true})}}>
                                  <Text style={{fontSize:16,color:'#A2A1A1'}}>{item.off} OFF</Text>
                                  <Text style={{fontSize:16,color:'#A2A1A1',marginRight:width*0.04,paddingHorizontal:10}}>use code 'E3452CG'</Text>

                                </View>
                                <View style={{position:'absolute',right:2,top:4,alignItems:'center',justifyContent:'center'}}>
                                  <View style={{backgroundColor:'#3EB506',alignSelf:'flex-end'}}>
                                    <Text style={{paddingHorizontal:6,paddingVertical:2,color:'#fff'}}>{item.rate}</Text>

                                  </View>
                                  <Text style={{fontSize:14,color:'#A2A1A1'}}>{item.vote}</Text>
                                </View>

                          </View>
                        </View>
                    </TouchableOpacity>) }}
                    />
              </View>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10,marginHorizontal:10}}>
                    <Text style={{fontSize:20}}>Popular</Text>
               </View>
              <View style={{paddingBottom:100,marginHorizontal:12}}>
                <FlatList
                    data={this.state.product}
                    extraData={this.state}
                    inverted={false}
                    scrollToEnd={true}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index})=>{
                      return(
                    <TouchableOpacity onPress={()=>{this.Touch(item)}}style={{flex:1,
                                  height:width*0.35,
                                  marginTop: 25,
                                  marginLeft:0,
                                  marginRight:width*0.04,
                                  borderWidth:0,
                                  shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:10,
                                  shadowOffset:{height:2,width:0},elevation:5,
                                  paddingHorizontal:10,
                                  paddingVertical:15,
                                  width:width*0.92,
                                  backgroundColor:'#fff',
                                  borderColor:'#000',
                                  borderBottomLeftRadius:0,
                                  borderTopRightRadius:0,
                                  borderRadius:0}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:3,justifyContent:'space-between',borderWidth:0}}>
                              <View style={{height:width*0.27,width:width*0.27}}><Image source={item.uri} style={{
                                height:'100%',width:'100%',borderRadius:7
                              }}/></View>


                            </View>
                            <View style={{flex:7,marginHorizontal:10,paddingLeft:10,borderWidth:0}} >
                              <Text style={{fontSize:24,color:'#D60202'}}>{item.name}</Text>
                                <View style={{flexDirection:'row',alignItems:'center'}}
                                  onPress={()=>{this.setState({model2:true})}}>
                                  <Image source={require('../assets/images/nonveg.png')} style={{height:16,width:16,tintColor:'#D60202',}}/>
                                  {this.state.switchValue==false&&item.type=='non-veg'&&
                                    <Text style={{fontSize:20,paddingHorizontal:10,color:'#D60202'}}>{item.type}</Text>
                                    }
                                    {this.state.switchValue==true&&item.type=='non-veg'&&
                                      <Text style={{fontSize:20,paddingHorizontal:10}}>veg</Text>
                                      }
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center'}}
                                  onPress={()=>{this.setState({model2:true})}}>
                                  <FontAwesome name={'rupee'} size={16} style={{}}/>
                                    <Text style={{fontSize:16,marginRight:width*0.04,paddingHorizontal:10}}>{item.rs}</Text>

                                </View>
                                <View style={{flexDirection:'row',}}
                                  onPress={()=>{this.setState({model2:true})}}>
                                  <Text style={{fontSize:16,color:'#A2A1A1'}}>{item.off} OFF</Text>
                                  <Text style={{fontSize:16,color:'#A2A1A1',marginRight:width*0.04,paddingHorizontal:10}}>use code 'E3452CG'</Text>

                                </View>
                                <View style={{position:'absolute',right:2,top:4,alignItems:'center',justifyContent:'center'}}>
                                  <View style={{backgroundColor:'#3EB506',alignSelf:'flex-end'}}>
                                    <Text style={{paddingHorizontal:6,paddingVertical:2,color:'#fff'}}>{item.rate}</Text>

                                  </View>
                                  <Text style={{fontSize:14,color:'#A2A1A1'}}>{item.vote}</Text>
                                </View>

                          </View>
                        </View>
                    </TouchableOpacity>) }}
                    />
                  </View>
            </ScrollView>

        {/* </ImageBackground> */}
        <View style={{position:'absolute',left:0,bottom:0,right:0,
                      borderWidth:0,justifyContent:'space-between',backgroundColor:'#ED9309',
                      flexDirection:'row',paddingVertical:10,paddingHorizontal:6}}>
            {/* <Image source={require('../assets/images/order.png')} style={{height:30,width:30}}/>
              <FontAwesome name={'qrcode'} size={30}style={{paddingRight:10}}/> */}
            {/* <Image source={require('../assets/images/qrcode.png')} style={{height:30,width:30}}/> */}
            <TouchableOpacity style={{height:30,width:50,borderTopWidth:0,marginLeft:10}}onPress={()=>this.props.navigation.navigate('Order')}>
              <FontAwesome name={'list-alt'} size={30}style={{paddingRight:10}}color={'#fff'}/>
              {/* <Image source={require('../assets/images/order.png')} style={{tintColor:'#fff',height:'100%',width:'100%'}} /> */}
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name={'qrcode'} size={30}style={{paddingRight:10}}color={'#fff'}/>
            {/* <Image source={require('../assets/images/qrcode.png')} style={{height:30,width:30}}/> */}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{position:'absolute',left:width*0.42,alignItems:'center',
          bottom:width*0.052,right:width*0.42,borderRadius:100,borderWidth:1,
          justifyContent:'space-between',flexDirection:'row',backgroundColor:'#f3f3f3',borderColor:'#f3f3f3',
          paddingVertical:12,paddingHorizontal:10,opacity:2}}
          onPress={()=>this.props.navigation.navigate('HomeScreen')}>
            {/* <Image source={require('../assets/images/restaurent.png')} style={{tintColor:'#ED9309',height:35,width:35,alignSelf:'center',marginLeft:2}}/> */}
            <View style={{height:35,width:35,borderRadius:50,backgroundColor:'#ED9309',alignSelf:'center',marginLeft:2,alignItems:'center',justifyContent:'center'}}>
              <FontAwesome  name={'home'} size={22} color={'#fff'}style={{alignSelf:'center'}}/>
            </View>
        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(DescoverScreen);
{/* <View style={{flexDirection:'row',backgroundColor:'#ED9309',
              justifyContent:'space-between',alignItems:'center',borderBottomWidth:0 ,
              paddingVertical:6,paddingHorizontal:6}}> */}

    // <SearchBar
    //             containerStyle={{marginLeft:10,padding:0,width:width*0.65,
    //               marginBottom:3,marginTop:0,color:'#ED9309',fontSize:14,
    //               borderWidth:0,backgroundColor:'transparent',height:30,borderTopWidth:0,borderBottomWidth:0}}
    //             inputContainerStyle={{marginLeft:10,padding:0,height:30,
    //               width:width*0.65,color:'#ED9309',fontSize:14,marginTop:0,
    //               marginBottom:2,backgroundColor:'#ED9309',borderWidth:0}}
    //             inputStyle={{color:'#fff'}}
    //             placeholder="Search here"
    //             placeholderTextColor={'#fff'}
    //             onChangeText={text => {this.setState({text})}}
    //
    //             value={this.state.text}
    //             onEndThreshold={0}
    //             textColor={'#fff'}
    //             searchIcon={<FontAwesome
    //               reverse
    //               name='search'
    //               color={'#fff'}
    //               size ={16}
    //             />
    //             }
    //             cancelIcon={<FontAwesome
    //               reverse
    //               name='close'
    //               color={'#fff'}
    //
    //             />}
    //             clearIcon={
    //               {/* <FontAwesome
    //               reverse
    //               name='close'
    //               color={params.themeColor}
    //               onPress={() => {params.searchContact("");params.isSearchState(params.text1);}}
    //             /> */}
    //           }
    //     />
   //  <TouchableOpacity style={{ marginHorizontal: 10 }}  >
   //      <FontAwesome name={'map-marker'} color='#fff' size={22} style={{marginRight:10}}/>
   //      {/* <FontAwesome name={'map-marker'} color='#000' size={22} style={{marginRight:10}}/> */}
   //      {/* <View   style={{height:22,width:22,borderWidth:0}}>
   //          <Image source={require('../assets/images/pin.png')} style={{height:'110%',width:'100%',tintColor:'#000'}}  />
   //      </View> */}
   //
   // </TouchableOpacity>
// </View>
