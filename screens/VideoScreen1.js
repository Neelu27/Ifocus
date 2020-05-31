import React from 'react';
import {
  Image,Platform,Switch,
  ScrollView,StyleSheet,
  Text,Button,TextInput,
  TouchableOpacity,View,
  Slider,ImageBackground,
  Dimensions, Alert,StatusBar,Linking,
  FlatList, AppState, BackHandler ,
  AsyncStorage,ActivityIndicator,
  ToastAndroid,RefreshControl} from 'react-native';
import { createDrawerNavigator,DrawerItems, } from 'react-navigation-drawer';
import {SearchBar}from 'react-native-elements';
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
const SERVER_URL = settings.url
const themeColor = settings.themeColor
const url = 'https://your-url.com/video.mp4'
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
      down:false,
      count:0,
      count1:0,
      prod:[{uri:require('../assets/images/images4.jpeg'),name:'continental'},
            {uri:require('../assets/images/smfood.jpeg'),name:'north-indian'},
            {uri:require('../assets/images/food3.jpeg'),name:'south-indian'},
            {uri:require('../assets/images/18.jpeg'),name:'continental'},
            {uri:require('../assets/images/17.jpeg'),name:'north-indian'},
            {uri:require('../assets/images/13.jpeg'),name:'south-indian'}],
      play:false,
      attachOpen:false,
      attachOpenshare:false,
      like: 23,
       dislike: 3,
       likeActive: false,
       dislikeActive: false
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
        this.setState({ switchValue: value });
    };

    play() {
        this.setState({play:true});
        this.video.playAsync()
     }

    pause() {
        this.setState({play:false});
        this.video.pauseAsync()
    }


    setDislike() {
    this.setState({
      dislikeActive: !this.state.dislikeActive,
      dislike: this.state.dislikeActive
        ? this.state.dislike - 1
        : this.state.dislike + 1
    });
  }
  setLike() {
    this.setState({
      likeActive: !this.state.likeActive,
      like: this.state.likeActive ? this.state.like - 1 : this.state.like + 1
    });
  }

  handleLike() {
    if (this.state.dislikeActive) {
      this.setLike();
      this.setDislike();
    }
    this.setLike();
  }

  handleDislike() {
    if (this.state.likeActive) {
      this.setDislike();
      this.setLike();
    }
    this.setDislike();
  }


  render() {

    const video=this.props.navigation.getParam('item',null)

    return (
      <View style={{flex:1,backgroundColor:'#f3f3f3'}}>
      <ModalBox
        style={{height:250,borderTopRightRadius:17,borderTopLeftRadius:17}}
        position={'bottom'}
        ref={'attachModal'}
        isOpen={this.state.attachOpen}
        onClosed={()=>{this.setState({attachOpen:false})}}>
          <View style={{flex:1,justifyContent:'flex-start',paddingHorizontal:15}}>
              <TouchableOpacity><Text style={{fontSize:16,paddingVertical:10}}>Play later</Text></TouchableOpacity>
              <TouchableOpacity><Text style={{fontSize:16,paddingVertical:10}}>Add to</Text></TouchableOpacity>
              <TouchableOpacity><Text style={{fontSize:16,paddingVertical:10}}>Share</Text></TouchableOpacity>
              <TouchableOpacity><Text style={{fontSize:16,paddingVertical:10}}>Favourite</Text></TouchableOpacity>
              <TouchableOpacity><Text style={{fontSize:16,paddingVertical:10}}>Download</Text></TouchableOpacity>
          </View>
        </ModalBox>

        <ModalBox
          style={{height:250,borderTopRightRadius:17,borderTopLeftRadius:17}}
          position={'bottom'}
          ref={'attachModal'}
          isOpen={this.state.attachOpenshare}
          onClosed={()=>{this.setState({attachOpenshare:false})}}>
            <View style={{flex:1,justifyContent:'flex-start',paddingHorizontal:15}}>
                <TouchableOpacity><Text style={{fontSize:20,paddingVertical:10}}>Share</Text></TouchableOpacity>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <TouchableOpacity style={{paddingVertical:6,paddingHorizontal:10}}
                    onPress={()=>Linking.openURL(`mailto:xyz@gmail.com?body='http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'`)}>
                    <FontAwesome name={'envelope-o'} size={40} color={'#FA0502'}/>
                    <Text style={{fontSize:14,paddingVertical:4,textAlign:'center'}}>mail</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{paddingVertical:6,paddingHorizontal:10}}
                    onPress={()=>Linking.openURL(`whatsapp://send?text=${'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}`)}>
                    <FontAwesome name={'whatsapp'} size={40} color={'#15B40E'}/>
                    <Text style={{fontSize:14,paddingVertical:4,textAlign:'center'}}>whatsapp</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{paddingVertical:6,paddingHorizontal:10}}
                    onPress={()=>Linking.openURL('https://www.facebook.com/n/')}>
                    <FontAwesome name={'facebook-official'} size={40} color={'#180EB4'}/>
                    <Text style={{fontSize:14,paddingVertical:4,textAlign:'center'}}>facebook</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{paddingVertical:6,paddingHorizontal:10}}
                    onPress={()=> Linking.openURL('instagram://user?username=apple')}>
                    <FontAwesome name={'instagram'} size={40} color={'#C1479E'}/>
                    <Text style={{fontSize:14,paddingVertical:4,textAlign:'center'}}>instagram</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </ModalBox>
            {/* <Toast style={{backgroundColor:'grey'}} textStyle={{color: '#fff'}} ref="toast" position = 'top'/> */}
            <View style={{height:Constants.statusBarHeight,backgroundColor:'#CF4F07'}}/>
            {/* <View  style={{flexDirection: 'row',justifyContent:'space-between',
                          backgroundColor:'#CF4F07',borderWidth:0, height:50,
                          alignItems:'flex-start',fontSize:20,paddingLeft:4,
                          paddingTop:10,paddingBottom:6,position:'absolute',top:10,opacity:2}}>
              {/* style={{flexDirection:'row',backgroundColor:'#CF4F07',
                            justifyContent:'space-between',alignItems:'center',borderWidth:0,
                            paddingVertical:6,paddingHorizontal:6}} */}
                {/*<TouchableOpacity onPress={()=>{this.props.navigation.openDrawer();}}>
                      <FontAwesome name={'bars'} color='#fff' size={30} style={{marginLeft:10}}/>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginHorizontal: 10 }}  >
                    <FontAwesome name={'map-marker'} color='#fff' size={22} style={{marginRight:10}}/>
               </TouchableOpacity>
            </View> */}
            <View style={{flex:1,borderWidth:0,backgroundColor:'#f3f3f3',justifyContent:'center',paddingHorizontal:0}}>
              {/* <Timeline
                data={data}
                widthLineContainer={65}
                style={{margin: 16}}
                detailContainerStyle={{ borderRadius: 5, borderWidth: 1, borderColor: '#aeaeae', padding: 6, marginBottom: 6, }}
              /> */}
               <Video
                  source={{uri:'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                  rate={1.0}
                  volume={0}
                  isMuted={this.state.play}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={{ width:  width, height:width*0.6,backgroundColor:'#000'}}
                   ref={(ref) => { this.video = ref }}
                />
               <View style={{flexDirection:'row',margin:10,paddingHorizontal:10,paddingVertical:6,borderWidth:0,justifyContent:'space-between'}}>
                    <View style={{}}>
                        <Text style={{fontSize:16}}>{video.namei}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{fontSize:14,paddingRight:10,color:'#A09E9E'}}>Cioc</Text>
                            <Text style={{fontSize:14,paddingHorizontal:10,color:'#A09E9E'}}>422k view</Text>
                            <Text style={{fontSize:14,paddingHorizontal:10,color:'#A09E9E'}}>1 week ago</Text>
                        </View>
                    </View>
                    <View style={{alignItems:'center'}}>
                          {this.state.down==false?<TouchableOpacity onPress={()=>this.setState({down:true})}
                          style={{paddingHorizontal:4,paddingVertical:2}}
                          >
                            <FontAwesome name={'sort-down'} size={20}/>
                          </TouchableOpacity>:<TouchableOpacity onPress={()=>this.setState({down:false})}
                          style={{paddingHorizontal:4,paddingVertical:2}}>
                            <FontAwesome name={'sort-up'} size={20}/>
                          </TouchableOpacity>}
                    </View>
               </View>
               <ScrollView>
                  <View style={{flexDirection:'row',justifyContent:'space-between',width:width*0.92,marginHorizontal:10,marginBottom:10,paddingHorizontal:10}}>
                      <View style={{alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.handleLike()}>{/*this.setState({count:this.state.count+1})*/}
                          <FontAwesome name={'thumbs-up'} size={20} color={!this.state.likeActive?'#A09E9E':'#4791C1'}/></TouchableOpacity>
                        <Text style={{fontSize:14,color:'#A09E9E'}}>{this.state.like}</Text>
                      </View>
                      <View style={{alignItems:'center'}}>
                         <TouchableOpacity onPress={()=>this.handleDislike()}>{/*this.setState({count1:this.state.count1+1}) */}
                          <FontAwesome name={'thumbs-down'} size={20} color={!this.state.dislikeActive?'#A09E9E':'#4791C1'}/></TouchableOpacity>
                        <Text style={{fontSize:14,color:'#A09E9E'}}>{this.state.dislike}</Text>
                      </View>
                      <View style={{alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.setState({attachOpenshare:true})}><FontAwesome name={'share'} size={20} color={'#A09E9E'}/></TouchableOpacity>
                        <Text style={{fontSize:14,color:'#A09E9E'}}>Share</Text>
                      </View>
                      <View style={{alignItems:'center'}}>
                        <TouchableOpacity>
                          <FontAwesome name={'arrow-circle-down'} size={20} color={'#A09E9E'}/></TouchableOpacity>
                          <Text style={{fontSize:14,color:'#A09E9E'}}>Download</Text>
                        </View>
                      <View style={{alignItems:'center'}}>
                        <TouchableOpacity><FontAwesome name={'plus'} size={20} color={'#A09E9E'}/></TouchableOpacity>
                        <Text style={{fontSize:14,color:'#A09E9E'}}>Save</Text>
                      </View>
                 </View>
                 {this.state.down==true?<View style={{paddingHorizontal:20}}>
                      <Text style={{fontSize:14}}>Mahabharat is an Indian television Historical series based on the Hindu epic of the same name, A total of ninety-four episodes[1] had its original run from 2 October 1988 to 24 June 1990 on DD National.[2][3] It was produced by B. R. Chopra and directed by his son, Ravi Chopra.[4] The music was composed by Raj Kamal. The script was written by the Urdu poet Rahi Masoom Raza, based on the original story by Vyasa. Costumes for the series were provided by Maganlal Dresswala.[5]

                      Each episode ran for approximately 60 minutes and began with a title song that consisted of lyrical content and two verses from the Bhagavad Gita.[6] The title song was sung and the verses rendered by singer Mahendra Kapoor. The title song was followed by a narration by Indian voice-artist Harish Bhimani of a personification of Time, detailing the current circumstances and highlighting the spiritual significance of the content of the episode. It is the most successful Mahabharata series ever produced for television.[7]</Text>
                    </View>:<View></View>}

                  <FlatList
                      data={this.state.products}
                      showsHorizontalScrollIndicator={false}
                      extraData={this.state}
                      inverted={false}
                      scrollToEnd={true}
                      horizontal={false}
                      nestedScrollEnabled={true}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index})=>{
                      return(
                       <View  style={{flex:1,borderWidth:0,height:width*0.27,flexDirection:'row',
                                width:width*0.95,borderColor:'#000',marginVertical:10,marginHorizontal:10,
                                alignItems:'center',justifyContent:'space-between'}}>
                            <TouchableOpacity style={{width:width*0.4,height:width*0.27,borderWidth:0.2,backgroundColor:'#000'}}>
                                <Image source={item.img} style={{width:'100%',height:'100%'}}/>
                                <View style={{position:'absolute',bottom:8,right:8,backgroundColor:'#000',borderRadius:7}}>
                                    <Text style={{paddingHorizontal:8,color:'#fff',fontSize:14}}>4:00</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{marginLeft:0,borderWidth:0,height:width*0.27,width:width*0.4}}>
                                <Text style={{fontSize:16}}>{item.namei}</Text>
                                <Text style={{fontSize:14,paddingRight:10,color:'#A09E9E'}}>Cioc</Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                  <Text style={{fontSize:14,paddingHorizontal:0,color:'#A09E9E'}}>422k view</Text>
                                  <Text style={{fontSize:14,paddingHorizontal:10,color:'#A09E9E'}}>1 week ago</Text>
                                </View>
                            </View>
                            <View style={{alignItems:'flex-start',height:width*0.27,justifyContent:'flex-start',borderWidth:0,borderColor:'#00ff00'}}>
                              <TouchableOpacity style={{borderWidth:0,alignSelf:'flex-start',}}
                                    onPress={()=>this.setState({attachOpen:true})}>
                                <MaterialIcons name={'more-vert'} size={20} color={'#000'} />
                              </TouchableOpacity>
                            </View>
                     </View>) }}
                  />
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
