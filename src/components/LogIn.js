import React, { Component } from 'react';
import firebase from '../firebase';


class LogIn extends Component{

componentDidMount(){
  firebase.database().ref("users")
    .on("value", snapshot=>{
      console.log(snapshot.key);
    })

}


  render(){
    return(
      <div className="App">
        <form onSubmit={this.props.register}>
          <input type="text" name="email" onChange={this.props.onChange} value={this.value}/>
          <input type="password" name="password" onChange={this.props.onChange} value={this.password}/>
          <input type="submit" name="Register" />
        </form>
        <button onClick={this.props.signIn}>Sign in</button>
        <button onClick={this.props.signOut}>Sign out</button>
        <button onClick={this.showUser}>Show</button>
      </div>

    )

  }
}
export default LogIn;
