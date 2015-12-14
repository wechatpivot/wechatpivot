import {state} from '../store';


const Subnav = {
  el: '.js-subnav',

  computed: {
    subnavs: function () {
      let current_nav = state.navs.filter(n => n.active)[0];
      return current_nav.subnavs;
    },
  },
};


export default Subnav;
