import styled from '@emotion/native';
import {DarkTheme} from '@react-navigation/native';

export const Text20 = styled.Text({
	fontSize: 20,
	color: DarkTheme.colors.text,
});
export const Text20Bold = styled(Text20)({
	fontWeight: 'bold',
});

export const Text40 = styled(Text20)({
	fontSize: 40,
});

export const Text16 = styled(Text20)({
	fontSize: 16,
});

export const Text16Bold = styled(Text16)({
	fontSize: 16,
	fontWeight: 'bold',
});

export const Text14 = styled(Text20)({
	fontSize: 14,
});

export const Text14Bold = styled(Text14)({
	fontSize: 14,
	fontWeight: 'bold',
});
