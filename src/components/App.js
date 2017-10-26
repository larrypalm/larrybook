import React, { Component } from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/actions'
class App extends Component {

  state = {
    value: "",
    movies: ""
  }

  componentDidMount(){
    this.props.actions.addMovies();
  }

  add = () => {
    this.props.actions.postUser({
      text: this.state.value,
      id: Math.floor(Math.random()*1000+1),
      completed: false,
    })
    this.setState({value:""})
    // this.props.actions.addUser({
    //   content: this.state.value,
    //   id: Math.floor(Math.random()*1000+1),
    // })
    // this.setState({value:""})
  }

  remove = (post) => {
    this.props.actions.removePost(post);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value})

  render() {
    const userList = this.props.users.map(user =>
      <div key={user.id}>
        <p>{user.text}</p>
        <button onClick={() => this.remove(user)}>Remove Post</button>
      </div>
    )
    return (
      <div className="App">
        <input type="text" onChange={this.onChange} name="value" value={this.state.value} />
        <button onClick={this.add}>
          Add Post
        </button>
        <div>
          {userList}
        </div>
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
