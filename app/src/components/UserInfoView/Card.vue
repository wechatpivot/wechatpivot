<style>
.UserInfo-card {
  margin-bottom: 20px;
  cursor: pointer;
}

.UserInfo-cardAvatar {
  display: block;
  width: 96px;
  height: 96px;
  margin-left: auto;
  margin-right: auto;
}

.UserInfo-cardName {
  margin-top: 15px;
  text-align: center;
}
</style>

<template>
  <el-card class="UserInfo-card" :body-style="{ padding: '15px 0px' }">
    <img :src="user.headimgurl" class="UserInfo-cardAvatar">
    <div class="UserInfo-cardName">{{ user.nickname }}</div>
  </el-card>
</template>

<script>
  export default {
    name: 'UserInfoCard',

    props: ['user'],
  }
</script>
