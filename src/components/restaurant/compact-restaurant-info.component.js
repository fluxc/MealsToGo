import react from 'react';
import styled from 'styled-components/native';
import { Text } from '../typography/text.component';
import WebView from 'react-native-webview';
import { Platform } from 'react-native';

const CompactWebView = styled(WebView)`
	border-radius: 10px;
	width: 120px;
	height: 100px;
`;
const CompactImage = styled.Image`
	border-radius: 10px;
	width: 120px;
	height: 100px;
`;
const Item = styled.View`
	padding: 10px;
	max-width: 120px;
	align-items: center;
`;
const isAndroid = Platform.OS === 'android';
export const ComponentRestaurantInfo = ({ restaurant, isMap }) => {
	const Image = isAndroid && isMap ? CompactWebView : CompactImage;
	return (
		<Item>
			<Image source={{ uri: restaurant.photos[0] }} />
			<Text center variant="caption" numberOfLines={3}>
				{restaurant.name}
			</Text>
		</Item>
	);
};
