import { dashboard } from '@wix/dashboard';
import { useMemo } from 'react';
import { createClient } from '@wix/sdk';

export const useDashboard = () => {
  const sdk = useMemo(
    () =>
      createClient({
        host: dashboard.host(),
        auth: dashboard.auth(),
        modules: {
          dashboard,
        },
      }),
    [],
  );
  return sdk.dashboard;
};
