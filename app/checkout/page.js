import CheckoutForm from '@/components/CheckoutForm';

export const metadata = {
  title: 'Checkout',
};

export default function CheckoutPage() {
  return (
    <section className="page checkout-page">
      <div className="wrap">
        <div className="page-head">
          <p className="eyebrow">Checkout</p>
          <h1>Almost home.</h1>
        </div>
        <CheckoutForm />
      </div>
    </section>
  );
}
