'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useOptionalCart } from './CartProvider';

export function CartCount() {
  const cart = useOptionalCart();
  const count = cart?.count || 0;

  if (!cart?.hydrated || count === 0) return null;

  return <span className="cart-count">{count}</span>;
}

export default function MobileMenu({ links }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`menu-btn ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span />
        <span />
      </button>

      <div className={`mobile-menu ${open ? 'is-open' : ''}`}>
        <nav aria-label="Mobile">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link
            href="/products/refill-subscription"
            onClick={() => setOpen(false)}
          >
            Subscription
          </Link>
          <Link
            href="/cart"
            className="btn btn-primary mobile-cta"
            onClick={() => setOpen(false)}
          >
            Cart
          </Link>
        </nav>
      </div>
    </>
  );
}
