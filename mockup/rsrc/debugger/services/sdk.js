// import Account from '../models/account';
import axios from 'axios';

const $http = axios.create({
  crossdomain: true,
});

$http.interceptors.response.use(
  function (resp) {
    return resp.data;
  },
  function (error) {
    console.error(error);
    return Promise.reject(error);
  });

/**
 * 对返回结果的一层封装，如果遇见微信返回的错误，将返回一个错误
 * 参见：http://mp.weixin.qq.com/wiki/17/fa4e1434e57290788bde25603fa2fcbd.html
 */
function wrapper(res) {
  return new Promise(function (resolve, reject) {
    res.json().then(function (data) {
      if (data.errcode) {
        reject(`[WeChat API Error: ${data.errcode}] ${data.errmsg}`);
      } else {
        resolve(data);
      }
    });
  });
}

function $get(url) {
  return fetch(url, {
    mode: 'no-cors',
    method: 'get',
  }).then(wrapper);
}

function $post(url, data) {
  return fetch(url, {
    mode: 'cors',
    method: 'post',
    headers: {
      'Accept': 'application/json', // eslint-disable-line quote-props
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(wrapper);
}

/**
 * @param [Plain Key-Value Object] account
 */
export default function SDK(account) {
  this.account = account;

  const PROXY = 'http://api.weixin.qq.com.proxy.lisitede.com';

  this.prefix = PROXY + '/cgi-bin/';
  this.mpPrefix = 'https://mp.weixin.qq.com/cgi-bin/';
  this.fileServerPrefix = 'http://file.api.weixin.qq.com/cgi-bin/';
  this.payPrefix = 'https://api.weixin.qq.com/pay/';
  this.merchantPrefix = 'https://api.weixin.qq.com/merchant/';
  this.customservicePrefix = 'https://api.weixin.qq.com/customservice/';
}

/**
 * 根据创建API时传入的appid和appsecret获取access token
 * 进行后续所有API调用时，需要先获取access token
 * 详细请看：<http://mp.weixin.qq.com/wiki/11/0e4b294685f817b95cbed85ba5e82b8f.html>
 */
SDK.prototype.getAccessToken = function () {
  const { appId, appSecret } = this.account;
  const url = `${this.prefix}token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;

  return $http.get(url).then(function (res) {
    const accessToken = res.access_token;
    const accessTokenExpiredAt = Date.now() + (res.expires_in - 10) * 1000;
    return Promise.resolve({ accessToken, accessTokenExpiredAt });
  });
};

SDK.prototype.getLatestToken = function () {
  let account = this.account;

  if (account.hasAccessToken()) {
    let promise = new Promise(function (resolve) {
      resolve(account);
    });

    return promise;
  } else {
    return this.getAccessToken();
  }
};

SDK.parseWechatErrorCode = function (error) {
  let REG = /\[WeChat API Error: (\d+)\].*\[.*\]/i;
  let match = error.match(REG);
  return match[1];
};

// ================================

SDK.prototype.getGroups = function () {
  let url = `${this.prefix}groups/get?access_token=${this.account.accessToken}`;
  return this.getLatestToken().then(() => $get(url));
};

SDK.prototype.createGroup = function (name) {
  let url = `${this.prefix}groups/create?access_token=${this.account.accessToken}`;
  let data = {
    group: { name },
  };
  return this.getLatestToken().then(() => $post(url, data));
};

SDK.prototype.updateGroup = function (id, name) {
  let url = `${this.prefix}groups/update?access_token=${this.account.accessToken}`;
  let data = {
    group: { id, name },
  };
  return this.getLatestToken().then(() => $post(url, data));
};

SDK.prototype.getMenu = function () {
  const { accessToken } = this.account;
  const url = `${this.prefix}menu/get?access_token=${accessToken}`;
  return $http.get(url);
};

SDK.prototype.createMenu = function (menu) {
  const { accessToken } = this.account;
  const url = `${this.prefix}menu/create?access_token=${accessToken}`;
  return $http.post(url, menu);
};

SDK.prototype.getKfList = function () {
  let url = `${this.prefix}customservice/getkflist?access_token=${this.account.accessToken}`;
  return this.getLatestToken().then(() => $get(url));
};

SDK.prototype.getOnlineKfList = function () {
  let url = `${this.prefix}customservice/getonlinekflist?access_token=${this.account.accessToken}`;
  return this.getLatestToken().then(() => $get(url));
};

SDK.prototype.getUser = function (openId) {
  const url = `${this.prefix}user/info?openid=${openId}&lang=zh_CN&access_token=${this.account.accessToken}`;
  return this.getLatestToken().then(() => $get(url));
};
