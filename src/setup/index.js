import Account from './account';
import { state, actions } from '../store';
import './style';


const Setup = {
  el: '.js-setup',

  components: {
    account: Account,
  },

  data: function () {
    return {
      active: false,
    };
  },

  computed: {
    dismissAfter: () => state.setupDismissAfter,
  },

  watch: {
    dismissAfter: function (ms) {
      // console.debug(arguments);
      if (ms < 0) {
        this.active = true;
      } else {
        setTimeout(() => this.active = false, ms);
      }
    },
  },

  methods: {
    open: function () {
      actions.openSetup();
    },

    close: function () {
      actions.closeSetup();
    },
  },

  ready: function () {
    actions.loadSetup();
  },
};


export default Setup;
