'use server';
import { ShippingAppData, ShippingMethodType, ShippingUnitOfMeasure } from '@/app/types/app-data.model';
import { getAppInstance } from '@/app/actions/app-instance';

const defaultAppData: ShippingAppData = {
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

const getDatabaseKey = async ({ instanceId }: { instanceId?: string } = {}) => {
  let databaseKey = instanceId;
  if (!databaseKey) {
    const appInstance = await getAppInstance();
    databaseKey = appInstance.instance?.instanceId;
  }
  return databaseKey;
};

export async function getShippingAppData(appDataKey: { instanceId?: string } = {}): Promise<ShippingAppData> {
  try {
    const databaseKey = await getDatabaseKey(appDataKey);
    console.log('getShippingAppData::key - ', databaseKey);
    return defaultAppData;
  } catch (e) {
    console.log('getShippingAppData::error - ', e);
    return defaultAppData;
  }
}

export async function setShippingAppData(
  data: ShippingAppData,
  appDataKey: { instanceId?: string } = {},
): Promise<void> {
  const databaseKey = await getDatabaseKey(appDataKey);
  // you are expected to properly implement it such that it would persist the data in a DB which is not part of the template
  console.log('persistShippingAppData::', JSON.stringify(data, null, 2));
}
