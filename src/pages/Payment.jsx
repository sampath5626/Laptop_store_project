import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { getCurrentUser } from "../services/auth";
import { createSale } from "../services/sales";

function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [laptop, setLaptop] = useState(null);
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    async function loadLaptop() {
      try {
        const response = await api.get(`/laptops/${id}`);
        setLaptop(response.data);
      } catch {
        setError("Unable to load this laptop.");
      }
    }

    loadLaptop();
  }, [id]);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setProcessing(true);

    try {
      const user = getCurrentUser();
      await createSale({
        laptopId: laptop.id,
        laptopName: laptop.name,
        amount: Number(laptop.price) || 0,
        customerName: user.name,
        customerEmail: user.email,
        paymentStatus: "Paid",
        purchasedAt: new Date().toISOString()
      });
      navigate("/laptops", { state: { purchaseComplete: true } });
    } catch {
      setError("Payment could not be completed. Please try again.");
      setProcessing(false);
    }
  }

  if (!laptop) {
    return <div className="laptop-loading">Loading secure checkout...</div>;
  }

  return (
    <div className="payment-page">
      <div className="payment-header">
        <span className="laptop-small-title">SECURE CHECKOUT</span>
        <h1>Complete Your Purchase</h1>
        <p>Your payment details are used only to process this order.</p>
      </div>

      <div className="payment-layout">
        <section className="payment-summary">
          <span className="laptop-details-brand">ORDER SUMMARY</span>
          <h2>{laptop.name}</h2>
          <p>{laptop.brand} {laptop.model ? `• ${laptop.model}` : ""}</p>
          <strong>₹{Number(laptop.price).toLocaleString("en-IN")}</strong>
          <Link to={`/laptops/${laptop.id}`} className="cancel-btn">Back to details</Link>
        </section>

        <form className="payment-form" onSubmit={handleSubmit}>
          <h2>Payment Details</h2>
          {error && <div className="auth-error">{error}</div>}
          <label>Cardholder Name<input name="cardName" value={formData.cardName} onChange={handleChange} required /></label>
          <label>Card Number<input name="cardNumber" inputMode="numeric" maxLength="19" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={handleChange} required /></label>
          <div className="payment-row">
            <label>Expiry Date<input name="expiry" placeholder="MM/YY" maxLength="5" value={formData.expiry} onChange={handleChange} required /></label>
            <label>CVV<input name="cvv" type="password" inputMode="numeric" maxLength="4" value={formData.cvv} onChange={handleChange} required /></label>
          </div>
          <button className="payment-submit-btn" type="submit" disabled={processing}>
            {processing ? "Processing..." : `Pay ₹${Number(laptop.price).toLocaleString("en-IN")}`}
          </button>
          <small className="payment-note">Demo checkout: no real charge is made.</small>
        </form>
      </div>
    </div>
  );
}

export default Payment;