import { parseJwt } from '@/app/utils/jwt-verify';
import { GetShippingRatesData, GetShippingRatesResponse } from '@/app/types/shipping-provider-spi';
import { calculatePrice } from '@/app/utils/shipping-calculator';
import { getShippingAppData } from '@/app/actions/app-data';

export async function POST(request: Request) {
  console.info('Shipping rates::POST - called');
  const jwtPayload = await request.text();

  // verify the data was not tampered with, and get the input
  const input = parseJwt<GetShippingRatesData>(jwtPayload, true)!;

  const appData = await getShippingAppData({ instanceId: input.metadata.instanceId });

  const currency = input.metadata.currency;

  // return the shipping rates, in this case it is static
  const data: GetShippingRatesResponse = {
    shippingRates: appData.shippingMethods.map(({ code, title, logistics, costs, unitOfMeasure }) => ({
      code,
      title,
      logistics,
      cost: {
        price: `${calculatePrice(input.request, costs, unitOfMeasure)}`,
        currency,
      },
    })),
  };

  return Response.json(data);
}
