
import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";

import { setSheetSelected } from "../Actions/index";
import { setBetSelected } from "../Actions/index";
import API from '../Utils/API';
import Spinner from 'react-bootstrap/Spinner'

const sizeIconMobile = 40;
function mapDispatchToProps(dispatch) {
  return {
    setSheetSelected: (nameSheet) => dispatch(setSheetSelected(nameSheet)),
    setBetSelected: (bet) => dispatch(setBetSelected(bet)),
    sheetSelected:dispatch.sheetSelected,
    friends:dispatch.friends,
  };
};

class BetItemComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      players1 : [],
      players2 : [],
      witness : "",
      clickabe:false,
      players1Loaded : false,
      players2Loaded : false,
      witnessLoaded : false,
      imTheWitness : false,
      iWon : false,
     }
  }

  setPlayersInState = (bet, context, setNewState) => {
    API.getUsersDataByID(bet.players1).then(function(data){
      setNewState("players1", data.data.usersData, context)
      for (var i = 0; i < data.data.usersData.length; i++) {
        if(data.data.usersData[i].id === context.props.accountState.account.id){
          context.setState({
            iWon : true
          })
        }
      }
      context.setState({players1Loaded : true});
    })
    API.getUsersDataByID(bet.players2).then(function(data){
      setNewState("players2", data.data.usersData, context);
      for (var i = 0; i < data.data.usersData.length; i++) {
        if(data.data.usersData[i].id === context.props.accountState.account.id){
          context.setState({
            iWon : false
          })
        }
      }
      context.setState({players2Loaded : true});
    })
    API.getUsersDataByID([bet.witness]).then(function(data){
      setNewState("witness", data.data.usersData, context);
      for (var i = 0; i < data.data.usersData.length; i++) {
        if(data.data.usersData[i].id === context.props.accountState.account.id){
          context.setState({
            imTheWitness : true
          })
        }
      }
      context.setState({witnessLoaded : true});
    })

  }

  componentWillMount = () => {
    var players1 = [];
    var players2 =[];
    var witness = "";
    this.setPlayersInState(this.props.bet, this, function(key, players, context){
      context.setState({
        [key] : players,
      })
    })

  }

  onClick = (context) => {

    let betWithPlayersInfo={};
    const returnedTarget = Object.assign(betWithPlayersInfo, this.props.bet);
    betWithPlayersInfo.players1 = this.state.players1
    betWithPlayersInfo.players2 = this.state.players2
    betWithPlayersInfo.witness = this.state.witness[0]
    //if(this.props.bet.current === true){
      this.props.setBetSelected(betWithPlayersInfo)
      this.props.setSheet()
      console.log(betWithPlayersInfo)
    //}

  }

  displayWinOrLoose = () => {
    if(this.state.iWon && !this.state.imTheWitness){
      return(
        <div style={{position:"absolute", width:20, height:20, top:30, right:20, backgroundImage:"url("+ require('../Assets/images/won.png') +")", backgroundSize:"cover"}}>
        </div>
      )
    }else if(!this.state.iWon && !this.state.imTheWitness){
      return(
        <div style={{position:"absolute", width:20, height:20, top:30, right:20, backgroundImage:"url("+ require('../Assets/images/lost.png') +")", backgroundSize:"cover"}}>
        </div>
      )
    }else{
      return(
        <div style={{position:"absolute", width:30, height:30, top:25, right:10, backgroundImage:"url("+ require('../Assets/images/right.png') +")", backgroundSize:"cover"}}>
        </div>
      )
    }
  }




  render(){

    if(!this.state.players1Loaded || !this.state.players2Loaded || !this.state.witnessLoaded){
      return(
        <div className="BetItem">
          <div style={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Spinner animation="border" />
          </div>
        </div>
      )
    }else{
      return(
        <div className="BetItem" style={{backgroundColor:this.props.bet.current?"white":"rgba(250,250,250,1)"}} onClick={()=>this.onClick(this)}>
          <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start",alignItem:"center",textAlign:"center", paddingTop:10, paddingBottom:10}}>
            <div style={{width:70, height:70, position:"relative"}}>
              {this.state.players1.length>0 ?
                  <img width={50} height={50} src={this.state.players1[0].imageProfil} style={{position:"absolute", top:0, left:0, cursor:"pointer", borderWidth:0, borderStyle:"solid", borderRadius:"50%"}}/>
                  :
                  <div style={{width:50, height:50}}>
                  </div>
              }
              {this.state.players2.length>0 ?
                  <img width={50} height={50} src={this.state.players2[0].imageProfil} style={{position:"absolute", top:20, left:20, cursor:"pointer", borderWidth:0, borderStyle:"solid", borderRadius:"50%"}}/>
                  :
                  <div style={{width:50, height:50}}>
                  </div>
              }
            </div>
            <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start", marginLeft:20,}}>
              <div style={{fontSize:13, color:this.props.bet.current?"black":"rgba(187,187,187,1)"}}>{this.props.bet.title}</div>
              <div style={{fontSize:12, color:this.props.bet.current?"rgba(150,150,150,1)":"rgba(210,210,210,1)"}}>{this.props.bet.issue}</div>
              <div style={{fontSize:10, color:this.props.bet.current?"rgba(150,150,150,1)":"rgba(210,210,210,1)"}}>{"create : " + this.props.bet.creation}</div>
              <div style={{fontSize:10, color:this.props.bet.current?"rgba(150,150,150,1)":"rgba(210,210,210,1)"}}>{"expiration : " + this.props.bet.expiration}</div>
            </div>
            {this.props.bet.current?
              <div style={{position:"absolute", width:30, height:30, top:25, right:10, backgroundImage:"url("+ require('../Assets/images/right.png') +")", backgroundSize:"cover"}}>
              </div>
              :
              this.displayWinOrLoose()
            }
            </div>
          <div style={{width:"100%", height:1, backgroundColor:"rgba(150,150,150,1)"}}>
          </div>

        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    accountState:state.account.accountStateRedux,
    sheetSelected:state.helper.sheetSelected,
  }
}

const BetItem = connect(mapStateToProps, mapDispatchToProps)(BetItemComponent);
export default BetItem;
