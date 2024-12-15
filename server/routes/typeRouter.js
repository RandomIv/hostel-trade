import Router from 'express';
import {
  getType,
  getTypes,
  postType,
  deleteType,
} from '../controllers/typeController.js';

const typeRouter = Router();

typeRouter.get('/type', getTypes);
typeRouter.get('/type/:id', getType);
typeRouter.post('/type', postType);
typeRouter.delete('/type/:id', deleteType);

export default typeRouter;
