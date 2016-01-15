const CreateTime = {
  props: ['value'],

  template: `
  <div class="form-group has-feedback">
    <label class="col-sm-4 control-label required">CreateTime</label>
    <input-timestamp placeholder="消息创建时间（整型，无 ms）" :value.sync="value"></input-timestamp>
  </div>
  `,
};


export default CreateTime;
