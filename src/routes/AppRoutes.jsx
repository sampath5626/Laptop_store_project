import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Laptops from "../pages/Laptops";
import LaptopDetails from "../pages/LaptopDetails";
import AddLaptop from "../pages/AddLaptop";
import EditLaptop from "../pages/EditLaptop";
import Favorites from "../pages/Favorites";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import ProtectedRoute from "./ProtectedRoute";
import Payment from "../pages/Payment";
import AdminSales from "../pages/AdminSales";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/laptops" element={<Laptops />} />
      <Route path="/laptops/:id" element={<LaptopDetails />} />
      <Route path="/favorites" element={<Favorites />} />

      {/* Auth Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      {/* Protected Routes */}
      <Route
        path="/add-laptop"
        element={
          <ProtectedRoute adminOnly>
            <AddLaptop />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-laptop/:id"
        element={
          <ProtectedRoute adminOnly>
            <EditLaptop />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment/:id"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/sales"
        element={
          <ProtectedRoute adminOnly>
            <AdminSales />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
