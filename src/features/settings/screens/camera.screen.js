import React, { useRef, useState, useEffect, useContext } from 'react';
import { Camera } from 'expo-camera';
import styled from 'styled-components/native';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '../../../components/typography/text.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { IconButton, MD3Colors } from 'react-native-paper';
AsyncStorage;
const ProfileCamera = styled(Camera)`
	width: 100%;
	height: 100%;
`;

const TakePhoto = styled.View`
	position: absolute;
	top: 90%;
	left:40%;
	z-index: 999;
`;
export const CameraScreen = ({ navigation }) => {
	const [hasPermission, setHasPermission] = useState(null);
	const cameraRef = useRef();
	const { user } = useContext(AuthenticationContext);
	const snap = async () => {
		if (cameraRef) {
			const photo = await cameraRef.current.takePictureAsync().catch((e) => {
				console.log(e);
			});
			await AsyncStorage.setItem(`${user.uid}-photo`, photo.uri).catch((e) => {
				console.log(e);
			});
			navigation.goBack();
		}
	};

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync().catch((e) => {
				console.log(e);
			});
			setHasPermission(status === 'granted');
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}
	return (
		<>
			<TakePhoto>
				<IconButton icon="camera" iconColor={MD3Colors.primary0} size={40} onPress={snap} />
			</TakePhoto>

			<ProfileCamera
				ref={(camera) => (cameraRef.current = camera)}
				type={Camera.Constants.Type.front}
				ratio={'16:9'}
			/>
		</>
	);
};
