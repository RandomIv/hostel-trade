import {sendRequest} from './http';

export const uploadProductImage = async (file, id, prevUrl) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('image', file);
    formData.append('id', id);
    formData.append('prevUrl', prevUrl);
    formData.append('bucket', 'products');
    const response = await fetch('http://localhost:5000/api/image/upload', {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
    });

    const result = await response.json();
    return result.data.url;
};

export function postImage({productId, url, isMain}) {
    return sendRequest({
        url: `http://localhost:5000/api/image`,
        method: 'POST',
        body: JSON.stringify({
            productId,
            url,
            isMain,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export function deleteProductImages(productId) {
    const token = localStorage.getItem('token');
    return sendRequest({
        url: `http://localhost:5000/api/image/${productId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}