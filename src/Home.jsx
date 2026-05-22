import { Link } from 'react-router-dom';

const Home = () => {
  const services = [
    { icon: "🛎️", title: "24/7 Concierge", desc: "Always at your service." },
    { icon: "🏊‍♂️", title: "Infinity Pool", desc: "Panoramic ocean views." },
    { icon: "🧖‍♀️", title: "Luxury Spa", desc: "World-class relaxation." },
    { icon: "🍽️", title: "Fine Dining", desc: "Michelin-star chefs." },
    { icon: "🥂", title: "Room Service", desc: "Gourmet dining in bed." },
    { icon: "🚗", title: "Valet Parking", desc: "Seamless arrivals." },
    { icon: "💪", title: "Fitness Center", desc: "State-of-the-art gym." },
    { icon: "🌐", title: "Gigabit Wi-Fi", desc: "Blazing fast internet." },
    { icon: "🏖️", title: "Private Beach", desc: "Exclusive coastline access." },
    { icon: "🐾", title: "Pet Friendly", desc: "Luxury for your pets." },
    { icon: "🚁", title: "Helipad", desc: "Arrive in ultimate style." },
    { icon: "👶", title: "Childcare", desc: "Professional babysitting." }
  ];

  return (
    <div style={{ textAlign: 'center', padding: '20px', maxWidth: '1000px', width: '100%' }}>
      
      {/* Hero Section */}
      <h1 style={{ fontSize: '64px', fontWeight: '700', letterSpacing: '-0.02em', margin: '0 0 10px 0' }}>
        Escape to Paradise.
      </h1>
      <p style={{ fontSize: '24px', color: 'var(--text-primary)', opacity: 0.8, margin: '0 0 40px 0' }}>
        Experience world-class luxury, pristine beaches, and unforgettable moments.
      </p>

      <img 
        src="https://images.unsplash.com/photo-1542314831-c6a4d1424869?auto=format&fit=crop&w=1200&q=80" 
        alt="Luxury Hotel Exterior" 
        className="hero-img"
      />

      {/* Booking Call to Action */}
      <div className="apple-card" style={{ padding: '40px', marginTop: '20px', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 15px 0', fontSize: '32px' }}>A Stay Like No Other</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
          Nestled along the vibrant coastline, our resort offers an oasis of tranquility. 
          Sign in to view our exclusive suites and secure your reservation today.
        </p>
        <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <Link to="/login"><button className="apple-btn">Sign In to Book</button></Link>
          <Link to="/signup"><button className="apple-btn" style={{ background: 'var(--card-bg)', color: 'var(--text-primary)', border: '1px solid var(--text-secondary)' }}>Create Account</button></Link>
        </div>
      </div>

      {/* Services Grid Section */}
      <div style={{ marginTop: '60px', textAlign: 'left' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '10px' }}>Unmatched Amenities.</h2>
        <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Everything you need for the perfect getaway.</p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h4 style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: '600' }}>{service.title}</h4>
              <p style={{ margin: '0', fontSize: '14px', color: 'var(--text-secondary)' }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Home;