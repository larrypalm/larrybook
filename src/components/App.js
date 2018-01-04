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
  }

  componentDidMount(){
    this.props.actions.addPostListener();
    this.props.actions.removePostListener();
    this.props.actions.changePostListener();
    this.props.actions.userChanged();

    this.props.actions.addCommentListener();

  }

  signIn = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value})

  render() {
    return (

      <div className="App">
        {this.props.user
        ?
          <FeedPage userInfo ={this.state.user && this.state.user.email}/>
        :
          <LogIn/>
        }
      </div>

    );
  }
}

function mapStateToProps(state){
  return {
    posts: state.posts,
    comments: state.comments,
    user: state.user,
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
