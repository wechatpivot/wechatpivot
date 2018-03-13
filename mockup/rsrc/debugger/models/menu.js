import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import SDK from '../services/sdk';
import * as menuSugar from '../sugars/menu';


export default modelExtend(pageModel, {
  namespace: 'menu',

  state: {
    menus: [],
    sx: null,
    sy: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        dispatch({ type: 'download' });
      })
    },
  },

  effects: {
    *download({ payload }, { select, call, put, take }) {
      yield put({ type: 'account/getLatestToken' });
      yield take('account/getLatestToken/@@end');
      const account = yield select(state => state.account.account);
      const sdk = new SDK(account);
      const { menu } = yield call(sdk.getMenu.bind(sdk));
      const smartMenu = menuSugar.fromWeixin(menu);
      yield put({ type: 'downloadSuccess', payload: smartMenu });
    },

    *upload(action, { select, call, put, take }) {
      yield put({ type: 'account/getLatestToken' });
      yield take('account/getLatestToken/@@end');
      const account = yield select(state => state.account.account);
      const menus = yield select(state => state.menu.menus);
      const dumbMenu = menuSugar.toWeixin(menus, account.appId);
      const sdk = new SDK(account);
      yield call(sdk.createMenu.bind(sdk, dumbMenu));
    }
  },

  reducers: {
    downloadSuccess(state, { payload: menus }) {
      return { ...state, menus };
    },

    select(state, { payload: { x: sx, y: sy } }) {
      return { ...state, sx, sy };
    }
  },

})
