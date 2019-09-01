
import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";
import Animation from "../Utils/Animation"
import { setSheetSelected } from "../Actions/index";
import { setBetInactive } from "../Actions/index";
import { setWinner } from "../Actions/index";
import API from '../Utils/API';
import { updtateWitnessOf } from "../Actions/index";



const sizeIconMobile = 40;

function mapDispatchToProps(dispatch) {
  return {
    setSheetSelected: (nameSheet) => dispatch(setSheetSelected(nameSheet)),
    setBetInactive : (betID) => dispatch(setBetInactive(betID)),
    setWinner : (betID, accountID) => dispatch(setWinner(betID, accountID)),
    updtateWitnessOf: (tabOfWitnessOf) => dispatch(updtateWitnessOf(tabOfWitnessOf)),
  };
};

class BetItemDetailComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      popupChooseFriends: false,
      researchFriend : "",
      selectedFriend : [],
      titleOfBet:"",
      issueOfBet:"",
      currentBet:this.props.accountState.currentBet,
      shadowPlayer1 : "rgba(200,200,200,0.5)",
      shadowPlayer2 : "rgba(200,200,200,0.5)",
      judingAllow : false,
      judgmentMade : false,
      win:true,
      displayLoading : false,
     }
  }

  componentDidMount = () => {
    if(!this.props.accountState.currentBet.current){
      if(this.props.accountState.currentBet.win){
        this.setState({
          shadowPlayer1 : "rgba(1,200,1,0.5)",
          shadowPlayer2 : "rgba(200,1,1,0.5)",
        })
      }else{
        this.setState({
          shadowPlayer1 : "rgba(200,1,1,0.5)",
          shadowPlayer2 : "rgba(1,200,1,0.5)",
        })
      }
    }
    if(this.props.accountState.currentBet.witness.id === this.props.accountState.account.id){
      this.setState({judingAllow : true})
    }
  }




  onClick = () => {
    this.props.setSheet()
  }

  submitWinner = () => {
    var context = this;
    if(this.state.judgmentMade){
        console.log(this.state.currentBet)
        API.setWinner(this.state.currentBet, this.state.win).then(function(data){
          context.props.updtateWitnessOf(data.data.bet);
        })
      }
      this.setState({
        judgmentMade : false
      })
    }
    //this.props.setWinner(this.props.accountState.currentBet.id, this.props.accountState.account.id)
    //this.props.setBetInactive(this.props.accountState.currentBet.id)

  cancelSubmission = () => {
    this.setState({
      judgmentMade : false,
      win:true,
      shadowPlayer1 : "rgba(200,200,200,0.5)",
      shadowPlayer2 : "rgba(200,200,200,0.5)",
    })
  }

  setWin = () => {
    if(this.state.judingAllow){
      this.setState({
        judgmentMade : true,
        win:true,
        shadowPlayer1 : "rgba(1,200,1,0.5)",
        shadowPlayer2 : "rgba(200,200,200,0.5)",
      })
    }
  }

  setLoose = () => {
    if(this.state.judingAllow){
      this.setState({
        judgmentMade : true,
        win:false,
        shadowPlayer1 : "rgba(200,200,200,0.5)",
        shadowPlayer2 : "rgba(1,200,1,0.5)",
      })
    }
  }

  render(){
    return(
    <Animation.FadeInRight className="BetItemDetail" style={{backgroundColor:"rgba(255,255,255,0.4)"}}>
        <div style={{position:"absolute", width:30, height:30, top:25, left:10, backgroundImage:"url("+ require('../Assets/images/left.png') +")", backgroundSize:"cover"}} onClick={this.onClick}>
        </div>
        <div style={{height:70, fontSize:17, color:"black", backgroundColor:"rgba(240,240,240,1)", width:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
          <div>{this.state.currentBet.title}</div>
          <div style={{color:"rgba(155,155,155,1)"}}>{this.state.currentBet.issue}</div>
        </div>

        <div style={{width:"100vw", textAlign:"left", color:"black", fontSize:15, display:"flex", justifyContent:"space-between", alignItems:"center",  paddingLeft:20, paddingRight:20, height:80}}>
          <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"flex-start"}}>
            {this.state.currentBet.witness ?
              <strong style={{height:20, display:"flex", alignItems:"center"}}>{"Judge : " + this.state.currentBet.witness.userName}</strong>
              :null
            }
            <div style={{height:20, display:"flex", alignItems:"center"}}>{"creation : " + this.state.currentBet.creation}</div>
            <div style={{height:20, display:"flex", alignItems:"center"}}>{"expiration : " + this.state.currentBet.expiration}</div>
            {this.state.currentBet.current ?
              <div style={{height:20, display:"flex", alignItems:"center"}}>status : actual</div>
              :
              <div style={{height:20, display:"flex", alignItems:"center"}}>status : finished</div>
            }
          </div>
          {this.state.currentBet.witness ?
            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center", width:70, backgroundSize:"cover"}}>
              <div  style={{cursor:"pointer", borderWidth:0, borderStyle:"solid", borderRadius:"50%", border:"1px solid rgba(155,155,155,0.4)", width:70, height:70, backgroundImage:"url(" + this.state.currentBet.witness.imageProfil + ")", backgroundSize:"cover"}}></div>
            </div>
            :null
          }

        </div>

        <div style={{marginTop:30, width:"100vw", color:"black", position:"relative"}}>
          <div>PLAYERS</div>
          <strong style={{width:50, height:50, position:"absolute", top:"calc(50% - 25px)", left:"calc(50% - 25px)", fontSize:30, color:"white", textShadow:"-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>VS
          </strong>
          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"100%", padding:10, height:300}}>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItem:"center", backgroundColor:"rgba(245,245,245,1)", width:"100%", overflow:"auto", marginRight:5, boxShadow:"0px 0px 5px 1px "+ this.state.shadowPlayer1}}
            onClick={this.setWin}>
              {this.state.currentBet.players1.map((player)=>
                  <div style={{display:"flex", width:"100%", padding:10}}>
                    <img width={50} height={50} src={player.imageProfil} style={{cursor:"pointer", borderWidth:0, borderStyle:"solid", borderRadius:"50%"}}/>
                    <div style={{height:50, display:"flex", alignItems:"center", justifyContent:"center", width:"100%"}}>{player.userName}</div>
                  </div>
              )}
            </div>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItem:"center", backgroundColor:"rgba(245,245,245,1)", width:"100%", overflow:"auto", marginLeft:5, boxShadow:"0px 0px 5px 1px "+ this.state.shadowPlayer2}}
            onClick={this.setLoose}>
              {this.state.currentBet.players2.map((player)=>
                <div style={{display:"flex", width:"100%", padding:10}}>
                  <img width={50} height={50} src={player.imageProfil} style={{cursor:"pointer", borderWidth:0, borderStyle:"solid", borderRadius:"50%"}}/>
                  <div style={{height:50, display:"flex", alignItems:"center", justifyContent:"center", width:"100%"}}>{player.userName}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {this.state.judingAllow && this.state.judgmentMade?
          <div>
            <div onClick={this.submitWinner} style={{position:"absolute", bottom:30, left:"calc(25vw - 50px)", width:100, height:30, backgroundColor:"rgba(1,200,1,0.5)",borderRadius:15, border:"solid 1px rgba(200,200,200,1)",}}>Validate
            </div>
            <div onClick={this.cancelSubmission} style={{position:"absolute", bottom:30, left:"calc(75vw - 50px)", width:100, height:30, backgroundColor:"rgba(200,1,1,0.5)",borderRadius:15, border:"solid 1px rgba(200,200,200,1)",}}>Cancel
            </div>
          </div>
          :null
        }
    </Animation.FadeInRight>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    accountState:state.account.accountStateRedux,
  }
}

const BetItemDetail = connect(mapStateToProps, mapDispatchToProps)(BetItemDetailComponent);
export default BetItemDetail;
