import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import logoSrc from '../assets/logo.jpg';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // If not on home page, navigate to home first, then scroll
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation and DOM update, then scroll
      setTimeout(() => {
        scrollToSection(targetId);
      }, 100);
    } else {
      scrollToSection(targetId);
    }
  };

  const scrollToSection = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 100; // Increased offset to account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    // Only track scroll on home page
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const sections = ['home', 'why-us', 'openings', 'how-to-apply', 'about'];
      const scrollPosition = window.scrollY + 120; // Adjusted for header height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (e) => {
      const nav = document.querySelector('.app-header nav');
      const toggle = document.querySelector('.mobile-menu-toggle');
      if (nav && toggle && !nav.contains(e.target) && !toggle.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <header className="app-header">
      <div className="brand" onClick={() => navigate('/')}>
        <img src={logoSrc} alt="Paprangkorn Spa Careers" className="site-logo" />
      </div>
      <button
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className={mobileMenuOpen ? 'open' : ''}></span>
        <span className={mobileMenuOpen ? 'open' : ''}></span>
        <span className={mobileMenuOpen ? 'open' : ''}></span>
      </button>
      <nav className={mobileMenuOpen ? 'mobile-open' : ''}>
        <a
          href="#home"
          className={activeSection === 'home' ? 'active' : ''}
          onClick={(e) => handleNavClick(e, 'home')}
        >
          Home
        </a>
        <a
          href="#why-us"
          className={activeSection === 'why-us' ? 'active' : ''}
          onClick={(e) => handleNavClick(e, 'why-us')}
        >
          Why Us
        </a>
        <a
          href="#openings"
          className={activeSection === 'openings' ? 'active' : ''}
          onClick={(e) => handleNavClick(e, 'openings')}
        >
          Spa Jobs
        </a>
        <a
          href="#how-to-apply"
          className={activeSection === 'how-to-apply' ? 'active' : ''}
          onClick={(e) => handleNavClick(e, 'how-to-apply')}
        >
          How to Apply
        </a>
        <a
          href="#about"
          className={activeSection === 'about' ? 'active' : ''}
          onClick={(e) => handleNavClick(e, 'about')}
        >
          About Us
        </a>
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

