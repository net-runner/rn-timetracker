import {Pressable, View} from 'react-native';
import React from 'react';
import styled from '@emotion/native';
import {DarkTheme, useNavigation} from '@react-navigation/native';
import {Text14, Text16Bold} from '../Typography';
import Icon from 'react-native-vector-icons/AntDesign';
import {AppStackProps} from '../AppStackProps';
import {Screen} from '../Screens';
import {Launch} from '../Launch';
import {AnimatePresence, MotiView} from 'moti';

type Props = {
	item: Launch;
};

export const LaunchItem = ({item}: Props) => {
	const {navigate} = useNavigation<AppStackProps>();
	const date = new Date(item?.launch_date_unix * 1000);
	const dayMonthYear = date.getDay() + 1 + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
	return (
		<Pressable testID={'launchItem'} onPress={() => navigate(Screen.DETAILS, {item})}>
			<AnimatePresence>
				<ItemContainer
					from={{
						opacity: 0,
						scale: 0.9,
					}}
					animate={{
						opacity: 1,
						scale: 1,
					}}>
					<RowBetween>
						<InfoContainer>
							<MissionName>{item?.mission_name}</MissionName>
							<Row>
								<RocketIcon name="rocket1" color={'#f5f5f5'} />
								<Text14>{item?.rocket?.rocket_name}</Text14>
								<Indicator active={item?.rocket?.rocket?.active || false} />
							</Row>
						</InfoContainer>

						<DateContainer>
							<Row>
								<Text14>{dayMonthYear}</Text14>
								<StyledIcon name="calendar" color={'#f5f5f5'} />
							</Row>
							<Row>
								<Text14>{date.toTimeString().split(' ')[0]}</Text14>
								<StyledIcon name="clockcircleo" color={'#f5f5f5'} />
							</Row>
						</DateContainer>
					</RowBetween>
				</ItemContainer>
			</AnimatePresence>
		</Pressable>
	);
};
const Indicator = styled(View)<{active: boolean}>(({active}) => ({
	width: 6,
	height: 6,
	borderRadius: 3,
	alignSelf: 'center',
	marginLeft: 4,
	backgroundColor: active ? '#f5f5f5' : 'gray',
}));
const RocketIcon = styled(Icon)({
	marginRight: 5,
	marginTop: 2,
});
const StyledIcon = styled(Icon)({
	marginHorizontal: 10,
	marginTop: 2,
});
const InfoContainer = styled.View({
	width: '60%',
});
const MissionName = styled(Text16Bold)({});
const Row = styled.View({
	flexDirection: 'row',
	marginTop: 5,
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
	width: '90%',
	alignSelf: 'center',
	minHeight: 80,
	marginBottom: 20,
	paddingVertical: 10,
	paddingHorizontal: 15,
	backgroundColor: DarkTheme.colors.card,
});
