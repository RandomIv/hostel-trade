import Router from 'express';
import {
  getHostel,
  getHostels,
  postHostel,
  deleteHostel,
} from './hostelController.js';

const hostelRouter = Router();

hostelRouter.get('/hostel', getHostels);
hostelRouter.get('/hostel/:id', getHostel);
hostelRouter.post('/hostel', postHostel);
hostelRouter.delete('/hostel/:id', deleteHostel);

export default hostelRouter;
