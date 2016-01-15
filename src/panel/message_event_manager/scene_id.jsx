const SceneId = {
  props: ['value'],

  template: (/* .vue */
  <div class="form-group has-feedback">
    <label class="col-sm-4 control-label required">SceneId</label>
    <input-number placeholder="二维码的 scene_id（32 无符号整形）" :value.sync="value"></input-timestamp>
  </div>
  )/* .vue */,
};


export default SceneId;
