import { getInitialMenus } from '../../models/menu';
import * as types from '../mutation-types'

const state = {
  menus: getInitialMenus(),
};

const mutations = {
  [types.TOOKIT_MENU_UPDATE] (state, formatted) {
    formatted.forEach(m => {
      const idx = state.menus.findIndex(menu => menu.x === m.x && menu.y === m.y);
      state.menus.splice(idx, 1, m);
    });
  },
}

export default {
  state,
  mutations,
}
