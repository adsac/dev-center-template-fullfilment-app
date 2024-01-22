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
      <Box direction='vertical' width='100%' gap='SP1' paddingTop='SP4'>
        <Card.Content>
          <Text>In order for the shipping rate logic to be applied, you need to activate it.</Text>
          <Text>
            <ol>
              <li>
                Go to{' '}
                <TextButton onClick={() => navigate('stores.shipping')}>Shipping and Delivery Settings</TextButton> page
              </li>
              <li>
                Select the regions you&apos;d like to apply the shipping rate logic on and click on the Edit button
              </li>
              <li>
                Scroll down to the bottom of the page to the &quot;Installed Apps&quot; and switch ON the app toggle
              </li>
            </ol>
          </Text>
        </Card.Content>
      </Box>
    </Card>
  );
}
