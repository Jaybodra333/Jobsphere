import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="app-header">
      <div className="brand" onClick={() => navigate('/')}>
        <span role="img" aria-label="briefcase">
          💼
        </span>
        JobSphere
      </div>
      <nav>
        <Link to="/">Jobs</Link>
        {isAuthenticated ? (
          <>
            <Link to="/admin">Dashboard</Link>
            <button type="button" className="link-button" onClick={handleLogout}>
              Logout {user?.name ? `(${user.name})` : ''}
            </button>
          </>
        ) : (
          <Link to="/admin/login">Admin Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;

