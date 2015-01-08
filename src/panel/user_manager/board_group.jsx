import { state, actions } from '../../store';


const BoardGroup = {
  data: function () {
    return {
      updateGroupId: null,
      updateGroupName: null,
      createGroupName: null,
    };
  },

  computed: {
    groups0: () => state.userGroups.filter((g, i) => i < 10),
    groups1: () => state.userGroups.filter((g, i) => i > 10 && i < 20),
    groups2: () => state.userGroups.filter((g, i) => i > 20 && i < 30),
    groups3: () => state.userGroups.filter((g, i) => i > 30 && i < 40),
  },

  template: (/* .vue */
  <div>
    <div class="row">
      <div class="col-sm-4">
        <form class="form-inline">
          <button type="button" class="btn btn-default" @click="loadUserGroups">获取用户分组信息</button>
        </form>
      </div>
      <div class="col-sm-4">
        <form class="form-inline">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Name" v-model="createGroupName">
          </div>
          <button type="button" class="btn btn-default" @click="createUserGroup">添加用户分组</button>
        </form>
      </div>
      <div class="col-sm-4">
        <form class="form-inline">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Id" v-model="updateGroupId" :style="{width: '50px'}">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Name" v-model="updateGroupName">
          </div>
          <button type="button" class="btn btn-default" @click="updateUserGroup">编辑分组名称</button>
        </form>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-sm-3">
        <table class="table table-condensed table-striped table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in groups0">
              <td>{{ g.id }}</td>
              <td>{{ g.name }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-sm-3">
        <table class="table table-condensed table-striped table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in groups1">
              <td>{{ g.id }}</td>
              <td>{{ g.name }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-sm-3">
        <table class="table table-condensed table-striped table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in groups2">
              <td>{{ g.id }}</td>
              <td>{{ g.name }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-sm-3">
        <table class="table table-condensed table-striped table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in groups3">
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
      actions.loadUserGroups();
    },

    updateUserGroup: function () {
      if (this.updateGroupId >= 100) {
        actions.updateUserGroup(this.updateGroupId, this.updateGroupName);
        this.updateGroupId = null;
        this.updateGroupName = null;
      } else {
        console.warn('请不要修改默认分组！');
      }
    },

    createUserGroup: function () {
      actions.createUserGroup(this.createGroupName);
      this.createGroupName = null;
    },
  },
};


export default BoardGroup;
