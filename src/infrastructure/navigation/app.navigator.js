import { MapScreen } from '../../features/map/screens/map.screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RestaurantsNavigator } from './restaurants.navigator';
import { FavoritesContextProvider } from '../../services/favorites/favorites.context';
import { LocationContextProvider } from '../../services/location/location.context';
import { RestaurantsContextProvider } from '../../services/restaurants/restaurants.context';
import { SettingsNavigator } from './settings.navigator';
const TAB_ICON = {
	Restaurants: 'restaurant',
	Map: 'map',
	Settings: 'settings',
};

const ScreenOptions = ({ route }) => {
	const iconName = TAB_ICON[route.name];
	return {
		tabBarIcon: ({ size, color }) => <Ionicons name={iconName} size={size} color={color} />,
		tabBarActiveTintColor: 'tomato',
		tabBarInactiveTintColor: 'gray',
		headerShown: false,
	};
};

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
	return (
		<FavoritesContextProvider>
			<LocationContextProvider>
				<RestaurantsContextProvider>
					<Tab.Navigator screenOptions={ScreenOptions}>
						<Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
						<Tab.Screen name="Map" component={MapScreen} />
						<Tab.Screen name="Settings" component={SettingsNavigator} />
					</Tab.Navigator>
				</RestaurantsContextProvider>
			</LocationContextProvider>
		</FavoritesContextProvider>
	);
};
