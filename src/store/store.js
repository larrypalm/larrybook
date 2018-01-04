import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import posts from '../reducers/posts';
import error from '../reducers/errors';
import user from '../reducers/user';
import comments from '../reducers/comments';
import userdata from '../reducers/userdata';

const rootReducer = combineReducers({
  posts,
  error,
  user,
  comments,
  userdata
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

export default store;
