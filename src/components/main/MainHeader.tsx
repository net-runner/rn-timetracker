import React from 'react';
import styled from '@emotion/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DarkTheme, useNavigation} from '@react-navigation/native';
import {useStores} from '../../store/RootStore';
import Icon from 'react-native-vector-icons/AntDesign';
import {AppStackParamList} from '../AppStackProps';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screen} from '../Screens';
type Props = {
	text?: string;
};

export const MainHeader = ({text}: Props) => {
	const {trackedItemStore} = useStores();
	const {navigate} = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

	return (
		<HeaderContainer testID={'header'} mode={'margin'} edges={['top']}>
			<RowBetween>
				<MainText>{text ? text : 'Your trackers'}</MainText>
				<AddTrackerButton
					onPress={() => navigate(Screen.TASKCREATE)}
					onLongPress={() => trackedItemStore.cleanTrackedItems()}>
					<Icon name="plus" size={20} />
				</AddTrackerButton>
			</RowBetween>
		</HeaderContainer>
	);
};
const HeaderContainer = styled(SafeAreaView)({});
const MainText = styled.Text({
	color: '#f5f5f5',
	fontSize: 30,
	fontWeight: 'bold',
	textAlign: 'left',
	marginBottom: 20,
	marginTop: 10,
	marginLeft: 10,
});
const RowBetween = styled.View({
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginRight: 20,
});
const AddTrackerButton = styled.TouchableOpacity({
	backgroundColor: DarkTheme.colors.primary,
	height: 50,
	width: 50,
	borderRadius: 20,
	justifyContent: 'center',
	alignItems: 'center',
});
