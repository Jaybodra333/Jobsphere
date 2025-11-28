import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
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
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>
            <img src="/src/assets/logo.jpg" alt="Paprangkorn Spa Recruitment" className="site-logo site-logo--small" />
          </h3>
          <p>
            Connecting Thailand&apos;s finest spa talent with India&apos;s luxury wellness industry.
            Your career, our commitment.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>
                Home
              </a>
            </li>
            <li>
              <a href="#why-us" onClick={(e) => handleNavClick(e, 'why-us')}>
                Why Us
              </a>
            </li>
            <li>
              <a href="#openings" onClick={(e) => handleNavClick(e, 'openings')}>
                Spa Jobs
              </a>
            </li>
            <li>
              <a href="#how-to-apply" onClick={(e) => handleNavClick(e, 'how-to-apply')}>
                How to Apply
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>
                About Us
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li>
              <a href="mailto:paprangkornpvtltd@gmail.com">
                📧 paprangkornpvtltd@gmail.com
              </a>
            </li>
            <li>
              <p>Send your CV to apply for spa positions</p>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li>Work Permit Assistance</li>
            <li>Visa Sponsorship</li>
            <li>Salary Negotiation</li>
            <li>Career Guidance</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Paprangkorn Pvt Ltd. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

