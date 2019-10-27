import React,{useEffect,useState} from 'react';
import { Dimensions, StyleSheet, View, Text,Vibration} from 'react-native';
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
		console.log(this.props);
		this.onClickToHelp = this.onClickToHelp.bind(this);
	}

	onClickToHelp() {
		this.props.navigation.navigate("InformationPage");
	}

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}
	componentDidMount() {
		// this.cameraInterval = setInterval(async () => {
		// 	this.takeFrame();
		// 	// this.takeScreenShot();
		// }, 1500);
	}

	componentWillUnmount() {
		clearInterval(this.cameraInterval);
	}	

	takeScreenShot= async ()=>{
		//handler to take screnshot
		// const data = await captureScreen({
		//   //either png or jpg or webm (Android). Defaults to png
		//   format: "png",
		//   quality: 0.2,
		//   result: 'base64'
		// })
		// .then(
		//   //callback function to get the result URL of the screnshot
		//   result => data
		//   //uri => this.setState({ imageURI : uri }),
		// )
		//   ;
	  }

    takeFrame = async function(){
		
		if (this.camera) {
			// Set options
			const options = {
				base64: true,
            };
			
			// Get the base64 version of the image
			try {
				const data = await this.camera.takePictureAsync(options)
	
				//POST the frame
				fetch('http://178.62.19.14/image', {
					method: 'POST',
					headers: {
					  Accept: 'application/json',
					  'Content-Type': 'application/json',
					},
					body: JSON.stringify({
					  image: data.base64,
					}),
				  });
			} catch {
				console.log("Whoops! Server down! My bad.");
			}
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
							<Tip text = "Hey Hemang!"></Tip>
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
							onPress = { this.onClickToHelp }>
							<Text style={{fontSize: 25, fontWeight: 'bold'}}>Help</Text>
						</Button>
				</View>
            </RNCamera>
			</>
		);
	}
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
const Tip = (props) => {
	var [saidOnce, setSaidOnce]= useState(false);
	const DURATION = 10000 ;
	const PATTERN = [ 1000, 2000, 3000, 4000] ;
	const startVibration = () => {
		Vibration.vibrate(DURATION) ;
	}
	const stopVibration = () => {
		Vibration.cancel();
	}
	useEffect(() => {
		if (!saidOnce){
			Tts.speak(props.text);
			setSaidOnce(true);	
			Vibration.vibrate(1000);		
		}
	  });
	return(
		<Text style={{fontSize: 20, fontWeight: 'bold',color:"#F1F1F1", backgroundColor:"#131313",marginHorizontal:80,
			marginVertical:10,borderRadius:5,textAlignVertical:"center",
			textAlign:"center",paddingHorizontal:10,paddingVertical:10}}>
				{props.text}
		</Text>	
	)
}