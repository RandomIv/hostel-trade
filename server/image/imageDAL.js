import db from '../config/dbConfig.js';

export const deletePrevious = async (bucket, prevFilePath) => {
    return db.storage.from(bucket).remove([prevFilePath]);
};
export const upload = async (bucket, filePath, file) => {
    return db.storage.from(bucket).upload(filePath, file.buffer, {
        contentType: file.mimetype,
    });
};
export const getPublicUrl = async (bucket, filePath) => {
    return db.storage.from(bucket).getPublicUrl(filePath);
};
export const insertImage = async (dataToUpdate) => {
    return db.from('image').insert(dataToUpdate);
};
export const getImagesByProductId = async (productId) => {
    return db.from('image').select('url').eq('product_id', productId);
};

export const deleteImagesFromStorage = async (bucket, filePaths) => {
    return db.storage.from(bucket).remove(filePaths);
};

export const deleteImagesByProductId = async (productId) => {
    return db.from('image').delete().eq('product_id', productId);
};