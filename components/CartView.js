'use client';

import Link from 'next/link';
import { formatINR } from '@/lib/products';
import { useCart } from './CartProvider';
import ProductArt from './ProductArt';

export default function CartView() {
  const { items, subtotal, hydrated, setQuantity, removeItem } = useCart();

  if (!hydrated) {
    return <div className="cart-loading">Loading your cart…</div>;
  }

  if (!items.length) {
    return (
      <div className="empty-card">
        <div className="empty-art">
          <ProductArt art="station" />
        </div>
        <h2>Your cart is quiet.</h2>
        <p>
          Add a Stay Station, or start with the Starter Bundle and give the first
          day everything it needs.
        </p>
        <Link href="/#range" className="btn btn-primary">
          Explore Stay
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div className="cart-items">
        {items.map((item) => (
          <div className="cart-item" key={item.key}>
            <div className="cart-thumb">
              <ProductArt art={item.product.art} />
            </div>
            <div className="cart-info">
              <Link href={`/products/${item.product.slug}`} className="cart-name">
                {item.product.name}
              </Link>
              {item.label ? <span className="cart-variant">{item.label}</span> : null}
              <div className="cart-item-actions">
                <div className="qty qty-sm">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(item.productId, item.selection, item.quantity - 1)
                    }
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(item.productId, item.selection, item.quantity + 1)
                    }
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => removeItem(item.productId, item.selection)}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="cart-line-price">{formatINR(item.lineTotal)}</div>
          </div>
        ))}
      </div>

      <aside className="cart-summary">
        <h3>Order summary</h3>
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
        <Link href="/checkout" className="btn btn-primary btn-block">
          Checkout
        </Link>
        <p className="summary-note">
          No payment is collected. This checkout places your order directly.
        </p>
        <Link href="/#range" className="summary-link">
          Continue shopping
        </Link>
      </aside>
    </div>
  );
}
