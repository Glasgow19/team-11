import React from 'react';
import { View, Image } from 'react-native';


const SplashScreen = (props) => {
    setTimeout( () => {
        props.navigation.navigate('LanguagePage');
    }, 1000);
    return (
        <View style = {{flex:1,
            backgroundColor:"#131313",justifyContent:"center",paddingHorizontal:100}}>
            <Image
                style={{paddingHorizontal:100,width:100,resizeMode: 'contain'}}
                source={require('../assets/logo.png')}
            />
        </View>
    )
}

export default SplashScreen;