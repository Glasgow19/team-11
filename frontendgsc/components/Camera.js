import React from 'react';
import { Dimensions, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CaptureButton from './CaptureButton.js';


export default class Camera extends React.Component {

	constructor(props){
		super(props);
        this.state = { 
			identifedAs: '',
            loading: false,
		}
	}

	componentDidMount() {
		this.cameraInterval = setInterval(() => {
			this.takeFrame();
		}, 333);
	}

	componentWillUnmount() {
		clearInterval(this.cameraInterval);
	}	

    takeFrame = async function(){
		
		if (this.camera) {
			// Set options
			const options = {
				base64: true,
            };
			
			// Get the base64 version of the image
			const data = await this.camera.takePictureAsync(options)

			//POST the frame
			//this.sendFrame(data.base64);
		}
	}
    
	render() {
		return (
            <RNCamera ref={ref => {this.camera = ref;}} style={styles.preview}>
            </RNCamera>
		);
	}
	
	//<CaptureButton buttonDisabled={this.state.loading} onClick={this.takeFrame.bind(this)}/>
}

const styles = StyleSheet.create({
    preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
	},
	loadingIndicator: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});