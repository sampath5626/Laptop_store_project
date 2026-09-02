import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";

function EditLaptop() {
  const { id } = useParams();
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

  useEffect(() => {
    getLaptop();
  }, [id]);

  async function getLaptop() {
    try {
      const response = await api.get(`/laptops/${id}`);
      setFormData({
        ...response.data,
        operatingSystem: response.data.operatingSystem || response.data.os || ""
      });
    } catch (error) {
      console.log("Error loading laptop to edit:", error);
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.put(`/laptops/${id}`, {
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating)
      });

      navigate("/laptops");
    } catch (error) {
      console.log("Error updating laptop:", error);
    }
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Edit Laptop</h1>
        <p>Update laptop specifications and details</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              placeholder="e.g. Apple, Dell, ASUS"
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
              placeholder="e.g. MacBook Pro 16, Dell XPS 15"
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
              placeholder="e.g. XPS 9530"
              value={formData.model}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="e.g. Gaming, Business, Ultrabook"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Processor</label>
            <input
              type="text"
              name="processor"
              placeholder="e.g. Intel Core i7-13700H / Apple M3"
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
              placeholder="e.g. 512GB SSD / 1TB SSD"
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
              placeholder="e.g. 15.6-inch FHD / 16-inch Liquid Retina"
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
              placeholder="e.g. NVIDIA RTX 4060 / Intel Iris Xe"
              value={formData.graphics}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Operating System</label>
            <input
              type="text"
              name="operatingSystem"
              placeholder="e.g. Windows 11 Home / macOS"
              value={formData.operatingSystem}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              placeholder="e.g. 75000"
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
              placeholder="e.g. 4.7"
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
              placeholder="e.g. 1.6 kg"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              placeholder="Paste direct image link"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Detailed description of laptop features..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Update Laptop
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

export default EditLaptop;