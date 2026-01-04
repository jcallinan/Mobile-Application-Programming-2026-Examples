import { fetchProducts } from '../lib/graphql';

export default async function Page() {
  const products = await fetchProducts();

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 32 }}>
      <h1>Storefront</h1>
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        {products.map((product) => (
          <article
            key={product.id}
            style={{ border: '1px solid #d0d7de', borderRadius: 12, padding: 16 }}
          >
            <div style={{ height: 120, background: '#f6f8fa', borderRadius: 8, marginBottom: 12 }} />
            <strong>{product.name}</strong>
            <div style={{ color: '#0f62fe', marginTop: 6 }}>${product.price}</div>
          </article>
        ))}
      </div>
    </main>
  );
}
