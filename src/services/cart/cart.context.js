import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from '../authentication/authentication.context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();
export const CardContextProvider = ({ children }) => {
	const { user } = useContext(AuthenticationContext);
	const [cart, setCart] = useState([]);
	const [restaurant, setRestaurant] = useState(null);
	const [sum, setSum] = useState(0);

	const saveCart = async (rst, crt, uid) => {
		try {
			const jsonValue = JSON.stringify({ restaurant: rst, cart: crt });
			await AsyncStorage.setItem(`@cart-${uid}`, jsonValue);
		} catch (error) {
			console.log(error);
		}
	};
	const loadCart = async (uid) => {
		try {
			const value = await AsyncStorage.getItem(`@cart-${uid}`);
			if (value !== null) {
				const { restaurant: rst, cart: crt } = JSON.parse(value);
				setRestaurant(rst);
				setCart(crt);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (user && user.uid) {
			loadCart(user.uid);
		}
	}, [user]);

	useEffect(() => {
		if (user && user.uid) {
			saveCart(restaurant, cart, user.uid);
		}
	}, [restaurant, cart, user]);

	useEffect(() => {
		if (!cart.length) {
			setSum(0);
			return;
		}
		const newSum = cart.reduce((acc, { price }) => {
			return (acc += price);
		}, 0);
		setSum(newSum);
	}, [cart]);

	const add = (item, rst) => {
		if (!restaurant || restaurant.placeId !== rst.placeId) {
			setRestaurant(rst);
			setCart([item]);
		} else {
			setCart([...cart, item]);
		}
	};

	const clear = () => {
		setCart([]);
		setRestaurant(null);
	};
	return (
		<CartContext.Provider
			value={{
				addToCart: add,
				clearCart: clear,
				restaurant,
				cart,
				sum,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};