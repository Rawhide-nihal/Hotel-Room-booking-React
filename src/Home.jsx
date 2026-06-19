import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('hotel_user_name');
    if (storedUser) {
      setIsLoggedIn(true);
      setUserName(storedUser);
    }
  }, []);

  const services = [
    { icon: '🛎️', title: '24/7 Concierge', desc: 'Always at your service.' },
    { icon: '🏊‍♂️', title: 'Infinity Pool', desc: 'Panoramic ocean views.' },
    { icon: '🧖‍♀️', title: 'Luxury Spa', desc: 'World-class relaxation.' },
    { icon: '🍽️', title: 'Fine Dining', desc: 'Michelin-star chefs.' },
    { icon: '🚗', title: 'Valet Parking', desc: 'Seamless arrivals.' },
    { icon: '🌐', title: 'Gigabit Wi-Fi', desc: 'Blazing fast internet.' },
    { icon: '🏋️‍♂️', title: 'Fitness Center', desc: 'Modern equipment and trainers.' },
    { icon: '🛏️', title: 'Turn-down Service', desc: 'Evening turndown for comfort.' },
    { icon: '🍸', title: 'Rooftop Bar', desc: 'Sunset cocktails with city views.' },
    { icon: '🧺', title: 'Laundry Service', desc: 'Express laundry and dry-cleaning.' },
    { icon: '🧾', title: 'Business Center', desc: 'Meeting rooms and workspaces.' },
    { icon: '🐾', title: 'Pet Friendly', desc: 'Welcoming pets with special amenities.' },
  ];

  return (
    <div className="page-shell">
      <section className="hero-panel large-hero">
        <div>
          <p className="panel-heading">Luxury hospitality reimagined</p>
          <h1 className="hero-title">Stay where every detail feels effortless.</h1>
          <p className="hero-copy">
            Discover stunning suites, elevated service, and a seamless booking experience built for the way modern travelers live.
          </p>
          <div className="cta-group">
            {isLoggedIn ? (
              <>
                <Link to="/rooms">
                  <button className="apple-btn">Explore Suites</button>
                </Link>
                <Link to="/history">
                  <button className="apple-btn secondary">View My Bookings</button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="apple-btn">Sign In</button>
                </Link>
                <Link to="/signup">
                  <button className="apple-btn secondary">Create Account</button>
                </Link>
              </>
            )}
          </div>
        </div>

        <aside className="apple-card card-hero" aria-label="Quick search panel">
          <h3 className="panel-heading">Quick Search</h3>
          <p className="panel-copy">Find rooms by date, guests, and preferences.</p>
          <div style={{ marginTop: 14 }}>
            <input className="apple-input" placeholder="Check-in — Check-out" aria-label="dates" />
            <div style={{ height: 12 }} />
            <div className="field-row">
              <input className="apple-input" placeholder="Guests" aria-label="guests" />
              <select className="apple-input" aria-label="room type">
                <option>Any room type</option>
                <option>Standard</option>
                <option>Suite</option>
              </select>
            </div>
            <div style={{ marginTop: 12 }} />
            <div className="cta-group">
              <button className="apple-btn">Search</button>
            </div>
          </div>
        </aside>
      </section>

      <section className="section-panel">
        <div>
          <h2 className="section-title">Amenities designed around your stay</h2>
          <p className="section-copy">
            From private beaches to wellness experiences, every moment is curated to feel premium and effortless.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h4 style={{ margin: '0 0 10px', fontWeight: '700' }}>{service.title}</h4>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
