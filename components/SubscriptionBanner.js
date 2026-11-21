'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  formatINR,
  products,
  resolveUnitPrice,
} from '@/lib/products';
import { useCart } from './CartProvider';
import ProductArt from './ProductArt';

const product = products.find((item) => item.id === 'refill-subscription');

export default function SubscriptionBanner() {
  const { addItem } = useCart();
  const [billing, setBilling] = useState(product.defaultSelection.billing);
  const [scent, setScent] = useState('forest');
  const [added, setAdded] = useState(false);

  const price = useMemo(
    () => resolveUnitPrice(product, { billing, scent }),
    [billing, scent]
  );

  function handleAdd() {
    addItem(product.id, { billing, scent }, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2400);
  }

  return (
    <div className="sub-banner reveal">
      <div className="sub-art">
        <ProductArt
          art="subscription"
          image={product.image}
          alt="Stay refill modules"
          sizes="(max-width: 1024px) 100vw, 38vw"
        />
      </div>
      <div className="sub-copy">
        <span className="eyebrow">The refill subscription</span>
        <h3>Fresh refills, without thinking about it.</h3>
        <p>
          Six Frozen Lick Discs and four Scent Search Cartridges, delivered on your
          schedule. Choose a scent once; change it whenever you like.
        </p>

        <div className="sub-controls">
          <div className="sub-billing" role="group" aria-label="Billing">
            <button
              type="button"
              className={billing === 'monthly' ? 'is-active' : ''}
              onClick={() => setBilling('monthly')}
            >
              Monthly
            </button>
            <button
              type="button"
              className={billing === 'quarterly' ? 'is-active' : ''}
              onClick={() => setBilling('quarterly')}
            >
              Quarterly <small>save ₹198</small>
            </button>
          </div>

          <div className="sub-scents" role="group" aria-label="Scent">
            {product.variants[1].options.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`scent-dot ${scent === option.id ? 'is-active' : ''}`}
                onClick={() => setScent(option.id)}
                aria-label={option.label}
                aria-pressed={scent === option.id}
                title={option.label}
              >
                <span style={{ background: option.swatch }} />
              </button>
            ))}
            <span className="sub-scent-name">
              {product.variants[1].options.find((option) => option.id === scent)?.label}
            </span>
          </div>
        </div>

        <div className="sub-foot">
          <div className="sub-price">
            {formatINR(price)}
            <span>{billing === 'monthly' ? '/ month' : '/ 3 months'}</span>
          </div>
          <button type="button" className="btn btn-primary" onClick={handleAdd}>
            {added ? 'Added to cart' : 'Add subscription'}
          </button>
        </div>
        <div className="sub-links">
          <Link href="/products/refill-subscription">See what&apos;s inside →</Link>
          {added ? <Link href="/cart">View cart →</Link> : null}
        </div>
      </div>
    </div>
  );
}
