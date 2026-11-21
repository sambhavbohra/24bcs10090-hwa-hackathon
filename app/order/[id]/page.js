import OrderView from '@/components/OrderView';

export const metadata = {
  title: 'Order confirmed',
};

export default async function OrderPage({ params }) {
  const { id } = await params;

  return (
    <section className="page order-page">
      <div className="wrap">
        <OrderView orderId={id} />
      </div>
    </section>
  );
}
