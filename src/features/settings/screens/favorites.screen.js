import react, { useContext, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { SafeArea } from '../../../components/utility/safearea.component';
import { FavoritesContext } from '../../../services/favorites/favorites.context';
import { Spacer } from '../../../components/spacer/spacer.component';
import { RestaurantInfoCard } from '../../restaurants/components/restaurant-info-card.component';
import { Text } from '../../../components/typography/text.component';

const RestaurantList = styled(FlatList).attrs({
	contentContainerStyle: {
		padding: 16,
	},
})``;

const CenterWrapper = styled.View`
	margin-top: 32px;
	align-items: center;
`;

export const FavoritesScreen = ({ navigation }) => {
	const { favorites } = useContext(FavoritesContext);
	return (
		<SafeArea>
			{!favorites.length ? (
				<CenterWrapper>
					<Text center>No favorites found</Text>
				</CenterWrapper>
			) : (
				<RestaurantList
					data={favorites}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('FavoritesDetails', { restaurant: item });
								}}
							>
								<Spacer position="bottom" size="large">
									<RestaurantInfoCard restaurant={item} />
								</Spacer>
							</TouchableOpacity>
						);
					}}
					keyExtractor={(item) => item.name}
					// eslint-disable-next-line react-native/no-inline-styles
				/>
			)}
		</SafeArea>
	);
};
