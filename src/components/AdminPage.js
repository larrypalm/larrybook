import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import firebase from '../firebase';

class AdminPage extends Component {

}


function mapDispatchToProps(dispatch){
 return bindActionCreators(actions, dispatch)
}

function mapStateToProps (state){
 return {

 }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
