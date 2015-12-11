import crypto from 'crypto';


export function generate_signature(token, timestamp, nonce) {
  const source = [token.toString(), timestamp.toString(), nonce.toString()].sort().join('');
  return crypto.createHash('sha1').update(source).digest('hex');
}
