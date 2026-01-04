import { Column } from './Column';

export function Board({ columns }) {
  return (
    <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
      {columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
}
