import { forwardRef } from 'react';

export function convertDate(data) {
  const date = new Date(data);
  const formattedDate = date.toLocaleDateString();

  return formattedDate;
}
