import React, { useContext, useEffect, useState } from 'react';
import { CreditCardInput } from '../components/credit-card.component';
import { SafeArea } from '../../../components/utility/safearea.component';
import { CartContext } from '../../../services/cart/cart.context';
import { Text } from '../../../components/typography/text.component';
import {
	CartIcon,
	CartIconContainer,
	ClearButton,
	NameInput,
	PayButton,
	PaymentProcessing,
} from '../components/chekout.styles';
import { RestaurantInfoCard } from '../../restaurants/components/restaurant-info-card.component';
import { ScrollView } from 'react-native';
import { Spacer } from '../../../components/spacer/spacer.component';
import { List } from 'react-native-paper';
import { payRequest } from '../../../services/checkout/checkout.service';

export const CheckoutScreen = ({ navigation }) => {
	const { cart, restaurant, sum, clearCart } = useContext(CartContext);
	const [name, setName] = useState('');
	const [card, setCard] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const onPay = () => {
		navigation.navigate('CheckoutSuccess');
		// if (!card || !card.id) {
		// 	navigation.navigate('CheckoutError', { error: 'Please fill in a valid credit card' });
		// 	return;
		// }
		// setIsLoading(true);
		// payRequest(card.id, sum, name)
		// 	.then((result) => {
		// 		setIsLoading(false);
		// 		clearCart();
		// 		console.log('success', result);
		// 		navigation.navigate('CheckoutSuccess');
		// 	})
		// 	.catch((e) => {
		// 		setIsLoading(false);
		// 		console.log('Error', e);
		// 		navigation.navigate('CheckoutError', { error: e });

		// 	});
	};

	if (!cart.length || !restaurant) {
		return (
			<SafeArea>
				<CartIconContainer>
					<CartIcon icon="cart-off" />
					<Text>Your Cart is Empty</Text>
				</CartIconContainer>
			</SafeArea>
		);
	}
	return (
		<SafeArea>
			<RestaurantInfoCard restaurant={restaurant} />
			{isLoading && <PaymentProcessing />}
			<ScrollView>
				<Spacer position="left" size="medium">
					<Spacer position="top" size="large">
						<Text>Your Order</Text>
						<List.Section>
							{cart.map(({ item, price }, index) => {
								return <List.Item key={index} title={`${item} - ${price / 100}`} />;
							})}
						</List.Section>
						<Text>Total: {sum / 100}</Text>
					</Spacer>
				</Spacer>
				<NameInput label="Name" mode="outlined" value={name} onChangeText={(t) => setName(t)} />
				{name && (
					<Spacer position="left" size="medium">
						<CreditCardInput
							name={name}
							onSuccess={setCard}
							onError={() => {
								navigation.navigate('CheckoutError', {
									error: 'Something went wrong processing your credit card',
								});
							}}
						/>
					</Spacer>
				)}
				<Spacer position="top" size="xxl" />
				<PayButton disabled={isLoading} icon="cash" mode="contained" onPress={onPay}>
					Pay
				</PayButton>
				<Spacer position="top" size="medium" />
				<ClearButton disabled={isLoading} icon="cart-off" mode="contained" onPress={clearCart}>
					Clear Cart
				</ClearButton>
			</ScrollView>
		</SafeArea>
	);
};
