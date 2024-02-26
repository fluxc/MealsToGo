import React from 'react';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { SettingsScreen } from '../../features/settings/screens/settings.screen';
import { FavoritesScreen } from '../../features/settings/screens/favorites.screen';
import { RestaurantDetailsScreen } from '../../features/restaurants/screens/restaurant-details.screen';
import { CameraScreen } from '../../features/settings/screens/camera.screen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const SettingsStack = createStackNavigator();

const ScreenOptions = () => {
	return {
		cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
		headerMode: 'screen',
	};
};

export const SettingsNavigator = ({ navigation, route }) => {
	React.useLayoutEffect(() => {
		const routeName = getFocusedRouteNameFromRoute(route);
		if (routeName === 'CameraScreen') {
			navigation.setOptions({ tabBarStyle: { display: 'none' } });
		} else {
			navigation.setOptions({ tabBarStyle: { display: 'flex' } });
		}
	}, [navigation, route]);
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
					tabBarStyle: { display: 'none' },
				}}
				name="FavoritesDetails"
				component={RestaurantDetailsScreen}
			/>
			<SettingsStack.Screen
				options={{
					...TransitionPresets.ModalPresentationIOS,
					headerShown: false,
					tabBarStyle: { display: 'none' },
				}}
				name="CameraScreen"
				component={CameraScreen}
			/>
		</SettingsStack.Navigator>
	);
};
