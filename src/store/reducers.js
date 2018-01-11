import { combineReducers } from 'redux';
import locationReducer from './location';

export const makeRootReducer = asyncReducers => combineReducers({
  location: locationReducer,
  ...asyncReducers,
  a: 1,
  b: 2,
});

export const injectReducer = (store, { key, reducer }) => {
  const selfStore = store;
  selfStore.asyncReducers[key] = reducer;
  selfStore.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
