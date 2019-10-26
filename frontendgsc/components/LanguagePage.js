import React from 'react';

import { View, StyleSheet,Text,Image } from 'react-native';
import {Card,CardItem,Bottom,Icon} from 'native-base';
const styles = StyleSheet.create({
    image: {
      width: 300,
      resizeMode: "stretch"
    }
});

const LanguagePage = (props) => {
    var languages = ["English","French","German","Spannish"]
    var position = 0
    return (
        <View style={{ flex: 12,backgroundColor:"#131313",alignContent:"space-between",paddingVertical:100,paddingHorizontal:30,}}>
             <View style={{ flex: 1}}>
                <Text style= {{color:"#F1F1F1",fontSize:40,textAlign:"center",fontWeight:"400"}}>
                    Select a language to proceed
                </Text>
             </View>

             <View style={{ flex: 2}}>
                 <Card style={{borderColor:"#131313"}}>
                 <CardItem style={{flexDirection: "column", justifyContent:"center",alignItems:"center",backgroundColor:"#131313"}}>
                    <Image
                    style={styles.image}
                    source={require('../assets/english.png')}
                    />
                    <Text style= {{color:"#F1F1F1",fontSize:30,textAlign:"center",fontFamily:"Roboto Condensed"}}>
                        English
                    </Text>
                </CardItem>
                 </Card>

             </View>
        </View>
    )
}

export default LanguagePage;