import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Slider,
  Dimensions,
  TextInput,FlatList,AsyncStorage,TouchableHighlight, Alert,ActivityIndicator,TouchableWithoutFeedback
} from 'react-native';
import  { FontAwesome }  from '@expo/vector-icons';
import { MonoText } from './StyledText';

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

export default class SellerOrderAnnounce extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            orders:[],
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
            prod:[]
        }
    }



  render() {

      return (
        <View style={{flex:1}}>
          {/* <FlatList
                              style={{marginTop: 15,}}
                              data={this.state.prod}
                              keyExtractor={(item, index) => index}
                              renderItem={({ item }) => ( */}
                              <View style={{borderWidth:1,borderColor:'grey',paddingVertical:15,paddingHorizontal:15,marginTop:15}}>
                                  <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                                        <View style={{flex:1,justifyContent:'flex-start',alignItems:'flex-start'}}>
                                              <MonoText   style={{fontSize:20}}>Order Update</MonoText>
                                        </View>
                                        <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end'}}>
                                              <MonoText   style={{fontSize:16}}>15-May-2020</MonoText>
                                        </View>
                                  </View>
                                  <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:15}}>
                                        <View style={{flex:1,justifyContent:'flex-start',alignItems:'flex-start'}}>
                                              <MonoText   style={{fontSize:16}}>Order status updated for order no: 12345678 has been cancelled</MonoText>
                                        </View>
                                        {/* <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end'}}>
                                              <MonoText   style={{fontSize:13}}>Total Amount : &#8377; {item.totalAmount}</MonoText>
                                        </View> */}
                                  </View>
                             </View>
                             <View style={{borderTopWidth:0,borderBottomWidth:1,borderColor:'grey',paddingVertical:15,paddingHorizontal:15,marginTop:0}}>
                                 <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                                       <View style={{flex:1,justifyContent:'flex-start',alignItems:'flex-start'}}>
                                             <MonoText   style={{fontSize:20}}>Order Created</MonoText>
                                       </View>
                                       <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end'}}>
                                             <MonoText   style={{fontSize:16}}>14-May-2020</MonoText>
                                       </View>
                                 </View>
                                 <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:15}}>
                                       <View style={{flex:1,justifyContent:'flex-start',alignItems:'flex-start'}}>
                                             <MonoText   style={{fontSize:16}}>Order status updated for order no: 12345678 has been cancelled</MonoText>
                                       </View>
                                       {/* <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end'}}>
                                             <MonoText   style={{fontSize:13}}>Total Amount : &#8377; {item.totalAmount}</MonoText>
                                       </View> */}
                                 </View>
                                 <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:15}}>
                                       <View style={{flex:1,justifyContent:'flex-start',alignItems:'flex-start'}}>
                                             <MonoText   style={{fontSize:16}}>Payment Mode: COD</MonoText>
                                       </View>
                                       <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end'}}>
                                             <MonoText   style={{fontSize:16}}>Total Amount : &#8377; 360</MonoText>
                                       </View>
                                 </View>
                            </View>
                           {/* )}
                         /> */}

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
