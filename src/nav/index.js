import {state} from '../store';


const Nav = {
  el: '.js-nav',

  computed: {
    navs: function () {
      return state.navs;
    },
  },
};


export default Nav;
