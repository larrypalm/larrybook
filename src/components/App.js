import React, { Component } from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import firebase from '../firebase';
import LogIn from './LogIn';
import FeedPage from './FeedPage';

class App extends Component {

  state = {
    value: "",
    email: "",
    password: "",
    currentPage : true,
  }

  componentDidMount(){
    this.props.actions.addPostListener();
    this.props.actions.removePostListener();
    this.props.actions.changePostListener();
    this.props.actions.userChanged();

    firebase.database().ref("users/uid/isAdmin")
      .on("value", snapshot => {
        this.setState({isAdmin: snapshot.val()});
      });
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
        isAdmin: true
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

  togglePage = () => {
    this.setState ({currentPage: !this.state.currentPage});

  }

  onChange = e => this.setState({ [e.target.name]: e.target.value})

  render() {

    const currentPage = this.state.currentPage ?
    <LogIn
    value={this.state.value}
    signIn={this.signIn}
    signOut={this.signOut}
    onChange={this.onChange}
    />
    :
    <FeedPage
    onClick={this.add}
    onChange={this.onChange}
    value={this.state.value}
    posts={this.props.posts}
    />

    return (
      <div className="App">
        <div>
          {this.state.user && this.state.user.email}
        </div>

        <div>
          {currentPage}
        </div>

        <button onClick={this.togglePage}>Toggle</button>
      </div>

    );
  }
}

function mapStateToProps(state){
  return {
    posts: state.posts,
    users: state.users,
    pages: state.pages,
    error: state.error
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
