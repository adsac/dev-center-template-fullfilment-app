import { type NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  console.log('app install requested');
  const token = searchParams.get('token');
  if (!token) {
    return new Response(`Cannot perform authorize with no token query param`, {
      status: 403,
    });
  }
  const stateObject = JSON.parse(searchParams.get('state') || '{}');
  // the state object allows you to transfer information throughout the installation flow
  stateObject.testKey = 'test value';

  const baseUrl = request.nextUrl.href.split('/api/oauth/')[0];

  console.log('Base path is: ', baseUrl);

  return redirect(`https://www.wix.com/installer/install?token=${
      token
    }&state=${
      JSON.stringify(stateObject)
    }&redirectUrl=${
      `${baseUrl}/api/oauth/v1/signup`
    }&appId=${process.env.WIX_APP_ID}`);
}
