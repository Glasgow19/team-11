import React, {useState} from 'react';

import {
  View,
  Text,
  Image,
  UIManager,
  findNodeHandle,
  Vibration
} from 'react-native';
import {Card, CardItem, Button} from 'native-base';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Tts from 'react-native-tts';

const LanguagePage = props => {
  Tts.setDefaultRate(0.6);
  var languages = ['English','Sign', 'French', 'German', 'Spanish'];
  var [position, setPosition] = useState(0);
  var [language, setLanguage] = useState(languages[position]);

  const images = {
    english: {
      uri: require('../assets/english.png'),
    },
    french: {
      uri: require('../assets/french.png'),
    },
    german: {
      uri: require('../assets/german.png'),
    },
    spanish: {
      uri: require('../assets/spanish.png'),
    },
    sign: {
      uri: require('../assets/sign.jpg'),
    },
  };
  const config = {
    velocityThreshold: 0.01,
    directionalOffsetThreshold: 200,
  };
  const DURATION = 1000 ;
	const startVibration = () => {
		Vibration.vibrate(DURATION) ;
	}
  const onSwipeUp = gestureState => {
    if (position == languages.length - 1) {
      setPosition(0);
    } else {
      setPosition(position + 1);
    }
    setLanguage(languages[position]);
    Tts.speak(languages[position]);
    startVibration();
  };

  const onSwipeDown = gestureState => {
    if (position == 0) {
      setPosition(languages.length - 1);
    } else {
      setPosition(position - 1);
    }
    setLanguage(languages[position]);
    Tts.speak(languages[position]);
    startVibration();
  };
  const readItOutLoud = () => {
    UIManager.sendAccessibilityEvent(
      findNodeHandle(),
      UIManager.AccessibilityEventTypes.typeViewClicked,
    );
  };
  
  return (
    <View
      style={{
        flex: 12,
        backgroundColor: '#131313',
        justifyContent: 'center',
        paddingVertical: 50,
        paddingHorizontal: 30,
      }}>


        <View style={{flex: 2}}>
          <Text
            style={{
              color: '#F1F1F1',
              fontSize: 35,
              textAlign: 'center',
              fontWeight: '400',
            }} >
            Swipe up to select your language
          </Text>
        </View>

      <View
        style={{
          flex: 4,
          alignSelf: 'center',
          justifyContent: 'flex-end',
          flexDirection: 'column',
        }}>
        <GestureRecognizer
          onSwipeUp={onSwipeUp}
          onSwipeDown={onSwipeDown}
          config={config}
          style={{
            flex: 1,
            backgroundColor: '#131313',
          }}>
          <Card style={{borderColor: '#131313'}}>
            <CardItem
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#131313',
              }}>
              <Image
                style={{width: 300, height: 170, resizeMode: 'stretch'}}
                source={images[language.toLowerCase()].uri}
                accessibilityLabel = {language}
              />
              {language=="Sign"? 
                  <Text
                    style={{
                      color: '#F1F1F1',
                      fontSize: 30,
                      textAlign: 'center',
                      fontFamily: 'Roboto Condensed',
                    }}> Sign language
                  </Text>
                :
                <Text
                    style={{
                      color: '#F1F1F1',
                      fontSize: 30,
                      textAlign: 'center',
                      fontFamily: 'Roboto Condensed',
                    }}> {language}
                  </Text>
              }
            </CardItem>
          </Card>
        </GestureRecognizer>
      </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Button
            style={{
              backgroundColor: '#B2FF82',
              justifyContent: 'center',
              width: 300,
              height: 60,
            }}
            onPress = { ()=>{props.navigation.navigate('HomePage')}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>Continue</Text>
          </Button>
        </View>

    </View>
  );
};

export default LanguagePage;
