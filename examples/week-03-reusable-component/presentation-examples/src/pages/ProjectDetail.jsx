import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';

import Link from '../components/Link';
import List from '../components/List';

const API_BASE = 'https://api.github.com';

export default function ProjectDetail({ userName }) {
  const { name } = useParams();
  const [project, setProject] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    let isMounted = true;

    async function loadProject() {
      setStatus('loading');
      try {
        const response = await fetch(`${API_BASE}/repos/${userName}/${name}`);
        if (!response.ok) {
          throw new Error('Project detail request failed');
        }
        const data = await response.json();
        if (isMounted) {
          setProject(data);
          setStatus('success');
        }
      } catch (error) {
        if (isMounted) {
          setStatus('error');
        }
      }
    }

    if (name) {
      loadProject();
    }

    return () => {
      isMounted = false;
    };
  }, [name, userName]);

  if (status === 'loading') {
    return <p className="status">Loading project...</p>;
  }

  if (status === 'error') {
    return <p className="status">Unable to load project.</p>;
  }

  if (!project) {
    return null;
  }

  const items = [
    { field: 'name', value: project.name },
    { field: 'description', value: project.description || 'No description.' },
    { field: 'language', value: project.language || 'Unknown' },
    { field: 'open_issues', value: project.open_issues },
    {
      field: 'html_url',
      value: <Link url={project.html_url} title={project.html_url} />,
    },
  ];

  return (
    <main className="page">
      <h2>Project Detail</h2>
      <List items={items} />
      <RouterLink className="back-link" to="/projects">
        Back to projects
      </RouterLink>
    </main>
  );
}
