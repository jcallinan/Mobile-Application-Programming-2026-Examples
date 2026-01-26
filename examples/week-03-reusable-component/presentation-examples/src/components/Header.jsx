import { Link as RouterLink } from 'react-router-dom';

export default function Header({ logo }) {
  return (
    <header className="app-header">
      <img className="app-logo" src={logo} alt="Week 3 logo" />
      <div>
        <h1>Week 3: Reusable Components</h1>
        <p>Functional components and props in action.</p>
        <nav className="app-nav">
          <RouterLink to="/">Profile</RouterLink>
          <RouterLink to="/projects">Projects</RouterLink>
        </nav>
      </div>
    </header>
  );
}
