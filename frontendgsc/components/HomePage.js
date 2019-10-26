import React from 'react';

import { StyleSheet, View } from 'react-native';
import Camera from './Camera'

const HomePage = (props) => {
    // process.nextTick = setImmediate;
    return (
        <View style={styles.container}>
            <Camera/>
        </View>
    );
}

export default HomePage;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',	
	}
});