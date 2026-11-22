import Image from 'next/image';

export default function ProductArt({
  image,
  alt = 'Stay product',
  sizes = '(max-width: 620px) 100vw, (max-width: 1024px) 50vw, 42vw',
  className = '',
}) {
  return (
    <div className={`product-art-inner ${className}`.trim()}>
      <Image
        src={image}
        alt={alt}
        width={640}
        height={640}
        sizes={sizes}
        className="product-image"
      />
    </div>
  );
}
