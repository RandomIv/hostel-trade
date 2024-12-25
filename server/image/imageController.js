import Router from 'express';
import handleAsync from '../utils/handleAsync.js';
import { sendResponse } from '../utils/responseUtils.js';
import multer from 'multer';
import { uploadImage } from './imageService.js';
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
export default imageController;
