import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,Alert,
  TouchableOpacity,
  View,TouchableWithoutFeedback,
  Slider,ActivityIndicator,
  Dimensions,TouchableHighlight,
  TextInput,FlatList,AsyncStorage,
} from 'react-native';
import  { FontAwesome }  from '@expo/vector-icons';
import * as WebBrowser  from 'expo-web-browser';
import  Constants  from 'expo-constants';
import { Card } from 'react-native-elements';
import { Ionicons,MaterialIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { LinearGradient } from 'expo-linear-gradient';
import Toast, {DURATION} from 'react-native-easy-toast';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes'
import moment from 'moment'
import { FloatingAction } from "react-native-floating-action";

const { width } = Dimensions.get('window');
const height = width * 0.8

export default class InsurenceLog extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            orders:this.props.item,
            open : false,
            offset:0,
            cancellationReview:'',
            loader:true,
            is_superuser:false,
            userStore:null,
            status:props.status,
            store:props.store,
            offset:0,
            limit:10,
            count:0,
            prod:[{uri:require('../assets/ifocus/Hospitalitiescharge.png'),name:'Hospitalities Charge ',itemav:'upto 1,00,000'},
                  {uri:require('../assets/ifocus/DiagnosticTests.png'),name:'Diagonastic Tests',itemav:'Covered'},
                  {uri:require('../assets/ifocus/Medicines.png'),name:'Medicines',itemav:'upto 1,00,000'},
                  {uri:require('../assets/ifocus/Treatmentcharges.png'),name:'Treatment charges',itemav:'Covered'},
                  {uri:require('../assets/ifocus/Hospitalitiescharge.png'),name:'Hospitalities Charge',itemav:'upto 1,00,000'},
                  {uri:require('../assets/ifocus/DiagnosticTests.png'),name:'Diagonastic Tests',itemav:'Covered'},
                  {uri:require('../assets/ifocus/Hospitalitiescharge.png'),name:'Hospitalities Charge ',itemav:'upto 1,00,000'},
                  {uri:require('../assets/ifocus/DiagnosticTests.png'),name:'Diagonastic Tests',itemav:'Covered'},
                  {uri:require('../assets/ifocus/Medicines.png'),name:'Medicines',itemav:'upto 1,00,000'},
                  {uri:require('../assets/ifocus/Treatmentcharges.png'),name:'Treatment charges',itemav:'Covered'},
                  {uri:require('../assets/ifocus/Hospitalitiescharge.png'),name:'Hospitalities Charge',itemav:'upto 1,00,000'},
                  {uri:require('../assets/ifocus/DiagnosticTests.png'),name:'Diagonastic Tests',itemav:'Covered'},]
        }
    }
    render() {
      console.log(this.state.orders,'orders')
      return (
        <View style={{flex:1}}>
            <View style={{borderWidth:0,borderColor:'grey',
                          paddingVertical:15,paddingHorizontal:15,
                          marginTop:25,marginVertical:0,
                          backgroundColor:'#fff',paddingBottom:100}}>
                  <FlatList
                        data={this.state.prod}
                        extraData={this.state}
                        showsHorizontalScrollIndicator={false}
                        inverted={false}
                        scrollToEnd={true}
                        nestedScrollEnabled={true}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index})=>{
                          return(
                            <View style={{flex:1,
                                          marginTop:10,
                                          alignItems:'center',
                                          borderWidth:0,
                                          paddingHorizontal:2,
                                          paddingVertical:2,
                                          width:width*0.9,
                                          borderColor:'#000',
                                          justifyContent:'center',alignSelf:'center',
                                          borderRadius:0,backgroundColor:'#fff',}}>
                                  <View style={{paddingVertical:10,paddingHorizontal:4,width:width*0.85,
                                                alignSelf:'center',flexDirection:'row',
                                                justifyContent:'space-between'}}>
                                      <View style={{flex:0.2,alignItems:'center',borderWidth:0,justifyContent:'center'}}>
                                          <View style={{flex:0.2,height:42,width:42,borderWidth:0}}>
                                              <Image source={item.uri} style={{height:'100%',width:'100%',}}resizeMode={'contain'}/>
                                          </View>
                                      </View>
                                      <View style={{flex:0.8,}}>
                                          <Text style={{fontSize:16,color:'#000'}}>{item.name}</Text>
                                          <Text style={{fontSize:14,color:'#777777'}}>{item.itemav}</Text>
                                      </View>
                                  </View>
                            </View>)}}
                  />
            </View>
       </View>
     );
   }
 }


const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
  contentImage:{
      flexWrap: 'nowrap',
      flexDirection:'row',
      alignItems: 'flex-start',
      marginTop:Constants.statusBarHeight,
      justifyContent: 'flex-start',
    },
  item: {
      marginTop:10,
      borderRadius:10
    },
  shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },

  TouchableOpacityStyle: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
      backgroundColor: '#fff',
      zIndex: 1,
      borderRadius:25,
   },
  modalcontainer:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
  modalView: {
      backgroundColor: '#fff',
      marginHorizontal: width*0.05 ,
      borderRadius:5,
    },
  FloatingButtonStyle: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
   }
  });
