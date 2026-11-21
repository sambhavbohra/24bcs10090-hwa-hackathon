'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { formatINR, resolveProductImage } from '@/lib/products';
import { useCart } from './CartProvider';
import ProductArt from './ProductArt';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  notes: '',
};

export default function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, hydrated, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!items.length || submitting) return;
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            variant: item.selection,
          })),
          customer: form,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data || !data.ok) {
        setError(
          data?.error?.message ||
            'We could not place that order. Please check your details and try again.'
        );
        setSubmitting(false);
        return;
      }

      try {
        window.sessionStorage.setItem(
          `stay-order-${data.orderId}`,
          JSON.stringify(data)
        );
      } catch {
        // The confirmation page still shows the order id if storage is unavailable.
      }

      setPlaced(true);
      clearCart();
      router.push(`/order/${data.orderId}`);
    } catch {
      setError('We could not reach the order service. Please try again.');
      setSubmitting(false);
    }
  }

  if (!hydrated) {
    return <div className="cart-loading">Loading your cart…</div>;
  }

  if (!items.length && !placed && !submitting) {
    return (
      <div className="empty-card">
        <h2>There is nothing to check out yet.</h2>
        <p>Add a Stay Station or a bundle, then come back here.</p>
        <Link href="/#range" className="btn btn-primary">
          Explore Stay
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-layout">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Delivery details</h3>
          <div className="form-grid">
            <label className="field field-full">
              <span>Full name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
                placeholder="Your name"
              />
            </label>
            <label className="field">
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </label>
            <label className="field">
              <span>Phone</span>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
                required
                placeholder="+91"
              />
            </label>
            <label className="field field-full">
              <span>Address</span>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                autoComplete="street-address"
                required
                placeholder="House, street, area"
              />
            </label>
            <label className="field">
              <span>City</span>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                autoComplete="address-level2"
                required
                placeholder="City"
              />
            </label>
            <label className="field">
              <span>State</span>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                autoComplete="address-level1"
                required
                placeholder="State"
              />
            </label>
            <label className="field">
              <span>PIN code</span>
              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                autoComplete="postal-code"
                inputMode="numeric"
                pattern="[0-9]{4,8}"
                required
                placeholder="6-digit PIN"
              />
            </label>
            <label className="field field-full">
              <span>Delivery notes (optional)</span>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Gate code, safe place, anything useful"
              />
            </label>
          </div>
        </div>

        <div className="form-note">
          No payment is collected. Placing the order confirms it directly, and
          you will see an order ID on the next screen.
        </div>

        {error ? <div className="form-error">{error}</div> : null}

        <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
          {submitting ? 'Placing order…' : `Place order · ${formatINR(subtotal)}`}
        </button>
      </form>

      <aside className="checkout-summary">
        <h3>Your order</h3>
        <div className="checkout-items">
          {items.map((item) => (
            <div className="checkout-item" key={item.key}>
              <div className="checkout-item-image">
                <ProductArt
                  art={item.product.art}
                  image={resolveProductImage(item.product, item.selection)}
                  alt={item.product.name}
                  sizes="56px"
                />
              </div>
              <div className="checkout-item-info">
                <span className="checkout-item-name">{item.product.name}</span>
                {item.label ? <span className="checkout-item-variant">{item.label}</span> : null}
                <span className="checkout-item-qty">Qty {item.quantity}</span>
              </div>
              <span>{formatINR(item.lineTotal)}</span>
            </div>
          ))}
        </div>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{formatINR(subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="summary-row">
          <span>Tax</span>
          <span>Included</span>
        </div>
        <div className="summary-row summary-total">
          <span>Total</span>
          <span>{formatINR(subtotal)}</span>
        </div>
        <p className="summary-note">Free shipping · 3–5 days</p>
      </aside>
    </div>
  );
}
