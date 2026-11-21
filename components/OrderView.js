'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatINR } from '@/lib/products';

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value));
  } catch {
    return '';
  }
}

export default function OrderView({ orderId }) {
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(`stay-order-${orderId}`);
      if (raw) {
        setOrder(JSON.parse(raw));
        setStatus('ready');
      } else {
        setStatus('missing');
      }
    } catch {
      setStatus('missing');
    }
  }, [orderId]);

  if (status === 'loading') {
    return <div className="cart-loading">Loading your order…</div>;
  }

  if (status === 'missing') {
    return (
      <div className="order-card">
        <div className="order-mark">
          <span>✓</span>
        </div>
        <p className="eyebrow">Order received</p>
        <h1>Thank you.</h1>
        <p className="order-lede">
          Your order ID is <strong>{orderId}</strong>. Keep it for reference. The
          full details are shown on the screen right after checkout.
        </p>
        <div className="order-actions">
          <Link href="/#range" className="btn btn-primary">
            Keep exploring
          </Link>
          <Link href="/" className="btn btn-ghost">
            Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-card">
      <div className="order-mark">
        <span>✓</span>
      </div>
      <p className="eyebrow">Order confirmed</p>
      <h1>Stay is on its way.</h1>
      <p className="order-lede">
        Thank you{order.customer?.name ? `, ${order.customer.name}` : ''}. No payment
        was collected. We have your order and will send tracking to
        {order.customer?.email ? ` ${order.customer.email}` : ' your email'}.
      </p>

      <div className="order-meta">
        <div>
          <span>Order ID</span>
          <strong>{order.orderId}</strong>
        </div>
        <div>
          <span>Placed</span>
          <strong>{formatDate(order.createdAt)}</strong>
        </div>
        <div>
          <span>Delivery</span>
          <strong>3–5 days · free</strong>
        </div>
      </div>

      <div className="order-items">
        {order.items.map((item) => (
          <div className="order-item" key={`${item.productId}-${item.variantLabel}`}>
            <div>
              <span className="order-item-name">{item.name}</span>
              {item.variantLabel ? (
                <span className="order-item-variant">{item.variantLabel}</span>
              ) : null}
              <span className="order-item-qty">
                Qty {item.quantity} · {formatINR(item.unitPrice)} each
              </span>
            </div>
            <strong>{formatINR(item.lineTotal)}</strong>
          </div>
        ))}
      </div>

      <div className="order-totals">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{formatINR(order.subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="summary-row summary-total">
          <span>Total</span>
          <span>{formatINR(order.total)}</span>
        </div>
      </div>

      {order.customer?.address ? (
        <div className="order-address">
          <span>Delivering to</span>
          <p>
            {order.customer.name}
            <br />
            {order.customer.address}
            <br />
            {[order.customer.city, order.customer.state, order.customer.pincode]
              .filter(Boolean)
              .join(', ')}
            <br />
            {order.customer.phone}
          </p>
        </div>
      ) : null}

      <div className="order-actions">
        <Link href="/#range" className="btn btn-primary">
          Keep exploring
        </Link>
        <Link href="/" className="btn btn-ghost">
          Back home
        </Link>
      </div>
    </div>
  );
}
