const InputNumber = {
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
      this.value = Math.floor(Math.random() * 10e16);
    },
  },

  ready: function () {
    if (!this.value) {
      this.gen();
    }
  },
};


export default InputNumber;
