import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { AccountScreen } from '../../features/account/screens/account.screen';
import { LoginScreen } from '../../features/account/screens/login.screen';
import { RegisterScreen } from '../../features/account/screens/register.screen';

const Stack = createStackNavigator();

const ScreenOptions = () => {
	return {
		headerShown: false,
	};
};

export const AccountNavigator = () => {
	return (
		<Stack.Navigator screenOptions={ScreenOptions}>
			<Stack.Screen name="Main" component={AccountScreen} />
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Register" component={RegisterScreen} />
		</Stack.Navigator>
	);
};
