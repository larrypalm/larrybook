import React, { Component } from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import firebase from '../firebase';
class App extends Component {

  state = {
    value: "",
    email: "",
    password: ""
  }

  componentDidMount(){
    this.props.actions.addPostListener();
    this.props.actions.removePostListener();
    this.props.actions.changePostListener();
    this.props.actions.userChanged();
    // this.props.actions.fetchAllposts();
    // this.props.actions.addMovies();
    //firebase.database().ref('users').remove();
    // firebase.database().ref('users/-KxP3CUZwYlMDpd_fXAF/text').remove();
    // firebase.database().ref('users/-KxP3CUZwYlMDpd_fXAF/text').set("hejsna");
  }

  add = () => {
    this.props.actions.addPost({
      text: this.state.value,
      like: false,
    })
    this.setState({value:""})
  }

  remove = (post) => {
    this.props.actions.removePost(post);
  }

  like = (post) => {
    this.props.actions.likePost(post);
  }

  register = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(user => {
      const newUser = {
        email: user.email,
        isAdmin: false
      }
      firebase.database().ref(`users/${user.uid}`).set(newUser);
    });
  }

  signIn = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
  }

  signOut = () => {
    firebase.auth().signOut();
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value})

  render() {
    const postList = this.props.posts.map(post =>
      <div key={post.key}>
        <p>{post.text}</p>
        <button onClick={() => this.remove(post)}>Remove post</button>
        <button onClick={() => this.like(post)}>Like</button>
      </div>
    )
    return (
      <div className="App">
        <div>
          {this.state.user && this.state.user.email}
        </div>
        <input type="text" onChange={this.onChange} name="value" value={this.state.value} />
        <button onClick={this.add}>
          Add post
        </button>
        <div>
          {postList}
        </div>
        <div className="App">
          <form onSubmit={this.register}>
            <input type="text" name="email" onChange={this.onChange} value={this.state.email}/>
            <input type="password" name="password" onChange={this.onChange} value={this.state.password}/>
            <input type="submit" name="Register" />
          </form>
          <button onClick={this.signIn}>Sign in</button>
          <button onClick={this.signOut}>Sign out</button>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state){
  return {
    posts: state.posts,

    movies:state.movies,
    error: state.error
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
