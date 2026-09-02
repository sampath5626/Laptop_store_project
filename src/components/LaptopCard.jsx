import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../features/favoriteSlice";

function LaptopCard({ laptop, onDelete }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.some((item) => item.id === laptop.id);

  const fallbackImg =
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80";

  function handleFavoriteToggle() {
    if (isFavorite) {
      dispatch(removeFavorite(laptop.id));
    } else {
      dispatch(addFavorite(laptop));
    }
  }

  return (
    <div className="laptop-card">
      <div className="card-image-box">
        <div className="card-top-badges">
          <span className="brand-badge">{laptop.brand}</span>
          {laptop.rating && (
            <span className="rating-badge">
              ⭐ {laptop.rating}
            </span>
          )}
        </div>

        <img
          src={laptop.image || fallbackImg}
          alt={laptop.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImg;
          }}
        />
      </div>

      <div className="laptop-card-content">
        <h3>{laptop.name}</h3>

        <div className="specs-pills">
          {laptop.processor && <span className="spec-tag">⚙️ {laptop.processor}</span>}
          {laptop.ram && <span className="spec-tag">💾 {laptop.ram}</span>}
          {laptop.storage && <span className="spec-tag">🗄️ {laptop.storage}</span>}
        </div>

        <div className="laptop-price-section">
          <span className="price-label">Price:</span>
          <span className="price-value">
            ₹{Number(laptop.price).toLocaleString("en-IN")}
          </span>
        </div>

        <button
          className={`favorite-toggle-btn ${isFavorite ? "active" : ""}`}
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? "💖 In Favorites" : "🤍 Add To Favorites"}
        </button>
      </div>

      <div className="card-actions">
        <Link className="view-btn" to={`/laptops/${laptop.id}`}>
          View Details
        </Link>

        <Link className="edit-btn" to={`/edit-laptop/${laptop.id}`}>
          Edit
        </Link>

        <button
          className="delete-btn"
          onClick={() => onDelete(laptop.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default LaptopCard;
