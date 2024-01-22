'use client';
import { Box, Breadcrumbs, Button, Card, Cell, Layout, Page, WixDesignSystemProvider } from '@wix/design-system';
import { useSDK } from '@/app/utils/wix-sdk.client';
import { useCallback, useState } from 'react';
import '@wix/design-system/styles.global.css';
import { ShippingCosts, ShippingMethodType, ShippingUnitOfMeasure } from '@/app/dashboard/types';
import { ShippingMethodSummary } from '@/app/dashboard/parts/ShippingMethodSummary';
import { ActivationDetailsCard } from '@/app/dashboard/parts/ActivationDetailsCard';
import { ShippingDeliveryMethodForm } from '@/app/dashboard/parts/ShippingDeliveryMethodForm';

export const ShippingRatesPageContent = () => {
  const {
    dashboard: { showToast },
  } = useSDK();
  const onSave = useCallback(() => {
    showToast({
      message: 'Data is not really saved :)',
      type: 'success',
    });
  }, [showToast]);
  const [standardShippingUom, setStandardShippingUom] = useState(ShippingUnitOfMeasure.NUM_OF_ITEMS);
  const [expressShippingUom, setExpressShippingUom] = useState(ShippingUnitOfMeasure.NUM_OF_ITEMS);
  const [standardShippingCosts, setStandardShippingCosts] = useState<ShippingCosts>({
    first: 5,
    second: 2,
    thirdAndUp: 1,
  });
  const [expressShippingCosts, setExpressShippingCosts] = useState<ShippingCosts>({
    first: 10,
    second: 4,
    thirdAndUp: 2,
  });
  return (
    <WixDesignSystemProvider>
      <Page height='100vh'>
        <Page.Header
          actionsBar={
            <Box gap='SP2'>
              <Button skin='inverted'>Cancel</Button>
              <Button onClick={onSave}>Save</Button>
            </Box>
          }
          breadcrumbs={
            <Breadcrumbs
              activeId='2'
              items={[
                { id: '1', value: 'Apps' },
                { id: '2', value: 'Shipping Rate App' },
              ]}
              onClick={() => {}}
            />
          }
          title='Shipping Rate App'
          subtitle='Tailor shipping charges based on delivery speed and items quantity, ensuring a flexible and cost-effective solution for your business.'
        />
        <Page.Content>
          <Layout>
            <Cell span={8}>
              <Layout>
                <Cell>
                  <ShippingDeliveryMethodForm
                    expandByDefault
                    title='Standard Delivery'
                    unitOfMeasure={standardShippingUom}
                    onUnitOfMeasureSelected={setStandardShippingUom}
                    shippingCosts={standardShippingCosts}
                    onShippingCostsChanged={setStandardShippingCosts}
                    methodType={ShippingMethodType.STANDARD}
                  />
                </Cell>
                <Cell>
                  <ShippingDeliveryMethodForm
                    title='Express Delivery'
                    unitOfMeasure={expressShippingUom}
                    onUnitOfMeasureSelected={setExpressShippingUom}
                    shippingCosts={expressShippingCosts}
                    onShippingCostsChanged={setExpressShippingCosts}
                    methodType={ShippingMethodType.EXPRESS}
                  />
                </Cell>
                <Cell>
                  <ActivationDetailsCard />
                </Cell>
              </Layout>
            </Cell>
            <Cell span={4}>
              <Page.Sticky>
                <Card>
                  <Card.Header title='Rate Summary' />
                  <Card.Divider />
                  <Card.Content>
                    <Box direction='vertical' paddingBottom='SP4' gap='10px'>
                      <ShippingMethodSummary
                        title='Standard Delivery'
                        shippingCosts={standardShippingCosts}
                        unitOfMeasure={standardShippingUom}
                      />
                    </Box>
                    <Card.Divider />
                    <Box direction='vertical' paddingTop='SP4' gap='10px'>
                      <ShippingMethodSummary
                        title='Express Delivery'
                        shippingCosts={expressShippingCosts}
                        unitOfMeasure={expressShippingUom}
                      />
                    </Box>
                  </Card.Content>
                </Card>
              </Page.Sticky>
            </Cell>
            <Cell>
              <Page.Footer divider>
                <Page.Footer.End>
                  <Box gap='SP2'>
                    <Button priority='secondary'>Cancel</Button>
                    <Button onClick={onSave}>Save</Button>
                  </Box>
                </Page.Footer.End>
              </Page.Footer>
            </Cell>
          </Layout>
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  );
};
