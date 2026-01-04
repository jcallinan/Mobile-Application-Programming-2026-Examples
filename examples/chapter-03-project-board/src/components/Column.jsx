import { Card } from './Card';

export function Column({ column }) {
  return (
    <div style={{ background: '#f6f8fa', borderRadius: 12, padding: 16, width: 240 }}>
      <h3 style={{ marginTop: 0 }}>{column.title}</h3>
      {column.cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}
