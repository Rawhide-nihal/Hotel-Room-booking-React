import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const History = () => {
  const [myBookings, setMyBookings] = useState([]);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerGuestName, setBannerGuestName] = useState('');
  const userName = localStorage.getItem('hotel_user_name');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!userName) {
      navigate('/login');
      return;
    }

    const loadBookings = () => {
      const allBookings = JSON.parse(localStorage.getItem('hotel_all_bookings')) || [];
      setMyBookings(allBookings.filter(b => b.accountUser === userName));
    };

    loadBookings();

    // Live storage updates across tabs
    const handleStorageChange = (e) => {
      if (e.key === 'hotel_all_bookings') {
        loadBookings();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // Check if redirect contains success banner trigger
    if (location.state?.bookingSuccess) {
      setShowBanner(true);
      setBannerGuestName(location.state.guestName || '');
      // Clear navigation state to avoid re-showing banner on refresh
      window.history.replaceState({}, document.title);
      
      const timer = setTimeout(() => {
        setShowBanner(false);
      }, 6000);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        clearTimeout(timer);
      };
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [userName, navigate, location.state]);

  return (
    <div className="page-shell">
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        {showBanner && (
          <div className="apple-card" style={{
            background: 'linear-gradient(135deg, #28a745, #20c997)',
            color: '#fff',
            padding: '18px 24px',
            borderRadius: '16px',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 12px 30px rgba(40,167,69,0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>✅</span>
              <div>
                <strong style={{ fontSize: '1.05rem' }}>Payment Successful!</strong>
                <div style={{ fontSize: '0.88rem', opacity: 0.9, marginTop: '2px' }}>
                  Reservation for {bannerGuestName} has been confirmed.
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '20px',
                cursor: 'pointer',
                opacity: 0.8,
                padding: '0 4px'
              }}
            >
              ✕
            </button>
          </div>
        )}
        <h1 className="section-title" style={{ textAlign: 'center', marginBottom: '32px' }}>Booking History</h1>
        {myBookings.length === 0 ? (
          <div className="apple-card" style={{ padding: '40px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>You have no active reservations.</h3>
            <button className="apple-btn" onClick={() => navigate('/rooms')} style={{ marginTop: '10px' }}>Explore Suites</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {myBookings.map((booking) => (
              <div key={booking.id} className="apple-card history-card" style={{ padding: '24px' }}>
                <div className="history-row">
                  <div>
                    <h3 style={{ margin: '0 0 8px 0' }}>{booking.room}</h3>
                    <p style={{ margin: '0 0 6px 0', color: 'var(--text-primary)', fontSize: '0.98rem', fontWeight: '600' }}>
                      Guest: {booking.guestName} (ID: {booking.guestId})
                    </p>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                      Dates: {booking.checkIn} to {booking.checkOut}
                    </p>
                    <span style={{ display: 'inline-flex', marginTop: '12px', padding: '6px 10px', background: 'rgba(40, 167, 69, 0.12)', color: '#28a745', borderRadius: '999px', fontSize: '0.82rem', fontWeight: '600' }}>
                      {booking.status} • #{booking.id}
                    </span>
                  </div>
                  <h3 style={{ margin: 0, color: '#fff' }}>₹{booking.totalCost.toLocaleString('en-IN')}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;