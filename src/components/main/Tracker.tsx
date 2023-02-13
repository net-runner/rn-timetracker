import {Pressable} from 'react-native';
import React from 'react';
import styled from '@emotion/native';
import {DarkTheme, useNavigation} from '@react-navigation/native';
import {Text14, Text16, Text16Bold} from '../Typography';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {AppStackProps} from '../AppStackProps';
import {Screen} from '../Screens';

import {AnimatePresence, MotiView} from 'moti';
import {TrackedItem} from './TrackedItem';
import {PriorityIndicator} from './PriorityIndicator';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../store/RootStore';
import {StartButton} from './StartButton';
import moment from 'moment';

type Props = {
	item: TrackedItem;
	info?: boolean;
};

export const Tracker = observer(({item, info = false}: Props) => {
	const {trackedItemStore} = useStores();

	const isItemTracked = trackedItemStore.isItemTracked(item.id);
	const isTracking = trackedItemStore.isTracking;
	const showButton = isItemTracked || !isTracking;

	const {navigate} = useNavigation<AppStackProps>();

	const handlePlayButtonPress = () => {
		if (isItemTracked) {
			trackedItemStore.stopTracking(item);
		} else {
			trackedItemStore.startTracking(item);
		}
	};
	const elapsed = (item.elapsed + item.intervalCounter) * 1000;
	const elapsedFormatted = moment.utc(elapsed).format('HH:mm:ss');

	return (
		<Pressable testID={'launchItem'} disabled={info} onPress={() => navigate(Screen.TASKINFO, {item})}>
			<AnimatePresence>
				<ItemContainer
					from={{
						opacity: 0,
						scale: 0.9,
					}}
					animate={{
						opacity: showButton ? 1 : 0.5,
						scale: 1,
					}}>
					<RowBetween>
						<InfoContainer>
							<MissionName>{item.name}</MissionName>
							<PriorityIndicator priority={item.priority} />
						</InfoContainer>
						{!info && (
							<PlainRow>
								<StyledIcon name="hourglass" color={'#f5f5f5'} size={16} />
								<Text16>{elapsedFormatted}</Text16>
							</PlainRow>
						)}

						{!info && showButton && <StartButton isItemTracked={isItemTracked} onPress={handlePlayButtonPress} />}
						{info && (
							<DateContainer>
								<Row>
									<Text14>{moment(item.createdAt).format('DD/MM/YYYY')}</Text14>
									<StyledIcon name="calendar" color={'#f5f5f5'} />
								</Row>
								<Row>
									<Text14>{moment(item.createdAt).format('HH:mm')}</Text14>
									<StyledIcon name="clockcircleo" color={'#f5f5f5'} />
								</Row>
							</DateContainer>
						)}
					</RowBetween>
				</ItemContainer>
			</AnimatePresence>
		</Pressable>
	);
});

const StyledIcon = styled(AntIcon)({
	marginHorizontal: 10,
	marginTop: 2,
});
const InfoContainer = styled.View({
	width: '45%',
});
const MissionName = styled(Text16Bold)({});
const Row = styled.View({
	flexDirection: 'row',
	marginTop: 5,
});
const PlainRow = styled(Row)({
	margin: 0,
	marginRight: 20,
	justifyContent: 'center',
});
const RowBetween = styled.View({
	flexDirection: 'row',
	justifyContent: 'space-between',
	height: '100%',
	flex: 1,
	alignItems: 'center',
});
const DateContainer = styled.View({
	alignItems: 'flex-end',
	justifyContent: 'center',
	flex: 1,
});

const ItemContainer = styled(MotiView)({
	borderRadius: 10,
	width: '95%',
	alignSelf: 'center',
	minHeight: 80,
	marginBottom: 20,
	paddingVertical: 10,
	paddingHorizontal: 15,
	backgroundColor: DarkTheme.colors.card,
});
