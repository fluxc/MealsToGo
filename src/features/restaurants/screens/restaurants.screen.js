import react, { useContext, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { RestaurantInfoCard } from '../components/restaurant-info-card.component';
import styled from 'styled-components/native';
import { Spacer } from '../../../components/spacer/spacer.component';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import { Search } from '../components/search.component';
import { SafeArea } from '../../../components/utility/safearea.component';
import { FavoritesContext } from '../../../services/favorites/favorites.context';
import { FavoriteBar } from '../../../components/favorites/favorites-bar.component';
import { FadeInView } from '../../../components/animations/fade.animation';
const RestaurantList = styled(FlatList).attrs({
	contentContainerStyle: {
		padding: 16,
	},
})``;

const Loading = styled(ActivityIndicator)`
	margin-left: -25px;
`;
const LoadingContainer = styled.View`
	position: absolute;
	top: 50%;
	left: 50%;
`;

export const RestaurantsScreen = ({ navigation }) => {
	const { isLoading, restaurants } = useContext(RestaurantsContext);
	const { favorites } = useContext(FavoritesContext);
	const [isToggled, setIsToggled] = useState(false);
	return (
		<SafeArea>
			{isLoading && (
				<LoadingContainer>
					<Loading size={50} animating={true} color={MD2Colors.blue300} />
				</LoadingContainer>
			)}
			<Search isFavoritesToggle={isToggled} onFavoritesToggle={() => setIsToggled(!isToggled)} />
			{isToggled && <FavoriteBar onNavigate={navigation.navigate} favorites={favorites} />}

			<RestaurantList
				data={restaurants}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('RestaurantDetails', { restaurant: item });
							}}
						>
							<Spacer position="bottom" size="large">
								<FadeInView>
									<RestaurantInfoCard restaurant={item} />
								</FadeInView>
							</Spacer>
						</TouchableOpacity>
					);
				}}
				keyExtractor={(item) => item.name}
				// eslint-disable-next-line react-native/no-inline-styles
			/>
		</SafeArea>
	);
};
