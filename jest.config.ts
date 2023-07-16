import { defaults } from 'jest-config';

const config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
};

export default config;