import React, { Component } from 'react';
import firebase from '../firebase';

class FeedPage extends Component{



  render(){
    const postList = this.props.posts.map(post =>
      <div key={post.key}>
        <p>{post.text}</p>
        <button onClick={() => this.remove(post)}>Remove post</button>
        <button onClick={() => this.like(post)}>Like</button>
      </div>
    )
    return(
      <div>
        <input type="text" onChange={this.props.onChange} name="value" value={this.props.value}/>
        <button onClick={this.props.onClick}>
          Add post
        </button>

        <div>
          {postList}
        </div>
      </div>
    );

  }
}
export default FeedPage;
