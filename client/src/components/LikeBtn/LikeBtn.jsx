import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import classes from './LikeBtn.module.css';

import { postNewFavorite } from '../../utils/product/productRequests';

export default function LikeBtn({ productId }) {
  const [isLiked, setIsLiked] = useState(false);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: postNewFavorite,
  });

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  let response;

  async function handleClick() {
    const currentLiked = !isLiked;

    if (currentLiked) {
      response = await mutateAsync({ userId, productId, token });
    }
    if (response.status === 'success') {
      console.log('success');
      setIsLiked((prev) => !prev);
    }
  }

  return (
    <button
      className={classes['like-btn']}
      onClick={handleClick}
      disabled={isPending}
    >
      <i className={isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
    </button>
  );
}
