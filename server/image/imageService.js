import AppError from '../utils/appError.js';
import {
  deletePrevious,
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

    const { error: deleteError } = deletePrevious(bucket, prevFilePath);
    if (deleteError) {
      return next(deleteError);
    }
  }
  const fileName = `${Date.now()}`;
  const filePath = `${id}/${fileName}`;
  const { error: storageError } = await upload(bucket, filePath, file);
  if (storageError) return next(storageError);
  const { data: url, error: PublicUrlError } = await getPublicUrl(
    bucket,
    filePath,
  );
  if (PublicUrlError) return next(PublicUrlError);
  return url.publicUrl;
};
export const addImage = async (data, next) => {
  const { error } = await insertImage(data);
  if (error) return next(error);
};
