import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setLocalError('');
    try {
      await login(form.email, form.password);
      const redirectTo = location.state?.from?.pathname || '/admin';
      navigate(redirectTo);
    } catch (err) {
      setLocalError(err.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="page-center">
      <form className="panel auth-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        {(localError || error) && (
          <p className="alert error">{localError || error}</p>
        )}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? (
            <>
              <div className="loading-spinner"></div>
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>🔐</span>
              <span>Login</span>
            </>
          )}
        </button>
      </form>
    </section>
  );
};

export default AdminLogin;

