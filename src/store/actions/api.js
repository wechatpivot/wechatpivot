import Account from '../../models/account';


/*
 * 对返回结果的一层封装，如果遇见微信返回的错误，将返回一个错误
 * 参见：http://mp.weixin.qq.com/wiki/17/fa4e1434e57290788bde25603fa2fcbd.html
 */
function wrapper(res) {
  let promise = new Promise(function (resolve, reject) {
    res.json().then(function (data) {
      if (data.errcode) {
        reject(`[WeChat API Error: ${data.errcode}] ${data.errmsg}`);
      } else {
        resolve(data);
      }
    });
  });

  return promise;
}

function $get(url) {
  return fetch(url).then(wrapper);
}

function $post(url, data) {
  return fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json', // eslint-disable-line quote-props
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(wrapper);
}

/*
 * @param [Plain Key-Value Object] account
 */
export default function API(account) {
  this.account = new Account(account);

  this.prefix = 'https://api.weixin.qq.com/cgi-bin/';
  this.mpPrefix = 'https://mp.weixin.qq.com/cgi-bin/';
  this.fileServerPrefix = 'http://file.api.weixin.qq.com/cgi-bin/';
  this.payPrefix = 'https://api.weixin.qq.com/pay/';
  this.merchantPrefix = 'https://api.weixin.qq.com/merchant/';
  this.customservicePrefix = 'https://api.weixin.qq.com/customservice/';
}

/*!
 * 根据创建API时传入的appid和appsecret获取access token
 * 进行后续所有API调用时，需要先获取access token
 * 详细请看：<http://mp.weixin.qq.com/wiki/11/0e4b294685f817b95cbed85ba5e82b8f.html>
 */
API.prototype.getAccessToken = function () {
  let account = this.account;
  let onAccessTokenUpdated = this.onAccessTokenUpdated;
  let url = `${this.prefix}token?grant_type=client_credential&appid=${account.appId}&secret=${account.appSecret})`;

  let promise = new Promise(function (resolve) {
    account.shouldHaveAccessToAccessToken();

    $get(url).then(function (res) {
      account.accessToken = res.access_token;
      account.accessTokenExpiredAt = Date.now() + (res.expires_in - 10) * 1000;

      if (onAccessTokenUpdated) {
        onAccessTokenUpdated(account);
      }

      resolve(account);
    });
  });

  return promise;
};

API.prototype.getLatestToken = function () {
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

API.parseWechatErrorCode = function (error) {
  let REG = /\[WeChat API Error: (\d+)\].*\[.*\]/i;
  let match = error.match(REG);
  return match[1];
};

// ================================

API.prototype.getGroups = function () {
  let url = `${this.prefix}groups/get?access_token=${this.account.accessToken}`;
  return this.getLatestToken().then(() => $get(url));
};

API.prototype.createGroup = function (name) {
  let url = `${this.prefix}groups/create?access_token=${this.account.accessToken}`;
  let data = {
    group: { name },
  };
  return this.getLatestToken().then(() => $post(url, data));
};

API.prototype.updateGroup = function (id, name) {
  let url = `${this.prefix}groups/update?access_token=${this.account.accessToken}`;
  let data = {
    group: { id, name },
  };
  return this.getLatestToken().then(() => $post(url, data));
};

API.prototype.getMenu = function () {
  let url = `${this.prefix}menu/get?access_token=${this.account.accessToken}`;
  return this.getLatestToken().then(() => $get(url));
};

API.prototype.createMenu = function (menu) {
  let url = `${this.prefix}menu/create?access_token=${this.account.accessToken}`;
  return this.getLatestToken().then(() => $post(url, menu));
};

API.prototype.getKfList = function () {
  let url = `${this.prefix}customservice/getkflist?access_token=${this.account.accessToken}`;
  return this.getLatestToken().then(() => $get(url));
};

API.prototype.getOnlineKfList = function () {
  let url = `${this.prefix}customservice/getonlinekflist?access_token=${this.account.accessToken}`;
  return this.getLatestToken().then(() => $get(url));
};
