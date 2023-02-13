import {KeyboardAvoidingView, View} from 'react-native';
import React, {useState} from 'react';
import styled from '@emotion/native';
import {DarkTheme} from '@react-navigation/native';
import {AppStackParamList} from '../AppStackProps';
import {Screen} from '../Screens';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';
import {useStores} from '../../store/RootStore';
import {PriorityIndicator} from './PriorityIndicator';

type Props = {} & NativeStackScreenProps<AppStackParamList, Screen.TASKCREATE>;

export const TrackedItemCreateScreen = ({navigation}: Props) => {
	const {goBack} = navigation;
	const [name, setName] = useState('Task name');
	const [priority, setPriority] = useState(0);

	const {trackedItemStore} = useStores();

	const createTrackedItem = () => {
		trackedItemStore.createTrackedItem(name, priority);
		goBack();
	};

	return (
		<AbsoluteFillContainer>
			<AbsoluteFillCloseModal onPress={goBack} />
			<KeyboardAvoidingView behavior="padding">
				<ModalContainer>
					<RowBetween>
						<View>
							<StyledInput value={name} onChange={e => setName(e.nativeEvent.text)} />
							<PriorityIndicator priority={priority} input onChange={value => setPriority(value)} />
						</View>

						<AddTracker onPress={createTrackedItem}>
							<Icon name="check" size={20} />
						</AddTracker>
					</RowBetween>
				</ModalContainer>
			</KeyboardAvoidingView>
		</AbsoluteFillContainer>
	);
};
const RowBetween = styled.View({
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

const StyledInput = styled.TextInput({
	fontSize: 20,
	color: DarkTheme.colors.text,
});
const AddTracker = styled.TouchableOpacity({
	backgroundColor: DarkTheme.colors.primary,
	height: 50,
	width: 50,
	borderRadius: 20,
	justifyContent: 'center',
	alignItems: 'center',
	alignSelf: 'center',
});
