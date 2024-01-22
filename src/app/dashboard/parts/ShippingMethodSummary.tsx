import { ShippingCosts, ShippingUnitOfMeasure } from '@/app/dashboard/types';
import { Text } from '@wix/design-system';

export function ShippingMethodSummary({
  shippingCosts,
  unitOfMeasure,
  title,
}: {
  title: string;
  unitOfMeasure: ShippingUnitOfMeasure;
  shippingCosts: ShippingCosts;
}) {
  const unit = unitOfMeasure === ShippingUnitOfMeasure.NUM_OF_ITEMS ? 'item' : 'Kg';
  return (
    <>
      <Text weight='bold'>{title}</Text>
      <Text size='small' listStyle='circle'>
        <ul>
          <li>
            First {unit}: ${shippingCosts.first}
          </li>
          <li>
            Second {unit}: ${shippingCosts.second}
          </li>
          <li>
            Third {unit} and more: ${shippingCosts.thirdAndUp} extra for each {unit}
          </li>
        </ul>
      </Text>
    </>
  );
}
