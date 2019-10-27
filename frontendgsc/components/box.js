import React from "react";
import { View, Animated } from "react-native";
import posed from "react-native-pose";

const Box = posed.View({
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
});

export default ({ isVisible }) => (
  <Box
    style={{ width: 300, height: 50, backgroundColor: "red"}}
    pose={isVisible ? "visible" : "hidden"}
  />
  
);


