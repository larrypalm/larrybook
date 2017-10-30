import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import posts from '../reducers/posts';
import error from '../reducers/errors';
import movies from '../reducers/movies';
import users from '../reducers/users';

const rootReducer = combineReducers({
  posts,
  movies,
  error,
  users
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

export default store;
