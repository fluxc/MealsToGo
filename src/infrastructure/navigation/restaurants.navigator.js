import React from 'react';
import {
	createStackNavigator,
	TransitionPresets,
	tackCardInterpolationProps,
	StackCardInterpolatedStyle,
} from '@react-navigation/stack';
import { RestaurantsScreen } from '../../features/restaurants/screens/restaurants.screen';
import { RestaurantDetailsScreen } from '../../features/restaurants/screens/restaurant-details.screen';
import { Platform } from 'react-native';

const RestaurantStack = createStackNavigator();

const ScreenOptions = () => {
	return {
		headerShown: false,
		...TransitionPresets.ModalPresentationIOS,
	};
};

const forModalPresentationIOS = (props) => {
	const config = TransitionPresets.ModalPresentationIOS.cardStyleInterpolator(props);
	config.cardStyle.borderBottomLeftRadius = undefined;
	config.cardStyle.borderBottomRightRadius = undefined;
	return config;
};

const fixTabNestedStackCardStyleInterpolator = Platform.select({
	ios: forModalPresentationIOS,
	default: TransitionPresets.BottomSheetAndroid.cardStyleInterpolator,
});

export const RestaurantsNavigator = () => {
	return (
		<RestaurantStack.Navigator screenOptions={ScreenOptions}>
			<RestaurantStack.Screen name="RestaurantsList" component={RestaurantsScreen} />
			<RestaurantStack.Screen
				options={{ cardStyleInterpolator: fixTabNestedStackCardStyleInterpolator }}
				name="RestaurantDetails"
				component={RestaurantDetailsScreen}
			/>
		</RestaurantStack.Navigator>
	);
};
