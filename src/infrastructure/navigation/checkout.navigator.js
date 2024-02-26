import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { Platform } from 'react-native';
import { CheckoutScreen } from '../../features/checkout/screens/checkout.screen';
import { ErrorScreen } from '../../features/checkout/screens/checkout-error.screen';
import { CheckoutSuccessScreen } from '../../features/checkout/screens/checkout-success.screen';

const CheckoutStack = createStackNavigator();

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

export const CheckoutNavigator = () => {
	return (
		<CheckoutStack.Navigator screenOptions={ScreenOptions}>
			<CheckoutStack.Screen name="CheckoutScreen" component={CheckoutScreen} />
			<CheckoutStack.Screen
				options={{ cardStyleInterpolator: fixTabNestedStackCardStyleInterpolator }}
				name="CheckoutSuccess"
				component={CheckoutSuccessScreen}
			/>
			<CheckoutStack.Screen
				options={{ cardStyleInterpolator: fixTabNestedStackCardStyleInterpolator }}
				name="CheckoutError"
				component={ErrorScreen}
			/>
		</CheckoutStack.Navigator>
	);
};
