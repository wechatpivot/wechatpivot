<style>
  html {
    font-family: sans-serif;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    font-size: 10px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  *, :after, :before {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.42857143;
    color: #333;
    background-color: #fff;
  }

  body, button, h1, h1 small, h2, h2 small, h3, h3 small, h4, h4 small, h5, h5 small, h6, h6 small, input, select, textarea {
    font-weight: 300;
  }

  footer {
    padding-top: 10px;
    margin-top: 40px;
    margin-left: 20px;
    margin-right: 20px;
    text-align: right;
    color: #bbb;
    font-family: Courier, Monaco, monospace;
    border-top: 1px solid #ddd;
  }

  .el-menu-item a {
    display: block;
    position: relative;
    color: #c0ccda;
    text-decoration: none;
    transition: all .3s;
  }

  .AppContainer {
    margin-left: 10px;
    margin-right: 10px;
  }

  .MainContainer {
    margin-top: 20px;
  }
</style>

<template>
  <div class="AppContainer">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-menu default-active="about">
          <el-submenu index="/toolkit">
            <template slot="title">工具箱</template>
            <el-menu-item index="/toolkit/menu"><a href="#/toolkit/menu">菜单管理</a></el-menu-item>
          </el-submenu>
          <el-submenu index="/message">
            <template slot="title">接受消息</template>
            <el-menu-item-group title="普通消息">
              <el-menu-item index="/message/"></el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="事件消息">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="/user">
            <template slot="title">用户管理</template>
            <el-menu-item-group title="普通消息">
              <el-menu-item index="/user/group"></el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="事件消息">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="about"><a href="#/about">关于</a></el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" class="MainContainer">
        <router-view></router-view>
      </el-col>
    </el-row>
    <footer>&copy; 2016 hbrls</footer>
  </div>
</template>

<script>
  import store from 'src/vuex/store';

  export default {
    store,
  };
</script>
