export async function getProductById(id) {
  const response = await fetch(`http://localhost:5000/api/product/${id}`);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: 'Could not fetch product.' }),
      {
        status: 500,
      }
    );
  } else {
    const res = await response.json();
    const resData = res.data.product;
    return resData;
  }
}
