import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function LaptopDetails() {
  const { id } = useParams();
  const [laptop, setLaptop] = useState(null);
  const fallbackImg = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80";

  useEffect(() => {
    getLaptop();
  }, [id]);

  async function getLaptop() {
    try {
      const response = await api.get(`/laptops/${id}`);
      setLaptop(response.data);
    } catch (error) {
      console.log("Error fetching laptop details:", error);
    }
  }

  if (!laptop) {
    return (
      <div className="laptop-loading">
        Loading laptop details...
      </div>
    );
  }

  return (
    <div className="details-page-wrapper">
      <section className="laptop-details">
        <div className="laptop-details-image-box">
          <img
            src={laptop.image || fallbackImg}
            alt={laptop.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImg;
            }}
          />
        </div>

        <div className="laptop-details-content">
          <span className="laptop-details-brand">{laptop.brand}</span>
          <h1>{laptop.name}</h1>

          <p className="laptop-details-description">
            {laptop.description}
          </p>

          <div className="laptop-details-price-row">
            <div className="laptop-details-price">
              ₹{Number(laptop.price).toLocaleString("en-IN")}
            </div>
            {laptop.rating && (
              <span className="rating-tag">
                ⭐ {laptop.rating} Rating
              </span>
            )}
          </div>

          <div className="laptop-information">
            <div className="information-box">
              <span>Processor</span>
              <strong>{laptop.processor || "N/A"}</strong>
            </div>

            <div className="information-box">
              <span>RAM</span>
              <strong>{laptop.ram || "N/A"}</strong>
            </div>

            <div className="information-box">
              <span>Storage</span>
              <strong>{laptop.storage || "N/A"}</strong>
            </div>

            <div className="information-box">
              <span>Display</span>
              <strong>{laptop.display || "N/A"}</strong>
            </div>

            <div className="information-box">
              <span>Graphics</span>
              <strong>{laptop.graphics || "N/A"}</strong>
            </div>

            <div className="information-box">
              <span>Operating System</span>
              <strong>{laptop.operatingSystem || laptop.os || "Windows 11"}</strong>
            </div>

            <div className="information-box">
              <span>Battery</span>
              <strong>{laptop.battery || "N/A"}</strong>
            </div>

            <div className="information-box">
              <span>Weight</span>
              <strong>{laptop.weight || "N/A"}</strong>
            </div>
          </div>

          <div className="details-action-buttons">
            <Link to="/laptops" className="back-laptops-btn">
              ← Back to Laptops
            </Link>

            <Link to={`/edit-laptop/${laptop.id}`} className="edit-details-btn">
              ✏️ Edit Laptop
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LaptopDetails;