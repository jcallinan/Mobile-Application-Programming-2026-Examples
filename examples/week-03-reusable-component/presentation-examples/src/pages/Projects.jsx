import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Link from '../components/Link';
import List from '../components/List';

const API_BASE = 'https://api.github.com';

export default function Projects({ userName }) {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      setStatus('loading');
      try {
        const response = await fetch(`${API_BASE}/users/${userName}/repos`);
        if (!response.ok) {
          throw new Error('Projects request failed');
        }
        const data = await response.json();
        if (isMounted) {
          setProjects(data.slice(0, 5));
          setStatus('success');
        }
      } catch (error) {
        if (isMounted) {
          setStatus('error');
        }
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, [userName]);

  if (status === 'loading') {
    return <p className="status">Loading projects...</p>;
  }

  if (status === 'error') {
    return <p className="status">Unable to load projects.</p>;
  }

  const items = projects.map((project) => ({
    field: project.name,
    value: (
      <span className="project-links">
        <RouterLink to={`/projects/${project.name}`}>Details</RouterLink>
        <span className="project-divider">|</span>
        <Link url={project.html_url} title="GitHub" />
      </span>
    ),
  }));

  return (
    <main className="page">
      <h2>Projects</h2>
      <List items={items} />
    </main>
  );
}
