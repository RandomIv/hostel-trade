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