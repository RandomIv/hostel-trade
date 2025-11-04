import { sendRequest } from '../http';
import {
    getFavoritesValidateForm,
    getProductsValidateForm,
} from './productFormData';

export async function getProductById(id) {
    try {
        const { data } = await sendRequest({
            url: `http://localhost:5000/api/product/${id}`,
            method: 'GET',
        });
        return data.product;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw new Error('Could not fetch product.');
    }
}

export async function getProducts(searchParams) {
    const params = getProductsValidateForm(searchParams);
    try {
        const { data } = await sendRequest({
            url: `http://localhost:5000/api/product?${params.toString()}`,
            method: 'GET',
        });
        return data?.products || [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export async function getUserInfo(userId) {
    try {
        const { data } = await sendRequest({
            url: `http://localhost:5000/api/user/${userId}`,
            method: 'GET',
        });
        return data?.user || [];
    } catch (error) {
        console.error('Error fetching user info:', error);
        return [];
    }
}

export async function getHostels() {
    try {
        const { data } = await sendRequest({
            url: `http://localhost:5000/api/hostel`,
            method: 'GET',
        });

        return data?.hostels || [];
    } catch (error) {
        console.error('Error fetching hostels:', error);
        return [];
    }
}

export async function getTypes() {
    try {
        const { data } = await sendRequest({
            url: `http://localhost:5000/api/type`,
            method: 'GET',
        });
        return data?.types || [];
    } catch (error) {
        console.error('Error fetching types:', error);
        return [];
    }
}

export function postNewProduct({ body, headers }) {
    return sendRequest({
        url: 'http://localhost:5000/api/product',
        method: 'POST',
        body,
        headers,
    });
}

export function deleteProduct(id) {
    return sendRequest({
        url: `http://localhost:5000/api/product/${id}`,
        method: 'DELETE',
    });
}

export function patchProduct({ id, body, headers }) {
    return sendRequest({
        url: `http://localhost:5000/api/product/${id}`,
        method: 'PATCH',
        body,
        headers,
    });
}

export async function getFavoriteProducts(searchParams) {
    const params = getFavoritesValidateForm(searchParams);

    const token = localStorage.getItem('token');

    try {
        const { data } = await sendRequest({
            url: `http://localhost:5000/api/favorite?${params.toString()}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const products = data?.favorites.map((favorite) => favorite.product);
        return products || [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export function postNewFavorite({ userId, productId, token }) {
    return sendRequest({
        url: 'http://localhost:5000/api/favorite',
        method: 'POST',
        body: JSON.stringify({
            userId: userId,
            productId: productId,
        }),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export function deleteFavorite({ userId, productId, token }) {
    return sendRequest({
        url: `http://localhost:5000/api/favorite/${userId}`,
        method: 'DELETE',
        body: JSON.stringify({
            productId: productId,
        }),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export function addUserView(productId, token) {
    return sendRequest({
        url: `http://localhost:5000/api/user-view/${productId}`,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
