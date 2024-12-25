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
export const addImage = async (data) => {
  return db.from('image').insert(data);
};
