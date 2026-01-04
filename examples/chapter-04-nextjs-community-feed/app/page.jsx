const feed = [
  {
    id: 'post-1',
    author: 'Avery',
    message: 'Launched the new community hub today!',
    timestamp: '2h ago',
  },
  {
    id: 'post-2',
    author: 'Sky',
    message: 'Looking for collaborators on a mobile UI kit.',
    timestamp: '5h ago',
  },
];

export default function Page() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 32 }}>
      <h1>Community Feed</h1>
      <p>Server-rendered updates from the community.</p>
      <section style={{ display: 'grid', gap: 16, marginTop: 24 }}>
        {feed.map((item) => (
          <article
            key={item.id}
            style={{
              background: '#f6f8fa',
              borderRadius: 12,
              padding: 16,
            }}
          >
            <strong>{item.author}</strong>
            <span style={{ marginLeft: 8, color: '#57606a' }}>{item.timestamp}</span>
            <p style={{ marginTop: 8 }}>{item.message}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
