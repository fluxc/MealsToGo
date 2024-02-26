import React, { useState, createContext, useEffect } from 'react';
import { locationRequest, locationTransform } from './location.service';

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
	const [location, setLocation] = useState();
	const [keyword, setKeyword] = useState('San Francisco');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const onSearch = (searchKeyword) => {
		setKeyword(searchKeyword);
		setIsLoading(true);
	};

	useEffect(() => {
		if (!keyword.length) {
			return;
		}
		locationRequest(keyword?.toLowerCase())
			.then(locationTransform)
			.then((result) => {
				setError(null);
				setIsLoading(false);
				setLocation(result);
			})
			.catch((err) => {
				setIsLoading(false);
				setError(err);
			});
	}, [keyword]);

	return (
		<LocationContext.Provider value={{ search: onSearch, keyword, location, isLoading, error }}>
			{children}
		</LocationContext.Provider>
	);
};
