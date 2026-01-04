import { useState } from 'react';

export function Counter({ initial = 0 }) {
  const [count, setCount] = useState(initial);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>Counter</h1>
      <p data-testid="count">{count}</p>
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Increment
      </button>
    </div>
  );
}
