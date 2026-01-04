const { useState } = React;

function App() {
  const [count, setCount] = useState(0);

  return (
    React.createElement('div', { className: 'card' },
      React.createElement('h1', null, 'Welcome to the SPA'),
      React.createElement('p', null, 'Clicks without navigation: ', count),
      React.createElement(
        'button',
        { onClick: () => setCount((value) => value + 1) },
        'Add 1'
      )
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
