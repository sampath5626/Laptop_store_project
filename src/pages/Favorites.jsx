import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFavorite } from "../features/favoriteSlice";

function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const fallbackImg =
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="favorites-container">
      <div className="cyber-ambient-orb orb-1"></div>
      <div className="cyber-ambient-orb orb-2"></div>

      <div className="favorites-page-header">
        <span className="laptop-small-title">
          <span className="live-dot"></span> SAVED WISHLIST // REDUX STORE
        </span>
        <h1 className="page-title">Favorite Laptops</h1>
        <p>
          Your curated collection of top high-performance machines saved for quick access.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <div className="empty-icon">💔</div>
          <h2>No Favorite Laptops Yet</h2>
          <p>
            Browse our flagship inventory and click <strong>❤ Add To Favorites</strong> on any machine you love!
          </p>
          <Link to="/laptops" className="explore-btn">
            Explore Laptops →
          </Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((laptop) => (
            <div key={laptop.id} className="favorite-card">
              <div className="favorite-image-box">
                <span className="brand-badge">{laptop.brand}</span>
                <img
                  src={laptop.image || fallbackImg}
                  alt={laptop.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackImg;
                  }}
                />
              </div>

              <div className="favorite-content">
                <h3>{laptop.name}</h3>
                <p className="favorite-category">
                  🏷️ {laptop.category || "General"}
                </p>

                <div className="specs-pills">
                  {laptop.processor && (
                    <span className="spec-tag">⚙️ {laptop.processor}</span>
                  )}
                  {laptop.ram && (
                    <span className="spec-tag">💾 {laptop.ram}</span>
                  )}
                </div>

                <div className="favorite-price-row">
                  <span className="rating-badge">⭐ {laptop.rating || 4.5}</span>
                  <span className="favorite-price">
                    ₹{Number(laptop.price).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="favorite-actions">
                  <Link
                    to={`/laptops/${laptop.id}`}
                    className="fav-view-btn"
                  >
                    View Details
                  </Link>

                  <button
                    className="fav-remove-btn"
                    onClick={() => dispatch(removeFavorite(laptop.id))}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
