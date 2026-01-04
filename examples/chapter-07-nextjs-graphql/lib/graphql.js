const PRODUCTS_QUERY = `
  query Products {
    products {
      id
      name
      price
      imageUrl
    }
  }
`;

export async function fetchProducts() {
  const response = await fetch('https://example.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: PRODUCTS_QUERY }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  const { data } = await response.json();
  return data?.products ?? [];
}
