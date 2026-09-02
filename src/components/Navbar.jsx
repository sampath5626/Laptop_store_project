import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const favorites = useSelector((state) => state.favorites);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        ⚡ <span>Sam's Laptop Store</span>
      </Link>

      <div className="nav-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>

        <NavLink 
          to="/laptops" 
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Laptops
        </NavLink>

        <NavLink 
          to="/favorites" 
          className={({ isActive }) => (isActive ? "active nav-fav-link" : "nav-fav-link")}
        >
          Favorites <span className="fav-counter-badge">{favorites.length}</span>
        </NavLink>

        {!user ? (
          <>
            <NavLink 
              to="/register" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Register
            </NavLink>

            <Link to="/login" className="nav-login-btn">
              Login →
            </Link>
          </>
        ) : (
          <>
            <span className="user-greeting">
              👤 <strong className="user-name">{user.name}</strong>
            </span>

            <Link to="/add-laptop" className="nav-add-btn">
              + Add Laptop
            </Link>

            <Link to="/logout" className="nav-logout-btn">
              Logout
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
