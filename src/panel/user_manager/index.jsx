import BoardGroup from './board_group';
import BoardService from './board_service';
import { state } from '../../store';


const UserManager = {
  components: {
    'board-user-group': BoardGroup,
    'board-user-service': BoardService,
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


export default UserManager;
