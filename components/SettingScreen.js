import React,{Component}from 'react';
import {View,TouchableOpacity}from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';
class SettingScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      store:this.props.store
    }
  }
  static navigationOptions=({navigation})=>{
    const { params ={}} = navigation.state
    return{
      title:'Setting',
    headerLeft:(
      <View style={{justifyContent:'flex-start',paddingLeft:15,}}>
          <TouchableOpacity onPress={()=>{navigation.goBack();}}>
            <FontAwesome name={'arrow-left'} size={22} color={'#fff'}/>
          </TouchableOpacity>
      </View>
    ),
    headerStyle:{
      backgroundColor:params.themeColor,
    },
    headerTintColor: '#fff'
  }
  }

  componentDidMount=()=>{
    this.props.navigation.setParams({
      themeColor:this.state.store.themeColor
    })
  }
  render(){
    return(
      <View></View>
    )
  }
}

const mapStateToProps =(state) => {
    return {
    counter: state.cartItems.counter,
    cart : state.cartItems.cartItem,
    store:state.cartItems.store
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTocartFunction:  (args) => dispatch(actions.addToCart(args)),
    decreaseFromCartFunction:  (args) => dispatch(actions.decreaseFromCart(args)),
    increaseCartFunction:  (args) => dispatch(actions.increaseCart(args)),
    setInitialFunction:  (cart,counter) => dispatch(actions.setInitial(cart,counter)),
    emptyCartFunction:()=>dispatch(actions.emptyCart()),


  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen)
