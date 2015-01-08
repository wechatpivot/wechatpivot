import BoardMenu from './board_menu.jsx';
import { state } from '../../store';
import './style.scss';


const ToolkitManager = {
  components: {
    'board-toolkit-menu': BoardMenu,
  },

  computed: {
    send_resp: () => state.send_resp,

    board: function () {
      let ids = state.currentSubnavId.split('/');
      ids.unshift('board');
      return ids.join('-');
    },
  },

  template: (/* .vue */
  <component :is="board"></component>
  )/* .vue */,
};


export default ToolkitManager;
