export default function user(state = [], action){

  switch(action.type){
    case "CHILD_ADDED":
      return [...state, action.user];
    case "CHILD_REMOVED":
      return state.filter(user => user.key !== action.user.key);
    case "CHILD_CHANGED":
      return state.map(user => {
        return user.key === action.user.key
        ? Object.assign({}, action.user)
        : user
      });
    default:
      return state;
  }

}
