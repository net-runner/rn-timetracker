module.exports = {
	preset: 'react-native',
	cacheDirectory: './jest/cache',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	coverageThreshold: {
		global: {
			statements: 80,
		},
	},
	coverageDirectory: './jest/coverage',
	transformIgnorePatterns: [
		'node_modules/(?!(' +
			'@react-native|' +
			'react-native|' +
			'react-native-vector-icons|' +
			'moti|' +
			'@react-navigation|)/)',
	],
	moduleNameMapper: {
		'react-dom': 'react-native',
	},
};
