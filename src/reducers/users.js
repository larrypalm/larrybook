export default function user(state = [], action){

  switch(action.type){
    case "ADD_USER":
      return [...state, action.payload];
    case "REMOVE_USER":
      return state.filter(user => user.id !== action.payload.id)
    case "ADD_COMMENT_USER":
      return state.map(user => {
        return user.id ===action.payload.id
        ? Object.assign({}, action.payload)
        : user
      })
    default:
      return state;
  }

} 
