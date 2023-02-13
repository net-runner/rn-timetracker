import React from 'react';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import styled from '@emotion/native';
import {DarkTheme} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';

type Props = {
	isItemTracked: boolean;
	onPress: () => void;
};
export const StartButton = observer(({isItemTracked, onPress}: Props) => {
	return (
		<StartButtonContainer active={isItemTracked} onPress={onPress}>
			<AwesomeIcon name={isItemTracked ? 'pause' : 'play'} size={30} />
		</StartButtonContainer>
	);
});
const StartButtonContainer = styled.TouchableOpacity<{active: boolean}>(({active}) => ({
	backgroundColor: active ? 'gray' : DarkTheme.colors.primary,
	height: 60,
	width: 60,
	borderRadius: 20,
	justifyContent: 'center',
	alignItems: 'center',
}));
