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
    fetch('https://fend-api.herokuapp.com/movies?_limit=20')
      .then(response => response.json())
      .then(movies => {
        this.setState({movies: movies})
      })
  }

  add = () => {
    console.log("Add");
    this.props.actions.addPost({
      content: this.state.value,
      id: Math.floor(Math.random()*1000+1),
    })
    this.setState({value:""})
  }

  remove = (post) => {
    this.props.actions.removePost(post);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value})

  render() {
    const postList = this.props.posts.map(post =>
      <div key={post.id}>
        <p>{post.content}</p>
        <button onClick={() => this.remove(post)}>Remove Post</button>
      </div>
    )
    return (
      <div className="App">
        <input type="text" onChange={this.onChange} name="value" value={this.state.value} />
        <button onClick={this.add}>
          Add Post
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
    error: state.error
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
