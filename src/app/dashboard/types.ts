export enum ShippingUnitOfMeasure {
  NUM_OF_ITEMS = 'NUM_OF_ITEMS',
  WEIGHT = 'WEIGHT',
}

export enum ShippingMethodType {
  STANDARD = 'STANDARD',
  EXPRESS = 'EXPRESS',
}

export interface ShippingCosts {
  first: number;
  second: number;
  thirdAndUp: number;
}
