import crypto from 'crypto';
import { stringifyQuery } from '../../common/sugar';
import Account from '../../models/account';


export function genQuery(token) {
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = Math.random().toString(36).substring(2);

  const source = [token.toString(), timestamp.toString(), nonce.toString()].sort().join('');
  const signature = crypto.createHash('sha1').update(source).digest('hex');

  return { timestamp, nonce, signature };
}

export function validate(appId, url, token) {
  const query = genQuery(token);
  const echostr = Math.random().toString(36).substring(2);
  query.echostr = echostr;

  let promise = new Promise(function (resolve, reject) {
    fetch(url + '?' + stringifyQuery(query))
      .then(function (res) {
        return res.text();
      })
      .then(function (text) {
        if (text === query.echostr) {
          resolve(true);
        } else {
          reject(text);
        }
      })
      .catch(function (err) {
        reject(err.message);
      });
  });

  return promise;
}

export function send(account, xml) {
  let promise = new Promise(function (resolve, reject) {
    let acc = new Account(account);
    acc.shouldBeAMessageServer();

    const query = genQuery(acc.token);
    const echostr = Math.random().toString(36).substring(2);
    query.echostr = echostr;

    fetch(acc.url + '?' + stringifyQuery(query),
      {
        method: 'post',
        headers: {
          'Accept': 'text/xml',
          'Content-Type': 'text/xml',
        },
        body: xml,
      })
      .then(function (res) {
        return res.text();
      })
      .then(function (text) {
        resolve(text);
      })
      .catch(function (err) {
        reject(err.message);
      });
  });

  return promise;
}
