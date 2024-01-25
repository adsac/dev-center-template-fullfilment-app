import { ShippingRatesPageContent } from '@/app/dashboard/parts/ShippingRatesPageContent';
import { getLastOrders } from '@/app/actions/orders';
import { getShippingAppData, setShippingAppData } from '@/app/actions/app-data';

export default async function App() {
  const [orders, appData] = await Promise.all([getLastOrders(), getShippingAppData()]);
  return (
    <ShippingRatesPageContent orders={orders} shippingAppData={appData} persistShippingAppData={setShippingAppData} />
  );
}
