import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Rooms = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('hotel_user_name');
    if (!storedName) {
      alert("Please login to view rooms.");
      navigate('/login');
    } else {
      setUserName(storedName);
    }
  }, [navigate]);

  const roomsData = [
    { 
      id: 1, 
      name: 'Deluxe Suite', 
      price: 12500, 
      details: 'Queen Bed • City View', 
      img: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=600&q=80',
      description: 'Our Deluxe Suite offers a seamless blend of sophisticated design and modern functionality. Perfect for corporate travelers or couples seeking a dynamic city retreat.',
      amenities: ['📶 Free High-Speed Wi-Fi', '📺 55" Apple TV', '☕ Nespresso Machine', '🧼 Premium Toiletries']
    },
    { 
      id: 2, 
      name: 'Oceanview Suite', 
      price: 24999, 
      details: 'King Bed • Balcony', 
      img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      description: 'Wake up to the soothing sound of crashing waves. The Oceanview Suite features a sprawling private balcony, a lavish king-sized bed, and floor-to-ceiling panoramic glass windows.',
      amenities: ['🌊 Private Ocean Balcony', '🛁 Marble Bathtub', '🍹 Fully Stocked Minibar', '🛎️ 24/7 Butler Service']
    },
    { 
      id: 3, 
      name: 'Penthouse Retreat', 
      price: 71500, 
      details: '2 Bedrooms • Private Pool', 
      img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80',
      description: 'The pinnacle of luxury. Spanning the entire top floor, this ultra-exclusive penthouse features two master bedrooms, an expansive living lounge, and a private infinity pool overlooking the horizon.',
      amenities: ['🏊‍♂️ Private Infinity Pool', '🍷 Exclusive Wine Cellar', '🧖‍♂️ Private In-suite Sauna', '🚗 Private Airport Chauffeur']
    }
  ];

  const viewDetails = (room) => {
    // Pass the selected room data via React Router state
    navigate('/room-details', { state: { room } });
  };

  return (
    <div style={{ padding: '20px', width: '100%', maxWidth: '1100px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '42px', marginBottom: '40px', fontWeight: '700' }}>
        Select Your Suite, {userName}.
      </h1>

      <div className="rooms-grid">
        {roomsData.map((room) => (
          <div key={room.id} className="apple-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <img src={room.img} alt={room.name} className="room-img" />
              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '22px' }}>{room.name}</h3>
                <p style={{ margin: '0 0 10px 0', color: 'var(--text-secondary)' }}>{room.details}</p>
                <h4 style={{ margin: '0 0 15px 0', fontSize: '20px', color: 'var(--text-primary)' }}>
                  ₹{room.price.toLocaleString('en-IN')} <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>/ night</span>
                </h4>
              </div>
            </div>
            <div style={{ padding: '0 20px 20px 20px' }}>
              <button className="apple-btn" style={{ width: '100%' }} onClick={() => viewDetails(room)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;