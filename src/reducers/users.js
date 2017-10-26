export default function user(state = [], action){

  switch(action.type){
    case "FETCH_ALL_USERS":
      return action.users;
    case "ADD_USER":
      return [...state, action.payload];
    case "REMOVE_USER":
      return state.filter(user => user.key !== action.payload.key);
    case "ADD_COMMENT_USER":
      return state.map(user => {
        return user.key ===action.payload.key
        ? Object.assign({}, action.payload)
        : user
      })
    default:
      return state;
  }

}
