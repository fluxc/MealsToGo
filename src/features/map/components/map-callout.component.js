import react from 'react';
import { ComponentRestaurantInfo } from '../../../components/restaurant/compact-restaurant-info.component';

export const MapCallout = ({ restaurant }) => {
	return <ComponentRestaurantInfo isMap restaurant={restaurant} />;
};
