import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';

// decode the JWT token without secret key verification
export const decodeJwt = <T = any>(token: string): T | null => {
  const result = jwt.decode(token, { complete: true }) as Jwt;
  const payload = result.payload as JwtPayload;
  if (payload.exp! < Math.floor(Date.now() / 1000) && payload.iat! > Math.floor(Date.now() / 1000)) {
    throw new Error('parseJwt:seems that the token is expired');
  }
  return JSON.parse(payload.data);
};
