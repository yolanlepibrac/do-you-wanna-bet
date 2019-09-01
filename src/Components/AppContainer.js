import React, { Component } from 'react';
import { changeAccountState } from "../Actions/index";
import { connect } from "react-redux";
import { bounceInDown } from 'react-animations';
import styled, { keyframes } from 'styled-components';

import PrincipalMenu from './PrincipalMenu'
import BetMake from './BetMake';
import MyBetContainer from './MyBetContainer';
import MyAccountContainer from './MyAccountContainer';
import FriendsContainer from './FriendsContainer';
import JudgeContainer from './JudgeContainer';

function mapDispatchToProps(dispatch) {
  return {
    changeAccountState: (article) => dispatch(changeAccountState(article)),
    accountStateRedux:dispatch.accountStateRedux,
    sheetSelected:dispatch.sheetSelected,
  };
};

class AppContainerComponent extends React.Component {


  render(){

    return(
      <div style={{height:"100%"}}>
          <div>
            <PrincipalMenu setOnglet={this.props.setOnglet} ongletselected={this.props.ongletselected}/>
            {this.props.ongletselected === "judge" ?
              <JudgeContainer/>
              :null
            }
            {this.props.ongletselected === "my bets" ?
              <MyBetContainer setOnglet={this.props.setOnglet}/>
              :null
            }
            {this.props.ongletselected === "friends" ?
              <FriendsContainer/>
              :null
            }
            {this.props.ongletselected === "my account" ?
              <MyAccountContainer logout={this.props.logout}/>
              :null
            }
            {this.props.ongletselected === "bet on" ?
              <BetMake setOnglet={this.props.setOnglet}/>
              :null
            }
          </div>
      </div>
    )

    }
  }

  const mapStateToProps = (state) => {
    return {
      displayLoading:state.helper.displayLoadingRedux,
      accountState:state.account.accountStateRedux,
      sheetSelectedRedux:state.helper.sheetSelected,

    }
  }

  const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppContainerComponent);
  export default AppContainer;
