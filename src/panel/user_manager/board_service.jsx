import { state, actions } from '../../store';


const BoardService = {
  computed: {
    staff: () => state.customerServiceStaff,
  },

  template: (/* .vue */
  <div>
    <div class="row">
      <div class="col-sm-4">
        <form class="form-inline">
          <button type="button" class="btn btn-default" @click="loadStaff">获取客服信息</button>
        </form>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-sm-3" v-for="s in staff" data-id="{{ s.kf_id }}">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">{{ s.kf_nick }} <small>{{ s.kf_account }}</small></h3>
          </div>
          <div class="panel-body">
            <img :src="s.kf_headimgurl" style="display:block;width:120px;height:120px;margin-bottom:15px;" />
            <p>微信：{{ s.kf_wx }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )/* .vue */,

  methods: {
    loadStaff: function () {
      actions.getCustomerServiceStaff();
    },
  },
};


export default BoardService;
