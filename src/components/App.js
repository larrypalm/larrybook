import React, { Component } from 'react';

import {connect} from 'react-redux';
import {addUser} from '../actions/actions'
class App extends Component {

  state = {
    user:"",
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.props.addUser}>
          Add User
        </button>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch){
  return {
    addUser: () => dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
