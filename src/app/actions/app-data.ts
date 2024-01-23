'use server';
import { ShippingAppData, ShippingMethodType, ShippingUnitOfMeasure } from '@/app/types/app-data.model';

export async function getShippingAppData(): Promise<ShippingAppData> {
  return {
    shippingMethods: [
      {
        code: 'example-shipping-rate-standard',
        title: 'Standard Delivery',
        type: ShippingMethodType.STANDARD,
        unitOfMeasure: ShippingUnitOfMeasure.NUM_OF_ITEMS,
        logistics: {
          deliveryTime: '3-7 days',
        },
        costs: {
          first: 5,
          second: 2,
          thirdAndUp: 1,
        },
      },
      {
        code: 'example-shipping-rate-express',
        title: 'Express Delivery',
        type: ShippingMethodType.EXPRESS,
        unitOfMeasure: ShippingUnitOfMeasure.NUM_OF_ITEMS,
        logistics: {
          deliveryTime: '1-2 days',
        },
        costs: {
          first: 10,
          second: 4,
          thirdAndUp: 2,
        },
      },
    ],
  };
}

export async function setShippingAppData(data: ShippingAppData): Promise<void> {
  // you are expected to properly implement it such that it would persist the data in a DB which is not part of the template
  console.log('setShippingAppData::', data);
}
