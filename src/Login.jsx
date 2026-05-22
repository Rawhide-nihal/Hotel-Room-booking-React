import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanName = email.split('@')[0];
    
    localStorage.setItem('hotel_user_name', cleanName); 
    
    // Notify our global state management hook inside App.jsx
    if (onLoginSuccess) onLoginSuccess(cleanName);
    
    navigate('/rooms'); 
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', padding: '0 20px' }}>
      <div className="apple-card" style={{ padding: '40px' }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 30px 0', fontSize: '28px' }}>Sign In</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input className="apple-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="apple-input" type="password" placeholder="Password" required />
          <button className="apple-btn" type="submit" style={{ padding: '14px', fontSize: '16px' }}>Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;