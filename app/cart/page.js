import CartView from '@/components/CartView';

export const metadata = {
  title: 'Cart',
};

export default function CartPage() {
  return (
    <section className="page cart-page">
      <div className="wrap">
        <div className="page-head">
          <p className="eyebrow">Your cart</p>
          <h1>Everything for the first day.</h1>
        </div>
        <CartView />
      </div>
    </section>
  );
}
