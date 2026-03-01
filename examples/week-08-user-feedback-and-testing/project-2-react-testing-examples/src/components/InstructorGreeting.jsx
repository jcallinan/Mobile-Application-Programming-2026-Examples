import { useEffect, useState } from 'react';
import { fetchInstructorName } from '../api';

export default function InstructorGreeting() {
  const [name, setName] = useState('Loading...');

  useEffect(() => {
    fetchInstructorName().then((instructor) => setName(instructor));
  }, []);

  return <p>Hello, {name}!</p>;
}
