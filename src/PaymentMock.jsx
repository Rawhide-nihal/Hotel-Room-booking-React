import { useLocation, useNavigate } from 'react-router-dom';

const PaymentMock = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const details = location.state?.bookingDetails;

  if (!details) {
    return (
      <div className="page-shell">
        <div className="apple-card" style={{ maxWidth: '520px', margin: '0 auto', padding: '40px', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '20px' }}>No pending payment.</h3>
          <button className="apple-btn" onClick={() => navigate('/rooms')}>View Rooms</button>
        </div>
      </div>
    );
  }

  // Calculate nights and total cost
  const checkInDate = new Date(details.checkIn);
  const checkOutDate = new Date(details.checkOut);
  const diffTime = checkOutDate - checkInDate;
  const diffDays = (isNaN(diffTime) || diffTime <= 0) ? 1 : Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const totalCost = details.pricePerNight * diffDays;

  const handlePayment = (e) => {
    e.preventDefault();
    const accountUser = localStorage.getItem('hotel_user_name');
    const userProfileStr = localStorage.getItem('hotel_user_profile');
    const userProfile = userProfileStr ? JSON.parse(userProfileStr) : null;
    
    // Create new detailed booking record
    const newBooking = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      accountUser: accountUser,
      userEmail: userProfile ? userProfile.email : '',
      userPhone: userProfile ? userProfile.phone : '',
      userDob: userProfile ? userProfile.dob : '',
      guestName: details.guestName,
      guestAge: details.guestAge,
      guestId: details.guestId,
      guests: details.guests || 1,
      room: details.roomName,
      checkIn: details.checkIn,
      checkOut: details.checkOut,
      totalCost: totalCost, 
      status: 'Confirmed'
    };

    const existingBookings = JSON.parse(localStorage.getItem('hotel_all_bookings')) || [];
    localStorage.setItem('hotel_all_bookings', JSON.stringify([...existingBookings, newBooking]));

    // Use router state instead of blocking alert() for immediate reactive transitions
    navigate('/history', { state: { bookingSuccess: true, guestName: details.guestName } });
  };

  return (
    <div className="page-shell">
      <div className="apple-card" style={{ maxWidth: '550px', margin: '0 auto', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 className="section-title" style={{ marginBottom: '8px', fontSize: '2rem' }}>Secure Checkout</h2>
          <p className="panel-copy">
            Total Amount ({diffDays} {diffDays === 1 ? 'night' : 'nights'}): <strong style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '1.1rem' }}>₹{totalCost.toLocaleString('en-IN')}</strong>
          </p>
        </div>

        <div className="summary-card" style={{ marginBottom: '30px', fontSize: '0.95rem', lineHeight: '1.7', background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Guest:</span>
            <strong style={{ color: 'var(--text-primary)' }}>{details.guestName} (Age: {details.guestAge})</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Verified ID:</span>
            <strong style={{ color: 'var(--text-primary)' }}>{details.guestId}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Total Guests:</span>
            <strong style={{ color: 'var(--text-primary)' }}>{details.guests || 1}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Dates:</span>
            <strong style={{ color: 'var(--text-primary)' }}>{details.checkIn} to {details.checkOut}</strong>
          </div>
        </div>

        <form onSubmit={handlePayment} style={{ display: 'grid', gap: '16px' }}>
          <input className="apple-input" type="text" placeholder="Cardholder Name" required style={{ border: '1px solid rgba(0,0,0,0.12)' }} />
          <input className="apple-input" type="text" placeholder="Card Number (Mock)" maxLength="16" pattern="\d{16}" required style={{ border: '1px solid rgba(0,0,0,0.12)' }} />
          <div className="field-row">
            <input className="apple-input" type="text" placeholder="MM/YY" maxLength="5" required style={{ border: '1px solid rgba(0,0,0,0.12)' }} />
            <input className="apple-input" type="password" placeholder="CVV" maxLength="3" required style={{ border: '1px solid rgba(0,0,0,0.12)' }} />
          </div>
          <button className="apple-btn" type="submit" style={{ width: '100%', padding: '16px', fontSize: '16px' }}>Pay & Confirm</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentMock;