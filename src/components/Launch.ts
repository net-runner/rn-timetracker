import {GetLaunchesQuery} from '../generatedGraphQL/graphql';

type ArrayElement<ArrayType> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type Launch = ArrayElement<GetLaunchesQuery['launches']>;
