import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import posts from '../reducers/posts';
import users from '../reducers/users';
import error from '../reducers/errors';
import movies from '../reducers/movies';

const rootReducer = combineReducers({
  posts,
  users,
  movies,
  error
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

export default store;
