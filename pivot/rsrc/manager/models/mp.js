import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import SDK from '../services/sdk';
import * as menuSugar from '../sugars/menu';


export default modelExtend(pageModel, {
  namespace: 'mp',

  state: {
    mpList: [],
    mpListLoading: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        dispatch({ type: 'MpIndexPage' });
      })
    },
  },

  effects: {
    *MpIndexPage(action, { select, call, put, take }) {
      yield put({ type: 'account/getLatestToken' });
      yield take('account/getLatestToken/@@end');
      const account = yield select(state => state.account.account);
      const sdk = new SDK(account);
      const { menu } = yield call(sdk.getMenu.bind(sdk));
      const smartMenu = menuSugar.fromWeixin(menu);
      yield put({ type: 'downloadSuccess', payload: smartMenu });
    },
  },

  reducers: {
    downloadSuccess(state, { payload: menus }) {
      return { ...state, menus };
    },

    selectSuccess(state, { payload: { x: sx, y: sy } }) {
      const form = state.menus.find(m => m.x === sx && m.y === sy);
      return { ...state, form, sx, sy };
    },
  },
});
