import Link from 'next/link';
import ProductArt from './ProductArt';
import Icon from './Icon';

export default function ProductCard({ product, className = '' }) {
  return (
    <Link href={`/products/${product.slug}`} className={`product-card ${className}`.trim()}>
      <div className="product-art">
        <ProductArt art={product.art} />
        {product.badge ? <span className="product-badge">{product.badge}</span> : null}
      </div>
      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.tagline}</p>
        <div className="product-foot">
          <span className="product-price">{product.displayPrice}</span>
          <span className="product-arrow" aria-hidden="true">
            <Icon name="arrow" size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
