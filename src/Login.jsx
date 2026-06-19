import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Admin Trap
    if (email === 'admin@hotel.com' && password === 'admin123') {
      localStorage.setItem('hotel_user_name', 'Admin');
      if (onLoginSuccess) onLoginSuccess('Admin');
      navigate('/admin');
      return;
    }

    // Regular User Login checking registered users list
    const registeredUsersStr = localStorage.getItem('hotel_registered_users');
    const registeredUsers = registeredUsersStr ? JSON.parse(registeredUsersStr) : [];
    const matchedUser = registeredUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (matchedUser) {
      localStorage.setItem('hotel_user_name', matchedUser.name);
      const userProfile = {
        name: matchedUser.name,
        email: matchedUser.email,
        phone: matchedUser.phone,
        dob: matchedUser.dob
      };
      localStorage.setItem('hotel_user_profile', JSON.stringify(userProfile));
      if (onLoginSuccess) onLoginSuccess(matchedUser.name);
      navigate('/rooms');
    } else {
      alert("Invalid email or password. Please try again or sign up.");
    }
  };

  return (
    <div className="page-shell">
      <div className="apple-card" style={{ maxWidth: '520px', margin: '0 auto' }}>
        <div className="form-panel">
          <div>
            <h2 className="section-title" style={{ marginBottom: '6px' }}>Sign In</h2>
            <p className="panel-copy">Use your account to access exclusive suites and complete bookings fast.</p>
          </div>
          <form onSubmit={handleLogin} className="form-panel" style={{ padding: 0, background: 'transparent', border: 'none', boxShadow: 'none' }}>
            <div className="field-group">
              <div>
                <label className="field-label">Email</label>
                <input className="apple-input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label className="field-label">Password</label>
                <input className="apple-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>
            <button className="apple-btn" type="submit" style={{ width: '100%', marginTop: '10px' }}>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;