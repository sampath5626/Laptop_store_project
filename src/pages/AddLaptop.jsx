import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function AddLaptop() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brand: "",
    name: "",
    model: "",
    category: "",
    processor: "",
    ram: "",
    storage: "",
    display: "",
    graphics: "",
    operatingSystem: "",
    image: "",
    description: "",
    rating: "",
    price: "",
    battery: "",
    weight: "",
    color: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/laptops", {
        ...formData,
        rating: Number(formData.rating) || 4.5,
        price: Number(formData.price)
      });

      navigate("/laptops");
    } catch (error) {
      console.log("Error adding laptop:", error);
    }
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Add New Laptop</h2>
        <p>Fill in the laptop specifications to add it to the catalog</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              placeholder="e.g. Apple, ASUS, Lenovo"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Laptop Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. ROG Zephyrus G14"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Model</label>
            <input
              type="text"
              name="model"
              placeholder="e.g. GA402"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="e.g. Gaming, Ultrabook, Business"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Processor</label>
            <input
              type="text"
              name="processor"
              placeholder="e.g. AMD Ryzen 9 7940HS"
              value={formData.processor}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>RAM</label>
            <input
              type="text"
              name="ram"
              placeholder="e.g. 16GB / 32GB"
              value={formData.ram}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Storage</label>
            <input
              type="text"
              name="storage"
              placeholder="e.g. 1TB SSD"
              value={formData.storage}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Display</label>
            <input
              type="text"
              name="display"
              placeholder="e.g. 14-inch QHD+ 165Hz"
              value={formData.display}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Graphics</label>
            <input
              type="text"
              name="graphics"
              placeholder="e.g. NVIDIA RTX 4070"
              value={formData.graphics}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Operating System</label>
            <input
              type="text"
              name="operatingSystem"
              placeholder="e.g. Windows 11 Home"
              value={formData.operatingSystem}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              placeholder="e.g. 149999"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Rating (0 to 5)</label>
            <input
              type="number"
              step="0.1"
              name="rating"
              placeholder="e.g. 4.8"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Battery Life</label>
            <input
              type="text"
              name="battery"
              placeholder="e.g. 10 Hours"
              value={formData.battery}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Weight</label>
            <input
              type="text"
              name="weight"
              placeholder="e.g. 1.65 kg"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              placeholder="Direct image link (https://...)"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Describe laptop features, build quality, and use cases..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Add Laptop
            </button>
            <Link to="/laptops" className="cancel-btn">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddLaptop;