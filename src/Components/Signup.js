import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from '../Utils/API';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { changeAccountState } from "../Actions/index";
import { connect } from "react-redux";
import { displayLoading } from "../Actions/index";
import { connectAccount } from "../Actions/index";
import { getUserFriends } from "../Actions/index";
import { getUserBets } from "../Actions/index";
import { getUserWitnessOf } from "../Actions/index";


function mapDispatchToProps(dispatch) {
  return {
    changeAccountState: (article) => dispatch(changeAccountState(article)),
    displayLoading: (boolean) => dispatch(displayLoading(boolean)),
    connectAccount: (boolean) => dispatch(connectAccount(boolean)),
    getUserBets: (tabOfBets) => dispatch(getUserBets(tabOfBets)),
    getUserFriends: (tabOfFriends) => dispatch(getUserFriends(tabOfFriends)),
    getUserWitnessOf: (tabOfWitnessOf) => dispatch(getUserWitnessOf(tabOfWitnessOf)),
    accountStateRedux:dispatch.accountStateRedux,
  };
};


export class SignupComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            userName: "",
            password: "",
            cpassword: "",
            impossibleToConnect : false,
            messageError: "",
            imageProfil:"",
        }
        this.handleChange.bind(this);
        this.send.bind(this);
    }

    _handleImageChange(e, context) {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend  = () => {
        console.log("done")
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
          border:0,
        });
        if(reader.result.length < 6500000){
          this.setState({
            imageProfil : reader.result
          })
          console.log(reader.result)
        }else{
          alert('Image too big, choose another one please')
        }
      }
      if(file){
        reader.readAsDataURL(file)
      }
      this.forceUpdate()
    }

    send = (event, context) => {
        var email = this.state.email;
        var userName = this.state.userName;
        if(this.state.userName.length === 0){
          context.setState({
            impossibleToConnect : true,
            messageError : "Please choose a user name"
          })
            return;
        }
        if(this.state.email.length === 0){
          context.setState({
            impossibleToConnect : true,
            messageError : "Please fill your email"
          })
            return;
        }
        if(this.state.imageProfil.length === 0){
          context.setState({
            impossibleToConnect : true,
            messageError : "Please pick a profile picture"
          })
            return;
        }
        if(this.state.password.length === 0 || this.state.password !== this.state.cpassword){
            context.setState({
              impossibleToConnect : true,
              messageError : "Carefull, password and confirm password does not match or are invalid"
            })
            return;
        }
        var _send = {
            id:'_' + Math.random().toString(36).substr(2, 9),
            email: this.state.email,
            userName: this.state.userName,
            password: this.state.password,
            imageProfil: this.state.imageProfil,
            bets:[],
            witnessOf:[],
            friends:[],
        }
        API.signup(_send).then(function(data){
          if(data.status === 200){
            context.props.displayLoading(true)
            context.props.changeAccountState(data.data.userData);
            console.log(data)
            context.props.getUserFriends([]);
            context.props.getUserBets([]);
            context.props.getUserWitnessOf([]);
            context.props.login(this.state.email)
            context.props.displayLoading(false)
          }else if(data.status === 204){
            context.setState({
              impossibleToConnect : true,
              messageError : "This email is already used"
            })
          }
        },function(error){
            context.props.displayLoading(false)
            console.log(error);
            return;
        })
      }


    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }


    render() {
        return(
            <div className="Login" style={{ marginTop:0}}>
                {this.state.impossibleToConnect ?
                  <div style={{color:"red", fontSize:13, margin:5, marginBottom:15}}>{this.state.messageError}
                  </div>
                  : null
                }
                <FormGroup controlId="userName" bsSize="small" >
                  <div>Full name</div>
                  <FormControl autoFocus type="userName" value={this.state.userName} onChange={this.handleChange} style={{width:"100%"}}/>
                </FormGroup>
                <FormGroup controlId="email" bsSize="small">
                  <div>Email</div>
                  <FormControl  type="email" value={this.state.email} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup controlId="password" bsSize="small">
                  <div>Password</div>
                  <FormControl value={this.state.password} onChange={this.handleChange} type="password"/>
                </FormGroup>
                <FormGroup controlId="cpassword" bsSize="small">
                  <div>Confirm Password</div>
                  <FormControl value={this.state.cpassword} onChange={this.handleChange} type="password"/>
                </FormGroup>
                <label for="file-input">
                  {this.state.imageProfil ?
                    <img width="50" height="50" src={this.state.imageProfil} style={{cursor:"pointer", borderWidth:0, borderStyle:"solid", borderRadius:"10%"}}/>
                    :
                    <img width="50" height="50" src={require('../Assets/images/connectBig.png')} style={{cursor:"pointer", borderWidth:1, borderStyle:"solid", borderRadius:"10%"}}/>
                  }
                </label>
                <input id="file-input" type="file" onChange={(e)=>this._handleImageChange(e, this)} style={{display: "none"}}/>
                <Button
                  onClick={(event) => this.send(event, this)}
                  block
                  bsSize="small"
                  type="submit"
                  style={{backgroundColor:"rgba(240,240,240,1)"}}
                  >
                  Inscription
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

const Signup = connect(mapStateToProps, mapDispatchToProps)(SignupComponent);
export default Signup;
