

import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


import Signup from './Signup';
import Login from './Login';

import { bounceInDown } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import {BrowserView,MobileView,isBrowser,isMobile} from "react-device-detect";


const bounceAnimation = keyframes`${bounceInDown}`;
const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;



export default class NoAccount extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      popupConnexion : false,
      popupSignUp : false,
      email : "",
      password :"",
      textEmailConnexion : "",
      textEPasswordConnexion : "",
      textEmailRegister : "",
      textEPasswordRegister : "",
      textEUserNameRegister : "",
      connexionComming : false,
      popUpComming : false,
      imageConnexion:require('../Assets/images/connect.png'),
      imageRegister:require('../Assets/images/register.png'),
    };
  }




  connexion = () => {
    if(this.state.connexionComming === false) {
      this.setState({
        popupConnexion : this.state.popupConnexion ? false : true,
        imageConnexion : this.state.popupConnexion ? require('../Assets/images/connect.png') : require('../Assets/images/connectActive.png'),
        imageRegister:require('../Assets/images/register.png'),
        popupSignUp : false,
        email: "",
        password : "",
      })
    }
  }



  popupSignUp = () => {
    if(this.state.popUpComming === false) {
      this.setState({
        popupSignUp : this.state.popupSignUp ? false : true,
        imageRegister : this.state.popupSignUp ? require('../Assets/images/register.png') : require('../Assets/images/registerActive.png'),
        imageConnexion:require('../Assets/images/connect.png'),
        popupConnexion : false,
        email: "",
        password : "",
      })
    }
  }

  quitLoginAndSignUp = () =>{
    this.setState({
      popupConnexion : false,
      popupSignUp : false,
      imageConnexion:require('../Assets/images/connect.png'),
      imageRegister:require('../Assets/images/register.png'),
    })
  }




  render(){
    return(
    <div>
      {this.state.popupConnexion || this.state.popupSignUp ?
        <div onClick={this.quitLoginAndSignUp} style={{width:"100vw", height:"100vh", position:"absolute", top:0, left:0, zIndex:10,}}>
        </div>
        :null
      }
      {this.state.popupConnexion ?
        <div style={{ zIndex:1000, position:'absolute', top:"calc(50vh - 200px)", right:"7.5vw", width:"85vw",  marginTop:50,  marginRight:0,  display: 'flex', flexDirection: 'column',  borderStyle: 'solid', borderWidth: 0, borderColor: 'black', backgroundColor:'rgba(255,255,0,0)'}}>
          <BouncyDiv>
            <div style={{ zIndex:1000, borderStyle: 'solid', borderWidth: 0, marginTop:0, paddingBottom:30, borderColor: 'black',paddingLeft:30, paddingRight:30, backgroundColor:'rgba(230,230,230,1)', borderRadius:0, paddingTop:10, borderRadius:20, borderStyle:"solid", borderWidth:1, borderColor:"rgba(0,0,0,0.2)"}}>
              <Login login={this.props.login}/>
            </div>
          </BouncyDiv>
        </div>
        : <div></div>
      }
      {this.state.popupSignUp ?
          <div style={{ zIndex:1000, position:'absolute', top:"calc(50vh - 300px)", right:"7.5vw", width:"85vw", marginTop:50, marginRight:0,  display: 'flex', flexDirection: 'column',  borderStyle: 'solid', borderWidth: 0, borderColor: 'black', backgroundColor:'rgba(255,255,0,0)'}}>
            <BouncyDiv>
              <div style={{ zIndex:1000,  borderStyle: 'solid', borderWidth: 0, paddingBottom:30, borderColor: 'black',paddingLeft:30, paddingRight:30, backgroundColor:'rgba(230,230,230,1)', borderRadius:0, paddingTop:10, borderRadius:20, borderStyle:"solid", borderWidth:1, borderColor:"rgba(0,0,0,0.2)"}}>
                <Signup login={this.props.login}/>
              </div>
            </BouncyDiv>
          </div>
         : <div></div>
       }

      <div style={{position:"absolute", width:"80vw", left:"10vw", display:"flex", flexDirection:"column", justifyContent:'space-evenly', top:"40vh",  "box-shadow": "1px 1px 5px rgba(0,0,0,1)",  zIndex:20, backgroundColor:"rgba(156, 255, 182,0.8)"}}>
        <div style={{display:"flex", flexDirection:"column", width:"100%", border:"solid rgba(0,0,0,1)", borderWidth:"0px 0px 1px 0px"}}>
          <div onClick= {this.connexion} style={{ overflow:"hidden", zIndex:10, height:50, borderRadius:10, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
            Login
          </div>



        </div>
        <div style={{display:"flex", flexDirection:"column", width:"100%"}}>
          <div onClick= {this.popupSignUp} style={{ overflow:"hidden", zIndex:10,  height:50,  borderRadius:10, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
            Register
          </div>


        </div>
      </div>
    </div>
    )
  }
}
