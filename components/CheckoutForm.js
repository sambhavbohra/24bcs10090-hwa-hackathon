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

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const digits = phone.replace(/\D/g, '');
  const address = values.address.trim();
  const city = values.city.trim();
  const state = values.state.trim();
  const pincode = values.pincode.trim();
  const notes = values.notes.trim();

  if (!name) errors.name = 'Please enter your full name.';
  else if (name.length < 2) errors.name = 'Please enter at least 2 characters.';

  if (!email) errors.email = 'Please enter your email address.';
  else if (!emailPattern.test(email)) errors.email = 'Please enter a valid email address.';

  if (!phone) errors.phone = 'Please enter your phone number.';
  else if (digits.length < 10 || digits.length > 15)
    errors.phone = 'Enter a phone number with 10–15 digits.';

  if (!address) errors.address = 'Please enter your delivery address.';
  else if (address.length < 5) errors.address = 'Please enter a full address.';

  if (!city) errors.city = 'Please enter your city.';
  if (!state) errors.state = 'Please enter your state.';

  if (!pincode) errors.pincode = 'Please enter your PIN code.';
  else if (!/^[0-9]{4,8}$/.test(pincode))
    errors.pincode = 'Enter a 4–8 digit PIN code.';

  if (notes.length > 500) errors.notes = 'Please keep notes under 500 characters.';

  return errors;
}

export default function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, hydrated, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!items.length || submitting) return;

    const errors = validate(form);
    setFieldErrors(errors);
    const firstError = Object.keys(errors)[0];

    if (firstError) {
      setError('Please check the highlighted fields and try again.');
      const field = event.currentTarget.elements.namedItem(firstError);
      if (field && typeof field.focus === 'function') field.focus();
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            variant: item.selection,
          })),
          customer: {
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            address: form.address.trim(),
            city: form.city.trim(),
            state: form.state.trim(),
            pincode: form.pincode.trim(),
            notes: form.notes.trim(),
          },
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
      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <div className="form-section">
          <h3>Delivery details</h3>
          <div className="form-grid">
            <label className={`field field-full${fieldErrors.name ? ' has-error' : ''}`}>
              <span>Full name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                placeholder="Your name"
              />
              {fieldErrors.name ? (
                <small className="field-error" id="name-error">
                  {fieldErrors.name}
                </small>
              ) : null}
            </label>
            <label className={`field${fieldErrors.email ? ' has-error' : ''}`}>
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                placeholder="you@example.com"
              />
              {fieldErrors.email ? (
                <small className="field-error" id="email-error">
                  {fieldErrors.email}
                </small>
              ) : null}
            </label>
            <label className={`field${fieldErrors.phone ? ' has-error' : ''}`}>
              <span>Phone</span>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
                required
                aria-invalid={Boolean(fieldErrors.phone)}
                aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                placeholder="+91"
              />
              {fieldErrors.phone ? (
                <small className="field-error" id="phone-error">
                  {fieldErrors.phone}
                </small>
              ) : null}
            </label>
            <label className={`field field-full${fieldErrors.address ? ' has-error' : ''}`}>
              <span>Address</span>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                autoComplete="street-address"
                required
                aria-invalid={Boolean(fieldErrors.address)}
                aria-describedby={fieldErrors.address ? 'address-error' : undefined}
                placeholder="House, street, area"
              />
              {fieldErrors.address ? (
                <small className="field-error" id="address-error">
                  {fieldErrors.address}
                </small>
              ) : null}
            </label>
            <label className={`field${fieldErrors.city ? ' has-error' : ''}`}>
              <span>City</span>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                autoComplete="address-level2"
                required
                aria-invalid={Boolean(fieldErrors.city)}
                aria-describedby={fieldErrors.city ? 'city-error' : undefined}
                placeholder="City"
              />
              {fieldErrors.city ? (
                <small className="field-error" id="city-error">
                  {fieldErrors.city}
                </small>
              ) : null}
            </label>
            <label className={`field${fieldErrors.state ? ' has-error' : ''}`}>
              <span>State</span>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                autoComplete="address-level1"
                required
                aria-invalid={Boolean(fieldErrors.state)}
                aria-describedby={fieldErrors.state ? 'state-error' : undefined}
                placeholder="State"
              />
              {fieldErrors.state ? (
                <small className="field-error" id="state-error">
                  {fieldErrors.state}
                </small>
              ) : null}
            </label>
            <label className={`field${fieldErrors.pincode ? ' has-error' : ''}`}>
              <span>PIN code</span>
              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                autoComplete="postal-code"
                inputMode="numeric"
                pattern="[0-9]{4,8}"
                required
                aria-invalid={Boolean(fieldErrors.pincode)}
                aria-describedby={fieldErrors.pincode ? 'pincode-error' : undefined}
                placeholder="6-digit PIN"
              />
              {fieldErrors.pincode ? (
                <small className="field-error" id="pincode-error">
                  {fieldErrors.pincode}
                </small>
              ) : null}
            </label>
            <label className={`field field-full${fieldErrors.notes ? ' has-error' : ''}`}>
              <span>Delivery notes (optional)</span>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                maxLength={500}
                aria-invalid={Boolean(fieldErrors.notes)}
                aria-describedby={fieldErrors.notes ? 'notes-error' : undefined}
                placeholder="Gate code, safe place, anything useful"
              />
              {fieldErrors.notes ? (
                <small className="field-error" id="notes-error">
                  {fieldErrors.notes}
                </small>
              ) : null}
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
