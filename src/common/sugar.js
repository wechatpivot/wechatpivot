export function pick(obj, fields) {
  return fields.reduce((memo, key) => {
    if (obj.hasOwnProperty(key)) {
      memo[key] = obj[key];
    }
    return memo;
  }, {});
}

// https://gist.github.com/jlong/2428561
export function parseUrl(url) {
  let parser = document.createElement('a');
  parser.href = url;

  return {
    protocol: parser.protocol, // "http:"
    hostname: parser.hostname, // => "example.com"
    port: parser.port,         // => "3000"
    pathname: parser.pathname, // => "/pathname/"
    search: parser.search,     // => "?search=test"
    hash: parser.hash,         // => "#hash"
    host: parser.host,         // => "example.com:3000"
  };
}

// https://github.com/amfe/amfe-env/blob/master/src/params.js
export function parseQuery(search) {
  return search.replace(/^\?/, '').split('&').reduce(function (memo, q) {
    let [k, v] = q.split('=');
    try {
      memo[k] = decodeURIComponent(v);
    } catch (e) {
      memo[k] = v;
    }
    return memo;
  }, {});
}

export function stringifyQuery(query) {
  return Object.keys(query).reduce(function (memo, key) {
    return `${memo}&${key}=${query[key]}`;
  }, '').substring(1);
}
