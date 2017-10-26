import firebase from '../firebase';

export function addPost(post) {
  return {
    type: "ADD_POST",
    payload: post
  }
}

//sync to redux-state
export function addUser(user) {
  return function(dispatch){
    firebase.database().ref("users").push(user)
    .then(addedUser => {
      dispatch({type: "ADD_USER", payload: user})
    })
  }
}

export function removePost(post) {
  return {
    type: "REMOVE_POST",
    payload: post
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
export function postUser(user) {
  return function(dispatch){
     fetch('https://fend-api.herokuapp.com/notes', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(user)
     })
     .then(response => response.json())
     .then(json => dispatch(addUser(user)))
     .catch(error => console.log(error));
  }
}

firebase.database().ref('users')
  .push({text: "Learn firebase", completed: false})
  firebase.database().ref('users')
  .on("value", users => {
    console.log(users.val());
  })
