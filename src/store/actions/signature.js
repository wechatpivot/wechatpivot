import crypto from 'crypto';


export default function generate_query(token) {
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = Math.random().toString(36).substring(2);

  const source = [token.toString(), timestamp.toString(), nonce.toString()].sort().join('');
  const signature = crypto.createHash('sha1').update(source).digest('hex');

  return { timestamp, nonce, signature };
}
