import AppError from '../utils/appError.js';
import {
    deleteImagesByProductId,
    deleteImagesFromStorage,
    deletePrevious, getImagesByProductId,
    getPublicUrl,
    insertImage,
    upload,
} from './imageDAL.js';

export const uploadImage = async (file, id, prevUrl, bucket, next) => {
    if (!file) {
        return next(new AppError('No file provided'));
    }
    if (prevUrl) {
        const prevFilePath = prevUrl.replace(
            `https://kwgdydqnsojwgccidaua.supabase.co/storage/v1/object/public/${bucket}/`,
            '',
        );

        const {error: deleteError} = deletePrevious(bucket, prevFilePath);
        if (deleteError) {
            return next(deleteError);
        }
    }
    const fileName = `${Date.now()}`;
    const filePath = `${id}/${fileName}`;
    const {error: storageError} = await upload(bucket, filePath, file);
    if (storageError) return next(storageError);
    const {data: url, error: PublicUrlError} = await getPublicUrl(
        bucket,
        filePath,
    );
    if (PublicUrlError) return next(PublicUrlError);
    return url.publicUrl;
};
export const addImage = async (data, next) => {
    const {error} = await insertImage(data);
    if (error) return next(error);
};

export const removeImagesByProductId = async (productId, next) => {
    const bucket = 'products';

    const {data: images, error: fetchError} =
        await getImagesByProductId(productId);
    if (fetchError) return next(fetchError);
    if (!images || images.length === 0) {
        return;
    }

    const storageUrlPrefix = `https://kwgdydqnsojwgccidaua.supabase.co/storage/v1/object/public/${bucket}/`;
    const filePaths = images.map((img) => img.url.replace(storageUrlPrefix, ''));

    const {error: storageError} = await deleteImagesFromStorage(
        bucket,
        filePaths,
    );
    if (storageError) {
        console.error(
            'Помилка видалення зі сховища, але запис з БД буде видалено:',
            storageError.message,
        );
    }

    const {error: dbError} = await deleteImagesByProductId(productId);
    if (dbError) return next(dbError);
};