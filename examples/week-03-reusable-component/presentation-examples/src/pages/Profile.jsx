import { useEffect, useState } from 'react';

import Link from '../components/Link';
import List from '../components/List';

const API_BASE = 'https://api.github.com';

export default function Profile({ userName }) {
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      setStatus('loading');
      try {
        const response = await fetch(`${API_BASE}/users/${userName}`);
        if (!response.ok) {
          throw new Error('Profile request failed');
        }
        const data = await response.json();
        if (isMounted) {
          setProfile(data);
          setStatus('success');
        }
      } catch (error) {
        if (isMounted) {
          setStatus('error');
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [userName]);

  if (status === 'loading') {
    return <p className="status">Loading profile...</p>;
  }

  if (status === 'error') {
    return <p className="status">Unable to load profile.</p>;
  }

  if (!profile) {
    return null;
  }

  const items = [
    { field: 'name', value: profile.name || 'Unknown' },
    { field: 'company', value: profile.company || 'Not listed' },
    { field: 'location', value: profile.location || 'Not listed' },
    {
      field: 'html_url',
      value: <Link url={profile.html_url} title={profile.html_url} />,
    },
  ];

  return (
    <main className="page">
      <h2>Profile</h2>
      <List items={items} />
    </main>
  );
}
