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
		<StartButtonContainer testID={'start-button'} active={isItemTracked} onPress={onPress}>
			<StyledIcon name={isItemTracked ? 'pause' : 'play'} size={24} />
		</StartButtonContainer>
	);
});
const StyledIcon = styled(AwesomeIcon)({
	marginLeft: 2,
});
const StartButtonContainer = styled.TouchableOpacity<{active: boolean}>(({active}) => ({
	backgroundColor: active ? 'gray' : DarkTheme.colors.primary,
	height: 50,
	width: 50,
	borderRadius: 20,
	justifyContent: 'center',
	alignItems: 'center',
}));
