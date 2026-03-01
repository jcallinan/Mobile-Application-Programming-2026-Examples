export default function ProfileCard({ name, course }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{course}</p>
    </article>
  );
}
