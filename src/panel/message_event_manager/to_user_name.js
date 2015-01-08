const ToUserName = {
  props: ['value'],

  template: `
  <div class="form-group has-feedback">
    <label class="col-sm-4 control-label required">ToUserName</label>
    <input-string placeholder="开发者的微信号" :value.sync="value"></input-string>
  </div>
  `,
};


export default ToUserName;
