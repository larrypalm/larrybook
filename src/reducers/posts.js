export default function post(state = [], action){

  switch(action.type){
    case "CHILD_ADDED":
      return [...state, action.post];
    case "CHILD_REMOVED":
      return state.filter(post => post.key !== action.post.key);
    case "CHILD_CHANGED":
      return state.map(post => {
        return post.key === action.post.key
        ? Object.assign({}, action.post)
        : post
      });
    default:
      return state;
  }

}
