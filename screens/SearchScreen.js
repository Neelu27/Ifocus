import * as React from 'react';
import { StatusBar ,View,FlatList,StyleSheet,TouchableOpacity,Text,Dimensions,Image,AppState,BackHandler,AsyncStorage,Platform,ActivityIndicator} from 'react-native';
import { Card } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import  Constants  from 'expo-constants';

import ImageOverlay from "react-native-image-overlay";




const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    header:null,
  }
  state = {
    firstQuery: '',
    products:[],
    cartItems : [],
    loading:false,
    totalProducts:[],
    loader:true,
  };

  // getProductList = async ()=>{
  //   await fetch(SERVER_URL + '/api/ecommerce/searchProduct/?search=&limit=80')
  //     .then((response) => {console.log(response)
  //       return response.json()})
  //     .then((responseJson) => {
  //       var products = responseJson.filter((item)=>{
  //         if(item.typ == 'list'){
  //           return item
  //         }
  //       })
  //       this.setState({ products: products,totalProducts:products,loader:false })
  //       console.log(responseJson,products,'products')
  //     })
  //     .catch((error) => {
  //       return
  //     });
  // }


  serchProduct(query){
    console.log(query)
    this.setState({firstQuery:query})
    if(query.length <3){
      this.setState({ products: this.state.totalProducts })
      return
    }
    // this.setState({ products: this.state.totalProducts })
    // fetch(SERVER_URL + '/api/ecommerce/searchProduct/?search='+query+'&limit=10')
    //   .then((response) => {console.log(response)
    //     return response.json()})
    //   .then((responseJson) => {
    //     var products = responseJson.filter((item)=>{
    //       if(item.typ == 'list'){
    //         return item
    //       }
    //     })
    //     this.setState({ products: products,loading: false ,loader:false})
    //     console.log(products,'products')
    //   })
    //   .catch((error) => {
    //     this.setState({ loading: false });
    //   });
  }

  // reloadCart = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('cart');
  //     if (value !== null) {
  //       this.setState({cartItems : JSON.parse(value)})
  //       console.log(this.state.cartItems)
  //     }
  //     this.textInput.focus()
  //   } catch (error) {
  //      return
  //   }
  // };

  // componentDidUpdate(){
  //     AsyncStorage.setItem('cart', JSON.stringify(this.state.cartItems));
  // }
  //
  // componentDidMount() {
  //   this.reloadCart()
  //   this.getProductList()
  //   AppState.addEventListener('change', (state) => {
  //     console.log(state);
  //       if (state === 'active') {
  //        console.log('state active');
  //       }
  //      if(state === 'background'){
  //       console.log('background');
  //      }
  //    })
  //   BackHandler.addEventListener('hardwareBackPress', ()=>{
  //     console.log("back button");
  //     AsyncStorage.setItem('cart', JSON.stringify(this.state.cartItems));
  //   });
  //
  //   console.log(this.textInput)
  //
  //
  //
  //
  // }
  //
  // updateCart = (args)=>{
  //
  //   var cartItems = this.state.cartItems;
  //   for (var i = 0; i < cartItems.length; i++) {
  //     if (cartItems[i].pk == args.pk) {
  //       var varients = cartItems[i].varients;
  //       var foundIndex = -1;
  //       for (var j = 0; j < varients.length; j++) {
  //         if (varients[j].pk == args.varient) {
  //           foundIndex = j
  //           if (args.count > 0) {
  //             cartItems[i].varients[j].count = args.count;
  //             console.log("Updating new varient");
  //             this.setState({cartItems : cartItems})
  //             AsyncStorage.setItem("cart", JSON.stringify(cartItems))
  //             return;
  //           }
  //         }
  //       }
  //
  //       if (foundIndex!= -1) {
  //         cartItems[i].varients.splice(foundIndex, 1)
  //         console.log("removing a varient");
  //         this.setState({cartItems : cartItems})
  //         AsyncStorage.setItem("cart", JSON.stringify(cartItems))
  //         return;
  //       }
  //
  //
  //       console.log("Creating new varient");
  //       cartItems[i].varients.push({pk : args.varient , salePrice : args.salePrice, count : args.count, dp : args.dp , name : args.name , mrp : args.mrp , discount : args.discount , sku : args.sku, parent : args.listing,unitPack:args.unitPack})
  //       this.setState({cartItems : cartItems})
  //       AsyncStorage.setItem("cart", JSON.stringify(cartItems))
  //       return;
  //     }
  //   }
  //
  //   console.log("creating new product");
  //   cartItems.push({pk : args.pk , varients : [{pk : args.varient , salePrice : args.salePrice, count : args.count, dp : args.dp , name : args.name , mrp : args.mrp , discount : args.discount , sku : args.sku, parent : args.listing,unitPack:args.unitPack}] })
  //
  //   this.setState({cartItems : cartItems})
  //   AsyncStorage.setItem("cart", JSON.stringify(cartItems))
  //
  //   console.log(cartItems)
  //
  //
  // }

  render() {

    const { firstQuery } = this.state;
     const { navigation } = this.props;
     // const color = navigation.getParam('color','#000')

    return (
      <View>
      <View style={{backgroundColor:'#efa834',paddingTop:Constants.statusBarHeight,paddingBottom:0, height:3*Constants.statusBarHeight}}>
      <Searchbar
        ref={input => { this.textInput = input }}
        showLoading
        data={this.state.products}
        style= {{height:2*Constants.statusBarHeight,borderRadius:0}}
        icon='arrow-back'
        placeholder='Search'
        onIconPress ={()=>{
          console.log('color');
          this.props.navigation.goBack()}}
        onChangeText={query =>{if(this.state.loading == false){
          this.serchProduct(query);
        }} }
        value={firstQuery}
      />
      </View>
      {this.state.loader == true&&
          <View style={{flex:1,justifyContent:'center',alignItems: 'center',marginTop:3*Constants.statusBarHeight }}>
          <ActivityIndicator size="large" color="#efa834" />
          </View>
      }


      {/* { this.state.loader == false && this.state.products.length>0 &&
      <FlatList style={{borderColor : '#fff' , borderWidth:2,marginRight:0,marginTop:0,backgroundColor:'#fff',marginBottom:100}}
        data={this.state.products}
        keyExtractor={(item) => {
          return item.serialNo.toString();
        }}
        renderItem={({item, index, separators}) => (
          <SearchCard product={item} color={color} cartItems={this.state.cartItems} onChange={ (args)=> this.updateCart(args)} />
        )}
      />
      }
      { this.state.products.length == 0 && this.state.firstQuery.length>2 &&
        <Text style={{fontSize:16,alignSelf:'center',marginTop:20,fontWeight:'700'}}>Product doesn't Exist</Text>
      } */}
      </View>

    );

  }
}

const styles = StyleSheet.create({
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
  searchcontainer: {
    backgroundColor: 'red',
},

})
