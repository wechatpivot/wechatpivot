<template>
  <div :class="classes" @click="select(item.x, item.y)">{{ item.name }}</div>
</template>

<script>
export default {
  props: ['item', 'select'],

  computed: {
    classes: function () {
      return {
        'ToolkitMenu-item': true,
        'ToolkitMenu-item--selected': this.item.isSelected,
        'ToolkitMenu-item--dirty': this.item.isDirty,
        'ToolkitMenu-item--active': this.item.selected, // eslint-disable-line quote-props
      };
    },
  },

}
</script>
