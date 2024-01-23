'use client';
import { Box, Breadcrumbs, Button, Cell, Layout, Loader, Page, WixDesignSystemProvider } from '@wix/design-system';
import { useSDK } from '@/app/utils/wix-sdk.client';
import { useCallback, useState } from 'react';
import '@wix/design-system/styles.global.css';
import { ActivationDetailsCard } from '@/app/dashboard/parts/ActivationDetailsCard';
import { ShippingDeliveryMethodForm } from '@/app/dashboard/parts/ShippingDeliveryMethodForm';
import { OrderSummary, ShippingAppData, ShippingCosts, ShippingUnitOfMeasure } from '@/app/types/app-data.model';
import { ShippingMethodSummary } from '@/app/dashboard/parts/ShippingMethodSummary';

export const ShippingRatesPageContent = ({
  shippingAppData,
  orders,
  setShippingAppData,
}: {
  shippingAppData: ShippingAppData;
  orders?: OrderSummary[];
  setShippingAppData: (data: ShippingAppData) => Promise<void>;
}) => {
  const {
    dashboard: { showToast },
  } = useSDK();
  const [currentShippingAppData, setCurrentShippingAppData] = useState<ShippingAppData>(shippingAppData);
  const [loading, setLoading] = useState(false);
  const onSave = useCallback(() => {
    setLoading(true);
    setShippingAppData(currentShippingAppData)
      .then(() => {
        showToast({
          message: 'Shipping rates saved successfully',
          type: 'success',
        });
      })
      .catch(() => {
        showToast({
          message: 'Failed to save shipping rates',
          type: 'error',
        });
      })
      .finally(() => setLoading(false));
  }, [showToast, currentShippingAppData, setShippingAppData]);
  const setUomForMethod = useCallback(
    (code: string) => (type: ShippingUnitOfMeasure) => {
      setCurrentShippingAppData({
        ...currentShippingAppData,
        shippingMethods: currentShippingAppData.shippingMethods.map((m) =>
          m.code === code ? { ...m, unitOfMeasure: type } : m,
        ),
      });
    },
    [currentShippingAppData],
  );
  const setCostsForMethod = useCallback(
    (code: string) => (costs: ShippingCosts) => {
      setCurrentShippingAppData({
        ...currentShippingAppData,
        shippingMethods: currentShippingAppData.shippingMethods.map((m) => (m.code === code ? { ...m, costs } : m)),
      });
    },
    [currentShippingAppData],
  );
  return (
    <WixDesignSystemProvider>
      <Page height='100vh'>
        <Page.Header
          actionsBar={
            <Box gap='SP2'>
              <Button skin='inverted'>Cancel</Button>
              <Button onClick={onSave}>{loading ? <Loader size='tiny' /> : 'Save'}</Button>
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
                {currentShippingAppData.shippingMethods.map((method, index) => (
                  <Cell key={method.code}>
                    <ShippingDeliveryMethodForm
                      expandByDefault={index === 0}
                      title={method.title}
                      unitOfMeasure={method.unitOfMeasure}
                      onUnitOfMeasureSelected={setUomForMethod(method.code)}
                      shippingCosts={method.costs}
                      onShippingCostsChanged={setCostsForMethod(method.code)}
                      methodType={method.type}
                    />
                  </Cell>
                ))}
                <Cell>
                  <ActivationDetailsCard />
                </Cell>
              </Layout>
            </Cell>
            <Cell span={4}>
              <Page.Sticky>
                <ShippingMethodSummary orders={orders} />
              </Page.Sticky>
            </Cell>
            <Cell>
              <Page.Footer divider>
                <Page.Footer.End>
                  <Box gap='SP2'>
                    <Button priority='secondary'>Cancel</Button>
                    <Button onClick={onSave}>{loading ? <Loader size='tiny' /> : 'Save'}</Button>
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
