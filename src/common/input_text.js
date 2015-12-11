const LOREM_IPSUM = [
  '我能吞下玻璃而不伤身体',
  '学選上件飯要提会線本公唐。施朝保由殺来社機三成事催覧成社周描万。',
  '以績幕族施僚社政制度則欧。敦全済改員著文知待長底際問。失願選体索止西形乱成物明殺禁入財。低天駅支界韓線銅失仕点秘審職掲揺止確世文。',
  '望構質決芸転力来息位責囲野吸稿。学長母行山計好課東経多島。新増農覧等属食間買前聞諾初覚指報経。芳即吉天能続紙作民散政広創趣申界食。朝加仏球曜束楽法組楽商罪分色治。法泳目季生整内文供毎判松私無見削都覧優江。項論十地転子闘毎食紙止相。',
];


const InputString = {
  props: ['placeholder', 'value'],

  data: function () {
    return {
      className: 'col-sm-8',
    }
  },

  template: `
  <div class="{{ className }}">
    <textarea rows="5" class="form-control" placeholder="{{ placeholder }}" v-model="value"></textarea>
    <i class="glyphicon glyphicon-refresh form-control-feedback" @click="gen"></i>
  </div>
  `,

  methods: {
    gen: function () {
      var index = Math.floor(Math.random() * LOREM_IPSUM.length);
      this.value = LOREM_IPSUM[index];
    },
  },

  ready: function () {
    if (!this.value) {
      this.gen();
    }
  },
};


export default InputString;
