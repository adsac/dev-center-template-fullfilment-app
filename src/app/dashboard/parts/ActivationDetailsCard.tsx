import { useSDK } from '@/app/utils/wix-sdk.client';
import { Box, Card, Text, TextButton } from '@wix/design-system';

export function ActivationDetailsCard() {
  const {
    dashboard: { navigate },
  } = useSDK();
  return (
    <Card hideOverflow>
      <Card.Header title='Activation' />
      <Card.Divider />
      <Card.Content>
        <Text>In order for the shipping rate logic to be applied, you need to activate it.</Text>
        <Box paddingTop='SP3'>
          <Text>
            <ol style={{ marginBottom: '0' }}>
              <li style={{ marginBottom: '0', marginLeft: '24px' }}>
                Go to{' '}
                <TextButton onClick={() => navigate('stores.shipping')}>Shipping and Delivery Settings</TextButton> page
              </li>
              <li style={{ marginBottom: '0', marginLeft: '24px' }}>
                Select the regions you&apos;d like to apply the shipping rate logic on and click on the Edit button
              </li>
              <li style={{ marginBottom: '0', marginLeft: '24px' }}>
                Scroll down to the bottom of the page to the &quot;Installed Apps&quot; and switch ON the app toggle
              </li>
            </ol>
          </Text>
        </Box>
      </Card.Content>
    </Card>
  );
}
