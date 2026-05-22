import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Rooms from './Rooms'; 
import RoomDetails from './RoomDetails';
import './index.css'; 

function App() {
  const [user, setUser] = useState(null);

  // Sync state with localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('hotel_user_name');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Simple logout handler
  const handleLogout = () => {
    localStorage.removeItem('hotel_user_name');
    localStorage.removeItem('hotel_booking_status'); // Optional clear booking on logout
    setUser(null);
    window.location.href = "/"; // Hard redirect to clean state cleanly
  };

  return (
    <Router>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 40px',
        background: 'rgba(251, 251, 253, 0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        zIndex: 1000,
        boxSizing: 'border-box'
      }}>
        
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'var(--text-primary)' }}>
          <span style={{ fontSize: '24px', lineHeight: '1' }}>🏨</span> 
          <span style={{ 
            fontWeight: '600', 
            fontSize: '20px', 
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #1d1d1f 0%, #434348 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Luxury Stays
          </span>
        </Link>

        {/* Conditional Navigation Elements */}
        <div style={{ display: 'flex', gap: '30px', fontSize: '14px', fontWeight: '500', alignItems: 'center' }}>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/rooms" style={linkStyle}>Rooms</Link>
          
          {!user ? (
            <>
              {/* Show only if logged out */}
              <Link to="/login" style={linkStyle}>Login</Link>
              <Link to="/signup" style={linkStyle}>Sign Up</Link>
            </>
          ) : (
            <>
              {/* Show profile panel instead of authorization portals if logged in */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '400' }}>
                  👤 {user}
                </span>
                <button 
                  onClick={handleLogout} 
                  style={{ 
                    background: 'rgba(255, 59, 48, 0.1)', 
                    color: '#ff3b30', 
                    border: 'none', 
                    borderRadius: '980px', 
                    padding: '6px 12px', 
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '12px'
                  }}
                >
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </nav>

      <div style={{ paddingTop: '120px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '50px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room-details" element={<RoomDetails />} /> 
          {/* We pass setUser down to the forms to update the header layout dynamically upon completion */}
          <Route path="/login" element={<Login onLoginSuccess={setUser} />} />
          <Route path="/signup" element={<SignUp onSignUpSuccess={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

const linkStyle = { textDecoration: 'none', color: 'var(--text-primary)', opacity: 0.8, transition: 'opacity 0.2s' };
export default App;