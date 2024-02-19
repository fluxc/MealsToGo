import React, { useContext, useState } from 'react';
import {
	AccountBackground,
	AccountContainer,
	AccountCover,
	AuthButton,
	ErrorContainer,
	Title,
} from '../components/account.styles';
import { Spacer } from '../../../components/spacer/spacer.component';
import { TextInput } from 'react-native-paper';
import styled from 'styled-components/native';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { Text } from '../../../components/typography/text.component';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
const LoginWrapper = styled.View`
	width: 250px;
`;

export const LoginScreen = ({ navigation }) => {
	const { isLoading, onLogin, error } = useContext(AuthenticationContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	return (
		<AccountBackground>
			<AccountCover />
			<Title>Meals To Go</Title>
			<AccountContainer>
				<LoginWrapper>
					<TextInput
						label="Email"
						textContentType="emailAddress"
						keyboardType="email-address"
						autoCapitalize="none"
						value={email}
						onChangeText={(e) => setEmail(e)}
					/>
					<Spacer size="large">
						<TextInput
							label="Password"
							textContentType="password"
							secureTextEntry
							autoCapitalize="none"
							value={password}
							onChangeText={(p) => setPassword(p)}
						/>
					</Spacer>
					{error && (
						<ErrorContainer size="large">
							<Text variant="error">{error}</Text>
						</ErrorContainer>
					)}

					<Spacer size="large">
						{!isLoading ? (
							<AuthButton
								icon="lock-open-outline"
								onPress={() => onLogin(email, password)}
								mode="contained"
							>
								Login
							</AuthButton>
						) : (
							<ActivityIndicator animating={true} color={MD2Colors.blue30} />
						)}
					</Spacer>
				</LoginWrapper>
			</AccountContainer>
			<Spacer size="large">
				<AuthButton mode="contained" onPress={() => navigation.goBack()}>
					Back
				</AuthButton>
			</Spacer>
		</AccountBackground>
	);
};
