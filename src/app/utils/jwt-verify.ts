import jwt, {VerifyOptions, Jwt, JwtPayload} from 'jsonwebtoken';

const verifyOptions: VerifyOptions = {
  complete: true,
  algorithms: ['RS256'],
  // Add optional verification options, such as algorithms, audience, issuer, etc.
};

const parseJwtKeyIfEncoded = (secretOrPublicKey: string): string => {
    if (secretOrPublicKey.includes('\n') || secretOrPublicKey.includes('\r')) {
        // secretOrPublicKey is multi-line string, can be used as is
        return secretOrPublicKey.trim();
    } else {
        // secretOrPublicKey is base64 encoded
        return Buffer.from(secretOrPublicKey, 'base64').toString('utf-8');
    }
}

export const parseJwt = <T = any>(token: string, verifyCallerClaims = false): T | null => {
  const secretKey = process.env.WIX_APP_JWT_KEY;
  if (!token || !secretKey) {
    throw new Error('parseJwt:Missing token or secret key');
  }
  const result = jwt.verify(token, parseJwtKeyIfEncoded(secretKey), verifyOptions) as Jwt;
  const payload = result.payload as JwtPayload;
  if (verifyCallerClaims && (
    payload.aud !== process.env.WIX_APP_ID ||
    payload.iss !== 'wix.com'
  )) {
    throw new Error('parseJwt:seems that the token is not from the right caller');
  }
  if (
    payload.exp! < Math.floor(Date.now() / 1000) &&
    payload.iat! > Math.floor(Date.now() / 1000)
  ) {
    throw new Error('parseJwt:seems that the token is expired');
  }
  return payload.data;
}
