import { dashboard } from '@wix/dashboard';
import { createClient } from '@wix/sdk';

const client = createClient({
  host: dashboard.host(),
  auth: dashboard.auth(),
  modules: {
    dashboard,
  },
});
