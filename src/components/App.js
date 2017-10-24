import React, { Component } from 'react';

import {connect} from 'react-redux';
import {addPost, removePost} from '../actions/actions'
class App extends Component {

  state = {
    user:"",
    value: "",
  }

  add = () => {
    console.log("Add");
    this.props.addPost({
      content: this.state.value,
      id: Math.floor(Math.random()*1000+1),
    })
    this.setState({value:""})
  }

  remove = (post) => {
    this.props.removePost(post);
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
        <button onClick={this.props.add}>
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
    posts: state
  }
}

function mapDispatchToProps(dispatch){
  return {
    addPost: post => dispatch(addPost(post)),
    removePost: post => dispatch(removePost(post)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
