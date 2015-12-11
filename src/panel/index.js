import hljs from 'highlight.js';
import superagent from 'superagent';
import ToUserName from './to_user_name';
import FromUserName from './from_user_name';
import CreateTime from './create_time';
import Content from './content';
import MsgId from './msg_id';
import {state, actions} from '../stores';


const Panel = {
  el: '.js-panel',

  components: {
    'to-user-name': ToUserName,
    'from-user-name': FromUserName,
    'create-time': CreateTime,
    'content': Content,
    'msg-id': MsgId,
  },

  data: function () {
    return {
      to_user_name: null,
      from_user_name: null,
      create_time: null,
      content: null,
      msg_id: null,
      xml: null,
      msgError: null,
      msgSuccess: null,
    };
  },

  methods: {
    reset: function () {
      this.to_user_name = null;
      this.from_user_name = null;
      this.create_time = null;
      this.content = null;
      this.msg_id = null;
    },

    validate: function () {
      this.xml = `
      <xml>
        <ToUserName><![CDATA[${this.to_user_name}]]></ToUserName>
        <FromUserName><![CDATA[${this.from_user_name}]]></FromUserName>
        <CreateTime>${this.create_time}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${this.content}]]></Content>
        <MsgId>${this.msg_id}</MsgId>
      </xml>
      `;

      let $plain = this.$els.codePlain;
      let $pretty = this.$els.codePretty;
      setTimeout(function () {
        $pretty.innerHTML = $plain.innerHTML;
        hljs.highlightBlock($pretty);
      }, 100);
    },

    send: function () {
      actions.send(this.xml);
    },
  },
};


export default Panel;
