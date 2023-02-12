import React from 'react';
import {render} from '../../../jest/TestFixtures';

import {MainHeader} from './MainHeader';

describe('MainHeader', () => {
	it('renders the default text "SpaceX Launches"', () => {
		const {getByText} = render(<MainHeader />);

		expect(getByText('SpaceX Launches')).toBeTruthy();
	});

	it('renders the provided text', () => {
		const {getByText} = render(<MainHeader text="Test Header" />);
		expect(getByText('Test Header')).toBeTruthy();
	});
});
