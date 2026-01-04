export function Card({ card }) {
  return (
    <article
      style={{
        background: 'white',
        borderRadius: 10,
        padding: 12,
        boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
        marginBottom: 12,
      }}
    >
      <strong>{card.title}</strong>
      <div style={{ color: '#57606a', marginTop: 6 }}>Owner: {card.owner}</div>
    </article>
  );
}
