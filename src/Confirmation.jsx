import { useLocation, useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingId = location.state?.bookingId;

  return (
    <div className="page-shell">
      <div className="apple-card" style={{ maxWidth: '520px', margin: '0 auto', padding: '48px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '18px', color: '#28a745' }}>✅</div>
          <h1 className="section-title" style={{ marginBottom: '10px', fontSize: '2.25rem' }}>Booking Confirmed!</h1>
          <p className="panel-copy" style={{ marginBottom: '32px' }}>
            Your payment was successful. We look forward to hosting you.
          </p>
        </div>
        <div className="summary-card" style={{ marginBottom: '30px' }}>
          <p style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>Booking Reference ID</p>
          <p style={{ margin: 0, fontSize: '1.45rem', fontWeight: '700', letterSpacing: '0.12em' }}>{bookingId || 'ERR-001'}</p>
        </div>
        <button className="apple-btn" onClick={() => navigate('/history')} style={{ width: '100%' }}>View My Bookings</button>
      </div>
    </div>
  );
};

export default Confirmation;