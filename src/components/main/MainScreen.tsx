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

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../AppStackProps';
import {Screen} from '../Screens';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {} & NativeStackScreenProps<AppStackParamList, Screen.MAIN>;

export const MainScreen = observer(({}: Props) => {
	const [Filter, setFilter] = useState('');
	const {
		trackedItemStore: {trackers, currentlyTrackedItem},
	} = useStores();

	const handleChange = (val: string) => {
		setFilter(val);
	};
	const launchesFilteredByTrackerName = useMemo(
		() =>
			trackers.filter(i => {
				if (i.name) {
					return i.name.toLowerCase().includes(Filter.toLowerCase());
				}
			}),
		[Filter, trackers],
	);

	return (
		<>
			<FlatList
				showsVerticalScrollIndicator={false}
				stickyHeaderIndices={[0]}
				keyExtractor={item => item.id}
				data={Filter === '' ? trackers.slice() : launchesFilteredByTrackerName}
				ListHeaderComponent={
					<HeaderContainer>
						{currentlyTrackedItem ? (
							<SafeAreaView mode={'margin'} edges={['top']}>
								<Tracker item={currentlyTrackedItem} />
							</SafeAreaView>
						) : (
							<MainHeader />
						)}
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
		</>
	);
});
const HeaderContainer = styled.View({
	backgroundColor: DarkTheme.colors.background,
});

const MaxFillContainer = styled.View({
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	flexGrow: 1,
});
