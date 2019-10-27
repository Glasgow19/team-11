
import React, {useState} from 'react';
import { View,TouchableOpacity, Text,StyleSheet} from 'react-native';
import posed from 'react-native-pose';
import Box from "./box";

// import Svg, {
//     Circle,
//     Ellipse,
//     G,
//     Text,
//     TSpan,
//     TextPath,
//     Path,
//     Polygon,
//     Polyline,
//     Line,
//     Rect,
//     Use,
//     Image,
//     Symbol,
//     Defs,
//     LinearGradient,
//     RadialGradient,
//     Stop,
//     ClipPath,
//     Pattern,
//     Mask,
//     Marker
//   } from 'react-native-svg';

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
    return (
        <View style={styles.container}>
                <Box isVisible={isVisible} />
                <TouchableOpacity
                onPress={() => {
                    setVisibility(!isVisible)
                }}
                >
                <Text>Show Box</Text>
                </TouchableOpacity>
        </View>
        );
}
const LeftArrow = (props) => {
    const Box = posed.View({
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
      });
    const isVisible = true;
    return (
        <View style= {{ flex:1,backgroundColor:"#131313"}}>
            {/* { isVisible }) => ( */}
                <Box pose={isVisible ? 'visible' : 'hidden'} />
            {/* } */}
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

        </View>
    )
}

export default Animation;