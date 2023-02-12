import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Text} from 'react-native';
import {ApolloError} from '@apollo/client';
import {ErrorHandler} from './ErrorHandler';

describe('ErrorHandler', () => {
	it('renders children when there is no error or loading', () => {
		const children = <Text>Test</Text>;
		const {getByText} = render(
			<ErrorHandler loading={false} error={undefined} retry={() => {}}>
				{children}
			</ErrorHandler>,
		);
		expect(getByText('Test')).toBeTruthy();
	});

	it('renders the loading spinner when loading is true', () => {
		const children = <Text>Test</Text>;
		const {getByText} = render(
			<ErrorHandler loading={true} error={undefined} retry={() => {}}>
				{children}
			</ErrorHandler>,
		);
		expect(getByText('Loading...')).toBeTruthy();
	});

	it('renders the error message and retry button when there is an error', () => {
		const children = <Text>Test</Text>;
		const error = new ApolloError({});
		const retry = jest.fn();
		const {getByText} = render(
			<ErrorHandler loading={false} error={error} retry={retry}>
				{children}
			</ErrorHandler>,
		);

		const button = getByText('Retry');
		expect(getByText('Something went wrong')).toBeTruthy();
		expect(button).toBeTruthy();
		fireEvent.press(button);

		expect(retry).toHaveBeenCalled();
	});
});
