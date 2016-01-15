const FromUserName = {
  props: ['value'],

  template: `
  <div class="form-group has-feedback">
    <label class="col-sm-4 control-label required">FromUserName</label>
    <input-string placeholder="粉丝的 OpenID" :value.sync="value"></input-string>
  </div>
  `,
};


export default FromUserName;
