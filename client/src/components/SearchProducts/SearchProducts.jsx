import SearchBar from '../../components/SearchBar/SearchBar';
import Product from '../../components/Product/Product';

export default function SearchProducts({
  productsData,
  hostelsData,
  typesData,
  userId,
  favoritesData,
}) {
  console.log(favoritesData);
  return (
    <>
      <SearchBar hostels={hostelsData} types={typesData} userId={userId} />
      <div className="container">
        {productsData.length > 0 ? (
          productsData.map((product) => {
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
      </div>
    </>
  );
}
