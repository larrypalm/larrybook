import {createStore, combineReducers} from 'redux';
import posts from '../reducers/posts';
import error from '../reducers/errors';

const rootReducer = combineReducers({
  posts,
  error
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
