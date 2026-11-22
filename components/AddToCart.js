'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  formatINR,
  resolveSelection,
  resolveUnitPrice,
  selectionOptions,
} from '@/lib/products';
import { useCart } from './CartProvider';

export default function AddToCart({
  product,
  selection: controlledSelection,
  onSelectionChange,
}) {
  const { addItem } = useCart();
  const [internalSelection, setInternalSelection] = useState(() =>
    resolveSelection(product, {})
  );
  const selection = controlledSelection ?? internalSelection;
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const price = useMemo(
    () => resolveUnitPrice(product, selection),
    [product, selection]
  );

  const current = useMemo(
    () => selectionOptions(product, selection),
    [product, selection]
  );

  useEffect(() => {
    if (!added) return undefined;
    const timer = window.setTimeout(() => setAdded(false), 2400);
    return () => window.clearTimeout(timer);
  }, [added]);

  function choose(groupId, optionId) {
    const nextSelection = { ...selection, [groupId]: optionId };
    if (onSelectionChange) onSelectionChange(nextSelection);
    else setInternalSelection(nextSelection);
    setAdded(false);
  }

  function handleAdd() {
    addItem(product.id, selection, quantity);
    setAdded(true);
  }

  return (
    <div className="buy">
      {(product.variants || []).map((group) => {
        const activeOption = current.find((entry) => entry.group.id === group.id)?.option;
        return (
          <div className="variant" key={group.id}>
            <div className="variant-head">
              <span className="variant-label">{group.label}</span>
              <span className="variant-value">{activeOption?.label}</span>
            </div>
            <div className={`variant-options ${group.type === 'swatch' ? 'is-swatch' : ''}`}>
              {group.options.map((option) => {
                const active = selection[group.id] === option.id;
                const showPrice =
                  typeof option.priceDelta === 'number' && option.priceDelta !== 0;
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`variant-option ${active ? 'is-active' : ''}`}
                    onClick={() => choose(group.id, option.id)}
                    aria-pressed={active}
                  >
                    {option.swatch ? (
                      <span className="swatch" style={{ background: option.swatch }} />
                    ) : null}
                    <span>{option.label}</span>
                    {showPrice ? <small>+{formatINR(option.priceDelta)}</small> : null}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="buy-row">
        <div className="qty">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.min(20, value + 1))}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button type="button" className="btn btn-primary buy-btn" onClick={handleAdd}>
          {added ? 'Added to cart' : `Add to cart · ${formatINR(price * quantity)}`}
        </button>
      </div>

      <p className="buy-note">Free shipping · 30-day trial · 1-year warranty</p>

      {added ? (
        <Link href="/cart" className="buy-link">
          View cart →
        </Link>
      ) : null}
    </div>
  );
}
