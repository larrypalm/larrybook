import firebase from '../firebase';

//Sync db to state
// export function fetchAllUsers(){
//   return function(dispatch){
//     firebase.database().ref("users")
//     .on("value", snapshot => {
//       let tempArray = []
//       snapshot.forEach(child => {
//         tempArray.push({...child.val(), key: child.key});
//       })
//       dispatch({type: "FETCH_ALL_USERS", users: tempArray})
//     })
//   }
// }

export function addPostListener(){
  return function(dispatch){
    return firebase.database().ref("posts")
      .on("child_added", post => {
        const addedPost = {...post.val(), key: post.key};
        dispatch({type: "CHILD_ADDED", post: addedPost});
      })
  }
}

export function removePostListener(){
  return function(dispatch){
    return firebase.database().ref("posts")
      .on("child_removed", post => {
        const removedPost = {...post.val(), key: post.key};
        dispatch({type: "CHILD_REMOVED", post: removedPost});
      })
  }
}

//Like
export function changePostListener(){
  return function(dispatch){
    return firebase.database().ref("posts")
      .on("child_changed", post => {
        const changedPost = {...post.val(), key: post.key};
        dispatch({type: "CHILD_CHANGED", post: changedPost});
      })
  }
}

//sync to redux-state
export function addPost(post) {
  return function(dispatch){
    firebase.database().ref("posts").push(post)
    .catch(error => {
      dispatch({type: "FETCH_ERROR", error: error.message});
    })
  }
}

export function likePost(post) {
  return function(dispatch){
    firebase.database().ref(`posts/${post.key}/like`).set(!post.like)
    .catch(error => {
      dispatch({type: "FETCH_ERROR", error: error.message});
    })
  }
}

export function removePost(post) {
  return function(dispatch){
    firebase.database().ref(`posts/${post.key}`).remove()
    .catch(error => {
      dispatch({type: "FETCH_ERROR", error: error.message});
    })
  }
}

export function addMovies() {
  return function (dispatch){
    fetch('https://fend-api.herokuapp.com/movies?_limit=20')
      .then(response => response.json())
      .then(movies => {
        dispatch({
          type: "ADD_MOVIES",
          movies
        })
    })
      .catch(error => dispatch({type: "FETCH_ERROR", error}))
  }
}
