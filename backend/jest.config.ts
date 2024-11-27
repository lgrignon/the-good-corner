
import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    setupFilesAfterEnv: [
        './src/__tests_mockTypeorm-config.ts'
    ],
    testPathIgnorePatterns: ["/node_modules/", "/out/"]
};

export default config;