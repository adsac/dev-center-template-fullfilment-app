import { ShippingRatesPageContent } from '@/app/dashboard/ShippingRatesPageContent';
import { getOrders } from '@/app/actions/orders';

export default async function App() {
  const orders = await getOrders();
  console.log('orders', orders);
  return <ShippingRatesPageContent />;
}
