import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('Resource requested: ', request.nextUrl.href, ' with method: ', request.method);
  const headers = request.headers;
  if (request.nextUrl.searchParams.get('authorizationCode')) {
    const otp = request.nextUrl.searchParams.get('authorizationCode');
    const accessTokenRes = await fetch('https://manage.wix.com/token-creator/v1/token', {
      method: 'POST',
      body: JSON.stringify({ otp }),
    });
    if (accessTokenRes.status === 200) {
      const tokens = await accessTokenRes.json();
      headers.set('Authorization', tokens.accessToken);
    } else {
      console.error(
        '*** Failed to create access token from authorizationCode status:',
        accessTokenRes.status,
        ' request id is: ',
        accessTokenRes.headers.get('x-wix-request-id'),
      );
    }
  } else if (request.nextUrl.searchParams.get('instance')) {
    headers.set('Authorization', request.nextUrl.searchParams.get('instance')!);
  }
  return NextResponse.next({
    headers,
  });
}
