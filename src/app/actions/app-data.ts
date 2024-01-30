'use server';
import { ShippingAppData, ShippingMethodType, ShippingUnitOfMeasure } from '@/app/types/app-data.model';
import { getAppInstance, parseAccessToken } from '@/app/actions/app-instance';

type AppIdentifier = { instanceId?: string | null; accessToken?: string | null } | undefined;

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

const getDatabaseKey = async (appIdentifier: AppIdentifier) => {
  let instanceId = appIdentifier?.instanceId;
  if (!instanceId) {
    const appInstance = appIdentifier?.accessToken
      ? parseAccessToken(appIdentifier.accessToken)
      : await getAppInstance();
    instanceId = appInstance.instance?.instanceId;
  }
  return `shipping-app-data:${instanceId}`;
};

export async function getShippingAppData(appIdentifier: AppIdentifier): Promise<ShippingAppData> {
  try {
    const databaseKey = await getDatabaseKey(appIdentifier);
    // here you can implement your own logic to fetch the data from a DB
    console.log('getShippingAppData::key - ', databaseKey);
    return defaultAppData;
  } catch (e) {
    console.log('getShippingAppData::error - ', e);
    return defaultAppData;
  }
}

export async function setShippingAppData(data: ShippingAppData, appIdentifier: AppIdentifier): Promise<void> {
  const databaseKey = await getDatabaseKey(appIdentifier);
  // you are expected to properly implement it such that it would persist the data in a DB which is not part of the template
  console.log('persistShippingAppData::key: ', databaseKey, ' data: ', JSON.stringify(data, null, 2));
}
