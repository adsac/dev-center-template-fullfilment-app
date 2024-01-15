async function handler(request: Request) {
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

export async function POST(request: Request) {
  console.info('Shipping rates::POST - called');
  const input = await request.text();
  console.log('Shipping rates input: ', input);
  return handler(request);
}

export async function GET(request: Request) {
  console.info('Shipping rates::GET - called');
  return handler(request);
}
