import { type NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

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

  const appInstanceRes = await fetch('https://www.wixapis.com/apps/v1/instance', {
    method: 'GET',
    headers: {
      Authorization: accessToken,
    },
  });

  const appInstance: { instance: Record<string, any> & { instanceId: string }; site: Record<string, any> } =
    await appInstanceRes.json();

  const instanceId = appInstance.instance.instanceId;

  // you should now store the mapping between instance id and refresh token in a DB,
  // in order to issue a new access token in the future for an app instance
  // see: https://dev.wix.com/docs/rest/articles/getting-started/authentication

  console.log('received oauth refresh and access tokens - ', { accessToken, refreshToken, instanceId });

  return redirect(`https://www.wix.com/installer/close-window?access_token=${accessToken}`);
}
