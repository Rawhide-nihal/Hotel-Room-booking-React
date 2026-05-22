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
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h3>No room selected</h3>
        <button className="apple-btn" onClick={() => navigate('/rooms')}>Go to Rooms</button>
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
    <div style={{ width: '100%', maxWidth: '900px', padding: '0 20px' }}>
      {/* Back Button */}
      <button 
        onClick={() => navigate('/rooms')} 
        style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: '500', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}
      >
        ← Back to Suites
      </button>

      {/* Main Breakdown Layout */}
      <div className="apple-card" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        <img 
          src={room.img} 
          alt={room.name} 
          style={{ width: '100%', height: '400px', objectFit: 'cover' }} 
        />
        
        <div style={{ padding: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
            <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '700' }}>{room.name}</h1>
            <h2 style={{ margin: 0, fontSize: '28px', color: 'var(--accent-blue)' }}>
              ₹{room.price.toLocaleString('en-IN')} <span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>/ night</span>
            </h2>
          </div>

          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '10px', fontWeight: '500' }}>{room.details}</p>
          <p style={{ fontSize: '17px', lineHeight: '1.6', marginBottom: '40px' }}>{room.description}</p>

          {/* Premium Included Offerings */}
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>Premium Amenities Included:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '40px' }}>
            {room.amenities.map((amenity, index) => (
              <div key={index} style={{ background: 'rgba(255,255,255,0.4)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)', fontSize: '15px' }}>
                {amenity}
              </div>
            ))}
          </div>

          {/* Dynamic Booking Control Interactivity */}
          {isBooked ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(40, 167, 69, 0.1)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(40, 167, 69, 0.2)' }}>
              <span style={{ color: '#28a745', fontWeight: '600', fontSize: '16px' }}>✓ You have reserved this room</span>
              <button onClick={handleCancelBooking} style={{ background: 'none', border: 'none', color: '#dc3545', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}>
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