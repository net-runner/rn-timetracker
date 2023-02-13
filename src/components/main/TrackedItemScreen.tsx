import React from 'react';
import styled from '@emotion/native';
import {DarkTheme} from '@react-navigation/native';
import {AppStackParamList} from '../AppStackProps';
import {Screen} from '../Screens';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';
import {useStores} from '../../store/RootStore';
import {Tracker} from './Tracker';

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
				<AddTracker onPress={deleteTrackedItem}>
					<Icon name="delete" size={20} />
				</AddTracker>
			</ModalContainer>
		</AbsoluteFillContainer>
	);
};

const Row = styled.View({
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',

	borderBottomColor: '#ddd',
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
	borderRadius: 20,
	borderTopWidth: 3,
	borderLeftWidth: 3,
	borderRightWidth: 3,
	borderTopColor: DarkTheme.colors.border,
	borderLeftColor: DarkTheme.colors.border,
	borderRightColor: DarkTheme.colors.border,
	padding: 20,
});

const AddTracker = styled.TouchableOpacity({
	backgroundColor: '#FF7377',
	height: 50,
	width: 50,
	borderRadius: 20,
	justifyContent: 'center',
	alignItems: 'center',
	alignSelf: 'center',
});
