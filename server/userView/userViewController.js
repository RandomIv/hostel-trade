import handleAsync from '../utils/handleAsync.js';
import { sendResponse } from '../utils/responseUtils.js';
import Router from 'express';
import authenticateToken from '../middlewares/authenticateToken.js';
import addUserView from './userViewService.js';

const userViewController = Router();

userViewController.post(
  '/user-view/:id',
  authenticateToken,
  handleAsync(async (req, res, next) => {
    const { id: productId } = req.params;
    const userId = req.user.id;

    await addUserView(productId, userId, next);

    sendResponse(res, 201, null, 'View created successfully');
  }),
);

export default userViewController;
