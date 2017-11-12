// export default function comment(state = [], action){
//
//   switch(action.type){
//     case "CHILD_ADDED":
//       return [...state, action.comment];
//     case "CHILD_REMOVED":
//       return state.filter(comment => comment.key !== action.comment.key);
//     case "CHILD_CHANGED":
//       return state.map(comment => {
//         return comment.key === action.comment.key
//         ? Object.assign({}, action.comment)
//         : comment
//       });
//     default:
//       return state;
//   }
//
// }
