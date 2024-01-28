import { type NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import { getAppInstance } from '@/app/actions/app-instance';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  if (!code) {
    return new Response(`No app token received`, {
      status: 403,
    });
  }
  const accessRes = await fetch('https://www.wixapis.com/oauth/access', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: process.env.WIX_APP_ID,
      client_secret: process.env.WIX_APP_SECRET_KEY,
      code,
    }),
  });

  const { access_token: accessToken, refresh_token: refreshToken } = await accessRes.json();

  const { instance } = await getAppInstance(accessToken);

  // you should now store the mapping between instance id and refresh token in a DB,
  // in order to issue a new access token in the future for an app instance
  // see: https://dev.wix.com/docs/rest/articles/getting-started/authentication

  console.log('received oauth refresh and access tokens - ', {
    accessToken,
    refreshToken,
    instanceId: instance.instanceId,
  });

  return redirect(`https://www.wix.com/installer/close-window?access_token=${accessToken}`);
}
