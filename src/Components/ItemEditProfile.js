import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {BrowserView,MobileView,isBrowser,isMobile} from "react-device-detect";


import { changeAccountState } from "../Actions/index";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    changeAccountState: (article) => dispatch(changeAccountState(article)),
    accountStateRedux:dispatch.accountStateRedux,
  };
};


class ItemEditProfileComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modifiedUserName:false,
      userNameModified:"",
      value:this.props.value,
      backgroundModifyButton : false
    };
  }

  enterToSubmit = (event) => {
    if (event.keyCode  == 13) {
      this.setState({
        modifiedUserName: false,
        value: this.state.userNameModified,
      });
      this.props.onSubmit(this.state.userNameModified)
    }
    if(event.keyCode  == 27){
      this.quitModifiedUserName();
    }
  }

  validate = () => {
    if(this.state.userNameModified != ""){
      this.setState({
        modifiedUserName: false,
        value: this.state.userNameModified,
        backgroundModifyButton : false
      });
      this.props.onSubmit(this.state.userNameModified)
    }
  }

  handleChange = event => {
      this.setState({
          [event.target.id]: event.target.value
      });
  }

  modifiedUserName = () => {
    this.setState({
      modifiedUserName : true
    })
  }

  quitModifiedUserName =() => {
    this.setState({
      modifiedUserName : false
    })
  }

  toggleBackgroundModifyButton = () => {
    this.setState({
      backgroundModifyButton : this.state.backgroundModifyButton ? false : true
    })
  }


  onChange = (e) => {
    console.log(e.target)
    this.setState({
      value : e.target.value
    })
  }

  render(){

    return(
      <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start", marginLeft:20,width:"100%"}}>
        <strong style={{width: "100%", textAlign:"left", fontSize:13}}>{this.props.placeHolder}</strong>
        <div style={{width: "100%", display: 'flex', flexDirection: 'column', alignItems:"left", marginBottom:10, marginTop:5, fontSize:15, justifyContent:"flex-start", marginLeft:0, marginRight:0}}>
          <input type="text" style={{ height:30*this.props.heightSize, textAlign:"left", display: 'flex', flexDirection: 'column', justifyContent:"center", borderRadius:3,  color:"black", borderWidth:1, borderStyle:"solid", borderColor:"rgba(150,150,150,1)",width:"100%", backgroundColor:"rgba(235,235,235,1)"}} value={this.state.value} onChange={(e) => this.onChange(e)}/>
        </div>
      </div>
    )
  }


}


const mapStateToProps = (state) => {
  return {
    accountState:state.account.accountStateRedux,
  }
}

const ItemEditProfile = connect(mapStateToProps, mapDispatchToProps)(ItemEditProfileComponent);
export default ItemEditProfile;
