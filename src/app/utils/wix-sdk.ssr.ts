'use server';

import { createClient } from '@wix/sdk';
import { headers } from 'next/headers';
import { items } from '@wix/data';
// this should only be used in server components

// Use this when serving a call which already sent a valid authorization header (with access token)
export const createSdk = (accessToken?: string | null) =>
  createClient({
    auth: {
      getAuthHeaders: async () => ({
        headers: accessToken
          ? {
              Authorization: accessToken,
            }
          : Object.fromEntries(headers().entries()),
      }),
    },
    modules: {
      items,
    },
  });
