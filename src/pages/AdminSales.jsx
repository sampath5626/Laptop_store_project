import { useEffect, useState } from "react";
import { getSales } from "../services/sales";

function AdminSales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getSales().then(setSales);
  }, []);

  const revenue = sales.reduce((total, sale) => total + (Number(sale.amount) || 0), 0);
  const averageOrder = sales.length ? revenue / sales.length : 0;
  const uniqueCustomers = new Set(sales.map((sale) => sale.customerEmail || sale.customerName).filter(Boolean)).size;
  const laptopTotals = sales.reduce((totals, sale) => {
    const name = sale.laptopName || "Unknown laptop";
    totals[name] = (totals[name] || 0) + (Number(sale.amount) || 0);
    return totals;
  }, {});
  const topLaptop = Object.entries(laptopTotals).sort(([, first], [, second]) => second - first)[0];
  const recentDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));
    const key = date.toISOString().slice(0, 10);
    const daySales = sales.filter((sale) => sale.purchasedAt?.slice(0, 10) === key);
    return {
      label: date.toLocaleDateString("en-IN", { weekday: "short" }),
      amount: daySales.reduce((total, sale) => total + (Number(sale.amount) || 0), 0),
      count: daySales.length
    };
  });
  const maxDayRevenue = Math.max(...recentDays.map((day) => day.amount), 1);
  const laptopBreakdown = Object.entries(laptopTotals)
    .sort(([, first], [, second]) => second - first)
    .slice(0, 5);
  const maxLaptopRevenue = Math.max(...laptopBreakdown.map(([, amount]) => amount), 1);

  return (
    <div className="sales-page">
      <div className="payment-header">
        <span className="laptop-small-title">ADMIN CONTROL CENTER</span>
        <h1>Sales Dashboard</h1>
        <p>Monitor completed laptop purchases across the store.</p>
      </div>

      <div className="sales-stats">
        <div className="sales-stat"><span>Total Sales</span><strong>{sales.length}</strong></div>
        <div className="sales-stat"><span>Total Revenue</span><strong>₹{revenue.toLocaleString("en-IN")}</strong></div>
      </div>

      <section className="sales-analysis">
        <div className="analysis-heading">
          <div>
            <span className="laptop-details-brand">PERFORMANCE INSIGHTS</span>
            <h2>Sales Analysis</h2>
          </div>
          <span className="analysis-period">LAST 7 DAYS</span>
        </div>

        <div className="analysis-kpis">
          <div className="analysis-kpi"><span>Average order value</span><strong>₹{Math.round(averageOrder).toLocaleString("en-IN")}</strong></div>
          <div className="analysis-kpi"><span>Unique customers</span><strong>{uniqueCustomers}</strong></div>
          <div className="analysis-kpi"><span>Top laptop</span><strong>{topLaptop?.[0] || "No data yet"}</strong></div>
          <div className="analysis-kpi"><span>Top laptop revenue</span><strong>₹{(topLaptop?.[1] || 0).toLocaleString("en-IN")}</strong></div>
        </div>

        <div className="analysis-grid">
          <div className="analysis-panel">
            <div className="analysis-panel-title"><h3>Revenue trend</h3><span>₹ by day</span></div>
            <div className="revenue-chart" aria-label="Revenue for the last seven days">
              {recentDays.map((day) => (
                <div className="revenue-column" key={day.label} title={`${day.label}: ₹${day.amount.toLocaleString("en-IN")}`}>
                  <div className="revenue-bar-track"><div className="revenue-bar" style={{ height: `${Math.max((day.amount / maxDayRevenue) * 100, day.amount ? 8 : 2)}%` }} /></div>
                  <strong>{day.count}</strong><span>{day.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="analysis-panel">
            <div className="analysis-panel-title"><h3>Product performance</h3><span>Revenue share</span></div>
            {laptopBreakdown.length === 0 ? <p className="analysis-empty">Sales data will appear here after the first order.</p> : (
              <div className="product-bars">
                {laptopBreakdown.map(([name, amount]) => (
                  <div className="product-bar-row" key={name}>
                    <div className="product-bar-label"><span>{name}</span><strong>₹{amount.toLocaleString("en-IN")}</strong></div>
                    <div className="product-bar-track"><div className="product-bar" style={{ width: `${(amount / maxLaptopRevenue) * 100}%` }} /></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="sales-table-wrap">
        <h2>Recent Orders</h2>
        {sales.length === 0 ? (
          <p className="empty-sales">No completed sales yet.</p>
        ) : (
          <div className="sales-table-scroll">
            <table className="sales-table">
              <thead><tr><th>Laptop</th><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {sales.slice().reverse().map((sale) => (
                  <tr key={sale.id || sale.purchasedAt}>
                    <td>{sale.laptopName}</td><td>{sale.customerName}<small>{sale.customerEmail}</small></td>
                    <td>₹{Number(sale.amount).toLocaleString("en-IN")}</td><td><span className="sale-status">{sale.paymentStatus}</span></td>
                    <td>{new Date(sale.purchasedAt).toLocaleDateString("en-IN")}</td>
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

export default AdminSales;