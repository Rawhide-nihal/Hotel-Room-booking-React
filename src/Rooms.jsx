import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Rooms = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(150000);
  const navigate = useNavigate();

  const roomsData = [
    { id: 1, name: 'Standard Room', price: 3500, details: 'Queen Bed • City View', img: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=600&q=80', description: 'Cozy and efficient for short stays.', amenities: ['📶 Wi-Fi', '📺 TV'] },
    { id: 2, name: 'Executive Room', price: 5500, details: 'King Bed • Work Desk', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80', description: 'Perfect for business travelers needing space.', amenities: ['📶 Wi-Fi', '☕ Coffee Maker'] },
    { id: 3, name: 'Premium Sea View', price: 8000, details: 'King Bed • Ocean View', img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80', description: 'Wake up to the sounds of the ocean.', amenities: ['🌊 Sea View', '🥂 Minibar'] },
    { id: 4, name: 'Maharaja Tent', price: 10000, details: 'Luxury Glamping', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80', description: 'Experience royal heritage in our climate-controlled outdoor tents.', amenities: ['🔥 Firepit', '🛎️ Room Service'] },
    { id: 5, name: 'Luxury Suite', price: 12500, details: 'Separate Living Area', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80', description: 'Spacious elegance with premium furnishings.', amenities: ['🛋️ Lounge', '🛁 Bathtub'] },
    { id: 6, name: 'Family Connected Suite', price: 15000, details: '2 Bedrooms • 4 Guests', img: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80', description: 'Keep the family together without sacrificing privacy.', amenities: ['🎮 Game Console', '👨‍👩‍👧‍👦 Extra Beds'] },
    { id: 7, name: 'Oceanfront Cabana', price: 18000, details: 'Beach Access', img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=600&q=80', description: 'Step directly onto the sand from your private deck.', amenities: ['🏖️ Private Beach', '🍹 Welcome Drinks'] },
    { id: 8, name: 'Royal Suite', price: 25000, details: 'Panoramic City Views', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80', description: 'High-floor luxury with unmatched cityscapes.', amenities: ['🌆 High Floor', '🍾 Champagne'] },
    { id: 9, name: 'Presidential Suite', price: 45000, details: 'Ultimate Luxury', img: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=600&q=80', description: 'The choice for dignitaries and celebrities.', amenities: ['🎹 Grand Piano', '🛡️ Security'] },
    { id: 10, name: 'Sky-high Penthouse', price: 60000, details: 'Rooftop Access', img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80', description: 'Own the top of the building for the night.', amenities: ['🚁 Helipad Access', '🍷 Wine Cellar'] },
    { id: 11, name: 'Private Villa with Pool', price: 85000, details: 'Secluded Estate', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80', description: 'Absolute privacy with your own temperature-controlled pool.', amenities: ['🏊‍♂️ Private Pool', '🧑‍🍳 Private Chef'] },
    { id: 12, name: 'The Imperial Residence', price: 120000, details: '3 Bedrooms • Cinema', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80', description: 'The absolute pinnacle of Indian hospitality.', amenities: ['🎬 Private Cinema', '🚗 Rolls Royce Transfer'] }
  ];

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('hotel_user_name'));
  }, []);

  const filteredRooms = roomsData.filter(room => 
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) && room.price <= maxPrice
  );

  return (
    <div className="page-shell">
      {!isLoggedIn ? (
        <div className="apple-card" style={{ maxWidth: '520px', margin: '0 auto' }}>
          <div className="card-hero" style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '72px', display: 'block', marginBottom: '18px' }}>🔒</span>
            <h2 className="page-title">Exclusive Suite Collection</h2>
            <p className="card-copy">Sign in to unlock our catalog and reserve your stay with premium member perks.</p>
            <div className="cta-group" style={{ justifyContent: 'center' }}>
              <button className="apple-btn" onClick={() => navigate('/login')}>Log In</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <section style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px' }}>
              <div>
                <h1 className="section-title">Select your suite</h1>
                <p className="section-copy">Browse premium rooms, filter by price, and book with confidence.</p>
              </div>
            </div>
          </section>

          <div className="apple-card" style={{ padding: '28px', marginBottom: '40px' }}>
            <div className="field-row">
              <div>
                <label className="field-label">Search suites</label>
                <input type="text" className="apple-input" placeholder="Search (e.g. Pool)" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <div>
                <label className="field-label">Max price: ₹{maxPrice.toLocaleString('en-IN')}</label>
                <input type="range" min="3000" max="150000" step="5000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
              </div>
            </div>
          </div>

          <div className="rooms-grid">
            {filteredRooms.map((room) => (
              <div key={room.id} className="room-card">
                <img src={room.img} alt={room.name} />
                <div className="room-card-body">
                  <h3 className="room-card-title">{room.name}</h3>
                  <p className="room-card-meta">{room.details}</p>
                  <p className="room-card-price">₹{room.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="room-card-footer">
                  <button className="apple-btn" style={{ width: '100%' }} onClick={() => navigate('/booking-form', { state: { room } })}>Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Rooms;