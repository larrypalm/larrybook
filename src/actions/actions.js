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

export function addUserListener(){
  return function(dispatch){
    return firebase.database().ref("users")
      .on("child_added", user => {
        const addedUser = {...user.val(), key: user.key};
        dispatch({type: "CHILD_ADDED", user: addedUser});
      })
  }
}

export function removeUserListener(){
  return function(dispatch){
    return firebase.database().ref("users")
      .on("child_removed", user => {
        const removedUser = {...user.val(), key: user.key};
        dispatch({type: "CHILD_REMOVED", user: removedUser});
      })
  }
}

//Like
export function changeUserListener(){
  return function(dispatch){
    return firebase.database().ref("users")
      .on("child_changed", user => {
        const changedUser = {...user.val(), key: user.key};
        dispatch({type: "CHILD_CHANGED", user: changedUser});
      })
  }
}

//sync to redux-state
export function addUser(user) {
  return function(dispatch){
    firebase.database().ref("users").push(user)
    .catch(error => {
      dispatch({type: "FETCH_ERROR", error: error.message});
    })
  }
}

export function likeUser(user) {
  return function(dispatch){
    firebase.database().ref(`users/${user.key}/like`).set(!user.like)
    .catch(error => {
      dispatch({type: "FETCH_ERROR", error: error.message});
    })
  }
}

export function removeUser(user) {
  return function(dispatch){
    firebase.database().ref(`users/${user.key}`).remove()
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

//call to api
// export function postUser(user) {
//   return function(dispatch){
//      fetch('https://fend-api.herokuapp.com/notes', {
//        method: 'POST',
//        headers: {
//          'Accept': 'application/json',
//          'Content-Type': 'application/json',
//        },
//        body: JSON.stringify(user)
//      })
//      .then(response => response.json())
//      .then(json => dispatch(addUser(user)))
//      .catch(error => console.log(error));
//   }
// }

// firebase.database().ref('users')
//   .push({text: "Learn firebase", completed: false})
//   firebase.database().ref('users')
//   .on("value", users => {
//     console.log(users.val());
//   })

export function addPost(post) {
  return {
    type: "ADD_POST",
    payload: post
  }
}
