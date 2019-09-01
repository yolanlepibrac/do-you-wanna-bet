
import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";


import BetItem from './BetItem';
import Animation from "../Utils/Animation"
import BetItemDetail from './BetItemDetail';
import { setSheetSelected } from "../Actions/index";

const sizeIconMobile = 40;
function mapDispatchToProps(dispatch) {
  return {
    sheetSelected:dispatch.sheetSelected,
    setSheetSelected: (nameSheet) => dispatch(setSheetSelected(nameSheet)),
  };
};

class MyBetContainerComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      popupChooseFriends: false,
      researchFriend : "",
      selectedFriend : [],
      titleOfBet:"",
      issueOfBet:"",
      sheet: "betContainer"
     }
  }

  setBetDetail = () => {
    this.setState({
      sheet: "betDetail"
    })
  }
  setSheetJBetContainer = () => {
    this.setState({
      sheet: "betContainer"
    })
  }

  goToBetContainer = () => {
    this.props.setOnglet("bet on")
  }


  render(){
    if(this.state.sheet === "betContainer"){
      return(
        <Animation.FadeInRight className="MyBetContainer">
        {this.props.accountState.bets?
          Object.entries(this.props.accountState.bets).map((bet)=><BetItem bet={bet[1]} id={bet[0]} setSheet={this.setBetDetail}></BetItem>)
          :
          null
        }
        {this.props.accountState.bets.length > 0 ?
          null:
          <div style={{color:"black", fontSize:12, marginTop:30, alignItems:'center', display:"flex", flexDirection:"column"}}>{"You did not make bets yet... You can try it now !"}
            <div onClick={this.goToBetContainer} style={{marginTop:50, width:200, height:40, borderRadius:10, border:"1px solid rgba(150,150,150,0.5)", backgroundColor:"rgb(130, 255, 155)", color:"white", fontSize:25}}>Make A Bet
            </div>
          </div>
        }
        </Animation.FadeInRight>
      )
    } else{
      return(
        <BetItemDetail setSheet={this.setSheetJBetContainer}/>
      )
    }

  }
}

const mapStateToProps = (state) => {
  return {
    sheetSelected:state.helper.sheetSelected,
    listOfFriends:state.account.friends,
    accountState:state.account.accountStateRedux,
  }
}

const MyBetContainer = connect(mapStateToProps, mapDispatchToProps)(MyBetContainerComponent);
export default MyBetContainer;
