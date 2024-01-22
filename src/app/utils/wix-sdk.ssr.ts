'use server';

import { createClient } from '@wix/sdk';
import { headers } from 'next/headers';
import { orders } from '@wix/ecom';

// this should only be used in server components
export const createSdk = () =>
  createClient({
    auth: {
      getAuthHeaders: async () => ({
        headers: Object.fromEntries(headers().entries()),
      }),
    },
    modules: {
      orders,
    },
  });
