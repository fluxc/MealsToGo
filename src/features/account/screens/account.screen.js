import React from 'react';

import {
	AccountBackground,
	AccountContainer,
	AccountCover,
	AnimationWrapper,
	AuthButton,
	LottieViewAnimation,
	Title,
} from '../components/account.styles';
import { Spacer } from '../../../components/spacer/spacer.component';

export const AccountScreen = ({ navigation }) => {
	return (
		<AccountBackground>
			<AccountCover />
			<Title>Meals To Go</Title>
			<AnimationWrapper>
				<LottieViewAnimation key="animation" autoPlay loop={false} resizeMode="cover" />
			</AnimationWrapper>
			<AccountContainer>
				<AuthButton icon="lock-open-outline" onPress={() => navigation.navigate('Login')} mode="contained">
					Login
				</AuthButton>
				<Spacer size="large">
					<AuthButton
						icon="lock-open-outline"
						onPress={() => navigation.navigate('Register')}
						mode="contained"
					>
						Register
					</AuthButton>
				</Spacer>
			</AccountContainer>
		</AccountBackground>
	);
};
