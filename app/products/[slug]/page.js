import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, getProductBySlug, safetyGuide } from '@/lib/products';
import ProductHero from '@/components/ProductHero';
import ProductCard from '@/components/ProductCard';
import Icon from '@/components/Icon';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Not found' };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products.filter((item) => item.id !== product.id).slice(0, 3);

  return (
    <section className="product-page">
      <div className="wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/#range">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <ProductHero product={product} />

        <div className="product-sections">
          <section className="product-block">
            <h2>Why it works</h2>
            <div className="highlight-grid">
              {product.highlights.map((highlight, index) => (
                <article
                  className="highlight-card reveal"
                  key={highlight.title}
                  style={{ '--d': `${index * 0.06}s` }}
                >
                  <h3>{highlight.title}</h3>
                  <p>{highlight.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="product-block includes-block">
            <div className="includes-col reveal">
              <h2>In the box</h2>
              <ul className="includes-list">
                {product.includes.map((item) => (
                  <li key={item}>
                    <Icon name="check" size={16} /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="details-col reveal">
              <h2>The details</h2>
              <dl className="detail-list">
                {product.details.map((detail) => (
                  <div key={detail.label}>
                    <dt>{detail.label}</dt>
                    <dd>{detail.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section className="product-block safety-product-block">
            <div className="safety-product-head reveal">
              <p className="eyebrow">Safe use</p>
              <h2>Set up the day carefully.</h2>
              <p>{safetyGuide.intro}</p>
            </div>

            <div className="safety-grid">
              {safetyGuide.checks.map((item, index) => (
                <article
                  className="safety-card reveal"
                  key={item.title}
                  style={{ '--d': `${index * 0.05}s` }}
                >
                  <span className="safety-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>

            <aside className="safety-warning reveal">
              <span className="safety-warning-label">Please read</span>
              <h3>{safetyGuide.warningTitle}</h3>
              <p>{safetyGuide.warning}</p>
            </aside>
          </section>
        </div>

        <section className="related">
          <div className="related-head">
            <h2>Completes the day</h2>
            <Link href="/#range">See all →</Link>
          </div>
          <div className="related-grid">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
