import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from '../Utils/API';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Redirect } from 'react-router';
import {browserHistory} from "react-router";
import PropTypes from 'prop-types'

import { changeAccountState } from "../Actions/index";
import { connect } from "react-redux";
import { displayLoading } from "../Actions/index";
import { connectAccount } from "../Actions/index";
import { getUserFriends } from "../Actions/index";
import { getUserBets } from "../Actions/index";
import { getUserWitnessOf } from "../Actions/index";

function mapDispatchToProps(dispatch) {
  return {
    changeAccountState: (userData) => dispatch(changeAccountState(userData)),
    getUserBets: (tabOfBets) => dispatch(getUserBets(tabOfBets)),
    getUserFriends: (tabOfFriends) => dispatch(getUserFriends(tabOfFriends)),
    getUserWitnessOf: (tabOfWitnessOf) => dispatch(getUserWitnessOf(tabOfWitnessOf)),
    displayLoading: (boolean) => dispatch(displayLoading(boolean)),
    connectAccount: (boolean) => dispatch(connectAccount(boolean)),
    accountStateRedux:dispatch.accountStateRedux,
  };
};


export class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.dataStored = 0;
        this.state = {
            email : "",
            password: "",
            impossibleToConnect : false,
            friendsStored:false,
            betsStored : false,
            witnessOfStored:false,
        }
        this.handleChange.bind(this);
        this.send.bind(this);

    }



  send = (event, context) => {
      if(this.state.email.length === 0){
          return;
      }
      if(this.state.password.length === 0){
          return;
      }
      this.props.login(this.state.email)
  }

  handleChange = event => {
      this.setState({
          [event.target.id]: event.target.value
      });
  }




    render() {
        return(
            <div className="Login"  style={{ marginTop:0}}>
              {this.state.impossibleToConnect ?
                <div style={{color:"red", fontSize:13, margin:5, marginBottom:15}}>Impossible to connect (password and email does not match).
                </div>
                : null
              }
                <FormGroup controlId="email" bsSize="small">
                  <div>Email</div>
                  <FormControl autoFocus type="email" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup controlId="password" bsSize="small">
                  <div>Password</div>
                  <FormControl  onChange={this.handleChange} type="password"/>
                </FormGroup>
                <Button
                  onClick={(event) => this.send(event, this)}
                  block
                  bsSize="small"
                  type="submit"
                  style={{backgroundColor:"rgba(240,240,240,1)"}}
                >
                Connexion
                </Button>
            </div>
        )
    }
}




const mapStateToProps = (state) => {
  return {
    accountState:state.account.accountStateRedux,
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
export default Login;
