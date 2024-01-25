import { Box, Card, Divider, Text, TextButton } from '@wix/design-system';
import { ArrowRight } from '@wix/wix-ui-icons-common';
import { useSDK } from '@/app/utils/wix-sdk.client';
import { WixPageId } from '@/app/utils/navigation.const';
import { OrderSummary } from '@/app/types/order';

const LOCALE = 'en-US';

export function ShippingMethodSummary({ orders }: { orders?: OrderSummary[] }) {
  const {
    dashboard: { navigate },
  } = useSDK();

  return (
    <Card>
      <Card.Header title='Your last orders' />
      <Card.Divider />
      <Card.Content>
        <Box direction='vertical' paddingBottom='SP3'>
          {orders?.length ? (
            orders.map((order, index) => (
              <>
                {index > 0 && <Divider skin='light' />}
                <Box key={index} verticalAlign='middle' align='space-between' paddingTop='SP2' paddingBottom='SP1'>
                  <Box direction='vertical'>
                    <Text size='small' weight='normal'>
                      Order #{order.id}
                    </Text>
                    <Text size='tiny' weight='thin' skin='disabled'>
                      {new Date(order.createdDate).toLocaleDateString(LOCALE, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </Box>
                  <Text size='tiny' weight='thin'>
                    {new Intl.NumberFormat(LOCALE, {
                      style: 'currency',
                      currency: order.currency,
                      minimumFractionDigits: 0,
                    }).format(order.totalPrice)}
                  </Text>
                </Box>
              </>
            ))
          ) : (
            <Text size='small' weight='thin'>
              No orders found
            </Text>
          )}
        </Box>
        <Box align='right' paddingTop='SP1'>
          <TextButton onClick={() => navigate(WixPageId.MANAGE_ORDERS)} size='small' suffixIcon={<ArrowRight />}>
            Go to all orders
          </TextButton>
        </Box>
      </Card.Content>
    </Card>
  );
}
