import React, { useState, createContext, useEffect } from 'react';
import { logOut, authStateChange, createUserRequest, loginRequest } from './authentication.service';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState(null);
	const [error, setError] = useState();

	authStateChange()
		.then((u) => {
			if (u) {
				setUser(u);
				setIsLoading(false);
			} else {
				setIsLoading(false);
			}
		})
		.catch(() => {
			return;
		});

	const onLogin = (email, password) => {
		setIsLoading(true);
		loginRequest(email, password)
			.then((u) => {
				setUser(u);
				setIsLoading(false);
			})
			.catch((e) => {
				setIsLoading(false);
				setError(e?.message);
			});
	};

	const onRegister = (email, password, repeatedPassword) => {
		if (password !== repeatedPassword) {
			setError('Error: Passwords do not match');
			return;
		}
		setIsLoading(true);
		createUserRequest(email, password)
			.then((u) => {
				setUser(u);
				setIsLoading(false);
			})
			.catch((e) => {
				setIsLoading(false);
				setError(e?.message);
			});
	};

	const onLogout = () => {
		logOut()
			.then(() => {
				setUser(null);
			})
			.catch((er) => {
				console.log(er);
				return;
			});
	};

	return (
		<AuthenticationContext.Provider
			value={{
				isAuthenticated: !!user,
				user,
				isLoading,
				error,
				onLogin,
				onRegister,
				onLogout,
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	);
};
