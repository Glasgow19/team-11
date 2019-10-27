import React from 'react';
import { View, Image } from 'react-native';


const SplashScreen = (props) => {
    setTimeout( () => {
        props.navigation.navigate('LoginPage');
    }, 1000);
    return (
        <View style = {{flex:12,
            backgroundColor:"#ffffff",justifyContent:"center",
            alignContent:"center", alignSelf:"center"}}>
            <Image
                style={{width: 250,resizeMode: 'contain'}}
                source={require('../assets/logo.jpg')}
            />
        </View>
    )
}

export default SplashScreen;