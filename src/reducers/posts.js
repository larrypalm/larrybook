export default function posts(state = [], action){

  switch(action.type){
    case "ADD_POST":
      return [...state, action.payload];
    case "REMOVE_POST":
      return state.filter(post => post.id !== action.payload.id)
    case "ADD_COMMENT_POST":
      return state.map(post => {
        return post.id ===action.payload.id
        ? Object.assign({}, action.payload)
        : post
      })
    default:
      return state;
  }

}
