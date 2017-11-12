import React, { Component } from 'react';
import firebase from '../firebase';

class FeedPage extends Component{

  render(){
    const postList = this.props.posts.map(post =>
      <div key={post.key}>
        <p>{post.text}</p>
        <p>{post.user}</p>
        <button onClick={() => this.props.remove(post)}>Remove post</button>
        <button onClick={() => this.props.like(post)}>Like</button>
        <form onSubmit={this.props.comment}>
          <input type="text" name="comment" onChange={this.props.onChange} value={this.value}/>
          <input type="submit" name="Comment" />
          <p>{this.props.comment}</p>
        </form>
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
