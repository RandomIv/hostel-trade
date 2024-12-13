import { useEffect, useState } from 'react';
import classes from './FilterForm.module.css';

export default function PriceInput({ defaultValue }) {
  const [price, setPrice] = useState({
    min: '',
    max: '',
  });

  useEffect(() => {
    setPrice(
      defaultValue.length === 0 && {
        min: '',
        max: '',
      }
    );
  }, [defaultValue]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    const name = event.target.name;

    setPrice((prev) => {
      return {
        ...prev,
        [name]: newValue,
      };
    });
  };

  return (
    <div className={classes['price-container']}>
      <label htmlFor="min-price" className={classes['form-label']}>
        Ціна
      </label>
      <div className={classes['price']}>
        <input
          id="min-price"
          type="number"
          name="min"
          placeholder="Від"
          value={price.min}
          onChange={handleInputChange}
        />
        <input
          id="max-price"
          type="number"
          name="max"
          placeholder="До"
          value={price.max}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
