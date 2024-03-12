import { initializeApp } from 'firebase/app';
import {
	initializeAuth,
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	getReactNativePersistence,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from '../../utils/env';

let loaded = null;
let auth = null;
if (!loaded) {
	const app = initializeApp(firebaseConfig);

	auth = initializeAuth(app, {
		persistence: getReactNativePersistence(ReactNativeAsyncStorage),
	});
	loaded = true;
}

export const loginRequest = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const createUserRequest = (email, password) => {
	return createUserWithEmailAndPassword(auth, email, password);
};

export const authStateChange = () => {
	return new Promise((resolve, reject) => {
		onAuthStateChanged(
			auth,
			(user) => {
				resolve(user);
			},
			(error) => {
				reject(error);
			},
		);
	});
};

export const logOut = () => {
	return signOut(auth);
};
