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
    form: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        dispatch({ type: 'download' });
      })
    },
  },

  effects: {
    *download(action, { select, call, put, take }) {
      yield put({ type: 'account/getLatestToken' });
      yield take('account/getLatestToken/@@end');
      const account = yield select(state => state.account.account);
      const sdk = new SDK(account);
      const { menu } = yield call(sdk.getMenu.bind(sdk));
      const smartMenu = menuSugar.fromWeixin(menu);
      yield put({ type: 'downloadSuccess', payload: smartMenu });
    },

    *select({ payload }, { select, put }) {
      const menus = yield select(state => state.menu.menus);

      if (payload.y === 1) {
        if (payload.x !== 1) {
          const left = menus.find(m => m.x === payload.x - 1 && m.y === payload.y);
          if (!left.name) {
            yield put({ type: 'global/warn', payload: '左侧没有菜单' });
            yield put({ type: 'selectError' });
            return;
          }
        }
      } else {
        const bottom = menus.find(m => m.x === payload.x && m.y === payload.y - 1);
        if (!bottom.name) {
          yield put({ type: 'global/warn', payload: '下方没有菜单' });
          yield put({ type: 'selectError' });
          return;
        }
      }

      yield put({ type: 'selectSuccess', payload });
    },

    *upload(action, { select, call, put, take }) {
      yield put({ type: 'account/getLatestToken' });
      yield take('account/getLatestToken/@@end');
      const account = yield select(state => state.account.account);
      const menus = yield select(state => state.menu.menus);
      // console.log(menus);
      const dumbMenu = menuSugar.toWeixin(menus, account.appId);
      // console.log(dumbMenu);
      const sdk = new SDK(account);
      yield call(sdk.createMenu.bind(sdk, dumbMenu));
    }
  },

  reducers: {
    downloadSuccess(state, { payload: menus }) {
      return { ...state, menus };
    },

    selectSuccess(state, { payload: { x: sx, y: sy } }) {
      const form = state.menus.find(m => m.x === sx && m.y === sy);
      return { ...state, form, sx, sy };
    },

    selectError(state) {
      return { ...state, sx: null, sy: null };
    },

    update(state, { payload }) {
      const { x, y } = payload;
      const idx = state.menus.findIndex(m => m.x === x && m.y === y);
      const menus = state.menus;
      payload.$dirty = true;
      menus.splice(idx, 1, payload);
      return { ...state, menus, sx: null, sy: null };
    },
  },

})
