import handleAsync from '../utils/handleAsync.js';
import { sendResponse } from '../utils/responseUtils.js';
import {
  createHostel,
  deleteHostelById,
  getHostelById,
  selectHostels,
} from '../services/hostelService.js';

export const getHostels = handleAsync(async (req, res, next) => {
  const { data: hostels, error } = await selectHostels();
  if (error) return next(error);

  sendResponse(res, 200, { hostels });
});

export const getHostel = handleAsync(async (req, res, next) => {
  const { id } = req.params;

  const { data: hostel, error } = await getHostelById(id);
  if (error) return next(error);

  sendResponse(res, 200, { hostel });
});

export const postHostel = handleAsync(async (req, res, next) => {
  const { number } = req.body;

  const { error } = await createHostel(number);
  if (error) return next(error);

  sendResponse(res, 201, null, 'Hostel created successfully');
});

export const deleteHostel = handleAsync(async (req, res, next) => {
  const { id } = req.params;

  const { error } = await deleteHostelById(id);
  if (error) return next(error);

  sendResponse(res, 200, null, 'Hostel deleted successfully');
});
