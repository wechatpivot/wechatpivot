import superagent from 'superagent';


// https://github.com/node-webot/wechat-api/blob/master/lib/util.js

/*
 * 对返回结果的一层封装，如果遇见微信返回的错误，将返回一个错误
 * 参见：http://mp.weixin.qq.com/wiki/17/fa4e1434e57290788bde25603fa2fcbd.html
 */
function wrapper(callback) {
  return function (err, res) {
    if (err) {
      return callback(Object.assign({}, err, { name: 'WeChatAPI' + err.name }), res.body);
    }

    if (res.body && res.body.errcode) {
      let apiError = new Error(res.body.errmsg);
      apiError.name = 'WeChatAPIError';
      apiError.code = res.body.errcode;
      return callback(apiError, res.body);
    }

    callback(null, res.body);
  };
}

// https://github.com/node-webot/wechat-api/blob/master/lib/api_common.js

export function AccessToken(access_token, expires_at) {
  if (!(this instanceof AccessToken)) {
    return new AccessToken(access_token, expires_at);
  }
  this.access_token = access_token;
  this.expires_at = expires_at;
}

AccessToken.prototype.isValid = function () {
  return !!this.access_token && (new Date().getTime()) < this.expires_at;
};

/**
 * @param {String} appid 在公众平台上申请得到的appid
 * @param {String} appsecret 在公众平台上申请得到的app secret
 * @param {String} access_token
 */
function API(appid, appsecret, token) {
  this.appid = appid;
  this.appsecret = appsecret;
  this.token = token;

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
API.prototype.getAccessToken = function (callback) {
  let url = this.prefix + 'token?grant_type=client_credential&appid=' + this.appid + '&secret=' + this.appsecret;
  let that = this;

  superagent
    .get(url)
    .end(wrapper(function (err, res) {
      if (err) {
        return callback(err);
      }

      // 过期时间，因网络延迟等，将实际过期时间提前10秒，以防止临界点
      let expires_at = (new Date().getTime()) + (res.expires_in - 10) * 1000;
      that.token = new AccessToken(res.access_token, expires_at);
      callback(err, that.token);
    }));

  return this;
};

/**
 * 获取最新的token
 */
API.prototype.getLatestToken = function (callback) {
  if (this.token && this.token.isValid()) {
    callback(null, this.token);
  } else {
    this.getAccessToken(callback);
  }
};


API.prototype.getGroups = function (callback) {
  let url = this.prefix + 'groups/get?access_token=' + this.token.access_token;
  superagent
    .get(url)
    .end(wrapper(callback));
};

API.prototype.createGroup = function (name, callback) {
  let url = this.prefix + 'groups/create?access_token=' + this.token.access_token;
  let data = {
    group: { name },
  };
  superagent
    .post(url)
    .send(data)
    .end(wrapper(callback));
};

API.prototype.updateGroup = function (id, name, callback) {
  let url = this.prefix + 'groups/update?access_token=' + this.token.access_token;
  let data = {
    group: { id, name },
  };
  superagent
    .post(url)
    .send(data)
    .end(wrapper(callback));
};


// ================

export const getGroups = function (account, app_secret) {
  let api = new API(account.app_id,
                    app_secret,
                    new AccessToken(account.access_token, account.expires_at));

  let promise = new Promise(function (resolve, reject) {
    api.getLatestToken(function (err_token, token) {
      if (err_token) {
        console.error(err_token);
      }

      api.getGroups(function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve([token, res.groups]);
        }
      });
    });
  });

  return promise;
};


export const createGroup = function (account, app_secret, name) {
  let api = new API(account.app_id,
                    app_secret,
                    new AccessToken(account.access_token, account.expires_at));

  let promise = new Promise(function (resolve, reject) {
    api.getLatestToken(function (err_token, token) {
      if (err_token) {
        console.error(err_token);
      }

      api.createGroup(name, function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve([token, res.group]);
        }
      });
    });
  });

  return promise;
};


export const updateGroup = function (account, app_secret, id, name) {
  let api = new API(account.app_id,
                    app_secret,
                    new AccessToken(account.access_token, account.expires_at));

  let promise = new Promise(function (resolve, reject) {
    api.getLatestToken(function (err_token, token) {
      if (err_token) {
        console.error(err_token);
      }

      api.updateGroup(id, name, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve([token, { id, name }]);
        }
      });
    });
  });

  return promise;
};
