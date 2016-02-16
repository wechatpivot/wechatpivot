import { state, actions } from '../../store';


const BoardGroup = {
  data: function () {
    return {
      app_secret: null,
      update_group_id: null,
      update_group_name: null,
      create_group_name: null,
    };
  },

  computed: {
    groups_0: () => state.user_groups.filter((g, i) => i < 10),
    groups_1: () => state.user_groups.filter((g, i) => i > 10 && i < 20),
    groups_2: () => state.user_groups.filter((g, i) => i > 20 && i < 30),
    groups_4: () => state.user_groups.filter((g, i) => i > 30 && i < 40),
  },

  template: (/* .vue */
  <div>
    <div class="row">
      <div class="col-md-4">
        <form class="form-inline">
          <div class="form-group">
            <input type="password" class="form-control" placeholder="App Secret" v-model="app_secret">
          </div>
          <button type="button" class="btn btn-default" @click="loadUserGroups">获取用户分组信息</button>
        </form>
      </div>
      <div class="col-md-4">
        <form class="form-inline">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Name" v-model="create_group_name">
          </div>
          <button type="button" class="btn btn-default" @click="createUserGroup">添加用户分组</button>
        </form>
      </div>
      <div class="col-md-4">
        <form class="form-inline">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Id" v-model="update_group_id" :style="{width: '50px'}">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Name" v-model="update_group_name">
          </div>
          <button type="button" class="btn btn-default" @click="updateUserGroup">编辑分组名称</button>
        </form>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-md-3">
        <table class="table table-condensed table-striped table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in groups_0">
              <td>{{ g.id }}</td>
              <td>{{ g.name }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-3">
        <table class="table table-condensed table-striped table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in groups_1">
              <td>{{ g.id }}</td>
              <td>{{ g.name }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-3">
        <table class="table table-condensed table-striped table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in groups_2">
              <td>{{ g.id }}</td>
              <td>{{ g.name }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-3">
        <table class="table table-condensed table-striped table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in groups_3">
              <td>{{ g.id }}</td>
              <td>{{ g.name }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )/* .vue */,

  methods: {
    loadUserGroups: function () {
      actions.loadUserGroups(this.app_secret);
    },

    updateUserGroup: function () {
      if (this.update_group_id >= 100) {
        actions.updateUserGroup(this.app_secret, this.update_group_id, this.update_group_name);
        this.update_group_id = null;
        this.update_group_name = null;
      } else {
        console.warn('请不要修改默认分组！');
      }
    },

    createUserGroup: function () {
      actions.createUserGroup(this.app_secret, this.create_group_name);
      this.create_group_name = null;
    },
  },
};


export default BoardGroup;
