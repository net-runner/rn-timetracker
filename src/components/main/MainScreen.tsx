import {FlatList} from 'react-native';
import React, {useMemo, useState} from 'react';
import styled from '@emotion/native';
import {useQuery} from '@apollo/client';
import {MainHeader} from './MainHeader';
import {GET_LAUNCHES} from '../../graphql/getLaunches';
import {LaunchItem} from './LaunchItem';
import {GetLaunchesQuery, GetLaunchesQueryVariables} from '../../generatedGraphQL/graphql';
import {ErrorHandler} from '../ErrorHandler';
import {Button} from '../Button';
import {SearchBar} from './SearchBar';
import {Text20} from '../Typography';

export const MainScreen = () => {
	const [offset, setOffset] = useState(1);
	const [Filter, setFilter] = useState('');

	const {refetch, loading, error, data} = useQuery<GetLaunchesQuery, GetLaunchesQueryVariables>(GET_LAUNCHES, {
		fetchPolicy: 'cache-first',
	});

	const reversedData = useMemo(() => {
		if (data?.launches) {
			return [...data.launches];
		}
		return [];
	}, [data?.launches]);

	const filteredData = useMemo(() => {
		return reversedData.slice(0, 20 * offset);
	}, [reversedData, offset]);
	const handleChange = (val: string) => {
		setFilter(val);
	};
	const launchesFilteredByMissionName = useMemo(
		() =>
			reversedData.filter(i => {
				if (i?.mission_name) {
					return i?.mission_name.toLowerCase().includes(Filter.toLowerCase());
				}
			}),
		[Filter, reversedData],
	);

	return (
		<ErrorHandler loading={loading} error={error} retry={refetch}>
			<FlatList
				testID={'flaslist'}
				data={Filter === '' ? filteredData : launchesFilteredByMissionName}
				ListHeaderComponent={
					<>
						<MainHeader />
						<SearchBar placeholder="Search launches..." value={Filter} setValue={handleChange} />
					</>
				}
				renderItem={({item}) => <LaunchItem item={item} />}
				ListFooterComponent={
					Filter === '' ? (
						<StyledButton
							testID={'load-more-launches'}
							onPress={() => {
								setOffset(offset => offset + 1);
							}}
							title="Load more launches"
						/>
					) : null
				}
				ListEmptyComponent={
					<MaxFillContainer>
						<Text20>No results</Text20>
					</MaxFillContainer>
				}
			/>
		</ErrorHandler>
	);
};

const StyledButton = styled(Button)({
	marginBottom: 60,
});
const MaxFillContainer = styled.View({
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	flexGrow: 1,
});
