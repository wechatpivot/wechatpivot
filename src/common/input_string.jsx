const InputString = {
  props: ['placeholder', 'value'],

  data: function () {
    return {
      className: 'col-sm-8',
    };
  },

  template: (/* .vue */
  <div className="{{ className }}">
    <input type="text" className="form-control" placeholder="{{ placeholder }}" v-model="value" />
    <i className="glyphicon glyphicon-refresh form-control-feedback" v-on:click="gen"></i>
  </div>
  )/* .vue */,

  methods: {
    gen: function () {
      this.value = Math.random().toString(36).substring(2);
    },
  },

  ready: function () {
    if (!this.value) {
      this.gen();
    }
  },
};


export default InputString;
