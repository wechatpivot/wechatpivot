import { pick } from './sugar';
import { FIELDS } from '../models/account';

// @return [Array] copy of accounts
export function getAccounts({ account }) {
  return account.accounts.map(a => pick(a, FIELDS));
}

// @return [Object] copy of current account
export function getCurrentAccount({ account: state }) {
  let current = state.accounts.filter(a => a.isCurrent);
  if (current.length === 1) {
    return pick(current[0], FIELDS);
  } else {
    throw new Error('NotImplementedError: store.actions.utils.getCurrentAccount');
  }
}
