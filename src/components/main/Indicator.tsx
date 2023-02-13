import styled from '@emotion/native';
import {View} from 'react-native';

export const Indicator = styled(View)<{active: boolean}>(({active}) => ({
	width: 8,
	height: 8,
	borderRadius: 3,
	alignSelf: 'center',
	marginLeft: 6,
	backgroundColor: active ? '#f5f5f5' : 'gray',
}));
