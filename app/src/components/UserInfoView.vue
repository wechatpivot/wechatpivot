<style>
.UserInfo {
}
</style>

<template>
  <div class="UserInfo">
    <el-row :gutter="20">
      <el-col :span="3" v-for="user in users"><card :user="user"></card></el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入 OpenId" icon="plus" @keyup.native.enter="search" v-model="openId">
          <el-button slot="append" icon="search" @click.native="search"></el-button>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Card from './UserInfoView/Card';


  export default {
    name: 'UserInfoView',

    components: {
      'card': Card,
    },

    data() {
      return {
        openId: '',

        // users: [
        //   { name: 'Magii A', avatar: 'http://wx.qlogo.cn/mmopen/PiajxSqBRaELRzwW3FKynRyiaHzHzEDkxOTKlRWYfgFicv3X1ku1dvNV2jic0HZcMjkPISCXum7PtSfU7p3OkRDFcg/0' },
        //   { name: '振清', avatar: 'http://wx.qlogo.cn/mmopen/GXW2uW7Dh3ZyETEgZUPzN6vWaYKfKs7NhmfozHMdon4U1iae4Xq03YTjqn7PsWIFfJ35Zy3GQaWk3TVkG3bDTCRswibbf8aH8C/0' },
        //   { name: 'Magii A', avatar: 'http://wx.qlogo.cn/mmopen/PiajxSqBRaELRzwW3FKynRyiaHzHzEDkxOTKlRWYfgFicv3X1ku1dvNV2jic0HZcMjkPISCXum7PtSfU7p3OkRDFcg/0' },
        //   { name: '振清', avatar: 'http://wx.qlogo.cn/mmopen/GXW2uW7Dh3ZyETEgZUPzN6vWaYKfKs7NhmfozHMdon4U1iae4Xq03YTjqn7PsWIFfJ35Zy3GQaWk3TVkG3bDTCRswibbf8aH8C/0' },
        //   { name: 'Magii A', avatar: 'http://wx.qlogo.cn/mmopen/PiajxSqBRaELRzwW3FKynRyiaHzHzEDkxOTKlRWYfgFicv3X1ku1dvNV2jic0HZcMjkPISCXum7PtSfU7p3OkRDFcg/0' },
        //   { name: '振清', avatar: 'http://wx.qlogo.cn/mmopen/GXW2uW7Dh3ZyETEgZUPzN6vWaYKfKs7NhmfozHMdon4U1iae4Xq03YTjqn7PsWIFfJ35Zy3GQaWk3TVkG3bDTCRswibbf8aH8C/0' },
        //   { name: 'Magii A', avatar: 'http://wx.qlogo.cn/mmopen/PiajxSqBRaELRzwW3FKynRyiaHzHzEDkxOTKlRWYfgFicv3X1ku1dvNV2jic0HZcMjkPISCXum7PtSfU7p3OkRDFcg/0' },
        //   { name: '振清', avatar: 'http://wx.qlogo.cn/mmopen/GXW2uW7Dh3ZyETEgZUPzN6vWaYKfKs7NhmfozHMdon4U1iae4Xq03YTjqn7PsWIFfJ35Zy3GQaWk3TVkG3bDTCRswibbf8aH8C/0' },
        //   { name: 'Magii A', avatar: 'http://wx.qlogo.cn/mmopen/PiajxSqBRaELRzwW3FKynRyiaHzHzEDkxOTKlRWYfgFicv3X1ku1dvNV2jic0HZcMjkPISCXum7PtSfU7p3OkRDFcg/0' },
        //   { name: '振清', avatar: 'http://wx.qlogo.cn/mmopen/GXW2uW7Dh3ZyETEgZUPzN6vWaYKfKs7NhmfozHMdon4U1iae4Xq03YTjqn7PsWIFfJ35Zy3GQaWk3TVkG3bDTCRswibbf8aH8C/0' },
        //   { name: 'Magii A', avatar: 'http://wx.qlogo.cn/mmopen/PiajxSqBRaELRzwW3FKynRyiaHzHzEDkxOTKlRWYfgFicv3X1ku1dvNV2jic0HZcMjkPISCXum7PtSfU7p3OkRDFcg/0' },
        //   { name: '振清', avatar: 'http://wx.qlogo.cn/mmopen/GXW2uW7Dh3ZyETEgZUPzN6vWaYKfKs7NhmfozHMdon4U1iae4Xq03YTjqn7PsWIFfJ35Zy3GQaWk3TVkG3bDTCRswibbf8aH8C/0' },
        //   { name: 'Magii A', avatar: 'http://wx.qlogo.cn/mmopen/PiajxSqBRaELRzwW3FKynRyiaHzHzEDkxOTKlRWYfgFicv3X1ku1dvNV2jic0HZcMjkPISCXum7PtSfU7p3OkRDFcg/0' },
        //   { name: '振清', avatar: 'http://wx.qlogo.cn/mmopen/GXW2uW7Dh3ZyETEgZUPzN6vWaYKfKs7NhmfozHMdon4U1iae4Xq03YTjqn7PsWIFfJ35Zy3GQaWk3TVkG3bDTCRswibbf8aH8C/0' },
        //   { name: 'Magii A', avatar: 'http://wx.qlogo.cn/mmopen/PiajxSqBRaELRzwW3FKynRyiaHzHzEDkxOTKlRWYfgFicv3X1ku1dvNV2jic0HZcMjkPISCXum7PtSfU7p3OkRDFcg/0' },
        //   { name: '振清', avatar: 'http://wx.qlogo.cn/mmopen/GXW2uW7Dh3ZyETEgZUPzN6vWaYKfKs7NhmfozHMdon4U1iae4Xq03YTjqn7PsWIFfJ35Zy3GQaWk3TVkG3bDTCRswibbf8aH8C/0' },
        // ],
      };
    },

    computed: {
      ...mapGetters([
        'users',
      ])
    },

    methods: {
      search() {
        this.loadUserInfo(this.openId);
      },

      ...mapActions([
        'loadUserInfo',
      ]),
    },
  }
</script>
