import modelExtend from 'dva-model-extend'
import { model } from './common'

export default modelExtend(model, {
  namespace: 'global',

  state: {
    user: null,

    permissions: {// 当前用户可访问的权限
      // visit: [],
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

  },
})
