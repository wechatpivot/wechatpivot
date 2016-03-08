import { state, actions } from '../store';


const Account = {
  props: ['tab', 'close', 'active'],

  data: function () {
    return {
      selected: null,

      alias: null,
      appId: null,
      appSecret: null,
      url: null,
      token: null,
      id: null,
      userOpenId: null,
    };
  },

  computed: {
    accounts: () => state.accounts,

    currentAccountAlias: function () {
      let current = state.accounts.filter(a => a.isCurrent);
      if (current.length === 1) {
        return current[0].alias;
      } else {
        return null;
      }
    },

    isValidating: () => state.setupIsValidating,
    isSaving: () => state.setupIsSaving,

    appIdError: () => state.setupError.indexOf('appId') > -1,
    urlError: () => state.setupError.indexOf('url') > -1,
    tokenError: () => state.setupError.indexOf('token') > -1,
    appSecretError: () => state.setupError.indexOf('appSecret') > -1,
    idError: () => state.setupError.indexOf('id') > -1,
    validtateError: function () {
      let error = state.setupError.filter(e => e.indexOf('validate:') === 0)[0];
      if (error) {
        return error.substring(9);
      } else {
        return null;
      }
    },
  },

  watch: {
    currentAccountAlias: function (alias) {
      if (alias) {
        this.selected = alias;
      }
    },

    selected: function () {
      this.reset();
    },
  },

  template: (/* .vue */
  <ul class="nav nav-tabs">
    <li v-for="a in accounts" :class="{active: a.alias === selected}" @click="selected = a.alias">
      <a><i class="glyphicon glyphicon-ok" v-if="a.isCurrent"></i>{{a.alias}}</a>
    </li>
    <li :class="{active: !selected}" @click="selected = null">
      <a><i class="glyphicon glyphicon-plus"></i></a>
    </li>
  </ul>
  <form class="form-horizontal">
    <div class="form-group">
      <label class="col-sm-4 control-label">Alias</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" placeholder="和微信无关，用作在本地缓存多个帐号" v-model="alias" />
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-8 col-sm-offset-4"><hr /></div>
    </div>
    <div :class="{'form-group': true, 'has-error': appIdError}">
      <label class="col-sm-4 control-label">AppId (应用ID)</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" placeholder="AppId" v-model="appId" />
      </div>
    </div>
    <div :class="{'form-group': true, 'has-error': appSecretError}">
      <label class="col-sm-4 control-label">AppSecret (应用密钥)</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" placeholder="AppSecret" v-model="appSecret" />
      </div>
    </div>
    <div :class="{'form-group': true, 'has-error': urlError}">
      <label class="col-sm-4 control-label">URL (服务器地址)</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" placeholder="开发者填写URL，调试时将把消息推送到该URL上" v-model="url" />
      </div>
    </div>
    <div :class="{'form-group': true, 'has-error': tokenError}">
      <label class="col-sm-4 control-label">Token (令牌)</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" placeholder="Token" v-model="token" />
      </div>
    </div>
    <div :class="{'form-group': true, 'has-error': idError}">
      <label class="col-sm-4 control-label">原始 Id</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" placeholder="原始 Id" v-model="id" />
      </div>
    </div>
    <div :class="{'form-group': true, 'has-error': tokenError}">
      <label class="col-sm-4 control-label">测试用户 OpenId</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" placeholder="测试用户 OpenId" v-model="userOpenId" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 text-center" v-if="validtateError">
        <div class="bg-warning">{{validtateError}}</div>
      </div>
      <div class="col-sm-12 text-right">
        <button type="button" class="btn btn-default pull-left" v-if="selected" @click="remove"><i class="glyphicon glyphicon-remove"></i> 删除</button>
        <button type="button" class="btn btn-link" @click="reset">重置</button>
        <button type="button" class="btn btn-default" :class="{disabled: isValidating}" @click="validate">
          {{ isValidating ? '验证中...' : '验证' }}
        </button>
        <button type="button" class="btn btn-primary" :class="{disabled: isSaving}" @click="save">
          {{ isSaving ? '保存中...' : '保存并使用' }}
        </button>
      </div>
    </div>
  </form>
  )/* .vue */,

  methods: {
    reset: function () {
      this.isValidating = false;
      this.isSaving = false;

      let account = state.accounts.filter(a => a.alias === this.selected)[0];
      if (account) {
        this.alias = account.alias;
        this.appId = account.appId;
        this.appSecret = account.appSecret;
        this.url = account.url;
        this.token = account.token;
        this.id = account.id;
        this.userOpenId = account.userOpenId;
      } else {
        this.alias = null;
        this.appId = null;
        this.appSecret = null;
        this.url = null;
        this.token = null;
        this.id = null;
        this.userOpenId = null;
      }
    },

    validate: function () {
      if (!this.isValidating) {
        this.isValidating = true;
        actions.validate({
          alias: this.alias,
          appId: this.appId,
          url: this.url,
          token: this.token,
        });
      }
    },

    save: function () {
      if (!this.isSaving) {
        this.isSaving = true;
        actions.updateAccount({
          alias: this.alias,
          appId: this.appId,
          appSecret: this.appSecret,
          url: this.url,
          token: this.token,
          id: this.id,
          userOpenId: this.userOpenId,
        });
      }
    },

    remove: function () {
      this.alias = null;
      this.appId = null;
      this.appSecret = null;
      this.url = null;
      this.token = null;
      this.id = null;
      this.userOpenId = null;
      actions.removeAccount(this.selected);
    },
  },
};


export default Account;
