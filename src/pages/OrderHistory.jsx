import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/auth";
import { getSales } from "../services/sales";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const user = getCurrentUser();

  useEffect(() => {
    async function loadOrders() {
      const sales = await getSales();
      const email = user?.email?.toLowerCase();
      setOrders(
        sales
          .filter((sale) => sale.customerEmail?.toLowerCase() === email)
          .sort((first, second) => new Date(second.purchasedAt) - new Date(first.purchasedAt))
      );
    }

    loadOrders();
  }, [user?.email]);

  const totalSpent = orders.reduce(
    (total, order) => total + (Number(order.amount) || 0),
    0
  );

  return (
    <div className="sales-page">
      <div className="payment-header">
        <span className="laptop-small-title">YOUR ACCOUNT</span>
        <h1>Order History</h1>
        <p>Review your previous laptop purchases and payment status.</p>
      </div>

      <div className="sales-stats">
        <div className="sales-stat">
          <span>Total Orders</span>
          <strong>{orders.length}</strong>
        </div>
        <div className="sales-stat">
          <span>Total Spent</span>
          <strong>₹{totalSpent.toLocaleString("en-IN")}</strong>
        </div>
      </div>

      <section className="sales-table-wrap">
        <h2>Previous Orders</h2>
        {orders.length === 0 ? (
          <>
            <p className="empty-sales">You have not placed any orders yet.</p>
            <Link to="/laptops" className="explore-btn">
              Explore Laptops →
            </Link>
          </>
        ) : (
          <div className="sales-table-scroll">
            <table className="sales-table">
              <thead>
                <tr>
                  <th>Laptop</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Ordered On</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id || `${order.laptopId}-${order.purchasedAt}`}>
                    <td>{order.laptopName || "Laptop"}</td>
                    <td>₹{Number(order.amount).toLocaleString("en-IN")}</td>
                    <td><span className="sale-status">{order.paymentStatus || "Paid"}</span></td>
                    <td>{new Date(order.purchasedAt).toLocaleDateString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default OrderHistory;