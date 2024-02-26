import React from 'react';
import { SafeArea } from '../../../components/utility/safearea.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { CartIcon, CartIconContainer } from '../components/chekout.styles';
import { Text } from '../../../components/typography/text.component';
import { colors } from '../../../infrastructure/theme/colors';

export const ErrorScreen = ({ route }) => {
	const { error = '' } = route.params;
	return (
		<SafeArea>
			<CartIconContainer>
				<CartIcon icon="close" bg={colors.ui.error} />
				<Spacer position="top" size="medium" />
				<Text variant="label">{error}</Text>
			</CartIconContainer>
		</SafeArea>
	);
};
