import Router from 'express';
import handleAsync from '../utils/handleAsync.js';
import {sendResponse} from '../utils/responseUtils.js';
import multer from 'multer';
import {uploadImage, addImage, removeImagesByProductId} from './imageService.js';
import {toSnakeCase} from '../utils/objectUtils.js';

const storage = multer.memoryStorage();
const upload = multer({storage});
const imageController = Router();

imageController.post(
    '/image/upload',
    upload.single('image'),
    handleAsync(async (req, res, next) => {
        const {id, prevUrl, bucket} = req.body;
        const {file} = req;

        const url = await uploadImage(file, id, prevUrl, bucket, next);

        sendResponse(
            res,
            200,
            {
                url,
            },
            'Url uploaded successfully',
        );
    }),
);

imageController.post(
    '/image',
    handleAsync(async (req, res, next) => {
        const dataToUpdate = toSnakeCase(req.body);

        await addImage(dataToUpdate, next);

        sendResponse(res, 201, null, 'Image added successfully');
    }),
);

imageController.delete(
    '/image/:id',
    handleAsync(async (req, res, next) => {
        const {id: productId} = req.params;

        await removeImagesByProductId(productId, next);

        sendResponse(res, 200, null, 'Images deleted successfully');
    }),
);
export default imageController;
