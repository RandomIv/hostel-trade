import handleAsync from '../utils/handleAsync.js';
import { sendResponse } from '../utils/responseUtils.js';
import Router from 'express';
import {
  addHostel,
  getAllHostels,
  getHostel,
  removeHostel,
} from './hostelService.js';

const hostelController = Router();

hostelController.get(
  '/hostel',
  handleAsync(async (req, res, next) => {
    const hostels = await getAllHostels(next);

    sendResponse(res, 200, { hostels });
  }),
);

hostelController.get(
  '/hostel/:id',
  handleAsync(async (req, res, next) => {
    const { id } = req.params;

    const hostel = await getHostel(id, next);

    sendResponse(res, 200, { hostel });
  }),
);

hostelController.post(
  '/hostel',
  handleAsync(async (req, res, next) => {
    const { number } = req.body;

    await addHostel(number, next);

    sendResponse(res, 201, null, 'Hostel created successfully');
  }),
);

hostelController.delete(
  '/hostel/:id',
  handleAsync(async (req, res, next) => {
    const { id } = req.params;

    await removeHostel(id, next);

    sendResponse(res, 200, null, 'Hostel deleted successfully');
  }),
);

export default hostelController;
