import React, { Component } from 'react';

import {connect} from 'react-redux';

class App extends Component {

  state = {
    user:"",
    
  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: s
  }
}

function mapDispatchToProps(dispatch){
  return {
    user: state.user,
  }
}

export default connect(App);
