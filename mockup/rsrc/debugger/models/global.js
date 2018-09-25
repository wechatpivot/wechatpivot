import modelExtend from 'dva-model-extend'
import { message } from 'antd';
import { model } from './common'

export default modelExtend(model, {
  namespace: 'global',

  state: {
    user: null,

    permissions: {
      edit: [],
    },

    menu: [], // 可访问的菜单
  },

  subscriptions: {
    setup({ dispatch, history }) {
    //   history.listen((location) => {
    //     if (location.pathname === '/post') {

    //     }
    //   })
    },
  },

  effects: {
    *warn({ payload }) {
      message.warn(payload);
    },
  },
})
