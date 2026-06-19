import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const RoomDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isBooked, setIsBooked] = useState(false);

  // Safely extract room if it exists, otherwise use null temporarily
  const room = location.state?.room || null;

  // ✅ Hooks are now ALL called at the top, unconditionally
  useEffect(() => {
    if (!room) return; // Exit early inside the hook if no room exists

    const currentBooking = localStorage.getItem('hotel_booking_status');
    if (currentBooking === room.name) {
      setIsBooked(true);
    }
  }, [room?.name]);

  // ✅ Fallback UI check is now safely placed AFTER all hooks
  if (!room) {
    return (
      <div className="page-shell" style={{ textAlign: 'center' }}>
        <div className="apple-card" style={{ maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <h3 style={{ marginBottom: '24px' }}>No room selected</h3>
          <button className="apple-btn" onClick={() => navigate('/rooms')}>Go to Rooms</button>
        </div>
      </div>
    );
  }

  const handleConfirmBooking = () => {
    localStorage.setItem('hotel_booking_status', room.name);
    setIsBooked(true);
    alert(`Success! Your reservation for the ${room.name} has been secured.`);
  };

  const handleCancelBooking = () => {
    localStorage.removeItem('hotel_booking_status');
    setIsBooked(false);
    alert("Reservation canceled.");
  };

  return (
    <div className="page-shell">
      <button
        onClick={() => navigate('/rooms')}
        className="back-link"
        style={{ marginBottom: '24px' }}
      >
        ← Back to Suites
      </button>

      <div className="apple-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <img
          src={room.img}
          alt={room.name}
          style={{ width: '100%', height: '440px', objectFit: 'cover' }}
        />
        <div style={{ padding: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
            <h1 className="section-title" style={{ margin: 0, fontSize: '2.6rem' }}>{room.name}</h1>
            <h2 style={{ margin: 0, fontSize: '1.75rem', color: 'var(--accent-blue)' }}>
              ₹{room.price.toLocaleString('en-IN')} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/ night</span>
            </h2>
          </div>

          <p className="panel-copy" style={{ marginBottom: '16px' }}>{room.details}</p>
          <p className="panel-copy" style={{ marginBottom: '30px' }}>{room.description}</p>

          <h3 style={{ marginBottom: '16px' }}>Premium Amenities Included:</h3>
          <div className="details-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', marginBottom: '36px' }}>
            {room.amenities.map((amenity, index) => (
              <div key={index} className="detail-chip">{amenity}</div>
            ))}
          </div>

          {isBooked ? (
            <div className="summary-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px' }}>
              <span style={{ color: '#28a745', fontWeight: '600' }}>✓ You have reserved this room</span>
              <button onClick={handleCancelBooking} className="apple-btn secondary" style={{ width: 'auto' }}>
                Cancel Reservation
              </button>
            </div>
          ) : (
            <button className="apple-btn" onClick={handleConfirmBooking} style={{ width: '100%', padding: '16px', fontSize: '16px' }}>
              Confirm Reservation
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;