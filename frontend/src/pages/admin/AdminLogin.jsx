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
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setLocalError('');
    // Basic client-side validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email)) {
      setLocalError('Please enter a valid email address');
      setSubmitting(false);
      return;
    }
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
    <section className="page-center admin-login-page">
      <form className="panel auth-form" onSubmit={handleSubmit} aria-label="Admin login form">
        <div className="auth-brand">
          <div className="auth-logo" aria-hidden>🌿</div>
          <div>
            <h2>Admin Portal</h2>
            <p className="auth-subtitle">Manage jobs, applicants </p>
          </div>
        </div>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="username"
            inputMode="email"
          />
        </label>

        <label>
          Password
          <div className="password-row">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="btn-link show-pass"
              onClick={() => setShowPassword((s) => !s)}
              aria-pressed={showPassword}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </label>

        

        {(localError || error) && (
          <p className="alert error">{localError || error}</p>
        )}

        <div className="auth-actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? (
              <>
                <div className="loading-spinner"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>🔐</span>
                <span>Sign in</span>
              </>
            )}
          </button>
        </div>

        <div className="auth-footer">
          <small>Only authorized admins may access this area.</small>
        </div>
      </form>
    </section>
  );
};

export default AdminLogin;

