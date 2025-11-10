import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {

        baseUrl: 'http://localhost:5173',

        env: {
            apiUrl: 'http://localhost:5000/api',
        },

        setupNodeEvents(on, config) {
        },
    },
});