module.exports = {
	root: true,
	extends: ['@react-native-community', 'prettier'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'prettier'],
	env: {
		'jest/globals': true,
	},
	rules: {
		'no-shadow': 'off',
		'react-in-jsx-scope': 'off',
		'eslint-comments/no-unlimited-disable': 'off',
	},
	ignorePatterns: ['jest/*'],
	globals: {
		JSX: true,
	},
};
