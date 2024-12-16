import SearchBar from '../../components/SearchBar/SearchBar';
import Product from '../../components/Product/Product';

export default function SearchProducts({
  productsData,
  hostelsData,
  typesData,
}) {
  return (
    <>
      <SearchBar hostels={hostelsData} types={typesData} />
      <div className="container">
        {productsData.length > 0 ? (
          productsData.map((product) => {
            return <Product key={product.id} data={product} />;
          })
        ) : (
          <h2>Немає збігів</h2>
        )}
      </div>
    </>
  );
}
