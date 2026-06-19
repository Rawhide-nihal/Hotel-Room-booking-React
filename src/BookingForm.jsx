import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state?.room || null;

  // Primary Guest Details
  const [guestName, setGuestName] = useState('');
  const [guestAge, setGuestAge] = useState('');
  const [guestId, setGuestId] = useState('');

  // Reservation Details
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  // Pre-fill the guest name from the logged-in user profile
  useEffect(() => {
    const storedName = localStorage.getItem('hotel_user_name');
    if (storedName) setGuestName(storedName);
  }, []);

  if (!room) {
    return (
      <div className="page-shell" style={{ textAlign: 'center' }}>
        <div className="apple-card" style={{ maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <h3 style={{ marginBottom: '24px' }}>No room selected for booking.</h3>
          <button className="apple-btn" onClick={() => navigate('/rooms')}>Return to Suites</button>
        </div>
      </div>
    );
  }

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    
    if (new Date(checkIn) >= new Date(checkOut)) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    if (parseInt(guestAge) < 18) {
      alert("Primary guest must be at least 18 years old to secure a reservation.");
      return;
    }

    // Package all data together
    const bookingDetails = {
      roomName: room.name,
      pricePerNight: room.price,
      checkIn,
      checkOut,
      guests,
      guestName,
      guestAge,
      guestId
    };

    navigate('/payment', { state: { bookingDetails } });
  };

  return (
    <div className="page-shell">
      <button
        onClick={() => navigate(-1)}
        className="back-link"
        style={{ marginBottom: '24px' }}
      >
        ← Back to Room Details
      </button>

      <div className="apple-card" style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div className="form-panel">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title" style={{ marginBottom: '10px' }}>Reserve {room.name}</h2>
            <p className="panel-copy">₹{room.price.toLocaleString('en-IN')} / night</p>
          </div>

          <form onSubmit={handleProceedToPayment} className="form-panel" style={{ padding: 0, background: 'transparent', border: 'none', boxShadow: 'none' }}>
            <div className="form-section">
              <h3>1. Primary Guest Verification</h3>
              <div className="field-group">
                <div>
                  <label className="field-label">Full Name (As per ID)</label>
                  <input className="apple-input" type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} required />
                </div>
                <div className="field-row">
                  <div>
                    <label className="field-label">Age</label>
                    <input className="apple-input" type="number" min="18" max="120" value={guestAge} onChange={(e) => setGuestAge(e.target.value)} required />
                  </div>
                  <div>
                    <label className="field-label">Govt ID / Passport Number</label>
                    <input className="apple-input" type="text" placeholder="e.g. AB1234567" value={guestId} onChange={(e) => setGuestId(e.target.value)} required />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>2. Reservation Details</h3>
              <div className="field-row">
                <div>
                  <label className="field-label">Check-In Date</label>
                  <input className="apple-input" type="date" value={checkIn} min={new Date().toISOString().split('T')[0]} onChange={(e) => setCheckIn(e.target.value)} required />
                </div>
                <div>
                  <label className="field-label">Check-Out Date</label>
                  <input className="apple-input" type="date" value={checkOut} min={checkIn || new Date().toISOString().split('T')[0]} onChange={(e) => setCheckOut(e.target.value)} required />
                </div>
              </div>
              <div>
                <label className="field-label">Total Guests</label>
                <select className="apple-input" value={guests} onChange={(e) => setGuests(e.target.value)} required>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>

            <button className="apple-btn" type="submit" style={{ width: '100%', marginTop: '10px' }}>
              Proceed to Secure Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' };

export default BookingForm;