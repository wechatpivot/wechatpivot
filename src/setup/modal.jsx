import { state, actions } from '../store';


const Modal = {
  props: ['active'],

  data: function () {
    return {
      isValidating: false,
      msgError: null,
      msgSuccess: null,
      url: null,
      token: null,
      echo_str: null,
    };
  },

  template: (/* .vue */
  <div class="modal fade Setup-modal" :class="{active: active, in: active}">
    <div class="modal-backdrop fade Setup-backdrop" :class="{active: active, in: active}" @click="close"></div>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" @click="close">&times;</button>
          <h4 class="modal-title">配置您的微信账号</h4>
        </div>
        <div class="modal-body">
          <div class="alert alert-warning">
            <p>
              <em>* 开发者提交服务器信息后，微信服务器将发送 GET 请求到填写的服务器地址 URL 上，从而验证开发者服务器地址的有效性</em>
              <a href="http://mp.weixin.qq.com/wiki/17/2d4265491f12608cd170a95559800f2d.html" target="_blank" title="第二步：验证服务器地址的有效性">
                <i class="glyphicon glyphicon-question-sign"></i>
              </a>
            </p>
          </div>
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-4 control-label required">服务器接口 url</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" placeholder="开发者填写URL，调试时将把消息推送到该URL上" v-model="url" />
              </div>
            </div>
            <div class="form-group has-feedback">
              <label class="col-sm-4 control-label required">Token</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" placeholder="Token" v-model="token" />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <div class="alert alert-success text-center" v-if="msgSuccess">{{ msgSuccess }}</div>
          <div class="alert alert-danger text-center" v-if="msgError">{{ msgError }}</div>
          <button type="button" class="btn btn-primary" :class="{disabled: isValidating}" v-if="!msgSuccess" @click="validate">
            {{ isValidating ? '验证中...' : '验证' }}
          </button>
        </div>
      </div>
    </div>
  </div>
  )/* .vue */,

  methods: {
    close: function () {
      this.active = false;
      this.isValidating = false;
      this.msgError = null;
      this.msgSuccess = null;
    },

    validate: function () {
      actions.validate(this.token);
    },
  },

  ready: function () {
    actions.init();
    this.url = state.url;
    this.token = state.token;
  },
};


export default Modal;
