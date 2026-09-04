import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import LaptopCard from "../components/LaptopCard";
import { isAdmin } from "../services/auth";

function Laptops() {
  const [laptops, setLaptops] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [budget, setBudget] = useState("All");
  const [sort, setSort] = useState("");
  const admin = isAdmin();

  useEffect(() => {
    getLaptops();
  }, []);

  async function getLaptops() {
    try {
      const response = await api.get("/laptops");
      setLaptops(response.data);
    } catch (error) {
      console.log("Error fetching laptops:", error);
    }
  }

  async function deleteLaptop(id) {
    if (!window.confirm("Are you sure you want to delete this laptop?")) {
      return;
    }

    try {
      await api.delete(`/laptops/${id}`);
      setLaptops((previousLaptops) =>
        previousLaptops.filter((laptop) => laptop.id !== id)
      );
    } catch (error) {
      console.log("Error deleting laptop:", error);
    }
  }

  // Combined Search, Category, Budget Filter & Sorting
  const filteredAndSortedLaptops = useMemo(() => {
    let result = laptops.filter((laptop) => {
      // 1. Search Filter (Name, Brand, Processor, Model)
      const query = search.trim().toLowerCase();
      const nameMatch = laptop.name?.toLowerCase().includes(query);
      const brandMatch = laptop.brand?.toLowerCase().includes(query);
      const processorMatch = laptop.processor?.toLowerCase().includes(query);
      const modelMatch = laptop.model?.toLowerCase().includes(query);
      const searchMatch = !query || nameMatch || brandMatch || processorMatch || modelMatch;

      // 2. Category Filter
      const categoryMatch =
        category === "All" ||
        (laptop.category &&
          laptop.category.toLowerCase() === category.toLowerCase());

      // 3. Budget / Price Range Filter
      let budgetMatch = true;
      const price = Number(laptop.price) || 0;
      if (budget === "low") {
        budgetMatch = price < 100000;
      } else if (budget === "medium") {
        budgetMatch = price >= 100000 && price <= 250000;
      } else if (budget === "high") {
        budgetMatch = price > 250000;
      }

      return searchMatch && categoryMatch && budgetMatch;
    });

    // 4. Sorting Logic
    if (sort === "rating-high") {
      result.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
    } else if (sort === "rating-low") {
      result.sort((a, b) => (Number(a.rating) || 0) - (Number(b.rating) || 0));
    } else if (sort === "price-high") {
      result.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    } else if (sort === "price-low") {
      result.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    }

    return result;
  }, [laptops, search, category, budget, sort]);

  function resetFilters() {
    setSearch("");
    setCategory("All");
    setBudget("All");
    setSort("");
  }

  return (
    <div className="laptops-page-container">
      <div className="cyber-ambient-orb orb-1"></div>
      <div className="cyber-ambient-orb orb-2"></div>
      <div className="cyber-ambient-orb orb-3"></div>

      <section className="laptop-section">
        <div className="laptop-page-header">
          <div>
            <span className="laptop-small-title">
              <span className="live-dot"></span> LIVE TECH INVENTORY // 2026
            </span>
            <h1>Explore Flagship Laptops</h1>
            <p>
              Search, filter by category & budget, sort by ratings, and discover powerful machines.
            </p>
          </div>

          <div className="header-right">
            <div className="laptop-count">
              ⚡ {filteredAndSortedLaptops.length} of {laptops.length} Units
            </div>
            {admin && (
              <Link to="/add-laptop" className="laptop-add-btn">
                + Add Machine
              </Link>
            )}
          </div>
        </div>

        {/* Day 5 Filters Section */}
        <div className="filters-bar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by brand, name, CPU (e.g. M3, RTX, ASUS, OLED)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="clear-search-btn" onClick={() => setSearch("")}>
                ✕
              </button>
            )}
          </div>

          <div className="filter-select-group">
            <div className="filter-item">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Gaming">Gaming</option>
                <option value="Creator">Creator</option>
                <option value="Ultrabook">Ultrabook</option>
                <option value="Business">Business</option>
                <option value="Productivity">Productivity</option>
                <option value="Student">Student</option>
                <option value="2-in-1">2-in-1 Convertible</option>
                <option value="Premium">Premium</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Budget</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="All">All Budgets</option>
                <option value="low">Under ₹1,00,000</option>
                <option value="medium">₹1,00,000 - ₹2,50,000</option>
                <option value="high">Above ₹2,50,000</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Sort By</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Featured Default</option>
                <option value="rating-high">⭐ Rating: High To Low</option>
                <option value="rating-low">⭐ Rating: Low To High</option>
                <option value="price-low">💰 Price: Low To High</option>
                <option value="price-high">💰 Price: High To Low</option>
              </select>
            </div>

            {(search || category !== "All" || budget !== "All" || sort !== "") && (
              <button className="reset-filters-btn" onClick={resetFilters}>
                🔄 Reset
              </button>
            )}
          </div>
        </div>

        {filteredAndSortedLaptops.length === 0 ? (
          <div className="no-results-box">
            <div className="no-results-icon">🔎</div>
            <h3>No Laptops Match Your Filters</h3>
            <p>Try adjusting your search keywords, category, or budget filter.</p>
            <button className="reset-btn" onClick={resetFilters}>
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="laptops">
            {filteredAndSortedLaptops.map((laptop) => (
              <LaptopCard
                key={laptop.id}
                laptop={laptop}
                onDelete={deleteLaptop}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Laptops;
