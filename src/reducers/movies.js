export default function movies(state = [], action){

  switch(action.type){
    case "ADD_MOVIES":
      return action.movies;
    default:
      return state;
  }

}
