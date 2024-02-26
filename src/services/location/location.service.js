import camelize from 'camelize';
import { isMock, urlEndpoint } from '../../utils/env';

export const locationRequest = (searchTerm) => {
	const url = urlEndpoint('geocode');
	return fetch(`${url}?city=${searchTerm}&mock=${isMock}`).then((res) => {
		return res.json();
	});
};

export const locationTransform = (result) => {
	console.log('Location', result);
	const formattedResponse = camelize(result);
	const { geometry = {} } = formattedResponse.results[0];
	const { lat, lng } = geometry.location;

	return { lat, lng, viewport: geometry.viewport };
};
