import { Section } from '../components/Section';

const projects = [
  { name: 'Design System', description: 'Reusable components for product teams.' },
  { name: 'Travel Planner', description: 'Itineraries built with maps and time zones.' },
  { name: 'Study Tracker', description: 'Daily focus metrics and streaks.' },
];

export function Projects() {
  return (
    <Section title="Featured Projects">
      <ul>
        {projects.map((project) => (
          <li key={project.name} style={{ marginBottom: 12 }}>
            <strong>{project.name}</strong>
            <div>{project.description}</div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
