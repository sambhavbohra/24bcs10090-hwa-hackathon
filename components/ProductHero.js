'use client';

import { useMemo, useState } from 'react';
import {
  formatINR,
  resolveProductImage,
  resolveSelection,
  resolveUnitPrice,
  selectionOptions,
} from '@/lib/products';
import ProductArt from './ProductArt';
import AddToCart from './AddToCart';
import Icon from './Icon';

export default function ProductHero({ product }) {
  const [selection, setSelection] = useState(() => resolveSelection(product, {}));

  const image = useMemo(
    () => resolveProductImage(product, selection),
    [product, selection]
  );

  const price = useMemo(
    () => resolveUnitPrice(product, selection),
    [product, selection]
  );

  const selectedImageOption = useMemo(
    () => selectionOptions(product, selection).find(({ option }) => option.image)?.option,
    [product, selection]
  );

  const priceSuffix =
    product.id === 'refill-subscription'
      ? selection.billing === 'quarterly'
        ? ' / 3 months'
        : ' / month'
      : '';

  return (
    <div className="product-hero">
      <div className="product-visual">
        <ProductArt
          image={image}
          alt={
            selectedImageOption
              ? `${product.name} in ${selectedImageOption.label}`
              : product.name
          }
          sizes="(max-width: 900px) 100vw, 48vw"
        />
        {product.badge ? <span className="product-badge">{product.badge}</span> : null}
      </div>

      <div className="product-info">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="product-tagline">{product.shortDescription}</p>

        <div className="product-price-row">
          <span className="product-price">
            {formatINR(price)}
            {priceSuffix}
          </span>
          <span className="product-stock">In stock · ships in 3–5 days</span>
        </div>

        <p className="product-desc">{product.description}</p>

        <AddToCart
          product={product}
          selection={selection}
          onSelectionChange={setSelection}
        />

        <div className="product-trust">
          <span>
            <Icon name="check" size={16} /> 30-day trial
          </span>
          <span>
            <Icon name="check" size={16} /> 1-year warranty
          </span>
          <span>
            <Icon name="check" size={16} /> Free shipping
          </span>
        </div>
      </div>
    </div>
  );
}
