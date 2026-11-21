'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from './CartProvider';

const links = [
  { href: '/#day', label: 'The day' },
  { href: '/#range', label: 'Shop' },
  { href: '/#why', label: 'Why Stay' },
  { href: '/#faq', label: 'FAQ' },
];

export default function Nav() {
  const pathname = usePathname();
  const { count, hydrated } = useCart();
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
      <div className="announce">
        <span>Free shipping across India</span>
        <span className="announce-dot" />
        <span>3–5 day delivery</span>
        <span className="announce-dot" />
        <span>No extra calories, ever</span>
      </div>

      <header className="site-nav">
        <div className="wrap nav-inner">
          <Link href="/" className="brand" aria-label="Stay home">
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-ring" />
              <span className="brand-dot" />
            </span>
            <span className="brand-name">Stay</span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <Link href="/#range" className="nav-shop">
              Shop
            </Link>
            <Link href="/cart" className="cart-btn" aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 8h12l-1 11H7L6 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              <span className="cart-label">Cart</span>
              {hydrated && count > 0 ? <span className="cart-count">{count}</span> : null}
            </Link>
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
          </div>
        </div>

        <div className={`mobile-menu ${open ? 'is-open' : ''}`}>
          <nav aria-label="Mobile">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/products/refill-subscription" onClick={() => setOpen(false)}>
              Subscription
            </Link>
            <Link href="/cart" className="btn btn-primary mobile-cta" onClick={() => setOpen(false)}>
              Cart {hydrated && count > 0 ? `(${count})` : ''}
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
