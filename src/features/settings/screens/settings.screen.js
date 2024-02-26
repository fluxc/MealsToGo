import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { List, Avatar } from 'react-native-paper';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { SafeArea } from '../../../components/utility/safearea.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../../../infrastructure/theme/colors';
const SettingsItem = styled(List.Item)`
	padding: ${(props) => props.theme.space[3]};
	background-color: rgba(255, 255, 255, 0.3);
`;

const SettingsBackground = styled.ImageBackground.attrs({
	source: require('../../../../assets/home_bg.jpg'),
})`
	position: absolute;
	height: 100%;
	width: 100%;
`;

const AvatarContainer = styled.View`
	align-items: center;
`;
const TransparentSafeArea = styled(SafeArea)`
	background-color: transparent;
`;

export const SettingsScreen = ({ navigation }) => {
	const { onLogout, user } = useContext(AuthenticationContext);
	const [photo, setPhoto] = useState(null);
	const getProfilePicture = async (currentUser) => {
		const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`).catch((e) => {
			console.log(e);
		});
		setPhoto(photoUri);
	};

	useFocusEffect(
		React.useCallback(() => {
			getProfilePicture(user);
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [user]),
	);

	return (
		<SettingsBackground>
			<TransparentSafeArea>
				<AvatarContainer>
					<Spacer position="top" size="extraLarge">
						<TouchableOpacity onPress={() => navigation.navigate('CameraScreen')}>
							{!photo ? (
								<Avatar.Icon size={130} icon="human" backgroundColor={colors.brand.primary} />
							) : (
								<Avatar.Image
									size={130}
									source={{ uri: photo }}
									backgroundColor={colors.brand.primary}
								/>
							)}
						</TouchableOpacity>
					</Spacer>
					<Spacer position="top" size="large">
						<Text variant="label">{user.email}</Text>
					</Spacer>
				</AvatarContainer>

				<List.Section>
					<Spacer position="top" size="large" />

					<SettingsItem
						title="Favourites"
						description="View your favourites"
						left={(props) => <List.Icon {...props} color={colors.ui.error} icon="heart" />}
						onPress={() => navigation.navigate('Favorites')}
					/>
					<Spacer position="top" size="large" />
					<SettingsItem
						title="Payment"
						left={(props) => <List.Icon {...props} color={colors.ui.secondary} icon="cart" />}
						onPress={() => null}
					/>
					<Spacer position="top" size="large" />
					<SettingsItem
						title="Past orders"
						left={(props) => <List.Icon {...props} color={colors.ui.secondary} icon="history" />}
						onPress={() => null}
					/>

					<Spacer position="top" size="large" />
					<SettingsItem
						title="Logout"
						left={(props) => <List.Icon {...props} color={colors.ui.secondary} icon="door" />}
						onPress={onLogout}
					/>
				</List.Section>
			</TransparentSafeArea>
		</SettingsBackground>
	);
};
