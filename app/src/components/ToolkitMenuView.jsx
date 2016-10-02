import { mapGetters, mapActions } from 'vuex'
import MenuGroup from './ToolkitMenuView/MenuGroup';
import MenuForm from './ToolkitMenuView/MenuForm';
import './ToolkitMenuView/styles.css';


export default {
  name: 'ToolkitMenuView',

  components: {
    'menu-group': MenuGroup,
    'menu-form': MenuForm,
  },

  computed: {
    x0: function () {
      return this.menus.filter(m => m.x === 0);
    },

    x1: function () {
      return this.menus.filter(m => m.x === 1);
    },

    x2: function () {
      return this.menus.filter(m => m.x === 2);
    },

    ...mapGetters([
      'menus',
    ]),
  },

  methods: {
    select: function (x, y) {
      if (x === 0 && y === 0) {
        this.selectMenu({ x, y });
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

      const menu = this.menus.filter(m => m.x === prevX && m.y === prevY)[0];
      if (menu.name) {
        this.selectMenu({ x, y });
      }
    },

    ...mapActions([
      'downloanMenu',
      'uploadMenu',
      'selectMenu',
    ]),
  },

  render(h) {
    return (
      <div class="ToolkitMenu">
        <el-row gutter={20}>
          <el-col span={4}>
            <menu-group items={this.x0} select={this.select}></menu-group>
          </el-col>
          <el-col span={4}>
            <menu-group items={this.x1} select={this.select}></menu-group>
          </el-col>
          <el-col span={4}>
            <menu-group items={this.x2} select={this.select}></menu-group>
          </el-col>
          <el-col span={12}>
            <div class="grid-content">
              <menu-form></menu-form>
            </div>
          </el-col>
        </el-row>
        <el-row gutter={20}>
          <el-col span={12}><hr /></el-col>
        </el-row>
        <el-row gutter={20}>
          <el-col span={3}>
            <el-button nativeOn-click={this.downloanMenu}>下载菜单</el-button>
          </el-col>
          <el-col span={3}>
            <el-button nativeOn-click={this.uploadMenu}>上传菜单</el-button>
          </el-col>
        </el-row>
      </div>
    );
  } ,
};
