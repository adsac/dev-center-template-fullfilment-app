import {parseJwt} from "@/app/utils/jwt-verify";

export async function POST(request: Request) {
  console.info('Shipping rates::POST - called');
  const jwtPayload = await request.text();

  // verify the data was not tampered with, and get the input
  const input = parseJwt(jwtPayload, true);
  console.log('Shipping rates::input: ', input);

  // return the shipping rates, in this case it is static
  const data = {
    shippingRates: [
      {
        code: 'example-shipping-rate',
        title: 'Example Shipping Rate',
        logistics: {
          deliveryTime: '2-5 days'
        },
        cost: {
          price: '15',
          currency: 'USD',
          additionalCharges: [
            {
              price: '10',
              type: 'HANDLING_FEE',
              details: 'Handling fee of $10 applied for fragile items.'
            }
          ]
        }
      },
      {
        code: 'example-shipping-rate-premium',
        title: 'Example Shipping Rate Premium',
        logistics: {
          deliveryTime: '1-2 days'
        },
        cost: {
          price: '25',
          currency: 'USD',
          additionalCharges: [
            {
              price: '12',
              type: 'HANDLING_FEE',
              details: 'Handling fee of $12 applied for fragile items.'
            }
          ]
        }
      }
    ]
  };

  return Response.json(data);
}
