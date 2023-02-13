import React from 'react';
import styled from '@emotion/native';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {
	text?: string;
};

export const MainHeader = ({text}: Props) => {
	return (
		<HeaderContainer testID={'header'} mode={'margin'} edges={['top']}>
			<MainText>{text ? text : 'Your trackers'}</MainText>
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
