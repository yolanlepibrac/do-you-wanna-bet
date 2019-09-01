
import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";

import BetItem from './BetItem'
import BetItemDetail from './BetItemDetail';

const sizeIconMobile = 35;
function mapDispatchToProps(dispatch) {
  return {
    sheetSelected:dispatch.sheetSelected,
  };
};

class JudgeContainerComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sheet: "judge"
     }
  }

  setBetDetail = () => {
    this.setState({
      sheet: "betDetail"
    })
  }
  setSheetJudge = () => {
    this.setState({
      sheet: "judge"
    })
  }

  render(){

      if(this.state.sheet === "judge"){
        return(
          <div>
            {this.props.accountState.witnessOf.map((bet)=><BetItem bet={bet} setSheet={this.setBetDetail}/>)}
            {this.props.accountState.witnessOf.length > 0 ?
              null:
              <div style={{color:"black", fontSize:12, marginTop:30}}>{"You are not yet the judge of a bet"}
              </div>
            }
          </div>
        )
      }else{
        return(
          <BetItemDetail setSheet={this.setSheetJudge}/>
        )
      }
  }
}

const mapStateToProps = (state) => {
  return {
    accountState:state.account.accountStateRedux,
  }
}

const JudgeContainer = connect(mapStateToProps, mapDispatchToProps)(JudgeContainerComponent);
export default JudgeContainer;
