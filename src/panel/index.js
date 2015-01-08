import MessageEventManager from './message_event_manager';
import ToolkitManager from './toolkit_manager';
import UserManager from './user_manager';
import { state } from '../store';


const Panel = {
  el: '.js-panel',

  components: {
    'message-event-manager': MessageEventManager,
    'toolkit-manager': ToolkitManager,
    'user-manager': UserManager,
  },

  computed: {
    manager: function () {
      let ids = state.currentSubnavId.split('/');

      if (ids[0] === 'message' || ids[0] === 'event') {
        return 'message-event-manager';
      } else if (ids[0] === 'user') {
        return 'user-manager';
      } else if (ids[0] === 'toolkit') {
        return 'toolkit-manager';
      } else {
        throw new Error('NotImplementedError');
      }
    },
  },
};


export default Panel;
