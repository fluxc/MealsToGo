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

const firebaseConfig = {
	apiKey: 'AIzaSyBnBPJcQKpCKSUcNFrw5C1ed2fcDcC4iDo',
	authDomain: 'mealstogo-24008.firebaseapp.com',
	projectId: 'mealstogo-24008',
	storageBucket: 'mealstogo-24008.appspot.com',
	messagingSenderId: '791468113227',
	appId: '1:791468113227:web:1952932461622f0091fcce',
};
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
