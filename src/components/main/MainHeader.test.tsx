import React from 'react';
import {render} from '../../../jest/TestFixtures';

import {MainHeader} from './MainHeader';

describe('MainHeader', () => {
	it('renders the default text "Your trackers"', () => {
		const {getByText} = render(<MainHeader />);

		expect(getByText('Your trackers')).toBeTruthy();
	});

	it('renders the provided text', () => {
		const {getByText} = render(<MainHeader text="Test Header" />);
		expect(getByText('Test Header')).toBeTruthy();
	});
});
