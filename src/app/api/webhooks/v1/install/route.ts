import { type NextRequest } from 'next/server';
import { parseJwt } from '@/app/utils/jwt-verify';

export async function POST(request: NextRequest) {
  console.info('Webhook::install - called');
  const jwtPayload = await request.text();

  // verify the data was not tampered with, and get the input
  const input = parseJwt<any>(jwtPayload, false)!;
  console.info('Webhook::install - input is', input);

  return new Response('OK', {
    status: 200,
  });
}
