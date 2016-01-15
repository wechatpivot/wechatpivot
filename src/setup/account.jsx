import dispatcher from '../dispatcher';
import { state, actions } from '../store';


const Account = {
  props: ['tab', 'close'],

  data: function () {
    return {
      selected: null,
      is_validating: false,

      msg_error: null,
      msg_success: null,

      id: null,
      valid: null,
      url: null,
      token: null,
      app_id: null,
    };
  },

  computed: {
    accounts: () => state.accounts,

    current_account_id: () => state.current_account_id,
  },

  watch: {
    current_account_id: function (id, prev_id) {
      console.debug(id, prev_id);
      if (id) {
        this.selected = id;
        this.is_validating = false;
        this.msg_success = '验证通过';

        setTimeout(() => {
          this.msg_success = null;
          this.close();
        }, 1500);
      }
    },

    selected: function () {
      this.reset();
    },
  },

  template: (/* .vue */
  <ul class="nav nav-tabs">
    <li v-for="a in accounts" :class="{active: a.id === selected}" @click="selected = a.id">
      <a><i class="glyphicon glyphicon-ok" v-if="a.id === current_account_id"></i>{{a.id}}</a>
    </li>
    <li :class="{active: !selected}" @click="selected = null">
      <a><i class="glyphicon glyphicon-plus"></i></a>
    </li>
  </ul>
  <form class="form-horizontal">
    <div class="form-group">
      <label class="col-sm-4 control-label required">Id</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" placeholder="和微信无关，用作在本地缓存多个帐号" v-model="id" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 control-label required">服务器接口 Url</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" placeholder="开发者填写URL，调试时将把消息推送到该URL上" v-model="url" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 control-label required">Token</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" placeholder="Token" v-model="token" />
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-4 control-label">AppId</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" placeholder="AppId" v-model="app_id" />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 text-center" v-if="msg_error">
        <div class="bg-warning">{{msg_error}}</div>
      </div>
      <div class="col-sm-12 text-center" v-if="msg_success">
        <div class="bg-success">{{msg_success}}</div>
      </div>
      <div class="col-sm-12 text-right" v-if="!msg_success">
        <button type="button" class="btn btn-default pull-left" v-if="selected" @click="remove"><i class="glyphicon glyphicon-remove"></i> 删除</button>
        <button type="button" class="btn btn-link" @click="reset">取消</button>
        <button type="button" class="btn btn-primary" :class="{disabled: is_validating}" @click="validate">
          {{ is_validating ? '验证中...' : '验证' }}
        </button>
      </div>
    </div>
  </form>
  )/* .vue */,

  methods: {
    reset: function () {
      this.is_validating = false;

      let account = state.accounts.filter(a => a.id === this.selected)[0];
      if (account) {
        this.id = account.id;
        this.url = account.url;
        this.token = account.token;
        this.app_id = account.app_id;
      } else {
        this.id = null;
        this.url = null;
        this.token = null;
        this.app_id = null;
      }
    },

    validate: function () {
      if (!this.is_validating) {
        this.is_validating = true;
        this.msg_error = null;
        actions.validate(this.id, this.url, this.token, this.app_id);
      }
    },

    remove: function () {
      this.id = null;
      this.url = null;
      this.token = null;
      this.app_id = null;
      actions.removeAccount(this.selected);
    },
  },

  ready: function () {
    let that = this;

    dispatcher.$on('INVALID_ACCOUNT', function (message) {
      that.is_validating = false;
      that.msg_error = message;
    });
  },
};


export default Account;
