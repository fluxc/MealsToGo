import React from 'react';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { SettingsScreen } from '../../features/settings/screens/settings.screen';
import { FavoritesScreen } from '../../features/settings/screens/favorites.screen';
import { RestaurantDetailsScreen } from '../../features/restaurants/screens/restaurant-details.screen';

const SettingsStack = createStackNavigator();

const ScreenOptions = () => {
	return {
		cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
		headerMode: 'screen',
	};
};

export const SettingsNavigator = () => {
	return (
		<SettingsStack.Navigator screenOptions={ScreenOptions}>
			<SettingsStack.Screen
				name="SettingsScreen"
				options={{
					headerShown: false,
					title: 'Settings',
				}}
				component={SettingsScreen}
			/>
			<SettingsStack.Screen name="Favorites" component={FavoritesScreen} />
			<SettingsStack.Screen
				options={{
					...TransitionPresets.ModalPresentationIOS,
					headerShown: false,
				}}
				name="FavoritesDetails"
				component={RestaurantDetailsScreen}
			/>
		</SettingsStack.Navigator>
	);
};
