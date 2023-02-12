import {TextInput, TextInputProps, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import styled from '@emotion/native';
import {DarkTheme} from '@react-navigation/native';

interface SearchBarInterface extends TextInputProps {
	value: string;
	setValue: (val: string) => void;
}

export const SearchBar = ({value, setValue, ...rest}: SearchBarInterface) => {
	return (
		<SearchContainer>
			<Icon name="search1" size={24} color={'gray'} />
			<StyledInput
				placeholderTextColor={DarkTheme.colors.text}
				value={value}
				onChange={e => setValue(e.nativeEvent.text)}
				{...rest}
			/>
			{value !== '' && (
				<TouchableWithoutFeedback onPress={() => setValue('')}>
					<Icon name="close" size={24} color={'gray'} />
				</TouchableWithoutFeedback>
			)}
		</SearchContainer>
	);
};

const SearchContainer = styled.View({
	flexDirection: 'row',
	marginHorizontal: 10,
	alignItems: 'center',
	justifyContent: 'center',
	paddingHorizontal: 10,
	marginTop: 10,
	height: 45,
	backgroundColor: DarkTheme.colors.card,
	marginBottom: 30,
	borderRadius: 20,
});
const StyledInput = styled(TextInput)({
	color: 'gray',
	marginLeft: 10,
	flex: 1,
});
