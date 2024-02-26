import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../spacer/spacer.component';
import { ComponentRestaurantInfo } from '../restaurant/compact-restaurant-info.component';
import { Text } from '../typography/text.component';
import { Card } from 'react-native-paper';

const FavoritesWrapper = styled(Card)`
	z-index: 999999;
	padding: 10px;
	border-radius:15px;
	margin:10px
`;

export const FavoriteBar = ({ favorites, onNavigate }) => {
	if (!favorites.length) {
		return null;
	}
	return (
		<FavoritesWrapper elevation={3}>
			<Spacer variant="left.large">
				<Text variant="caption">Favorites</Text>
			</Spacer>
			<ScrollView horizontal showsVerticalScrollIndicator={false}>
				{favorites.map((restaurant) => {
					const key = restaurant.name.split(' ').join('');
					return (
						<Spacer key={key} position="left" size="medium">
							<TouchableOpacity onPress={() => onNavigate('RestaurantDetails', { restaurant })}>
								<ComponentRestaurantInfo restaurant={restaurant} />
							</TouchableOpacity>
						</Spacer>
					);
				})}
			</ScrollView>
		</FavoritesWrapper>
	);
};
