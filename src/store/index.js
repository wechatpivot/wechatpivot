import Vue from 'vue';
import Vuex from './vuex';
Vue.use(Vuex);
import superagent from 'superagent';
import * as actions from './actions';
import mutations from './mutations';


const store = new Vuex.Store({
  state: {
    url: null,
    token: null,
    navs: [
      {
        id: 'message/text', text: '接收普通消息', active: true,
        subnavs: [
          {id: 'message/text', text: '文本消息', active: true, disabled: false},
          {id: 'message/fixme', text: '图片消息', active: false, disabled: true},
          {id: 'message/fixme', text: '语音消息', active: false, disabled: true},
          {id: 'message/fixme', text: '视频消息', active: false, disabled: true},
          {id: 'message/fixme', text: '小视频消息', active: false, disabled: true},
          {id: 'message/fixme', text: '地理位置消息', active: false, disabled: true},
          {id: 'message/fixme', text: '链接消息', active: false, disabled: true},
          {id: 'message/fixme', text: '文本消息', active: false, disabled: true},
          {id: 'http://mp.weixin.qq.com/wiki/10/79502792eef98d6e0c6e1739da387346.html', text: 'help', active: false, disabled: false},
        ],
      },
      {id: 'event/scan_subscribe', text: '接收事件推送', active: false,},
      {id: 'tools/oauth2', text: '小工具', active: false,},
    ],
  },
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
});


export default store;
