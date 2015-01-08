import { state, actions } from '../../store';


const MenuItem = {
  props: ['item', 'select'],

  computed: {
    classes: function () {
      return {
        'list-group-item': true,
        'list-group-item-info': this.item.isSelected,
        'list-group-item-warning': this.item.isDirty,
        'active': this.item.selected, // eslint-disable-line quote-props
      };
    },

    styles: function () {
      return {
        'margin-top': this.item.y === 0 ? '15px' : null,
      };
    },
  },

  template: (/* .vue */
    <a :class="classes" :style="styles" @click="select(item.x, item.y)">{{ item.name }}</a>
  )/* .vue */,
};


const MenuGroup = {
  props: ['items', 'select'],

  components: {
    'menu-item': MenuItem,
  },

  data: function () {
    return {
      item0: null,
      item1: null,
      item2: null,
      item3: null,
      item4: null,
      item5: null,
    };
  },

  template: (/* .vue */
    <div class="list-group">
      <menu-item v-for="t in items" :item="t" :select="select"></menu-item>
    </div>
  )/* .vue */,
};

const MenuForm = {
  data: function () {
    return {
      name: null,
      type: null,
      url: null,

      canRemove: false,
      canMoveUp: false,
      canMoveDown: false,
      canMoveLeft: false,
      canMoveRight: false,
    };
  },

  computed: {
    x: function () {
      let current = state.menus.filter(m => m.isSelected)[0];
      return current ? current.x : -1;
    },

    y: function () {
      let current = state.menus.filter(m => m.isSelected)[0];
      return current ? current.y : -1;
    },
  },

  ready: function () {
    this.reset();
  },

  watch: {
    x: function () {
      this.reset();
    },

    y: function () {
      this.reset();
    },
  },

  template: (/* .vue */
  <form class="form-horizontal" v-if="x >= 0">
    <div class="form-group">
      <label class="col-sm-2 control-label">Type</label>
      <div class="col-sm-6 text-right">
        <select class="form-control" v-model="type">
          <option value="group">有子菜单</option>
          <option value="view">普通网页</option>
          <option value="view/snsapi_base">获取用户 OpenId 网页</option>
          <option value="view/snsapi_userinfo">获取用户信息网页</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">Name</label>
      <div class="col-sm-6 text-right">
        <input class="form-control" v-model="name" />
      </div>
    </div>
    <div class="form-group hidden">
      <label class="col-sm-2 control-label">Key</label>
      <div class="col-sm-6 text-right">
        <input class="form-control" />
      </div>
    </div>
    <div class="form-group" v-if="type !== 'group'">
      <label class="col-sm-2 control-label">Url</label>
      <div class="col-sm-10 text-right">
        <input class="form-control" v-model="url" />
      </div>
    </div>
    <div class="form-group hidden">
      <label class="col-sm-2 control-label">MediaId</label>
      <div class="col-sm-6 text-right">
        <input class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-4 col-sm-offset-2">
        <button type="button" class="btn btn-default" @click="save"><i class="glyphicon glyphicon-chevron-left"></i> 更新</button>
      </div>
      <div class="col-sm-6 text-right">
        <button type="button" class="btn btn-danger" v-if="canRemove" @click="remove"><i class="glyphicon glyphicon-remove"></i></button>
        <button type="button" class="btn btn-default" v-if="canMoveUp" @click="moveUp"><i class="glyphicon glyphicon-arrow-up"></i></button>
        <button type="button" class="btn btn-default" v-if="canMoveDown" @click="moveDown"><i class="glyphicon glyphicon-arrow-down"></i></button>
        <button type="button" class="btn btn-default" v-if="canMoveLeft" @click="moveLeft"><i class="glyphicon glyphicon-arrow-left"></i></button>
        <button type="button" class="btn btn-default" v-if="canMoveRight" @click="moveRight"><i class="glyphicon glyphicon-arrow-right"></i></button>
      </div>
    </div>
  </form>
  )/* .vue */,

  methods: {
    reset: function () {
      let menu = state.menus.filter(m => m.x === this.x && m.y === this.y)[0];
      if (menu) {
        this.name = menu.name;
        this.type = menu.type;
        this.url = menu.url;

        this.canRemove = !!this.name;

        let [ux, uy] = [this.x, this.y + 1];
        this.canMoveUp = this.name && this.y > 0 && uy <= 5 && !!state.menus.filter(m => m.x === ux && m.y === uy)[0].name;

        this.canMoveDown = this.name && this.y > 0 && this.y > 1;

        this.canMoveLeft = this.name && this.y === 0 && this.x > 0;

        this.canMoveRight = this.name && this.y === 0 && this.x < 2;
      }
    },

    save: function () {
      actions.updateMenu({
        x: this.x,
        y: this.y,
        name: this.name,
        type: this.type,
        url: this.url,
      });
    },

    remove: function () {
      actions.removeMenu(this.x, this.y);
    },

    moveUp: function () {
      actions.exchangeMenu({ x: this.x, y: this.y }, { x: this.x, y: this.y + 1 });
    },

    moveDown: function () {
      actions.exchangeMenu({ x: this.x, y: this.y }, { x: this.x, y: this.y - 1 });
    },

    moveLeft: function () {
      actions.exchangeMenu({ x: this.x, y: this.y }, { x: this.x - 1, y: this.y });
    },

    moveRight: function () {
      actions.exchangeMenu({ x: this.x, y: this.y }, { x: this.x + 1, y: this.y });
    },
  },
};


const BoardMenu = {
  components: {
    'menu-group': MenuGroup,
    'menu-form': MenuForm,
  },

  data: function () {
    return {
      selectedX: -1,
      selectedY: -1,
    };
  },

  computed: {
    x0: function () {
      return state.menus.filter(m => m.x === 0);
    },
    x1: function () {
      return state.menus.filter(m => m.x === 1);
    },
    x2: function () {
      return state.menus.filter(m => m.x === 2);
    },
  },

  template: (/* .vue */
  <div class="ToolkitMenu">
    <div class="row">

      <div class="col-sm-2" style="border-left: 1px dashed #eee;">
        <menu-group :items="x0" :select="select"></menu-group>
      </div>

      <div class="col-sm-2">
        <menu-group :items="x1" :select="select"></menu-group>
      </div>

      <div class="col-sm-2" style="border-right: 1px dashed #eee;">
        <menu-group :items="x2" :select="select"></menu-group>
      </div>

      <div class="col-sm-6">
        <menu-form></menu-form>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-sm-2 text-center"><button class="btn btn-default" @click="download">下载菜单</button></div>
      <div class="col-sm-2 text-center"><button class="btn btn-default" @click="upload">上传菜单</button></div>
    </div>
  </div>
  )/* .vue */,

  methods: {
    select: function (x, y) {
      if (x === 0 && y === 0) {
        actions.selectMenu(x, y);
        return;
      }

      let prevX;
      let prevY;

      if (y === 0) {
        prevX = x - 1;
        prevY = 0;
      } else {
        prevX = x;
        prevY = y - 1;
      }

      let menu = state.menus.filter(m => m.x === prevX && m.y === prevY)[0];
      if (menu.name) {
        actions.selectMenu(x, y);
      }
    },

    download: function () {
      actions.downloadMenu();
    },

    upload: function () {
      actions.uploadMenu();
    },
  },
};


export default BoardMenu;
