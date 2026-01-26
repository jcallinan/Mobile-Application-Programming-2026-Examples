export default function Link({ url, title }) {
  return (
    <a
      className="app-link"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {title}
    </a>
  );
}
