import hljs from 'highlight.js';
import FormMessageText from './form_message_text';
import FormEventSubscribe from './form_event_subscribe';
import FormEventUnsubscribe from './form_event_unsubscribe';
import FormEventScanAndSubscribe from './form_event_scan_and_subscribe';
import FormEventScan from './form_event_scan';
import { state, actions } from '../store';


const Panel = {
  el: '.js-panel',

  data: {
    xml: null,
    msg_error: null,
    msg_success: null,
  },

  components: {
    'form-message-text': FormMessageText,
    'form-event-subscribe': FormEventSubscribe,
    'form-event-unsubscribe': FormEventUnsubscribe,
    'form-event-scan-and-subscribe': FormEventScanAndSubscribe,
    'form-event-scan': FormEventScan,
  },

  computed: {
    send_resp: () => state.send_resp,

    form: function () {
      let ids = state.current_subnav_id.split('/');
      ids.unshift('form');
      return ids.join('-');
    },
  },

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


export default Panel;
