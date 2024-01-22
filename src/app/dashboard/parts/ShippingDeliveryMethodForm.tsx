import { ShippingCosts, ShippingMethodType, ShippingUnitOfMeasure } from '@/app/dashboard/types';
import { useSDK } from '@/app/utils/wix-sdk.client';
import { useState } from 'react';
import { Box, Card, Cell, Collapse, Dropdown, FormField, Input, Layout, Text, TextButton } from '@wix/design-system';
import { ChevronDown, ChevronUp } from '@wix/wix-ui-icons-common';

export function ShippingDeliveryMethodForm({
  title,
  unitOfMeasure,
  shippingCosts,
  onUnitOfMeasureSelected,
  onShippingCostsChanged,
  expandByDefault = false,
}: {
  title: string;
  methodType: ShippingMethodType;
  unitOfMeasure: ShippingUnitOfMeasure;
  shippingCosts: ShippingCosts;
  onUnitOfMeasureSelected: (type: ShippingUnitOfMeasure) => void;
  onShippingCostsChanged: (shippingCosts: ShippingCosts) => void;
  expandByDefault?: boolean;
}) {
  const {
    dashboard: { navigate },
  } = useSDK();
  const uomName = unitOfMeasure === ShippingUnitOfMeasure.NUM_OF_ITEMS ? 'item' : 'Kg';
  const [isOpen, setIsOpen] = useState(expandByDefault);
  return (
    <Card>
      <Card.Header
        title={title}
        suffix={<TextButton onClick={() => setIsOpen(!isOpen)}>{isOpen ? <ChevronUp /> : <ChevronDown />}</TextButton>}
      />
      <Collapse open={isOpen}>
        <Card.Divider />
        <Card.Content>
          <Box direction='vertical' gap='20px'>
            <FormField label='Parameter'>
              <Dropdown
                selectedId={unitOfMeasure}
                onSelect={(option, sameOptionWasPicked) =>
                  sameOptionWasPicked ? null : onUnitOfMeasureSelected(option.id as ShippingUnitOfMeasure)
                }
                options={[
                  { id: ShippingUnitOfMeasure.NUM_OF_ITEMS, value: 'Number of Items' },
                  { id: ShippingUnitOfMeasure.WEIGHT, value: 'Weight' },
                ]}
                placeholder='Select parameter'
              />
            </FormField>

            <Box direction='vertical' gap='10px'>
              <Text weight='bold'>Set conditions:</Text>
              <Layout>
                <Cell span={4}>
                  <FormField label={`First ${uomName}`}>
                    <Input
                      prefix={<Input.Affix>$</Input.Affix>}
                      placeholder='Select price'
                      type='number'
                      value={shippingCosts.first}
                      onChange={(e) => {
                        onShippingCostsChanged({ ...shippingCosts, first: Number(e.currentTarget.value) });
                      }}
                    />
                  </FormField>
                </Cell>
                <Cell span={4}>
                  <FormField label={`Second ${uomName}`}>
                    <Input
                      prefix={<Input.Affix>$</Input.Affix>}
                      placeholder='Select price'
                      type='number'
                      value={shippingCosts.second}
                      onChange={(e) => {
                        onShippingCostsChanged({ ...shippingCosts, second: Number(e.currentTarget.value) });
                      }}
                    />
                  </FormField>
                </Cell>
                <Cell span={4}>
                  <FormField label={`Each Additional ${uomName}`}>
                    <Input
                      prefix={<Input.Affix>$</Input.Affix>}
                      suffix={<Input.Affix>Per {uomName}</Input.Affix>}
                      value={shippingCosts.thirdAndUp}
                      onChange={(e) => {
                        onShippingCostsChanged({ ...shippingCosts, thirdAndUp: Number(e.currentTarget.value) });
                      }}
                      placeholder='Select price'
                      type='number'
                    />
                  </FormField>
                </Cell>
              </Layout>
            </Box>
          </Box>
        </Card.Content>
      </Collapse>
    </Card>
  );
}
