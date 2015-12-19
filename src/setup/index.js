import Modal from './modal';
import './style';


const Setup = {
  el: '.js-setup',

  data: function () {
    return {
      active: false,
    };
  },

  components: {
    'setup-modal': Modal,
  },
};


export default Setup;
