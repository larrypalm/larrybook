import React, { Component } from 'react';
import '../App.css';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import firebase from '../firebase';
import LogIn from './LogIn';
import FeedPage from './FeedPage';

class App extends Component {

  state = {
    value: "",
    comments: "",
    user: "",
    email: "",
    password: "",
    currentPage : true,
  }

  componentDidMount(){
    this.props.actions.addPostListener();
    this.props.actions.removePostListener();
    this.props.actions.changePostListener();
    this.props.actions.userChanged();


    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.setState({user:user});
      }
      else{
        this.setState({user:""});
      }
    })
  }

  add = () => {
    this.props.actions.addPost({
      text: this.state.value,
      like: false,
      user: this.state.user.email,
    })
    this.setState({value:""})
  }

  remove = (post) => {
    this.props.actions.removePost(post);
  }

  like = (post) => {
    this.props.actions.likePost(post);
  }

  comment = (e) => {
    e.preventDefault();
    this.props.actions.commentPost({
      text: this.state.comment,
      user: this.state.user.email,
    })
    this.setState({comment: ""});
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
    register={this.register}
    user={this.state.user}
    />
    :
    <FeedPage
    onClick={this.add}
    onChange={this.onChange}
    value={this.state.value}
    posts={this.props.posts}
    like={this.like}
    remove={this.remove}
    comment={this.comment}
    comments={this.state.comments}
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
    comments: state.comments,
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
