import {ActivityIndicator} from 'react-native';
import React from 'react';
import {ApolloError} from '@apollo/client';
import {MainHeader} from './main/MainHeader';
import styled from '@emotion/native';
import {Text20} from './Typography';
import {DarkTheme} from '@react-navigation/native';
import {Button} from './Button';

type Props = {
	loading: boolean;
	error: ApolloError | undefined;
	children: React.ReactNode;
	retry: () => void;
};

export const ErrorHandler = ({loading, error, retry, children}: Props) => {
	if (loading) {
		return (
			<>
				<MainHeader />
				<MaxFillContainer>
					<Row>
						<ActivityIndicator color={DarkTheme.colors.text} />
						<HandlerText>Loading...</HandlerText>
					</Row>
				</MaxFillContainer>
			</>
		);
	}

	if (error) {
		return (
			<>
				<MainHeader />
				<MaxFillContainer>
					<HandlerText>Something went wrong</HandlerText>
					<Button title="Retry" onPress={retry} />
				</MaxFillContainer>
			</>
		);
	}

	return <>{children}</>;
};
const Row = styled.View({
	flexDirection: 'row',
});
const HandlerText = styled(Text20)({});
const MaxFillContainer = styled.View({
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	flexGrow: 1,
});
