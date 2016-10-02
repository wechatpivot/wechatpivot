<template>
  <el-form :model="form" label-position="top" v-if="x >= 0">
    <el-form-item label="Type">
      <el-select v-model="form.type" style="width: 200px;">
        <el-option label="有子菜单" value="group"></el-option>
        <el-option label="普通网页" value="view"></el-option>
        <el-option label="获取用户 OpenId 网页" value="view/snsapi_base"></el-option>
        <el-option label="获取用户信息网页" value="view/snsapi_userinfo"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Name">
      <el-input v-model="form.name" style="width: 200px;"></el-input>
    </el-form-item>
    <el-form-item label="Url" v-if="form.type !== 'group'">
      <el-input type="textarea" v-model="form.url"></el-input>
    </el-form-item>
    <!-- TODO: Key -->
    <!-- TODO: MediaId -->
    <el-form-item>
      <el-button icon="arrow-left" @click.native="save">更新</el-button>
      <el-button type="danger" v-if="canRemove" @click.native="remove">删除</el-button>
      <el-button v-if="canMoveUp" @click.native="moveUp">上移</el-button>
      <el-button v-if="canMoveDown" @click.native="moveDown">下移</el-button>
      <el-button v-if="canMoveLeft" @click.native="moveLeft">左移</el-button>
      <el-button v-if="canMoveRight" @click.native="moveRight">右移</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'MenuForm',

  data: function () {
    return {
      form: {
        name: null,
        type: null,
        url: null,
      },

      canRemove: false,
      canMoveUp: false,
      canMoveDown: false,
      canMoveLeft: false,
      canMoveRight: false,
    };
  },

  computed: {
    x: function () {
      const current = this.menus.filter(m => m.isSelected)[0];
      return current ? current.x : -1;
    },

    y: function () {
      const current = this.menus.filter(m => m.isSelected)[0];
      return current ? current.y : -1;
    },

    ...mapGetters([
      'menus',
    ])
  },

  watch: {
    x: function () {
      this.reset();
    },

    y: function () {
      this.reset();
    },
  },

  methods: {
    reset() {
      const menu = this.menus.filter(m => m.x === this.x && m.y === this.y)[0];
      if (menu) {
        this.form.name = menu.name;
        this.form.type = menu.type;
        this.form.url = menu.url;

        this.canRemove = !!this.form.name;

        const [ux, uy] = [this.x, this.y + 1];
        this.canMoveUp = this.form.name && this.y > 0 && uy <= 5 && !!this.menus.filter(m => m.x === ux && m.y === uy)[0].name;

        this.canMoveDown = this.form.name && this.y > 0 && this.y > 1;

        this.canMoveLeft = this.form.name && this.y === 0 && this.x > 0;

        this.canMoveRight = this.form.name && this.y === 0 && this.x < 2;
      }
    },

    save() {
      this.updateMenu({
        x: this.x,
        y: this.y,
        name: this.form.name,
        type: this.form.type,
        url: this.form.url,
      });
    },

    remove: function () {
      this.removeMenu({ x: this.x, y: this.y });
    },

    moveUp() {
      this.exchangeMenu({ x1: this.x, y1: this.y, x2: this.x, y2: this.y + 1 });
    },

    moveDown() {
      this.exchangeMenu({ x1: this.x, y1: this.y, x2: this.x, y2: this.y - 1 });
    },

    moveLeft() {
      this.exchangeMenu({ x1: this.x, y1: this.y, x2: this.x - 1, y2: this.y });
    },

    moveRight() {
      this.exchangeMenu({ x1: this.x, y1: this.y, x2: this.x + 1, y2: this.y });
    },

    ...mapActions([
      'updateMenu',
      'exchangeMenu',
      'removeMenu',
    ]),
  },

  mounted: function () {
    this.reset();
  },
};
</script>
