import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import AppBar from "material-ui/AppBar";
// import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import MaterialIcon, {colorPalette} from 'material-icons-react';
import * as firebase from "firebase";
// import axios from 'axios';
import { Spinner, Fade, NavLink } from 'reactstrap';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
// import { AuthUserContext } from '../Session/session.js';
import { withAuthorization } from '../Session/session.js';
import Navigation from '../Navigation/navigation.js';


class TwitterConfirm extends Component {
  state = {
    isLoading: true,
  }

  componentDidMount() {
    setTimeout(() => this.setState({isLoading: false}), 1000);
  }




  render() {
    console.log(this.props)
    const { values, handleChange } = this.props;
    if(this.state.isLoading===true) {
      return (
      <div className="recording-loader loader">
        <h1>GRIIPE</h1>
        <br />
        <Spinner style={{ width: '3rem', height: '3rem' }} />
      </div>)
    };
    return (
      <MuiThemeProvider>
        <Navigation />
        <Fade in={this.state.fadeIn} tag="h5" className="mt-3 form-container" >
    {this.props.history.location.state !== undefined ? <h1 className="form-container-header">Your Tweet Has Been Sent</h1> : <h1 className="form-container-header">There was an error sending the tweet</h1> }
          <div className="confirmation-container">
            <span className="confirmation-span">
            <CloudDoneIcon color='error'/>
            <p className="confirmation-input"><strong>Link: </strong> <a href="https://twitter.com/callcomplain1">https://twitter.com/callcomplain1</a></p>
            </span>
          </div>
          <div className="confirmation-container">
            <span className="confirmation-span">
              <CloudDoneIcon color='error'/>            
              {this.props.history.location.state !== undefined ? (<p className="confirmation-input"><strong>Tweet:</strong> " {this.props.history.location.state.status} "</p>) : (<p className="confirmation-input"><strong>Tweet:</strong> " We're sorry, but the tweet didn't send because Twitter has one of the most unusable API's we've ever seen"</p>)}
            </span>
          </div>
          <Link to="/home" >
            <RaisedButton
                label="Home Page"
                primary={true}
                style={styles.button}
                // onClick={this.tweetAndRoute}
            />
          </Link>
        </Fade>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  }
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(TwitterConfirm);