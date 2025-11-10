import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import classes from './LikeBtn.module.css';

import {
  deleteFavorite,
  postNewFavorite,
} from '../../utils/product/productRequests';
import { ensureAccessToken } from '../../utils/auth';

export default function LikeBtn({ productId, isLiked }) {
  const [isCurrentLiked, setIsCurrentLiked] = useState(isLiked);
  const navigate = useNavigate();

  const { mutateAsync: addFavorite, isPending: isAddPending } = useMutation({
    mutationFn: postNewFavorite,
  });

  const { mutateAsync: delFavorite, isPending: isDeletePending } = useMutation({
    mutationFn: deleteFavorite,
  });

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  let response;

  async function handleClick() {
    if (await ensureAccessToken()) {
      if (!isCurrentLiked) {
        response = await addFavorite({ userId, productId, token });
      } else {
        response = await delFavorite({ userId, productId, token });
      }

      if (response.status === 'success') {
        setIsCurrentLiked((prev) => !prev);
      }
    } else {
      navigate('/auth?mode=login');
    }
  }

  return (
    <button
      className={classes['like-btn']}
      onClick={handleClick}
      disabled={isAddPending && isDeletePending}
      data-testid="like-btn"
    >
      <i
        className={isCurrentLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
      ></i>
    </button>
  );
}
