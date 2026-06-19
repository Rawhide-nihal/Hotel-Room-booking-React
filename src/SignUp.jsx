import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ onSignUpSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Check if user already exists
    const existingUsersStr = localStorage.getItem('hotel_registered_users');
    const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];
    if (existingUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      alert("An account with this email address already exists.");
      return;
    }

    // Register user
    const newUser = {
      name,
      email,
      phone,
      dob,
      password
    };
    existingUsers.push(newUser);
    localStorage.setItem('hotel_registered_users', JSON.stringify(existingUsers));

    // Package complete registration metadata
    const userProfile = {
      name: name,
      email: email,
      phone: phone,
      dob: dob
    };
    
    // Store profile configuration object as a string inside local storage
    localStorage.setItem('hotel_user_name', name);
    localStorage.setItem('hotel_user_profile', JSON.stringify(userProfile));
    
    // Update global top-level layout state
    if (onSignUpSuccess) onSignUpSuccess(name);
    
    alert(`Account created successfully! Welcome, ${name}.`);
    navigate('/rooms'); 
  };

  return (
    <div className="page-shell">
      <div className="apple-card" style={{ maxWidth: '560px', margin: '0 auto' }}>
        <div className="form-panel">
          <div>
            <h2 className="section-title" style={{ marginBottom: '6px' }}>Create Account</h2>
            <p className="panel-copy">Join Luxury Stays to view exclusive rooms and book with effortless checkout.</p>
          </div>
          <form onSubmit={handleRegister} className="form-panel" style={{ padding: 0, background: 'transparent', boxShadow: 'none', border: 'none' }}>
            <div className="field-group">
              <div>
                <label className="field-label">Full Name</label>
                <input
                  className="apple-input"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="field-label">Email Address</label>
                <input
                  className="apple-input"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="field-label">Phone Number</label>
                <input
                  className="apple-input"
                  type="tel"
                  placeholder="+91 98765 43210"
                  pattern="[0-9]{10,}"
                  title="Please enter a valid phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="field-label">Date of Birth</label>
                <input
                  className="apple-input"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="field-label">Password</label>
                <input
                  className="apple-input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button className="apple-btn" type="submit" style={{ width: '100%', marginTop: '10px' }}>
              Continue to Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Clean minimalist label styles
const labelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: '600',
  color: 'var(--text-secondary)',
  marginBottom: '6px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};

export default SignUp;