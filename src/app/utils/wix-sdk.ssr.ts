'use server';

import { createClient } from '@wix/sdk';
import { headers } from 'next/headers';
import { items } from '@wix/data';
// this should only be used in server components
export const createSdk = () =>
  createClient({
    auth: {
      getAuthHeaders: async () => ({
        headers: Object.fromEntries(headers().entries()),
      }),
    },
    modules: {
      items,
    },
  });
