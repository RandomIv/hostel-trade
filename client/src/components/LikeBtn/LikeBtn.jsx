import { useState } from 'react';
import classes from './LikeBtn.module.css';

export default function LikeBtn() {
  const [isLiked, setIsLiked] = useState(false);

  function handleClick() {
    setIsLiked((prev) => !prev);
  }

  return (
    <button className={classes['like-btn']} onClick={handleClick}>
      <i class={isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
    </button>
  );
}
