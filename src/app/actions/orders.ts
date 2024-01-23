'use server';
import { createSdk } from '@/app/utils/wix-sdk.ssr';
import { OrderSummary } from '@/app/types/app-data.model';

export async function getLastOrders() {
  const sdk = createSdk();
  return sdk.items
    .queryDataItems({
      dataCollectionId: 'Stores/Orders',
    })
    .limit(3)
    .find()
    .then((itemsRes) =>
      itemsRes.items.map(
        ({ _id, data }) =>
          ({
            id: data?.number ?? '',
            createdDate: data?._dateCreated?.$date,
            totalPrice: data?.totals.total ?? 0,
            currency: data?.currency ?? 'USD',
          }) as OrderSummary,
      ),
    )
    .catch((e) => {
      console.error('Failed to fetch orders: ', e);
      return [];
    });
}
