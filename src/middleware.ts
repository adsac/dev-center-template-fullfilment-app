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
    console.log(
      '\x1b[33m*** status:',
      accessTokenRes.status,
      '\x1b[0m - ',
      await accessTokenRes.json(),
      ' request id is: \x1b[32m',
      accessTokenRes.headers.get('x-wix-request-id'),
      '\x1b[0m',
      '\x1b[33m*** authorization before:',
      headers.get('Authorization'),
      '\x1b[0m - ',
    );
    headers.set('Authorization', '');
  }
  return NextResponse.next({
    headers,
  });
}
