import ToUserName from './to_user_name';
import FromUserName from './from_user_name';
import CreateTime from './create_time';
import Content from './content';
import MsgId from './msg_id';
import { state } from '../../store';


const FormMessageText = {
  props: ['pretty'],

  components: {
    'to-user-name': ToUserName,
    'from-user-name': FromUserName,
    'create-time': CreateTime,
    'content': Content,
    'msg-id': MsgId,
  },

  data: function () {
    let account = state.accounts.filter(a => a.isCurrent)[0];

    return {
      toUserName: account ? account.id : null,
      fromUserName: account ? account.userOpenId : null,
      createTime: null,
      content: null,
      msgId: null,
    };
  },

  template: (/* .vue */
  <form class="form-horizontal">
    <to-user-name :value.sync="toUserName"></to-user-name>
    <from-user-name :value.sync="fromUserName"></from-user-name>
    <create-time :value.sync="createTime"></create-time>
    <content :value.sync="content"></content>
    <msg-id :value.sync="msgId"></msg-id>
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
      this.toUserName = null;
      this.fromUserName = null;
      this.createTime = null;
      this.content = null;
      this.msgId = null;
    },

    validate: function () {
      let xml = `
      <xml>
        <ToUserName><![CDATA[${this.toUserName}]]></ToUserName>
        <FromUserName><![CDATA[${this.fromUserName}]]></FromUserName>
        <CreateTime>${this.createTime}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${this.content}]]></Content>
        <MsgId>${this.msgId}</MsgId>
      </xml>
      `;

      this.pretty(xml);
    },
  },
};


export default FormMessageText;
