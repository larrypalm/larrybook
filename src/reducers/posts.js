export default function posts(state = [], action){

  switch(action.type){
    case "ADD_POST":
      return [...state, action.payload];
    case "REMOVE_USER":
      return state.filter(user => user.id !== action.payload.id)
    case "ADD_COMMENT_POST":
      return state.map(user => {
        return user.id ===action.payload.id
        ? Object.assign({}, action.payload)
        : todo
      })
    default:
      return state;
  }

}
