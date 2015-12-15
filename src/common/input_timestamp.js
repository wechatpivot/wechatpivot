const InputTimestamp = {
  props: ['placeholder', 'value'],

  data: function () {
    return {
      className: 'col-sm-8',
    };
  },

  template: `
  <div class="{{ className }}">
    <input type="text" class="form-control" placeholder="{{ placeholder }}" v-model="value" />
    <i class="glyphicon glyphicon-refresh form-control-feedback" @click="gen"></i>
  </div>
  `,

  methods: {
    gen: function () {
      this.value = Math.floor(Date.now() / 1000);
    },
  },

  ready: function () {
    if (!this.value) {
      this.gen();
    }
  },
};


export default InputTimestamp;
