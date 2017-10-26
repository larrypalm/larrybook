export function addPost(post) {
  return {
    type: "ADD_POST",
    payload: post
  }
}

export function addUser(user) {
  return {
    type: "ADD_USER",
    payload: user
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
     .then(json => dispatch(addUser(user)));
  }
}
