'use client';
import { Page, Layout, Cell, Card, Box, WixDesignSystemProvider, Button } from '@wix/design-system';

import '@wix/design-system/styles.global.css';
import { useDashboard } from '@/app/utils/wix-client';

export const DashboardContent = () => {
  const { showToast } = useDashboard();
  return (
    <WixDesignSystemProvider>
      <Page height='100vh'>
        <Page.Header
          actionsBar={
            <Button
              onClick={() =>
                showToast({
                  message: 'Toast is triggered from the app',
                })
              }
            >
              Click to show toast
            </Button>
          }
          title='Fullfillment App'
          subtitle='This is an example of a fullfillment app'
        />
        <Page.Content>
          <Layout>
            {new Array(8).fill(null).map((_, index) => (
              <Cell span={6} key={index}>
                <Card>
                  <Box height='180px' />
                </Card>
              </Cell>
            ))}
          </Layout>
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  );
};
