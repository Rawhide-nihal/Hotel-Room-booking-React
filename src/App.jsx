import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Rooms from './Rooms';
import RoomDetails from './RoomDetails';
import BookingForm from './BookingForm';
import PaymentMock from './PaymentMock';
import Confirmation from './Confirmation';
import History from './History';
import AdminPanel from './AdminPanel';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('hotel_user_name');
    if (user) setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('hotel_user_name');
    setCurrentUser(null);
    window.location.href = '/';
  };

  return (
    <Router>
      <nav className="glass-nav">
        <h2 className="nav-brand">Luxury Stays</h2>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          {currentUser ? (
            <>
              <Link to="/rooms" className="nav-link">Suites</Link>
              {currentUser.toLowerCase() !== 'admin' && <Link to="/history" className="nav-link">My Bookings</Link>}
              {currentUser.toLowerCase() === 'admin' && <Link to="/admin" className="nav-link">Admin Panel</Link>}
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Sign In</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </>
          )}
        </div>

        <div className="nav-actions">
          {currentUser ? (
            <button onClick={handleLogout} className="apple-btn nav-logout">Logout</button>
          ) : (
            <Link to="/signup">
              <button className="apple-btn">Book Now</button>
            </Link>
          )}
        </div>
      </nav>

      <div className="page-shell">
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLoginSuccess={setCurrentUser} />} />
            <Route path="/signup" element={<SignUp onSignUpSuccess={setCurrentUser} />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/room-details" element={<RoomDetails />} />
            <Route path="/booking-form" element={<BookingForm />} />
            <Route path="/payment" element={<PaymentMock />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/history" element={<History />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;