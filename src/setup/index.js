import Account from './account';
import { actions } from '../store';
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

  methods: {
    open: function () {
      this.active = true;
    },

    close: function () {
      this.active = false;
    },
  },

  ready: function () {
    actions.loadSetup();
  },
};


export default Setup;
