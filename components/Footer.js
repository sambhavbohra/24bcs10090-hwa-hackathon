import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <Link href="/" className="brand brand-light" aria-label="Stay home">
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-ring" />
              <span className="brand-dot" />
            </span>
            <span className="brand-name">Stay</span>
          </Link>
          <p>You leave. The day doesn&apos;t have to stop.</p>
          <span className="footer-note">A departure enrichment station for dogs who stay home.</span>
        </div>

        <div className="footer-cols">
          <div>
            <h4>Shop</h4>
            <Link href="/products/stay-station">Stay Station</Link>
            <Link href="/products/starter-bundle">Starter Bundle</Link>
            <Link href="/products/refill-subscription">Subscription</Link>
            <Link href="/#range">All products</Link>
          </div>
          <div>
            <h4>Stay</h4>
            <Link href="/#day">The day</Link>
            <Link href="/#why">Why Stay</Link>
            <Link href="/#faq">FAQ</Link>
            <Link href="/cart">Cart</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <a href="mailto:hello@stay.dog">hello@stay.dog</a>
            <span>Mon–Fri, 9–5 IST</span>
            <span>Free shipping · 3–5 days</span>
          </div>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span>© 2026 Stay</span>
        <span>Made for the hours alone.</span>
      </div>
    </footer>
  );
}
