import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,ToastAndroid,
  Text,ActivityIndicator,
  TouchableOpacity,
  View,Alert,Linking,PermissionsAndroid,
  Dimensions,ImageBackground,
  TextInput,FlatList,AsyncStorage,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import { FontAwesome,MaterialIcons,Entypo ,Ionicons} from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import  Constants  from 'expo-constants';
import {SearchBar}from 'react-native-elements';
import SmsListener from 'react-native-android-sms-listener';
import * as Expo from 'expo';
import * as Permissions from 'expo-permissions';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import settings from '../constants/Settings.js';
const { width } = Dimensions.get('window');
const height = width * 0.8
const SERVER_URL = settings.url
const themeColor = settings.themeColor
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
import { LinearGradient } from 'expo-linear-gradient';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import { Slider } from 'react-native-elements';
import Modal from "react-native-modal";
// import {Slider} from 'react-native-slider';
// import VolumeSlider from 'react-native-volume-slider';
// import { Player } from 'react-native-audio-streaming';
import { Audio } from 'expo-av';

class CameraScreens extends React.Component {

  static navigationOptions = {
    header:null,
  }

  constructor(props) {
    super(props);
    this.state = {
      Images:[],
      photoshoot:false,
    }
  }

  modalAttach =async (event) => {
           if(event == 'gallery') return this._pickImage();
           if(event == 'camera'){
               this.handlePhoto()
           }
       };

       _pickImage = async () => {
           this.setState({photoshoot:false});
           let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsMultipleSelection: true
           });
           this.attachShow(false)
           let img = new FormData();
           let filename = result.uri.split('/').pop();
           let match = /\.(\w+)$/.exec(filename);
           var type = match ? `image/${match[1]}` : `image`;
           const photo = {
              uri: result.uri,
              type: type,
              name:filename,
           };
           var imageLib = this.state.image
           imageLib.push(photo)
           this.setState({ image: imageLib });
           var formData = new FormData();
           formData.append("attachment",(photo.name == null ||photo.uri ==null?'':photo));
           console.log(sessionid,csrf,formData,'dataSend');
           fetch(SERVER_URL+'/api/POS/mediasv/', {
              method: 'POST',
              headers: {
                "Cookie" :"csrftoken="+csrf+";sessionid=" + sessionid +";",
                'Content-Type': 'multipart/form-data;',
                'X-CSRFToken':csrf,
                'Referer': SERVER_URL,
              },
              body:formData,
              }).then((response) =>{
                 console.log(response.status,'response.status');
                 return response.json()
              }).then((json) => {
                console.log(json,'Updated Invoice');
                var arr =this.state.Images;
                arr.push(json)
                this.setState({Images:arr});
                console.log(this.state.Images,"This.state.Images")
            }).catch((error) => {
                console.log(error)
            });
      };

      handlePhoto = async () => {
           this.setState({photoshoot:false});
           let picture = await ImagePicker.launchCameraAsync({mediaTypes:ImagePicker.MediaTypeOptions.Images});
           this.attachShow(false)
           if(picture.cancelled == true){
               return
           }
           let img = new FormData();
           let filename = picture.uri.split('/').pop();
           let match = /\.(\w+)$/.exec(filename);
           let type = match ? `image/${match[1]}` : `image`;
           const photo = {
               uri: picture.uri,
               type: type,
               name:filename,
           };
           var imageLib = this.state.image
           imageLib.push(photo)
           this.setState({ image: imageLib });
           var formData = new FormData();
           formData.append("attachment",(photo.name == null ||photo.uri ==null?'':photo));
           console.log(sessionid,csrf,formData,'dataSend');
           fetch(SERVER_URL+'/api/POS/mediasv/', {
               method: 'POST',
               headers: {
                 "Cookie" :"csrftoken="+csrf+";sessionid=" + sessionid +";",
                 'Content-Type': 'multipart/form-data;',
                 'X-CSRFToken':csrf,
                 'Referer': SERVER_URL,
               },
               body:formData,
           }).then((response) =>{
               console.log(response.status,'response.status');
               return response.json()
           }).then((json) => {
               console.log(json,'Updated Invoice');
               var arr =this.state.Images;
               arr.push(json)
               this.setState({Images:arr});
               console.log(this.state.Images,"This.state.Images")
           }).catch((error) => {
               console.log(error)
          });
       }

       attachShow=async(bool)=>{
          const { status, expires, permissions } = await Permissions.getAsync(
               Permissions.CAMERA_ROLL,
               Permissions.CAMERA
              );
          if(permissions.camera.status == 'granted'){
             if(permissions.cameraRoll.status == 'granted'){
                 this.setState({attachOpen:bool})
             }else{
                 this.getCameraRollAsync()
             }
          }else{
             this.getCameraAsync()
          }
       }

       getCameraRollAsync=async()=> {
          const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if(status === 'granted'){
             this.attachShow(true)
          }else{
             throw new Error('Gallery permission not granted');
          }
       }

      getCameraAsync=async()=> {
          const{ status, permissions } = await Permissions.askAsync(Permissions.CAMERA);
          if(status === 'granted'){
             this.attachShow(true)
          }else{
             throw new Error('Camera permission not granted');
          }
       }
       cameraPermission=async()=>{
           const { status } = await Permissions.askAsync(Permissions.CAMERA);
           this.setState({ hasCameraPermission: status === 'granted' });
       }

       setCameraImage =  (image) => {
           this.setState({selectedImage:image.uri,imageDetails:image,photoshoot:false})
           this.addGoodss();
       }

       onSelect = color =>{
           this.setState({ selectedColor: color ,visible:false,valutext:color});
       }


  render(){
    const audio=this.props.navigation.getParam('item',null);
    console.log(audio,'audio');
    const Package=[{value:'Packaging'},{value:'Price'},{value:'Brand'},{value:'Delivery'}]
    return(
      <View style={{flex:1}}>
          <View style={{height:Constants.statusBarHeight,backgroundColor:'#103368'}}></View>
          <ImageBackground source={require('../assets/video/back1.png')} style={{flexDirection:'row',justifyContent:'space-between',width:'101%',height:'100%',alignItems:'center'}}>
          <ScrollView>
          <Text style={{textAlign:'center',fontSize:20,color:'#fff'}}>Merchandise photo</Text>
            <View style={{height:width*1.5,width:width*0.89,borderRadius:0,marginVertical:15,alignItems:'center',alignSelf:'center',backgroundColor:'#fff'}}>
              <Text style={{fontSize:20,marginVertical:10}}>Photos</Text>
              <View style={{justifyContent:'center',borderWidth:0,marginHorizontal:10,alignSelf:'center',}}>

                <View style={{flexDirection:'row',paddingTop:width*0.01,borderWidth:1,width:width*0.8}}>
                     <ScrollView horizontal={true}style={{borderWidth:0}}>
                        <FlatList
                            data={this.state.Images}
                            extraData={this.state}
                            horizontal={true}
                            nestedScrollEnabled={true}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index})=>(
                            <View style={{justifyContent:'center',height:width*0.2,
                                          width:width*0.15,borderWidth:0,
                                          borderRadius:7,marginHorizontal:5}}>
                                <TouchableOpacity
                                        style={{borderWidth:0,justifyContent:'flex-end',padding:1,
                                                position:'absolute',left:width*0.115,top:0,zIndex:2,
                                                borderTopRightRadius:7,}}
                                        >
                                        <FontAwesome
                                              name={'close'}
                                              color={'#ffffff'}
                                              size={16}
                                              style={{alignSelf:'flex-end',}}/>
                                </TouchableOpacity>
                                <Image source={{uri:item.attachment}}  style={{height:'100%',width:'100%',borderRadius:7}}/>
                          </View>
                          )}
                      />
                   </ScrollView>
                   <TouchableOpacity
                          style={{justifyContent:'center',height:width*0.2,
                                  width:width*0.15,borderWidth:0,borderRadius:7,}}
                          onPress={()=>{this.setState({photoshoot:true})}}>
                          <FontAwesome
                                name={'plus'}
                                size={22}
                                style={{alignSelf:'center'}}
                                color={'#000'}/>
                   </TouchableOpacity>
              </View>
                   <View style={{borderWidth:0}}>
                       <Text style={{fontSize:18,paddingVertical:10}}>Comment</Text>
                       <TextInput
                           style={{fontSize:16,paddingVertical:10,borderColor:'#000',borderRadius:7,
                                   shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                   shadowOffset:{height:2,width:0},elevation:5,backgroundColor:'#fff',
                                   paddingHorizontal:10}}
                           value={this.state.mobile}
                           keyboardType={'numeric'}
                           minHeight={300}
                           onChangeText={(mobile)=>{this.setState({mobile})}}>
                       </TextInput>
                   </View>
                  <View style={{borderWidth:0,marginTop:25,alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
                    <TouchableOpacity style={{borderWidth:0,backgroundColor:'#fff',borderRadius:7,
                                              shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                              shadowOffset:{height:2,width:0},elevation:5,}}
                                      onPress={()=>{this.props.navigation.navigate('ModifyScreen',{item:true})}}>
                        <Text style={{fontSize:18,paddingHorizontal:15,paddingVertical:8,color:'#000'}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderWidth:0,backgroundColor:'#5586D2',borderRadius:7,
                                              shadowColor:"#fefefe",shadowOpacity:0.2,shadowRadius:15,
                                              shadowOffset:{height:2,width:0},elevation:5,}}
                                      onPress={()=>{this.props.navigation.navigate('ModifyScreen',{item1:true})}}>
                        <Text style={{fontSize:18,paddingHorizontal:15,paddingVertical:8,color:'#fff'}}>Upload</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            </View>
            </ScrollView>
          </ImageBackground>
          <Modal isVisible={this.state.photoshoot}  hasBackdrop={true} backdropColor={'#ddd9cc'}
            style={[styles.modalView1,{position:'absolute',bottom:-40,left:-20,}]}
            onBackdropPress={()=>{this.setState({photoshoot:false});}}>
               <View style={{paddingVertical:width*0.01,paddingLeft:-0}}>
                   <View style={{flexDirection:'row',height:width*0.3,justifyContent:'space-between',width:width,
                                 borderWidth:0,backgroundColor:'#103368',borderRadius:7,paddingTop:width*0.05}}>
                         <TouchableOpacity
                               style={{alignItems:'center',justifyContent:'center',backgroundColor:'transparent',paddingHorizontal:4,
                                       paddingVertical:6,borderWidth:0,borderRadius:7}}
                               onPress={()=>{this.modalAttach('gallery')}}>
                               <FontAwesome
                                     name="folder" size={width*0.1}
                                     style={{marginRight:5,color:'#fff',
                                             textAlign: 'center',marginLeft:width*0.1}} />
                               <Text style={{fontSize:16,color:'#fff',textAlign:'center',marginLeft:width*0.1}}>Gallary</Text>
                         </TouchableOpacity>
                         <TouchableOpacity
                               style={{flexDirection: 'column',alignItems: 'center',
                                       justifyContent: 'center',backgroundColor:'transparent',
                                       paddingHorizontal:4,paddingVertical:6,borderWidth:0,borderRadius:7,}}
                               onPress={()=>{this.modalAttach('camera')}}>
                               <FontAwesome
                                     name="camera"
                                     size={width*0.1}
                                     style={{marginRight:5,color:'#fff',textAlign: 'center',marginRight:width*0.1}}
                               />
                               <Text style={{fontSize:16,color:'#fff',textAlign:'center',marginRight:width*0.1}}>camera</Text>
                         </TouchableOpacity>
                   </View>
             </View>
       </Modal>
     </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
 },
 albumCover: {
    width: 250,
    height: 250,
 },
 trackInfo: {
    padding: 40,
    backgroundColor: '#fff',
 },
 trackInfoText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    color: '#550088',
 },
 largeText: {
   fontSize: 22,
 },
 smallText: {
   fontSize: 16,
 },
 control: {
   margin: 20,
 },
 controls: {
  flexDirection: 'row',
 }
})

const mapStateToProps =(state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps,mapDispatchToProps)(CameraScreens);
