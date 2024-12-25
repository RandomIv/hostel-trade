import { useState } from 'react';

import classes from './SearchProducts.module.css';

import SearchBar from '../../components/SearchBar/SearchBar';
import Product from '../../components/Product/Product';

export default function SearchProducts({
  productsData,
  hostelsData,
  typesData,
  userId,
  favoritesData,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages =
    productsData.length === 0
      ? 1
      : Math.ceil(productsData.length / itemsPerPage);

  const paginatedProducts = productsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <SearchBar hostels={hostelsData} types={typesData} userId={userId} />
      <div className="container">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => {
            const isFavorite = favoritesData?.some(
              (favorite) => favorite.id === product.id
            );
            return (
              <Product
                key={product.id}
                data={product}
                isFavorite={isFavorite}
              />
            );
          })
        ) : (
          <h2>Немає збігів</h2>
        )}
        <div className={classes['pagination-controls-container']}>
          <div className={classes['pagination-controls']}>
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={classes['prev-btn']}
            >
              <i className="fa-solid fa-caret-left"></i>
              <span>Попередня</span>
            </button>
            <span className={classes['pages-count']}>
              Сторінка {currentPage} з {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={classes['next-btn']}
            >
              <span>Наступна</span>
              <i className="fa-solid fa-caret-right" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
