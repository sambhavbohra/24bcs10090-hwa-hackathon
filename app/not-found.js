import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="page">
      <div className="wrap">
        <div className="not-found">
          <p className="eyebrow">404</p>
          <h1>This page wandered off.</h1>
          <p>
            The day is still here. Head back to the station, or see what fills the
            hours alone.
          </p>
          <div className="not-found-actions">
            <Link href="/" className="btn btn-primary">
              Back home
            </Link>
            <Link href="/#range" className="btn btn-ghost">
              Shop Stay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
