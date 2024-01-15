import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('****** Got call for: ', request.nextUrl.href, ' with method: ', request.method);
  return NextResponse.next();
}
