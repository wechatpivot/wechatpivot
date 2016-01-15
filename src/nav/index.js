import dispatcher from '../dispatcher';
import { state, actions } from '../store';
import './style';


const Nav = {
  el: '.js-nav',

  data: {
    open: false,
  },

  computed: {
    navs: () => state.navs,
    current_nav: () => state.navs.filter(n => n.id === state.current_nav_id)[0],

    subnavs: function () {
      return this.current_nav.subnavs;
    },

    current_subnav_id: () => state.current_subnav_id,
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
      console.debug('dispatcher.CLICK_OUTSIDE');
      that.open = false;
    });
  },
};


export default Nav;
