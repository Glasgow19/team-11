import React from 'react';
import { Dimensions, StyleSheet, View, Text} from 'react-native';
import { RNCamera } from 'react-native-camera';
import CaptureButton from './CaptureButton.js';
import { captureScreen } from "react-native-view-shot";
import {Button} from 'native-base';
import Tts from 'react-native-tts';

export default class Camera extends React.Component {

	constructor(props){
		super(props);
        this.state = {
			imageURI: '', 
			identifedAs: '',
			loading: false,
			tipVisible: true,
		}
	}
	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}
	componentDidMount() {
		this.cameraInterval = setInterval(() => {
			//this.takeFrame();
			this.takeScreenShot;
		}, 333);
	}

	componentWillUnmount() {
		clearInterval(this.cameraInterval);
	}	

	takeScreenShot=()=>{
		//handler to take screnshot
		captureScreen({
		  //either png or jpg or webm (Android). Defaults to png
		  format: "png",
		  quality: 0.5,
		  result: 'base64'
		})
		.then(
		  //callback function to get the result URL of the screnshot
		  result => data
		  //uri => this.setState({ imageURI : uri }),
		)
		fetch('', {
			method: 'POST',
			headers: {
			  Accept: 'application/json',
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			  frameBase: data,
			}),
		  });
		  ;
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
		setInterval( () => {
			this.setModalVisible(!this.state.modalVisible)
		}, 8000);
		return (
			<>
            <RNCamera ref={ref => {this.camera = ref;}} style={styles.preview}>
				<View style = {{flex:2,justifyContent:"flex-end",flexDirection:"column"}} >
						{this.state.tipVisible ?
						<Text style={{fontSize: 20, fontWeight: 'bold',color:"#F1F1F1", backgroundColor:"#131313",marginHorizontal:80,
						marginVertical:10,borderRadius:5,textAlignVertical:"center",
						textAlign:"center",paddingHorizontal:10,paddingVertical:10}}>
							Team 11 is the best 
						</Text>
						
						: null}
						<Button
							style={{
							backgroundColor: '#B2FF82',
							justifyContent: 'center',
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							width: 500,
							height: 50,
							}}
							onPress = { ()=>{props.navigation.navigate('HomePage')}}>
							<Text style={{fontSize: 25, fontWeight: 'bold'}}>Help</Text>
						</Button>
				</View>
            </RNCamera>
			</>
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