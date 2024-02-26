import React from 'react';
import { SafeArea } from '../../../components/utility/safearea.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { CartIcon, CartIconContainer } from '../components/chekout.styles';
import { Text } from '../../../components/typography/text.component';

export const CheckoutSuccessScreen = () => {
	return (
		<SafeArea>
			<CartIconContainer>
				<CartIcon icon="check-bold" />
				<Spacer position="top" size="medium" />
				<Text variant="label">Success!</Text>
			</CartIconContainer>
		</SafeArea>
	);
};
