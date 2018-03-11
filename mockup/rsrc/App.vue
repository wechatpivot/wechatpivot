<template>
  <el-row>
    <el-col :span="24">
      <div class="grid-content">
        <el-table :data="users" stripe style="width: 100%">
          <el-table-column prop="id" label="Id"></el-table-column>
          <el-table-column prop="username" label="Username"></el-table-column>
          <el-table-column prop="password" label="Password"></el-table-column>
        </el-table>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'app',

    data() {
      return {
        users: [],
      };
    },

    methods: {
    },

    mounted() {
      axios.get('/api/users').then(({ data: { data } }) => {
        const { users } = data;
        this.users = users;
      })
    },
  };
</script>
