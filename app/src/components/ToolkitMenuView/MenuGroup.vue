<template>
  <div class="grid-content">
    <el-card class="box-card">
      <menu-item v-for="t in this.children" :item="t" :select="select"></menu-item>
    </el-card>
    <el-card class="box-card">
      <menu-item :item="parent" :select="select"></menu-item>
    </el-card>
  </div>
</template>

<script>
  import MenuItem from './MenuItem';

  export default {
    props: ['items', 'select'],

    components: {
      'menu-item': MenuItem,
    },

    computed: {
      parent() {
        return this.items[5];
      },

      children() {
        return this.items.slice(0, 5);
      }
    }
  };
</script>
