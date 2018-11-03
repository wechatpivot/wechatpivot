import modelExtend from 'dva-model-extend'
import { model } from './common'
import SDK from '../services/sdk';


export default modelExtend(model, {
  namespace: 'account',

  state: {
    account: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        dispatch({ type: 'init' });
      })
    },
  },

  effects: {
    *init(action, { select, put }) {
      const account = yield select(state => state.account.account);
      if (!account) {
        const appId = localStorage.getItem('appId');
        const appSecret = localStorage.getItem('appSecret');
        yield put({ type: 'initAccount', payload: { appId, appSecret } });
      }
    },

    *getLatestToken(action, { select, call, put }) {
      const account = yield select(state => state.account.account);
      if (!account.accessToken) {
        const sdk = new SDK(account);
        const { accessToken, accessTokenExpiredAt } = yield call(sdk.getAccessToken.bind(sdk));
        yield put({ type: 'refreshToken', payload: { accessToken, accessTokenExpiredAt } });
      }
    },
  },

  reducers: {
    initAccount(state, { payload }) {
      return { ...state, account: payload };
    },

    refreshToken(state, { payload }) {
      return { ...state, account: { ...state.account, ...payload } };
    }
  },
})
