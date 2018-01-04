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

export function fetchUsers(){
  return function(dispatch){
    return firebase.database().ref(`users`).on('value', userdata => {
        let tempList = [];
        userdata.forEach(userdata => {
          tempList.push({...userdata.val(), key: userdata.key});
        })
        dispatch({ type: "FETCH_ALL_USERS", user: tempList });
    })
  }
}

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

export function addComment(comment) {
  return function(dispatch){
    firebase.database().ref(`comments`).push(comment)
    .catch(error => {
      dispatch({type: "FETCH_ERROR", error: error.message});
    })
  }
}

export function fetchComments(){
  return function(dispatch){
    return firebase.database().ref(`comments`).on('value', comments => {
        let tempList = [];
        comments.forEach(child => {
          tempList.push({...child.val(), key: child.key});
        })
        dispatch({ type: "FETCH_ALL_COMMENTS", comments: tempList });
    })
  }
}


export function returnUser(){
  return function(dispatch){
    firebase.database().ref("users")
      .on("value", snapshot=>{
        console.log(snapshot.val());
      })
  }
}

export function likePost(post, user) {
  return function(dispatch){
    firebase.database().ref(`posts/${post.key}/like`).set(!post.like)
    .catch(error => {
      dispatch({type: "FETCH_ERROR", error: error.message});
    })
  }
}

export function commentPost(comment) {
  return function(dispatch){
    firebase.database().ref(`comments`).push(comment)
    .catch(error => {
      dispatch({type: "FETCH_ERROR", error: error.message});
    })
  }
}

export function addCommentListener(){
  return function(dispatch){
    return firebase.database().ref("posts/comment")
      .on("child_added", comment => {
        const commentAdded = {...comment.val(), key: comment.key};
        dispatch({type: "CHILD_ADDED", comment: commentAdded});
      })
  }
}

// export function addPage(page) {
//   return function(dispatch){
//     firebase.database().ref("pages").push(page)
//     .catch(error => {
//       dispatch({type: "FETCH_ERROR", error: error.message});
//     })
//   }
// }
//
// export function togglePage(page) {
//   return function(dispatch){
//     firebase.database().ref(`pages/${page.key}/current`).set(!page.current)
//     .catch(error => {
//       dispatch({type: "FETCH_ERROR", error: error.message});
//     })
//   }
// }

export function removeComment(comment){
  return function (dispatch){
    firebase.database().ref(`comments/${comment.key}`).remove()
  }
}

export function editPost(post) {
  return function(dispatch){
    const user = firebase.auth().currentUser;
    firebase.database().ref(`posts/${post.key}/user`)
    .on("value", snapshot=>{
      console.log(snapshot.val());
      console.log(user.email);
      if(snapshot.val() === user.email){
        console.log("Success");
        firebase.database().ref(`posts/${post.key}/text`).set(post.text);
      }
      else{
        console.log("Error");
      }
    });
  }
}

export function userChanged() {
  return function(dispatch){
    return firebase.auth().onAuthStateChanged(user => {
      if(user){
        dispatch({type: "SIGN_IN", user: user});
      }
      else{
        dispatch({type: "SIGN_OUT", user: ''});
      }
    })
  }
}
export function userID(user) {
  return function(dispatch){
    firebase.database().ref(`users/${user.key}/isAdmin`)
    .on("value", snapshot=>{
      console.log(snapshot.val());
    })

  }
}
