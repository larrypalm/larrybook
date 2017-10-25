export function addPost(post) {
  return {
    type: "ADD_POST",
    payload: post
    // .catch(error => dispatch({type: "FETCH_ERROR", error}))
  }

}

export function removePost(post) {
  return {
    type: "REMOVE_POST",
    payload: post
  }
}
