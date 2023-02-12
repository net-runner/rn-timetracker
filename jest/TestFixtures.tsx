import {ApolloProvider} from '@apollo/client';
import {render as rtlRender} from '@testing-library/react-native';

import React, {FunctionComponentElement, PropsWithChildren} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createMockClient} from './__mocks__/apolloClient';

const mockClient = createMockClient();

const render = (ui: any, {...options} = {}) => {
	const Wrapper = ({children}: PropsWithChildren<any>): FunctionComponentElement<any> => (
		<ApolloProvider client={mockClient}>
			<SafeAreaProvider
				initialMetrics={{
					// without initialMetrics SafeAreaProvider does not render any children
					insets: {bottom: 0, top: 0, left: 0, right: 0},
					frame: {x: 0, y: 0, width: 0, height: 0},
				}}>
				{children}
			</SafeAreaProvider>
		</ApolloProvider>
	);

	return rtlRender(ui, {wrapper: Wrapper, ...options});
};

export * from '@testing-library/react-native';
// override React Testing Library's render with our own
export {render};
