import React, { Component } from 'react';
import './App.css';
import { connect } from "react-redux";
import Spinner from 'react-bootstrap/Spinner'
import API from './Utils/API';
import YolanHeder from './Components/YolanHeader';
import AppContainer from './Components/AppContainer';
import NoAccount from './Components/NoAccount';

import { changeAccountState } from "./Actions/index";
import { displayLoading } from "./Actions/index";
import { getUserFriends } from "./Actions/index";
import { getUserBets } from "./Actions/index";
import { getUserWitnessOf } from "./Actions/index";
import { setSheetSelected } from "./Actions/index";

function mapDispatchToProps(dispatch) {
  return {
    changeAccountState: (userData) => dispatch(changeAccountState(userData)),
    getUserBets: (tabOfBets) => dispatch(getUserBets(tabOfBets)),
    getUserFriends: (tabOfFriends) => dispatch(getUserFriends(tabOfFriends)),
    getUserWitnessOf: (tabOfWitnessOf) => dispatch(getUserWitnessOf(tabOfWitnessOf)),
    displayLoading: (boolean) => dispatch(displayLoading(boolean)),
    setSheetSelected: (nameSheet) => dispatch(setSheetSelected(nameSheet)),
  };
};

class AppComponent extends React.Component {

  constructor (props) {
    super(props)
    this.dataStored = 0;
    this.state = {
      connected: false,
      displayLoading:false,
     }
  }



  componentDidMount = () => {
    console.log(localStorage)
    this.dataStored = 0
    if(localStorage.connected === "true" && localStorage.email.length>0 && localStorage.email !== "undefined"){
      this.loginToDatabase(localStorage.email);
      this.setState({
        onglet : localStorage.onglet,
      })
    }
  }



  loginToDatabase = (email) => {
    var context = this;
    this.setState({
      email : email,
      onglet : "bet on"
    })
    this.setState({displayLoading:true})
    var tabOfFriendsInformations = [];
    var tabOfBetsInformations = [];
    var tabOfWitnessOfInformations = [];
          API.getUserDataByEmail(email).then(function(dataCurrentUser){
            context.props.changeAccountState(dataCurrentUser.data.userData);
            if(dataCurrentUser.data.userData.friends.length>0){
              let countFriends = 0;
              for(var i=0;i<dataCurrentUser.data.userData.friends.length;i++){
                API.getUserDataByID(dataCurrentUser.data.userData.friends[i]).then(function(dataFriend){
                  tabOfFriendsInformations.push(dataFriend.data.userData)
                }).then(function(){
                  if(countFriends===dataCurrentUser.data.userData.friends.length-1){
                    context.sendAllInfoToRedux(tabOfFriendsInformations, "friends")
                  }
                  countFriends++
                })
              }
            }else{
              context.sendAllInfoToRedux([], "friends", email)
            }
            if(dataCurrentUser.data.userData.bets.length>0){
              let countBets = 0;
              for(var i=0;i<dataCurrentUser.data.userData.bets.length;i++){
                API.getBetDataByID(dataCurrentUser.data.userData.bets[i]).then(function(dataFriend,i){
                  tabOfBetsInformations.push(dataFriend.data.bet)
                }).then(function(){
                  if(countBets===dataCurrentUser.data.userData.bets.length-1){
                    context.sendAllInfoToRedux(tabOfBetsInformations, "bets")
                  }
                  countBets++;
                })
              }
            }else{
              context.sendAllInfoToRedux([], "bets", email)
            }
            if(dataCurrentUser.data.userData.witnessOf.length){
              let countWitnessOf = 0;
              for(var i=0;i<dataCurrentUser.data.userData.witnessOf.length;i++){
                API.getBetDataByID(dataCurrentUser.data.userData.witnessOf[i]).then(function(dataFriend){
                  tabOfWitnessOfInformations.push(dataFriend.data.bet)
                }).then(function(){
                  if(countWitnessOf===dataCurrentUser.data.userData.witnessOf.length-1){
                    context.sendAllInfoToRedux(tabOfWitnessOfInformations, "witnessOf")
                  }
                  countWitnessOf++
                })
              }
            }else{
              context.sendAllInfoToRedux([], "witnessOf", email)
            }
          })
      }

      sendAllInfoToRedux = (tabToSend, key, email) => {

        this.dataStored = this.dataStored+1
        if(key === "friends"){
          this.props.getUserFriends(tabToSend);
        }
        if(key === "bets"){
          this.props.getUserBets(tabToSend);
        }
        if(key === "witnessOf"){
          this.props.getUserWitnessOf(tabToSend);
        }
        if(this.dataStored===3){
          this.login(this.state.email)
          this.setState({displayLoading:false})
        }
      }

      login = (email) => {
        localStorage.setItem("connected" , true)
        localStorage.setItem("email" , email)
        this.setState({
          connected:true,
          email:email,
          displayLoading:true
        })
      }

      logout = () => {
        this.dataStored = 0
        localStorage.setItem("connected" , false)
        localStorage.setItem("email" , "")
        localStorage.setItem("email" , "bet on")
        this.setState({connected:false})
      }

      setOnglet = (onglet) => {
        localStorage.setItem("onglet", onglet)
        console.log(localStorage.onglet)
        this.setState({
          onglet:onglet
        })
      }

  render(){
    return (
      <div className="App" >
        {!this.state.displayLoading  ?
          <div>
            <header className="App-header">
              <YolanHeder height={30} fontSize={15} backgroundColor={'rgba(0, 125, 33)'}>Do you wanna bet
              </YolanHeder>
            </header>
            <div className="App-container">
              { this.state.connected ?
                <AppContainer logout={this.logout} setOnglet={this.setOnglet} ongletselected={this.state.onglet}/>
                :
                <div style={{width:"100vw"}}>
                  <NoAccount login={this.loginToDatabase}/>
                  <img src={require('./Assets/images/betOnWhite.png')} alt="logo" style={{position:"absolute", left:0, width:"100vw", top:100, zIndex:4}}/>
                </div>
              }

            </div>
          </div>
          :
          <div style={{width:"100vw", height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Spinner animation="border" />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    connected:state.account.connectedRedux,
    displayLoading:state.helper.displayLoadingRedux,
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
export default App;
