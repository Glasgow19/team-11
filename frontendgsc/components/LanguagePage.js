import React, { useState } from 'react';

import { View, StyleSheet,Text,Image } from 'react-native';
import {Card,CardItem,Bottom,Icon} from 'native-base';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const styles = StyleSheet.create({
    image: {
      width: 300,
      height:170,
      resizeMode: "stretch",
      margin:0,
    }
}); 
  

const LanguagePage = (props) => {
    var languages = ["English","French","German","Spanish"]
    var [ position, setPosition ] = useState(0);
    var [ language, setLanguage ] = useState(languages[position]);
    const images = {
        english: {
          uri: require('../assets/english.png')
        },
        french: {
            uri: require('../assets/french.png')
        },
        german: {
            uri: require('../assets/german.png')
        },
        spanish: {
            uri: require('../assets/spanish.png')
        }
      }
    const config = {
        velocityThreshold: 0.1,
        directionalOffsetThreshold: 200
    };
    const onSwipeUp = (gestureState) => {
        if (position == languages.length-1 ){
            setPosition(0);
        }else{
            setPosition(position+1);
        }
        setLanguage(languages[position]);
    }
     
    const onSwipeDown = (gestureState) => {
        if (position == 0 ){
            setPosition(languages.length-1);
        }else{
            setPosition(position-1);
        }
        setLanguage(languages[position]);
        // setPath(language);
    }
     
    // const onSwipe = (gestureName, gestureState) => {
    //     const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    //     setGestureName(gestureName);
    //     switch (gestureName) {
    //       case SWIPE_UP:
    //         setbgcolor("red");
    //         break;
    //       case SWIPE_DOWN:
    //         setbgcolor("green");
    //         break;
    //     }
    //   }

    return (
        <View style={{ flex: 12,backgroundColor:"#131313",alignContent:"space-between",paddingVertical:100,paddingHorizontal:30,}}>
             <View style={{ flex: 1}}>
                <Text style= {{color:"#F1F1F1",fontSize:40,textAlign:"center",fontWeight:"400"}}>
                    Select a language to proceed
                </Text>
             </View>

             <View style={{ flex: 2}}>
                <GestureRecognizer
                    // onSwipe={onSwipe}
                    onSwipeUp={onSwipeUp}
                    onSwipeDown={onSwipeDown}
                    config={config}
                    style={{
                        flex: 1,
                        backgroundColor: "#131313"
                    }}
                    >
                    <Card style={{borderColor:"#131313"}}>
                    <CardItem style={{flexDirection: "column", justifyContent:"center",alignItems:"center",backgroundColor:"#131313"}}>
                        <Image
                        style={styles.image}
                        source={images[language.toLowerCase()].uri} 
                        />
                        <Text style= {{color:"#F1F1F1",fontSize:30,textAlign:"center",fontFamily:"Roboto Condensed"}}>
                            {language}
                        </Text>
                    </CardItem>
                    </Card> 
                </GestureRecognizer>                 

             </View>
        </View>
    )
}

export default LanguagePage;