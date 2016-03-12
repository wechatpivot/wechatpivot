import { state, actions } from '../store';
import './style';


const Notification = {
  el: '.js-notification',

  computed: {
    notifications: () => state.notifications,
  },

  methods: {
    dismiss: function (id) {
      actions.flashDismiss(id);
    },
  },
};


export default Notification;
