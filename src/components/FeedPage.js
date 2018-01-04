import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import firebase from '../firebase';

class FeedPage extends Component{

  state = {
    value:"",
    movies: [],
    toggleLike: "",
  }

  componentDidMount(){
    fetch(`https://fend-api.herokuapp.com/movies?_limit=1`)
      .then(response => response.json())
      .then(data => {
        this.setState({movies: data})
      })

      let currentUser = this.props.user.uid;
      firebase.database().ref(`users/${currentUser}/isAdmin`)
        .on("value", snapshot=>{
          this.setState({value: snapshot.val()})
        })

      this.props.actions.fetchUsers();
      this.props.actions.fetchComments();

  }

  onChange = e => this.setState({ [e.target.name]: e.target.value});

  signOut = () => {
    firebase.auth().signOut();
  }

  add = () => {
    this.props.actions.addComment({
      text: this.state.value,
      like: false,
      user: this.props.user.email
    })
    this.setState({value:""})
  }

  remove = (comment) => {
    this.props.actions.removeComment(comment);
  }

  like = (post) => {
    this.props.actions.likePost(post);
  }

  addComment = (e) => {
    this.props.actions.commentPost({
      text: this.state.value,
      user: this.props.user.email,
    })
  }

  editPost = (post) => {
    const editedPost = Object.assign(post, {text: this.state.value});
    this.props.actions.editPost(editedPost);
  }

  render(){
    const userList = this.props.userdata.map((userData)=>{
      return (
        <div key={userData.key}>
          <p>{userData.email}</p>
        </div>
      )
    })
    const movieList = this.state.movies.map((movie, index) => {
      return (
        <div>
          <img alt="movie" src="https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SY500_CR0,0,336,500_AL_.jpg"/>
          <p key={index}>{movie.title}</p>
        </div>
      )
    })
    const postList = this.props.comments.map(comment =>
      <div key={comment.key}>
        <p>{comment.text}</p>
        <p><strong>{comment.user}</strong></p>
        <button onClick={() => this.like(comment)}>Like</button>

        {this.props.user.email === comment.user || this.props.user.isAdmin ? <button onClick={() => this.remove(comment)}>Remove post</button> :null}
        {this.props.user.email === comment.user || this.props.user.isAdmin ? <button onClick={() => this.editPost(comment)}>Edit</button>: null}


        <form onSubmit={this.addComment}>
          <input type="text" name="value" onChange={this.onChange} value={this.props.value}/>
          <input type="submit" name="Comment" />
        </form>

      </div>

    )

    return(
      <div>
        <div>
          <h2>Du är inloggad som: </h2> <p> {this.props.user && this.props.user.email}</p>
        </div>
        {this.props.userdata.isAdmin === 'true' ? <p>tjo</p>:<p>lol</p>}
        <button onClick={this.signOut}>
          Logga ut
        </button>
        <div>
        {movieList}
        </div>
        <input type="text" onChange={this.onChange} name="value" value={this.props.value}/>
        <button onClick={this.add}>
        Add post
        </button>

        <div>
          {postList}
        </div>
      </div>
    );

  }
}
function mapStateToProps(state){
  return {
    posts: state.posts,
    user: state.user,
    comments: state.comments,
    userdata: state.userdata,
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
