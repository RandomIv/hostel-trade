import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import classes from './LikeBtn.module.css';

import {
  deleteFavorite,
  postNewFavorite,
} from '../../utils/product/productRequests';

export default function LikeBtn({ productId, isLiked }) {
  const [isCurrentLiked, setIsCurrentLiked] = useState(isLiked);

  const { mutateAsync: addFavorite, isAddPending } = useMutation({
    mutationFn: postNewFavorite,
  });

  const { mutateAsync: delFavorite, isDeletePending } = useMutation({
    mutationFn: deleteFavorite,
  });

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  let response;

  async function handleClick() {
    if (!isCurrentLiked) {
      response = await addFavorite({ userId, productId, token });
    } else {
      response = await delFavorite({ userId, productId, token });
    }

    if (response.status === 'success') {
      console.log('success');
      setIsCurrentLiked((prev) => !prev);
    }
  }

  return (
    <button
      className={classes['like-btn']}
      onClick={handleClick}
      disabled={isAddPending && isDeletePending}
    >
      <i
        className={isCurrentLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
      ></i>
    </button>
  );
}
