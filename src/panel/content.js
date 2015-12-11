const Content = {
  props: ['value'],

  template: `
  <div class="form-group has-feedback">
    <label class="col-sm-4 control-label required">Content</label>
    <input-text placeholder="文本消息内容" :value.sync="value"></input-text>
  </div>
  `,
};


export default Content;
