import { pick } from '../common/sugar';

const devFields = ['alias', 'isCurrent'];
// export const INSENSITIVE_FIELDS = ['appId', 'token', 'url', 'id', 'userOpenId'].concat(devFields);
// export const FIELDS = ['appSecret', 'accessToken', 'accessTokenExpiredAt'].concat(INSENSITIVE_FIELDS);
// !!!debug
export const INSENSITIVE_FIELDS = ['appId', 'token', 'url', 'id', 'userOpenId', 'accessToken', 'accessTokenExpiredAt', 'appSecret'].concat(devFields);
export const FIELDS = [].concat(INSENSITIVE_FIELDS);

export default function Account(account) {
  // ** flat; copy by value
  Object.assign(this, pick(account, FIELDS));
  return this;
}

Account.prototype.shouldHaveValue = function (keys) {
  for (let k of keys) {
    if (!this[k]) {
      let err = new Error(k);
      err.name = 'ACCOUNT_HAS_NO_VALUE';
      throw err;
    }
  }
};

Account.prototype.hasAccessToken = function () {
  return this.accessToken && this.accessTokenExpiredAt && this.accessTokenExpiredAt > Date.now();
};

Account.prototype.shouldHaveAccessToAccessToken = function () {
  return this.hasAccessToken() || this.shouldHaveValue(['appId', 'appSecret']);
};

Account.prototype.shouldBeAMessageServer = function () {
  return this.shouldHaveValue(['url', 'token']);
};
