import {v4 as uuidv4} from 'uuid';

import {
    patchProduct,
    postNewProduct,
} from './productRequests.js';
import {postImage, deleteProductImages} from '../photos';

export const getProductsValidateForm = (searchParams) => {
    const parseParams = (param) => (param ? param.split(',') : null);

    const filter = {
        userId: searchParams.get('userId') || null,
        name: searchParams.get('name') || null,
        price: {
            min: searchParams.get('min') || null,
            max: searchParams.get('max') || null,
        },
        typeId: parseParams(searchParams.get('typeId')),
        hostelId: parseParams(searchParams.get('hostelId')),
    };

    const [sortKey, sortValue] = searchParams.get('sort')?.split('-') || [
        null,
        null,
    ];

    const sort = {
        price: null,
        date: null,
        [sortKey]: sortValue,
    };

    const params = new URLSearchParams({
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort),
    });

    return params;
};

export const newProductValidateForm = (form) => {
    const data = {errors: [], formData: {}, images: []};
    const formData = new FormData(form);

    formData.delete('display-photo');

    for (const [key, value] of formData.entries()) {
        if (key.startsWith('photo-')) {
            data.images.push(value);
        } else {
            data.formData[key] = value;
        }
    }

    if (!formData.get('name'))
        data.errors.push('Заповніть будь ласка поле "Назва"');
    if (!formData.get('price'))
        data.errors.push('Заповніть будь ласка поле "Ціна".');
    if (!formData.get('typeId'))
        data.errors.push('Виберіть будь ласка категорію.');
    if (!formData.get('hostelId'))
        data.errors.push('Виберіть будь ласка гуртожиток.');

    if (data.errors.length > 0) return data;

    return data.errors.length > 0 ? data : {...data, formData: data.formData};
};

export const handleNewProduct = async (form, token) => {
    const {errors, formData, images} = newProductValidateForm(form);

    if (errors.length > 0) return {errors, isSubmitted: false};

    const myuuid = uuidv4();

    const data = {...formData, id: myuuid};

    const response = await postNewProduct({
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 'success') {
        try {
            await Promise.all(
                images.map((image, index) => {
                    const isMain = index === 0;
                    return postImage({
                        productId: myuuid,
                        url: image,
                        isMain,
                    });
                })
            );

            return {errors: [], isSubmitted: true};
        } catch (err) {
            errors.push('Failed to upload one or more images.');
            return {errors, isSubmitted: false};
        }
    } else {
        errors.push('Failed to submit the product.');
        return {errors, isSubmitted: false};
    }
};

export const handleEditProduct = async (form, id, token) => {
    const {errors, formData, images} = newProductValidateForm(form);

    if (errors.length > 0) return {errors, isSubmitted: false};

    const response = await patchProduct({
        id,
        body: JSON.stringify(formData),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 'success') {
        try {
            await deleteProductImages(id);

            await Promise.all(
                images.map((image, index) => {
                    const isMain = index === 0;
                    return postImage({
                        productId: id,
                        url: image,
                        isMain,
                    });
                })
            );

            return {errors: [], isSubmitted: true};
        } catch (err) {
            errors.push('Не вдалося оновити фото.');
            return {errors, isSubmitted: true};
        }
    } else {
        errors.push('Ми не змогли оновити Ваше оголошення.');
        return {errors, isSubmitted: false};
    }
};

export const getFavoritesValidateForm = (searchParams) => {
    const parseParams = (param) => (param ? param.split(',') : null);

    const userId = searchParams.get('userId') || null;

    const filter = {
        name: searchParams.get('name') || null,
        price: {
            min: searchParams.get('min') || null,
            max: searchParams.get('max') || null,
        },
        typeId: parseParams(searchParams.get('typeId')),
        hostelId: parseParams(searchParams.get('hostelId')),
    };

    const [sortKey, sortValue] = searchParams.get('sort')?.split('-') || [
        null,
        null,
    ];

    const sort = {
        price: null,
        date: null,
        [sortKey]: sortValue,
    };

    const params = new URLSearchParams({
        userId: JSON.stringify(userId),
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort),
    });

    return params;
};