export function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h1 style={{ marginBottom: 12 }}>{title}</h1>
      <div style={{ lineHeight: 1.6 }}>{children}</div>
    </section>
  );
}
