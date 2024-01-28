import { headers } from 'next/headers';

export const getAppInstance = async (
  accessToken?: string,
): Promise<{ instance: Record<string, any> & { instanceId: string }; site: Record<string, any> }> =>
  fetch('https://www.wixapis.com/apps/v1/instance', {
    method: 'GET',
    headers: accessToken
      ? {
          Authorization: accessToken,
        }
      : Object.fromEntries(headers().entries()),
  }).then((res) => res.json());
