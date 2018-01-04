import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import firebase from '../firebase';
import FeedPage from './FeedPage';


class LogIn extends Component{

  state ={
    email:"",
    password:"",
    isAdmin:"",
    user: "",
  }

  componentDidMount(){

  }

  signIn = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value});

  register = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(user => {
      const newUser = {
        email: user.email,
        isAdmin: false,
      }
      firebase.database().ref(`users/${user.uid}`).set(newUser);
    });
  }

  render(){


    return(
      <div className="App">
        
        <form onSubmit={this.register}>
          <input type="text" name="email" onChange={this.onChange} value={this.state.email}/>
          <input type="password" name="password" onChange={this.onChange} value={this.state.password}/>
          <input type="submit" name="Register" value="Registrera"/>
        </form>
        <button onClick={this.signIn}>Sign in</button>
      </div>

    )

  }
}

function mapStateToProps(state){
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
