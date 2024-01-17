import { parseJwt } from '@/app/utils/jwt-verify';
import { ChargeType, GetShippingRatesData, GetShippingRatesResponse } from '@/app/types/shipping-provider-spi';
import { calculatePrice } from '@/app/utils/shipping-calculator';

export async function POST(request: Request) {
  console.info('Shipping rates::POST - called');
  const jwtPayload = await request.text();

  // verify the data was not tampered with, and get the input
  const input = parseJwt<GetShippingRatesData>(jwtPayload, true)!;

  const currency = input.metadata.currency;

  const shippingPrice = calculatePrice(input.request);

  // return the shipping rates, in this case it is static
  const data: GetShippingRatesResponse = {
    shippingRates: [
      {
        code: 'example-shipping-rate',
        title: 'Example Shipping Rate',
        logistics: {
          deliveryTime: '3-7 days',
        },
        cost: {
          price: `${shippingPrice}`,
          currency,
          additionalCharges: [
            {
              price: '10',
              type: ChargeType.HANDLING_FEE,
              details: 'Handling fee of $10 applied for fragile items.',
            },
          ],
        },
      },
      {
        code: 'example-shipping-rate-premium',
        title: 'Example Shipping Rate Premium',
        logistics: {
          deliveryTime: '1-2 days',
        },
        cost: {
          price: `${shippingPrice * 2}`,
          currency,
          additionalCharges: [
            {
              price: '12',
              type: ChargeType.HANDLING_FEE,
              details: 'Handling fee of $12 applied for fragile items.',
            },
          ],
        },
      },
    ],
  };

  return Response.json(data);
}
