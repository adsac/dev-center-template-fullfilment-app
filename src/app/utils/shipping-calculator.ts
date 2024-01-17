import { GetShippingRatesRequest } from '@/app/types/shipping-provider-spi';

export function calculatePrice(request: GetShippingRatesRequest) {
  // first product 5$, second product 2$, each additional product 1$
  const numOfItems =
    request.lineItems?.reduce((acc, lineItem) => {
      return acc + (lineItem.quantity ?? 1);
    }, 0) ?? 0;

  if (numOfItems <= 0) {
    return 0; // Return 0 for invalid item counts
  }
  // Calculate the price based on the specified rule
  const firstItemCost = 5;
  const secondItemCost = 2;
  const additionalItemCost = 1;

  if (numOfItems === 1) {
    return firstItemCost;
  } else if (numOfItems === 2) {
    return firstItemCost + secondItemCost;
  } else {
    return firstItemCost + secondItemCost + (numOfItems - 2) * additionalItemCost;
  }
}
