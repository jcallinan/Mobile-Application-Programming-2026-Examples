import { NavLink } from 'react-router-dom';

const linkStyles = ({ isActive }) => ({
  color: isActive ? '#0f62fe' : '#111',
  textDecoration: 'none',
  fontWeight: 600,
});

export function Layout({ children }) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <nav style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <NavLink to="/" style={linkStyles}>
          Home
        </NavLink>
        <NavLink to="/projects" style={linkStyles}>
          Projects
        </NavLink>
        <NavLink to="/contact" style={linkStyles}>
          Contact
        </NavLink>
      </nav>
      <main>{children}</main>
    </div>
  );
}
