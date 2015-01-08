const MsgId = {
  props: ['value'],

  template: `
  <div class="form-group has-feedback">
    <label class="col-sm-4 control-label required">MsgId</label>
    <input-timestamp placeholder="消息id，64位整型" :value.sync="value"></input-timestamp>
  </div>
  `,
};


export default MsgId;
