export default function user(state = [], action){

  switch(action.type){
    case "ADD_USER":
      return action.user;
    default:
      return state;
  }

}
