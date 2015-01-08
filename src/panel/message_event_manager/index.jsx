import hljs from 'highlight.js';
import FormMessageText from './form_message_text';
import FormEventSubscribe from './form_event_subscribe';
import FormEventUnsubscribe from './form_event_unsubscribe';
import FormEventScanAndSubscribe from './form_event_scan_and_subscribe';
import FormEventScan from './form_event_scan';
import { state, actions } from '../../store';


const MessageEventManager = {
  props: [],

  components: {
    'form-message-text': FormMessageText,
    'form-event-subscribe': FormEventSubscribe,
    'form-event-unsubscribe': FormEventUnsubscribe,
    'form-event-scan-and-subscribe': FormEventScanAndSubscribe,
    'form-event-scan': FormEventScan,
  },

  data: function () {
    return {
      xml: null,
      msg_error: null,
      msg_success: null,
    };
  },

  computed: {
    send_resp: () => state.send_resp,

    form: function () {
      let ids = state.currentSubnavId.split('/');
      ids.unshift('form');
      return ids.join('-');
    },
  },

  template: (/* .vue */
  <div class="row">
    <div class="col-md-4">
      <component :is="form" :pretty="pretty"></component>
    </div>

    <div class="col-md-8">
      <div class="panel panel-default">
        <div class="panel-body">
          <code class="hidden" v-el:code-plain>{{ xml }}</code>
          <pre><code v-el:code-pretty class="xml"></code></pre>
          <pre v-if="send_resp"><code class="xml">{{ send_resp }}</code></pre>
          <textarea v-if="msg_error">{{ msg_error }}</textarea>
        </div>
        <div class="panel-footer text-right">
          <button type="button" class="btn btn-primary" @click="send">Send</button>
        </div>
      </div>
    </div>
  </div>
  )/* .vue */,

  methods: {
    pretty: function (xml) {
      this.xml = xml;

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


export default MessageEventManager;
