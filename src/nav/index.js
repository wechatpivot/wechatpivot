import dispatcher from '../dispatcher';
import { state, actions } from '../store';
import './style.scss';


const Nav = {
  el: '.js-nav',

  data: {
    open: false,
  },

  computed: {
    navs: () => state.navs,
    currentNav: () => state.navs.filter(n => n.id === state.currentNavId)[0],

    subnavs: function () {
      return this.currentNav.subnavs;
    },

    currentSubnavId: () => state.currentSubnavId,
  },

  methods: {
    changeNav: function (id) {
      actions.changeNav(id);
      this.open = false;
    },

    changeSubNav: function (id) {
      actions.changeSubNav(id);
      this.open = false;
    },
  },

  ready: function () {
    let that = this;

    dispatcher.$on('CLICK_OUTSIDE', function () {
      // console.debug('dispatcher.CLICK_OUTSIDE');
      that.open = false;
    });
  },
};


export default Nav;
