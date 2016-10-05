<template>
  <el-dialog title="配置您的微信帐号" :value="active">
    <el-tabs type="card" @tab-click="select" :active-name="currentAppId">
      <el-tab-pane v-for="a in accounts" :label="a.isCurrent? '✓' + a.alias : a.alias" :name="a.appId"></el-tab-pane>
      <el-tab-pane label="+"></el-tab-pane>
    </el-tabs>
    <el-form :model="form" label-position="left" label-width="160px">
      <el-form-item label="Alias">
        <el-input v-model="form.alias" placeholder="和微信无关，用作在本地标识多个帐号"></el-input>
      </el-form-item>
      <el-form-item label="AppId (应用ID)">
        <el-input v-model="form.appId" placeholder="AppId"></el-input>
      </el-form-item>
      <el-form-item label="AppSecret (应用密钥)">
        <el-input v-model="form.appSecret" placeholder="AppSecret"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="delete" style="margin-right:60px">删除</el-button>
        <el-button type="text">重置</el-button>
        <el-button>验证</el-button>
        <el-button type="primary" @click.native.prevent="save">保存并使用</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
// TODO: header like to help: http://mp.weixin.qq.com/wiki/17/2d4265491f12608cd170a95559800f2d.html
// TODO: .el-dialog__body { width: 100% }
// TODO: [ appId, appSecret ] error

import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'AccountModal',

  props: {
    active: {
      type: Boolean,
    },
  },

  data: function () {
    return {
      selected: null,
      isSaving: false,

      form: {
        alias: null,
        appId: null,
        appSecret: null,
        url: null,
        token: null,
        id: null,
        userOpenId: null,
      },
    };
  },

  computed: {
    currentAppId() {
      const current = this.accounts.filter(a => a.isCurrent);
      if (current.length === 1) {
        return current[0].appId;
      } else {
        return null;
      }
    },

    ...mapGetters([
      'accounts',
      'accountDismissAfter',
    ])
  },

  watch: {
    currentAppId: function (appId) {
      if (appId) {
        this.selected = appId;
      }
    },

    selected: function () {
      this.reset();
    },
  },

  methods: {
    select(appId) {
      this.selected = appId;
    },

    reset: function () {
      // this.isValidating = false;
      this.isSaving = false;

      const account = this.accounts.filter(a => a.appId === this.selected)[0];
      if (account) {
        this.form.alias = account.alias;
        this.form.appId = account.appId;
        this.form.appSecret = account.appSecret;
        this.form.url = account.url;
        this.form.token = account.token;
        this.form.id = account.id;
        this.form.userOpenId = account.userOpenId;
      } else {
        this.form.alias = null;
        this.form.appId = null;
        this.form.appSecret = null;
        this.form.url = null;
        this.form.token = null;
        this.form.id = null;
        this.form.userOpenId = null;
      }
    },

    save() {
      if (!this.isSaving) {
        this.isSaving = true;
        this.updateAccount({
          alias: this.form.alias,
          appId: this.form.appId,
          appSecret: this.form.appSecret,
          // url: this.url,
          // token: this.token,
          // id: this.id,
          // userOpenId: this.userOpenId,
        });
      }
    },

    ...mapActions([
      'updateAccount'
    ]),
  },
}
</script>
