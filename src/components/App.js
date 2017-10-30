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
    this.props.actions.addPostListener();
    this.props.actions.removePostListener();
    this.props.actions.changePostListener();
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

  onChange = e => this.setState({ [e.target.name]: e.target.value})

  render() {
    const postList = this.props.posts.map(post =>
      <div key={post.key}>
        <p>{post.text}</p>
        <button onClick={() => this.remove(post)}>Remove post</button>
        <button onClick={() => this.like(post)}>Like</button>
      </div>
    )
    return (
      <div className="App">
        <input type="text" onChange={this.onChange} name="value" value={this.state.value} />
        <button onClick={this.add}>
          Add post
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
