import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        environment: 'node',
        include: ['tests/**/*.test.ts'],
        globals: true,
    },
    resolve: {
        alias: {
            '@errors': path.resolve(__dirname, 'src/errors'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@modules': path.resolve(__dirname, 'src/modules'),
        },
    },
});
