'use server';
import { createSdk } from '@/app/utils/wix-sdk.ssr';

export async function getOrders() {
  const sdk = createSdk();
  return sdk.orders.searchOrders({}).catch((e) => {
    console.error(e);
    return [];
  });
}
