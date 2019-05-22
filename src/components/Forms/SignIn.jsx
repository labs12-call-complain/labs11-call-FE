import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import * as firebase from "firebase";
import "../Landing/LandingPage.css";
import axios from 'axios';

class SignInConfirmation extends Component {
    state = {
        docid: null
      };
    
        docid = this.state.docid //may have to move back to app

        
        uiConfig = {
          
          signInFlow: "popup",
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
          ],
            signInSuccessUrl: '/home'
          }
          
          componentDidUpdate() {
            let data = {
              DisplayName: firebase.auth().currentUser.displayName,
              Email: firebase.auth().currentUser.email,
              UID: firebase.auth().currentUser.uid,
              StoreName: this.props.StoreName,
              StoreLocation: this.props.StoreAddress,
              StorePhoneNumber: this.props.StorePhone,
              StoreGoogleRating: this.props.StoreGoogleRating,
              StoreWebsite: this.props.StoreWebsite,
              text: this.props.confirmationTranscription,
              upVote: 0
              }
              let tweetdata = {
                status: `${this.props.StoreName}, your customer just complained about you on callandcomplain.com. We added you to our #worstcustomerservice leaderboard.`
              }
              console.log(tweetdata)
              axios
                .post(`https://call-complain.herokuapp.com/api/routes/makepost`, data)
                .then(res => {
                  console.log("response:", res);
                  axios
                    .post(`https://call-complain.herokuapp.com/api/routes/makeatweet`, tweetdata)
                    .then(res => {
                      console.log("response:", res);
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
          }

        render() {
            return (
                <div class="signin">
                    <h2>Sign In</h2>
                    <StyledFirebaseAuth 
                    uiConfig={this.uiConfig} 
                    firebaseAuth={firebase.auth()} />
                </div>
            );
          }
        }

export default SignInConfirmation;