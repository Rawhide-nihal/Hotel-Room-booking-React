import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [allBookings, setAllBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('hotel_user_name');
    if (!user || user.toLowerCase() !== 'admin') {
      navigate('/');
      return;
    }
    
    const loadBookings = () => {
      let bookings = JSON.parse(localStorage.getItem('hotel_all_bookings')) || [];
      if (bookings.length === 0) {
        bookings = [
          {
            id: 'NM4IUC6WP',
            accountUser: 'Sai Charan',
            userEmail: 'charan@luxury.com',
            userPhone: '+91 98765 43210',
            userDob: '1998-05-15',
            guestName: 'Sai Charan',
            guestAge: '27',
            guestId: 'AB1C1H1A1',
            guests: 1,
            room: 'Standard Room',
            checkIn: '2026-06-19',
            checkOut: '2026-06-20',
            totalCost: 3500,
            status: 'Confirmed'
          },
          {
            id: 'RX8PJD9WL',
            accountUser: 'John Doe',
            userEmail: 'john@example.com',
            userPhone: '+1 555-0199',
            userDob: '1990-11-23',
            guestName: 'John Doe',
            guestAge: '35',
            guestId: 'US9876543',
            guests: 1,
            room: 'Executive Room',
            checkIn: '2026-06-21',
            checkOut: '2026-06-25',
            totalCost: 22000,
            status: 'Confirmed'
          }
        ];
        localStorage.setItem('hotel_all_bookings', JSON.stringify(bookings));
      }
      setAllBookings(bookings);
    };

    loadBookings();

    // Live storage updates across tabs/windows
    const handleStorageChange = (e) => {
      if (e.key === 'hotel_all_bookings') {
        loadBookings();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate]);

  const totalRevenue = allBookings.reduce((sum, booking) => sum + booking.totalCost, 0);

  return (
    <div className="page-shell">
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <h1 className="section-title" style={{ marginBottom: '30px' }}>Admin Dashboard</h1>

        <div className="apple-card" style={{ padding: '32px', marginBottom: '30px', background: 'linear-gradient(135deg, rgba(92,205,255,1), rgba(33,150,255,1))', color: '#fff' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '0.95rem', opacity: 0.85 }}>Total Platform Revenue</p>
          <h2 style={{ margin: 0, fontSize: '2.2rem' }}>₹{totalRevenue.toLocaleString('en-IN')}</h2>
        </div>

        <div className="apple-card table-card" style={{ padding: '24px', overflowX: 'auto', background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th style={{ color: 'var(--text-secondary)' }}>ID</th>
                <th style={{ color: 'var(--text-secondary)' }}>User Account</th>
                <th style={{ color: 'var(--text-secondary)' }}>Primary Guest</th>
                <th style={{ color: 'var(--text-secondary)' }}>Room & Guests</th>
                <th style={{ color: 'var(--text-secondary)' }}>Check-In / Out</th>
                <th style={{ color: 'var(--text-secondary)' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {allBookings.map((b) => (
                <tr key={b.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <td style={{ fontWeight: '700', color: 'var(--text-primary)', verticalAlign: 'top' }}>#{b.id}</td>
                  <td style={{ verticalAlign: 'top' }}>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{b.accountUser}</div>
                    {b.userEmail && <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{b.userEmail}</div>}
                    {b.userPhone && <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{b.userPhone}</div>}
                    {b.userDob && <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>DOB: {b.userDob}</div>}
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{b.guestName}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Age: {b.guestAge}</div>
                    {b.guestId && <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>ID: {b.guestId}</div>}
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{b.room}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{b.guests || 1} {b.guests === 1 ? 'Guest' : 'Guests'}</div>
                  </td>
                  <td style={{ fontSize: '0.92rem', color: 'var(--text-primary)', verticalAlign: 'top' }}>
                    <div style={{ fontWeight: '500' }}>{b.checkIn}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '2px 0' }}>to</div>
                    <div style={{ fontWeight: '500' }}>{b.checkOut}</div>
                  </td>
                  <td style={{ fontWeight: '700', color: 'var(--accent-blue)', fontSize: '1.1rem', verticalAlign: 'top' }}>
                    ₹{b.totalCost.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {allBookings.length === 0 && <p style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>No bookings yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
