import {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'https://spacex-production.up.railway.app/',
	documents: ['src/graphql/*.ts'],
	generates: {
		'./src/generatedGraphQL/': {
			preset: 'client',
			plugins: [],
			presetConfig: {
				gqlTagName: 'gql',
			},
		},
	},
	ignoreNoDocuments: true,
};

export default config;
