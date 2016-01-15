import ToUserName from './to_user_name';
import FromUserName from './from_user_name';
import CreateTime from './create_time';
import SceneId from './scene_id';


const FormEventScanAndSubscribe = {
  props: ['pretty'],

  components: {
    'to-user-name': ToUserName,
    'from-user-name': FromUserName,
    'create-time': CreateTime,
    'scene-id': SceneId,
  },

  data: function () {
    return {
      to_user_name: null,
      from_user_name: null,
      create_time: null,
      scene_id: null,
    };
  },

  template: (/* .vue */
  <form class="form-horizontal">
    <to-user-name :value.sync="to_user_name"></to-user-name>
    <from-user-name :value.sync="from_user_name"></from-user-name>
    <create-time :value.sync="create_time"></create-time>
    <scene-id :value.sync="scene_id"></scene-id>
    <div class="form-group">
      <div class="col-md-12 text-right">
        <a class="btn btn-link" @click="reset">Reset</a>
        <button type="button" class="btn btn-default" @click="validate">Validate</button>
      </div>
    </div>
  </form>
  )/* .vue */,

  methods: {
    reset: function () {
      this.to_user_name = null;
      this.from_user_name = null;
      this.create_time = null;
      this.scene_id = null;
    },

    validate: function () {
      let xml = `
      <xml>
        <ToUserName><![CDATA[${this.to_user_name}]]></ToUserName>
        <FromUserName><![CDATA[${this.from_user_name}]]></FromUserName>
        <CreateTime>${this.create_time}</CreateTime>
        <MsgType><![CDATA[event]]></MsgType>
        <Event><![CDATA[subscribe]]></Event>
        <EventKey><![CDATA[qrscene_${this.scene_id}]]></EventKey>
        <Ticket><![CDATA[TICKET_TO_ACCESS_QRCODE]]></Ticket>
      </xml>
      `;

      this.pretty(xml);
    },
  },
};


export default FormEventScanAndSubscribe;
