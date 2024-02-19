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

export const RegisterScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatedPassword, setRepeatedPassword] = useState('');
	const { isLoading, onRegister, error } = useContext(AuthenticationContext);
	return (
		<AccountBackground>
			<AccountCover />
			<Title>Meals To Go</Title>
			<AccountContainer>
				<LoginWrapper>
					<TextInput
						label="E-mail"
						value={email}
						textContentType="emailAddress"
						keyboardType="email-address"
						autoCapitalize="none"
						onChangeText={(u) => setEmail(u)}
					/>
					<Spacer size="large">
						<TextInput
							label="Password"
							value={password}
							textContentType="password"
							secureTextEntry
							autoCapitalize="none"
							onChangeText={(p) => setPassword(p)}
						/>
					</Spacer>
					<Spacer size="large">
						<TextInput
							label="Repeat Password"
							value={repeatedPassword}
							textContentType="password"
							secureTextEntry
							autoCapitalize="none"
							onChangeText={(p) => setRepeatedPassword(p)}
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
								icon="email"
								mode="contained"
								onPress={() => onRegister(email, password, repeatedPassword)}
							>
								Register
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
