import React from "react";
import { Text } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import {LinearGradient} from "expo-linear-gradient";
import { fromCSS } from "@bacons/css-to-expo-linear-gradient";
    
const GradientText = (props: any) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient {...fromCSS(`linear-gradient(109.27deg, #BB9FFF 0%, #9CD9FF 102.22%);`)}>
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;