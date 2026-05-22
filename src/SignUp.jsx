import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ onSignUpSuccess }) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    localStorage.setItem('hotel_user_name', name);
    
    // Notify our global state management hook inside App.jsx
    if (onSignUpSuccess) onSignUpSuccess(name);
    
    navigate('/rooms'); 
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', padding: '0 20px' }}>
      <div className="apple-card" style={{ padding: '40px' }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 30px 0', fontSize: '28px' }}>Create Account</h2>
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input className="apple-input" type="text" placeholder="First Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="apple-input" type="email" placeholder="Email" required />
          <input className="apple-input" type="password" placeholder="Password" required />
          <button className="apple-btn" type="submit" style={{ padding: '14px', fontSize: '16px' }}>Continue to Booking</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;