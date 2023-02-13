import React from 'react';
import styled from '@emotion/native';
import {DarkTheme} from '@react-navigation/native';
import {AppStackParamList} from '../AppStackProps';
import {Screen} from '../Screens';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';
import {useStores} from '../../store/RootStore';
import {Tracker} from './Tracker';
import moment from 'moment';
import {Text14} from '../Typography';

type Props = {} & NativeStackScreenProps<AppStackParamList, Screen.TASKINFO>;

export const TrackedItemScreen = ({route, navigation}: Props) => {
	const item = route.params.item;
	const {goBack} = navigation;

	const {trackedItemStore} = useStores();

	const deleteTrackedItem = () => {
		trackedItemStore.delateTrackedItem(item.id);
		goBack();
	};

	return (
		<AbsoluteFillContainer>
			<AbsoluteFillCloseModal onPress={goBack} />
			<ModalContainer>
				<Tracker item={item} info />
				<TotalTimeText>
					Total tracked time: {moment.utc((item.elapsed + item.intervalCounter) * 1000).format('HH:mm:ss')}
				</TotalTimeText>
				<RemoveTracker onPress={deleteTrackedItem}>
					<Icon name="delete" size={20} />
				</RemoveTracker>
			</ModalContainer>
		</AbsoluteFillContainer>
	);
};
const TotalTimeText = styled(Text14)({
	alignSelf: 'center',
	marginVertical: 10,
});
const AbsoluteFillContainer = styled.View({
	flex: 1,
	flexGrow: 1,
	justifyContent: 'flex-end',
	backgroundColor: 'transparent',
});

const AbsoluteFillCloseModal = styled.Pressable({
	flexGrow: 1,
});

const ModalContainer = styled.View({
	minHeight: '20%',
	backgroundColor: DarkTheme.colors.background,
	borderTopLeftRadius: 20,
	borderTopRightRadius: 20,
	borderTopWidth: 3,
	borderLeftWidth: 3,
	borderRightWidth: 3,
	borderTopColor: DarkTheme.colors.border,
	borderLeftColor: DarkTheme.colors.border,
	borderRightColor: DarkTheme.colors.border,
	padding: 20,
});

const RemoveTracker = styled.TouchableOpacity({
	backgroundColor: '#FF7377',
	height: 50,
	width: 50,
	borderRadius: 20,
	justifyContent: 'center',
	alignItems: 'center',
	alignSelf: 'center',
});
