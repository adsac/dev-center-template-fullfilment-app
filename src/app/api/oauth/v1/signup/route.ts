import { wixAppClient } from '@/app/utils/wix-app-client';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { accessToken, instanceId, refreshToken } = await wixAppClient.auth.handleOAuthCallback(request.url);

  // you should now store the mapping between instance id and refresh token in a DB,
  // in order to issue a new access token in the future for an app instance
  // see: https://dev.wix.com/docs/rest/articles/getting-started/authentication

  console.log('received oauth refresh and access tokens - ', {
    accessToken,
    refreshToken,
    instanceId: instanceId,
  });

  return redirect(`https://www.wix.com/installer/close-window?access_token=${accessToken}`);
}
