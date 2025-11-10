import { jest, describe, test, expect, beforeAll } from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';

describe('API Component Testing (Features: Products & Favorites)', () => {
    const seedUserEmail = 'test@example.com';
    const seedUserPassword = 'password123';
    let authToken;

    const seedTypeId = '028853c1-ed54-49a2-a17c-5ebcba0f64c5';
    const seedHostelId = '11bc8ed7-d081-4e75-8656-b8c807270da6';

    let createdProductId;
    const uniqueProductName = `Test Product ${Date.now()}`;

    beforeAll(async () => {
        const response = await request(app)
            .post('/api/login')
            .send({ loginIdentifier: seedUserEmail, password: seedUserPassword });

        if (response.status !== 200) {
            throw new Error(
                `Could not log in as test user (${seedUserEmail}). Make sure this user exists AND IS VERIFIED in the database.`,
            );
        }
        authToken = response.body.data.token;
    });

    test('Should get a list of all products (GET /api/product)', async () => {
        const response = await request(app).get('/api/product');

        expect(response.status).toBe(200);
        expect(response.body.data.products).toBeInstanceOf(Array);
    });

    test('Should create a new product (POST /api/product)', async () => {
        const newProduct = {
            name: uniqueProductName,
            price: 999,
            description: 'A test product created by Jest',
            typeId: seedTypeId,
            hostelId: seedHostelId,
        };

        const response = await request(app)
            .post('/api/product')
            .set('Authorization', `Bearer ${authToken}`)
            .send(newProduct);

        expect(response.status).toBe(201);
        expect(response.body.message).toContain('Product created successfully');
    });

    test('Should filter products by name (GET /api/product?filter=...)', async () => {
        const filter = { name: uniqueProductName };

        const response = await request(app)
            .get(`/api/product?filter=${JSON.stringify(filter)}`);

        expect(response.status).toBe(200);
        expect(response.body.data.products).toBeInstanceOf(Array);
        expect(response.body.data.products.length).toBeGreaterThanOrEqual(1);
        expect(response.body.data.products[0].name).toBe(uniqueProductName);

        createdProductId = response.body.data.products[0].id;
        expect(createdProductId).toBeDefined();
    });

    test('Should add a product to favorites (POST /api/favorite)', async () => {
        if (!createdProductId) {
            throw new Error(
                'Product creation/filtering test failed, cannot run favorite test',
            );
        }

        const response = await request(app)
            .post('/api/favorite')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ productId: createdProductId });

        expect(response.status).toBe(201);
        expect(response.body.message).toContain('Favorite added successfully');
    });
});