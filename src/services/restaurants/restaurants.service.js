import camelize from 'camelize';
import { isMock, urlEndpoint } from '../../utils/env';
export const restaurantsRequest = (location = '37.7749295,-122.4194155') => {
	const url = urlEndpoint('placesNearBy');
	return fetch(`${url}?location=${location}&mock=${isMock}`).then((res) => {
		return res.json();
	});
};

export const restaurantsTransform = ({ results = [] }) => {
	console.log('Restaurants', results);
	const mappedResults = results.map((restaurant) => {
		return {
			...restaurant,
			address: restaurant.vicinity,
			isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
			isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
		};
	});
	return camelize(mappedResults);
};
