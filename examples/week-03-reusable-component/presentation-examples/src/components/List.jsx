export default function List({ items }) {
  return (
    <ul className="info-list">
      {items.map((item) => (
        <li key={item.field} className="info-list-item">
          <span className="info-list-label">{item.field}: </span>
          <span className="info-list-value">{item.value}</span>
        </li>
      ))}
    </ul>
  );
}
