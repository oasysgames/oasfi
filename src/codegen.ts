import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://graph.mainnet.oasys.games/subgraphs/name/oasys/staking',
  documents: ['src/**/*.ts'],
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
