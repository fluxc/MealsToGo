import { MapScreen } from '../../features/map/screens/map.screen';
import { CheckoutScreen } from '../../features/checkout/screens/checkout.screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RestaurantsNavigator } from './restaurants.navigator';
import { FavoritesContextProvider } from '../../services/favorites/favorites.context';
import { LocationContextProvider } from '../../services/location/location.context';
import { RestaurantsContextProvider } from '../../services/restaurants/restaurants.context';
import { SettingsNavigator } from './settings.navigator';
import { CardContextProvider } from '../../services/cart/cart.context';
import { CheckoutNavigator } from './checkout.navigator';
import { colors } from '../theme/colors';
const TAB_ICON = {
	Restaurants: 'restaurant',
	Map: 'map',
	Checkout: 'cart',
	Settings: 'settings',
};

const ScreenOptions = ({ route }) => {
	const iconName = TAB_ICON[route.name];
	return {
		tabBarIcon: ({ size, color }) => <Ionicons name={iconName} size={size} color={color} />,
		tabBarActiveTintColor: colors.brand.primary,
		tabBarInactiveTintColor: colors.brand.muted,
		headerShown: false,
	};
};

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
	return (
		<FavoritesContextProvider>
			<LocationContextProvider>
				<RestaurantsContextProvider>
					<CardContextProvider>
						<Tab.Navigator screenOptions={ScreenOptions}>
							<Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
							<Tab.Screen name="Checkout" component={CheckoutNavigator} />
							<Tab.Screen name="Map" component={MapScreen} />
							<Tab.Screen name="Settings" component={SettingsNavigator} />
						</Tab.Navigator>
					</CardContextProvider>
				</RestaurantsContextProvider>
			</LocationContextProvider>
		</FavoritesContextProvider>
	);
};
