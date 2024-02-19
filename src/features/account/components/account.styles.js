import styled from 'styled-components/native';
import { colors } from '../../../infrastructure/theme/colors';
import { Button } from 'react-native-paper';
import { Text } from '../../../components/typography/text.component';
import LottieView from 'lottie-react-native';

export const AccountBackground = styled.ImageBackground.attrs({
	source: require('../../../../assets/home_bg.jpg'),
})`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

export const AccountCover = styled.View`
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: rgba(255, 255, 255, 0.4);
`;

export const AccountContainer = styled.View`
	background-color: rgba(255, 255, 255, 0.7);
	padding: ${(props) => props.theme.space[4]};
	margin-top: ${(props) => props.theme.space[2]};
	border-radius: 30px;
`;

export const AuthButton = styled(Button).attrs({
	buttonColor: colors.brand.secondary,
})`
	padding: ${(props) => props.theme.space[1]};
	border-radius: 12px;
`;
export const Title = styled(Text)`
	font-size: 30px;
`;
export const ErrorContainer = styled.View`
	max-width: 300px;
	align-items: center;
	align-self: center;
	margin-top: ${(props) => props.theme.space[2]};
	margin-bottom: ${(props) => props.theme.space[2]};
`;
export const AnimationWrapper = styled.View`
	padding: ${(props) => props.theme.space[0]};
`;
export const LottieViewAnimation = styled(LottieView).attrs({
	source: require('../../../../assets/food-animation.json'),
})`
	width: 200px;
	height: 200px;
`;
