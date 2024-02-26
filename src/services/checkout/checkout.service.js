import createStripe from 'stripe-client';
import { urlEndpoint } from '../../utils/env';

const stripe = createStripe(
	'pk_test_51OmvG0JKcQigJlL3QbH6UGbXQCu258ASUD01LYJ0nzfkQ0zVoYalQ7ZR23AGwSH2ws92gPTUwjhiTXCBwDpYSgYF00xuorCTGO',
);

export const cardTokenRequest = (card) => {
	return stripe.createToken({ card });
};

export const payRequest = (token, amount, name) => {
	const url = urlEndpoint('pay');
	return fetch(`${url}`, {
		body: JSON.stringify({
			token,
			name,
			amount,
		}),
		method: 'POST',
	}).then((res) => {
		if (res.status > 200) {
			return Promise.reject('something went wrong processing your payment');
		}
		return Promise.resolve(res.json());
	});
};
