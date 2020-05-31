import React, { Component } from 'react';
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const { width } = Dimensions.get('window');
const height = width * 0.8

const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10

const images = [{name:'Primary',value:'Rs. 4,000/-',img:require('../AllImage/Icons-POI/lock1.png')},
                {name:'Premium',value:'Rs. 10,000/-',img:require('../AllImage/Icons-POI/lock1.png')},
                {name:'Platnum',value:'Rs. 20,000/-',img:require('../AllImage/Icons-POI/lock1.png')}

]

export default class CaroselScreen extends Component {

  numItems = images.length
  itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
  animVal = new Animated.Value(0)

  render() {
    let imageArray = []
    let barArray = []
    images.forEach((image, i) => {
      console.log(image, i)
      const thisImage = (
        <LinearGradient
                key={`image${i}`}
                colors={['#000000','#0b0101','#0b0101','#615454']}
                style={{width:width*0.3,height:width*0.3,borderWidth:0,justifyContent:'center',marginBottom:4}}>

                    <Text style={{color:'#fff',fontSize:18,paddingVertical:15,paddingLeft:25}}>{i.name}</Text>
                    <Text style={{color:'#fff',fontSize:18,paddingVertical:15,paddingLeft:25}}>{i.value}</Text>
                    <View style={{width:40,height:40,borderWidth:0,borderColor:'#fff',alignSelf:'center',marginLeft:8}}>
                        <Image  source={{uri:i.img}} style={{width:'100%',height:'100%'}}/>
                    </View>
        </LinearGradient>
        // <Image
        //   key={`image${i}`}
        //   source={{uri: image}}
        //   style={{ width: deviceWidth }}
        // />
      )
      imageArray.push(thisImage)

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      })

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              width: this.itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}
        >
          <Animated.View

            style={[
              styles.bar,
              {
                width: this.itemWidth,
                transform: [
                  { translateX: scrollBarVal },
                ],
              },
            ]}
          />
        </View>
      )
      barArray.push(thisBar)
    })

    return (
      <View
        style={styles.container}
        flex={1}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
            )
          }
        >

          {imageArray}
 <View
          style={styles.skip}
        >
          <Text style={{backgroundColor: '#fff',color:"#F44",textAlign:"center",alignItems: 'center',
    justifyContent: 'center',}}>skip</Text>
        </View>
        </ScrollView>
        <View
          style={styles.barContainer}
        >
          {barArray}
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    bottom: 40,
    flexDirection: 'row',
  },
    skip: {
    position: 'absolute',
    zIndex: 2,
    bottom: 80,
    flexDirection: 'row',
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2,
  },
  bar: {
    backgroundColor: '#5294d6',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
})
