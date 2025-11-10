import { jest, describe, test, expect, beforeAll } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';

describe('API Component Testing (Auth)', () => {
    const seedUserEmail = 'test@example.com';
    const seedUserPassword = 'password123';
    let authToken;

    beforeAll(async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                loginIdentifier: seedUserEmail,
                password: seedUserPassword,
            });

        if (response.status !== 200) {
            throw new Error(
                'Could not log in as test user (${seedUserEmail}). Make sure this user exists AND IS VERIFIED in the database. (Received ${response.status})'
        );
        }

        authToken = response.body.data.token;
        expect(authToken).toBeDefined();
    });

    describe('POST /api/signup', () => {
        test('should successfully create a new user and return 201', async () => {
            const uniqueEmail = `test_${Date.now()}@example.com`;
            const uniqueUsername = `testuser_${Date.now()}`;

            const response = await request(app)
                .post('/api/signup')
                .send({
                    username: uniqueUsername,
                    email: uniqueEmail,
                    password: 'password123',
                });

            expect(response.status).toBe(201);
            expect(response.body.message).toContain('User registered successfully');
        });
    });

    describe('POST /api/login', () => {
        test('should log in successfully (200) and return a token', async () => {
            const startTime = Date.now();
            const response = await request(app)
                .post('/api/login')
                .send({
                    loginIdentifier: seedUserEmail,
                    password: seedUserPassword,
                });
            const endTime = Date.now();

            expect(response.status).toBe(200);
            expect(response.body.data.token).toBeDefined();
            expect(endTime - startTime).toBeLessThan(2000);
        });

        test('should return 401 Unauthorized for incorrect password', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    loginIdentifier: seedUserEmail,
                    password: 'wrongpassword',
                });

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/me', () => {
        test('should return 401 Unauthorized if no token is provided', async () => {
            const response = await request(app).get('/api/me');

            expect(response.status).toBe(401);
        });

        test('should return 200 OK and user data if token is valid', async () => {
            const response = await request(app)
                .get('/api/me')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body.data.user.email).toBe(seedUserEmail);
        });
    });
});