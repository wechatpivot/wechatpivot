import { mapGetters, mapActions } from 'vuex'
import AccountModal from './AccountView/Modal';
import './AccountView/styles.css';


export default {
  name: 'AccountView',

  components: {
    'account-modal': AccountModal,
  },

  computed: mapGetters([
    'accountDismissAfter',
  ]),

  data() {
    return {
      active: false,
    }
  },

  methods: mapActions([
    'loadAccount',
    'openAccount',
  ]),

  watch: {
    accountDismissAfter: function (ms) {
      // console.debug(ms);
      if (ms < 0) {
        this.active = true;
      } else {
        setTimeout(() => (this.active = false), ms);
      }
    },
  },

  mounted() {
    this.loadAccount();
  },

  render(h) {
    return (
      <div class="Account">
        <div class="Account-logo" on-click={this.openAccount} />
        <account-modal active={this.active}></account-modal>
      </div>
    );
  } ,
};
