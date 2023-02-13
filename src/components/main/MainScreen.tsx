import {FlatList} from 'react-native';
import React, {useMemo, useState} from 'react';
import styled from '@emotion/native';
import {MainHeader} from './MainHeader';
import {SearchBar} from './SearchBar';
import {Text20} from '../Typography';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../store/RootStore';
import {Tracker} from './Tracker';
import {DarkTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../AppStackProps';
import {Screen} from '../Screens';

type Props = {} & NativeStackScreenProps<AppStackParamList, Screen.MAIN>;

export const MainScreen = observer(({navigation}: Props) => {
	const [Filter, setFilter] = useState('');
	const {trackedItemStore} = useStores();

	const handleChange = (val: string) => {
		setFilter(val);
	};
	const launchesFilteredByTrackerName = useMemo(
		() =>
			trackedItemStore.trackers.filter(i => {
				if (i.name) {
					return i.name.toLowerCase().includes(Filter.toLowerCase());
				}
			}),
		[Filter, trackedItemStore.trackers],
	);
	return (
		<>
			<FlatList
				showsVerticalScrollIndicator={false}
				stickyHeaderIndices={[0]}
				testID={'flaslist'}
				data={Filter === '' ? trackedItemStore.trackers : launchesFilteredByTrackerName}
				ListHeaderComponent={
					<HeaderContainer>
						<MainHeader />
						<SearchBar placeholder="Search trackers..." value={Filter} setValue={handleChange} />
					</HeaderContainer>
				}
				renderItem={({item}) => <Tracker item={item} />}
				ListEmptyComponent={
					<MaxFillContainer>
						<Text20>No events tracked</Text20>
					</MaxFillContainer>
				}
			/>
			<AddTrackerButton
				onPress={() => navigation.navigate(Screen.TASKCREATE)}
				onLongPress={() => trackedItemStore.cleanTrackedItems()}>
				<Icon name="plus" size={20} />
			</AddTrackerButton>
		</>
	);
});
const HeaderContainer = styled.View({
	backgroundColor: DarkTheme.colors.background,
});
const AddTrackerButton = styled.TouchableOpacity({
	backgroundColor: DarkTheme.colors.primary,
	height: 50,
	width: 50,
	borderRadius: 20,
	justifyContent: 'center',
	alignItems: 'center',
	position: 'absolute',
	bottom: 70,
	right: 20,
});

const MaxFillContainer = styled.View({
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	flexGrow: 1,
});
