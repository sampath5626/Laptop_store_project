import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">
            ⚡ NEXT GENERATION LAPTOPS
          </span>

          <h1>
            POWER YOUR
            <br />
            <span>DIGITAL WORLD</span>
          </h1>

          <p>
            Discover high-performance laptops built for gaming,
            creativity, business, and everything in between.
          </p>

          <div className="hero-buttons">
            <Link to="/laptops" className="primary-btn">
              Explore Laptops →
            </Link>

            <Link to="/laptops" className="secondary-btn">
              View Collection
            </Link>
          </div>

          {/* STATS */}
          <div className="hero-stats">
            <div className="stat">
              <h3>50+</h3>
              <p>Laptops</p>
            </div>

            <div className="stat">
              <h3>15+</h3>
              <p>Brands</p>
            </div>

            <div className="stat">
              <h3>4.8★</h3>
              <p>Average Rating</p>
            </div>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="hero-image">
          <div className="glow-circle"></div>

          <img
            src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80"
            alt="Premium Laptop"
          />

          <div className="floating-card performance-card">
            <span>⚡</span>
            <div>
              <strong>High Performance</strong>
              <small>Up to 13th Gen Intel & Ryzen 7</small>
            </div>
          </div>

          <div className="floating-card speed-card">
            <span>🚀</span>
            <div>
              <strong>Fast & Powerful</strong>
              <small>Built for productivity</small>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="features-section">
        <div className="section-title">
          <span>WHY LAPTOP STORE</span>
          <h2>
            Built For Your
            <br />
            <strong>Digital Lifestyle</strong>
          </h2>
          <p>
            Everything you need to find the right machine
            for your work and entertainment.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <span>01</span>
            <h3>Powerful Performance</h3>
            <p>
              Experience ultra-fast processors, high-speed
              memory, and cutting-edge graphics.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🖥️</div>
            <span>02</span>
            <h3>Premium Displays</h3>
            <p>
              Enjoy razor-sharp visuals, OLED clarity, and immersive
              refresh rates.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔥</div>
            <span>03</span>
            <h3>Latest Technology</h3>
            <p>
              Discover modern laptops equipped with
              the latest hardware & AI acceleration.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <span>04</span>
            <h3>Reliable Quality</h3>
            <p>
              Carefully curated laptops from trusted
              global manufacturers.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY SECTION ================= */}
      <section className="category-section">
        <div className="section-heading">
          <div>
            <span>EXPLORE COLLECTION</span>
            <h2>
              Find Your
              <br />
              <strong>Perfect Machine</strong>
            </h2>
          </div>

          <Link to="/laptops" className="view-all-btn">
            View All →
          </Link>
        </div>

        <div className="category-grid">
          {/* GAMING */}
          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=900&q=80"
              alt="Gaming Laptop"
            />
            <div className="category-overlay">
              <span>GAMING</span>
              <h3>Dominate Every Game</h3>
              <p>High performance gaming machines with dedicated RTX GPUs</p>
              <Link to="/laptops">Explore Gaming →</Link>
            </div>
          </div>

          {/* BUSINESS */}
          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80"
              alt="Business Laptop"
            />
            <div className="category-overlay">
              <span>BUSINESS</span>
              <h3>Work Smarter</h3>
              <p>Reliable, lightweight machines for modern professionals</p>
              <Link to="/laptops">Explore Business →</Link>
            </div>
          </div>

          {/* CREATOR */}
          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80"
              alt="Creator Laptop"
            />
            <div className="category-overlay">
              <span>CREATOR</span>
              <h3>Create Without Limits</h3>
              <p>Color-accurate displays & powerhouse rendering specs</p>
              <Link to="/laptops">Explore Creator →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED LAPTOPS ================= */}
      <section className="featured-section">
        <div className="section-title">
          <span>FEATURED COLLECTION</span>
          <h2>
            Trending <strong>Machines</strong>
          </h2>
          <p>Some of our most popular and highest rated laptops.</p>
        </div>

        <div className="featured-grid">
          <div className="product-card">
            <div className="product-image">
              <span className="product-badge">POPULAR</span>
              <img
                src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80"
                alt="Next Gen Pro"
              />
            </div>
            <div className="product-info">
              <span>PERFORMANCE</span>
              <h3>Next Gen Pro</h3>
              <p>Powerful performance designed for everyday workflows and multitasking.</p>
              <div className="product-bottom">
                <strong>₹65,999</strong>
                <Link to="/laptops">View Collection →</Link>
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <span className="product-badge">GAMING</span>
              <img
                src="https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=800&q=80"
                alt="Ultra Gaming X"
              />
            </div>
            <div className="product-info">
              <span>GAMING</span>
              <h3>Ultra Gaming X</h3>
              <p>Built for extreme gaming, high FPS, and intensive workloads.</p>
              <div className="product-bottom">
                <strong>₹89,999</strong>
                <Link to="/laptops">View Collection →</Link>
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <span className="product-badge">PREMIUM</span>
              <img
                src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
                alt="Creator Studio"
              />
            </div>
            <div className="product-info">
              <span>CREATOR</span>
              <h3>Creator Studio</h3>
              <p>Vibrant display and high-end power for creators and developers.</p>
              <div className="product-bottom">
                <strong>₹1,09,999</strong>
                <Link to="/laptops">View Collection →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="home-cta">
        <span>READY TO UPGRADE?</span>
        <h2>Find Your Next Machine.</h2>
        <p>
          Explore our complete laptop catalog and discover the ideal device for your needs.
        </p>
        <Link to="/laptops" className="primary-btn">
          Browse All Laptops →
        </Link>
      </section>

    </div>
  );
}

export default Home;