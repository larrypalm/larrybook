import React, { Component } from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import firebase from '../firebase';
class App extends Component {

  state = {
    value: "",
  }

  componentDidMount(){
    // this.props.actions.fetchAllUsers();
    this.props.actions.addUserListener();
    this.props.actions.removeUserListener();
    this.props.actions.changeUserListener();
    // this.props.actions.addMovies();
    //firebase.database().ref('users').remove();
    // firebase.database().ref('users/-KxP3CUZwYlMDpd_fXAF/text').remove();
    // firebase.database().ref('users/-KxP3CUZwYlMDpd_fXAF/text').set("hejsna");
  }

  add = () => {
    this.props.actions.addUser({
      text: this.state.value,
      like: false,
    })
    this.setState({value:""})
  }

  remove = (user) => {
    this.props.actions.removeUser(user);
  }

  like = (user) => {
    this.props.actions.likeUser(user);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value})

  render() {
    const userList = this.props.users.map(user =>
      <div key={user.key}>
        <p>{user.text}</p>
        <button onClick={() => this.remove(user)}>Remove User</button>
        <button onClick={() => this.like(user)}>Like</button>
      </div>
    )
    return (
      <div className="App">

      </div>

    );
  }
}

function mapStateToProps(state){
  return {
    posts: state.posts,
    users: state.users,
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
