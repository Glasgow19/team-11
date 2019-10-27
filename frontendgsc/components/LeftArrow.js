
import React, {useState} from 'react';
import { View,TouchableOpacity, Text,StyleSheet} from 'react-native';
import posed from 'react-native-pose';
import Box from "./box";

import Svg, {Path, Rect,Defs, Marker } from 'react-native-svg'; //add Box
import { Left } from 'native-base';
import {
    // previously imported modules
    Animated, // provides methods for animating components
    Easing ,
    Dimensions// for implementing easing functions
  } from "react-native";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF"
    }
  });
const Animation = (props) => {
    var [isVisible, setVisibility] = useState(false);
    var yTranslate = new Animated.Value(0);
    var {width, height} = Dimensions.get('window')
    var negativeHeight = -height + 20;

    var modalMoveY = yTranslate.interpolate({
        inputRange: [0, 1],
        outputRange: [0, negativeHeight]
      });
    var translateStyle = { transform: [{ translateY: modalMoveY }] }; // translateY is the transform for moving objects vertically 
    var [value, setValue] = useState(1);
    
    const animate = ()=> {
        console.log("hey");
        setValue(value+10);
        Animated.timing(yTranslate, {
            toValue: 10,
            duration: 200,
            easing: Easing.linear
          }).start();
    }
    
    setInterval(() => {
        animate()
    }, 40000);

    return (
        <Animated.View style={[styles.container, translateStyle]}>
            <LeftArrow></LeftArrow>
        </Animated.View>
        // <View style={styles.container}>
        //         <LeftArrow isVisible={isVisible} />
        //         <TouchableOpacity
        //         onPress={() => {
        //             setVisibility(!isVisible)
        //         }}
        //         >
        //         <Text>Show Box</Text>
        //         </TouchableOpacity>
        // </View>
        );
}

const LeftArrow = (props) => {
    const Box = posed.View({
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
      });
    const isVisible = true;
    return (
            <Svg width="400" height="200" viewBox="0 0 4000 2000">
                <Defs>
                    <Marker
                    id="Triangle"
                    viewBox="0 0 10 10"
                    refX="0"
                    refY="5"
                    markerUnits="strokeWidth"
                    markerWidth="4"
                    markerHeight="3"
                    orient="auto"
                    >
                    <Path d="M 0 0 L 10 5 L 0 10 z"
                        stroke="blue"
                        fill = "blue"/>
                    </Marker>
                </Defs>
                <Rect
                    x="10"
                    y="10"
                    width="3980"
                    height="1980"
                    fill="none"
                    // stroke="blue"
                    strokeWidth="10"
                />
                <Path
                    d="M 1000 750 L 2000 750 L 2500 1250"
                    fill="none"
                    stroke="blue"
                    strokeWidth="100"
                    markerEnd="url(#Triangle)"
                />
            </Svg>

        // </View>
    )
}

export default Animation;