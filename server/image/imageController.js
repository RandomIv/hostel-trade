import Router from 'express';
import handleAsync from '../utils/handleAsync.js';
import { sendResponse } from '../utils/responseUtils.js';
import multer from 'multer';
import { uploadImage } from './imageService.js';
import { addImage } from './imageDAL.js';
import { toSnakeCase } from '../utils/objectUtils.js';
const storage = multer.memoryStorage();
const upload = multer({ storage });
const imageController = Router();
imageController.post(
  '/upload',
  upload.single('image'),
  handleAsync(async (req, res, next) => {
    const { id, prevUrl, bucket } = req.body;
    const { file } = req;
    const url = await uploadImage(file, id, prevUrl, bucket, next);
    sendResponse(
      res,
      200,
      {
        url,
      },
      'url uploaded successfully',
    );
  }),
);
imageController.post(
  '/images',
  handleAsync(async (req, res, next) => {
    const data = toSnakeCase(req.body);
    const { error } = await addImage(data);
    if (error) return next(error);
    sendResponse(res, 201, null, 'Hostel created successfully');
  }),
);
export default imageController;
