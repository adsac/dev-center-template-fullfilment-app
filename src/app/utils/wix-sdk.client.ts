'use client';
import { dashboard, SDK } from '@wix/dashboard';
import { useMemo } from 'react';
import { createClient } from '@wix/sdk';

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

export const useSDK = () => {
  const sdk = useMemo(
    () =>
      typeof window === 'undefined' || !inIframe()
        ? {
            // trying to use any of the methods in SSR will fail
            dashboard: {} as SDK,
          }
        : createClient({
            host: dashboard.host(),
            auth: dashboard.auth(),
            modules: {
              dashboard,
            },
          }),
    [typeof window],
  );
  return sdk;
};
