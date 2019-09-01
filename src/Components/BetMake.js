
import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CustomButtonValidate from './CustomButtonValidate';
import CustomInputText from './CustomInputText';
import CustomLabel from './CustomLabel';
import CustomPicker from './CustomPicker';
import PopupChooseItems from './PopupChooseItems';
import SearchSelector from './SearchSelector';
import ListOfItems from './ListOfItems';
import BetMake2 from './BetMake2';
import { setSheetSelected } from "../Actions/index";
import { setNewBet } from "../Actions/index";
import Animation from "../Utils/Animation"
import API from '../Utils/API';

const CustomInputDate = ({onChange, placeholder, value, isSecure, id, onClick, onQuit}) => (
    <div>
      <input
          className="CustomInputDate"
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          isSecure={isSecure}
          id={id}
          onClick={onClick}
      />
      <div style={{zIndex:50, width:20, height:20, position:"absolute", top:0, right:0, backgroundImage:"url("+ require('../Assets/images/quit.png') +")", backgroundSize:"cover"}} onClick={onQuit}></div>
    </div>
);
const sizeIconMobile = 40;
function mapDispatchToProps(dispatch) {
  return {
    sheetSelected:dispatch.sheetSelected,
    friends:dispatch.friends,
    setSheetSelected: (nameSheet) => dispatch(setSheetSelected(nameSheet)),
    setNewBet:(newBet, id) => dispatch(setNewBet(newBet, id)),
  };
};

class BetMakeComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      popupChooseFriends: false,
      researchFriend : "",
      selectedFriend : [],
      titleOfBet:"",
      issueOfBet:"",
      expirationOfBet:new Date(),
      displayDatePicker:false,
      displayPage2 : false,
     }
  }

  chooseFriends = () => {
    this.setState({
      popupChooseFriends: true
    })
  }

  validateChooseFriends = (listOfFriends) => {
    this.setState({
      popupChooseFriends: false,
      listOfFriends : listOfFriends,
    })
  }

  quitChooseFriends = () => {
    this.setState({
      popupChooseFriends: false,
    })
  }

  researchFriend = (e) => {
    if(e){
      this.setState({
        researchFriend : e.target.value
      })
    }
  }

  toggleThisFriend = (value) => {
    var newFriends = this.state.selectedFriend;
    let existing = false;
    let indexOfExisting = 0;
    for (var i=0;i<newFriends.length;i++){
      if(newFriends[i] === value){
        existing = true;
        indexOfExisting = i
      }
    }
    if(existing){
      newFriends.splice(indexOfExisting,1)
    }else{
      newFriends.push(value)
    }
    this.setState({
      selectedFriend : newFriends,
    })
  }

  checkIfFriendIsSelected = (friend) => {
    var newFriends = this.state.selectedFriend;
    for (var i=0;i<newFriends.length;i++){
      if(newFriends[i].name === friend.name){
        return true;
      }
    }
    return false;
  }

  dateToString = (date) => {
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();
    date = dd + '/' + mm + '/' + yyyy;
    return date
  }

  makeTheBet = (listOfFriends, witness) => {

    let expirationDate = this.state.expirationOfBet
    if(this.state.titleOfBet.length > 0 && this.state.issueOfBet.length > 0 && listOfFriends.length > 0){
      if( !this.state.displayDatePicker){
        expirationDate = "never"
      }else{
        expirationDate = this.dateToString(expirationDate);
      }

      let today = this.dateToString(new Date());


      let id = '_' + Math.random().toString(36).substr(2, 9);

      let newBet={
        id:id,
        title:this.state.titleOfBet,
        issue:this.state.issueOfBet,
        expiration:expirationDate,
        creation:today,
        players1:[this.props.accountState.account.id],
        players2:listOfFriends.map((friend)=>(friend.id)),
        win:false,
        witness:witness.id,
        current:true,
      }
      console.log(this.props.accountState)
      this.props.setOnglet("my bets")
      API.createBet(newBet).then(function(data){
        console.log(data)
      })
      this.props.setNewBet(newBet)
    }
  }

  setTitleOfBet= (value) => {
    this.setState({
      titleOfBet : value
    })
  }

  setIssueOfBet= (value) => {
    this.setState({
      issueOfBet : value
    })
  }

  setExpirationOfBet = (value) => {
    this.setState({
      expirationOfBet : value
    })
  }

  toggleDatePicker = () =>{
    this.setState({
      displayDatePicker:!this.state.displayDatePicker,
    })
  }

  displayPage2 = () => {
    if(this.state.titleOfBet.length > 0 && this.state.issueOfBet.length > 0){
      this.setState({
        displayPage2:true
      })
    }
  }

  goBack = () => {
    this.setState({
      displayPage2:false
    })
  }

  render(){
    return(

      <Animation.FadeInRight >
      {this.state.displayPage2 ?
        <BetMake2 validate={(listOfFriends, witness) => this.makeTheBet(listOfFriends, witness)} goBack={this.goBack} setOnglet={this.props.setOnglet}/>
        :
        null
      }
        <div className="HomeContainer">
          <div>
            <CustomLabel><div>What ?</div>
            </CustomLabel>
            <CustomInputText value={this.state.titleOfBet} placeholder={"make a bet"} onChange={this.setTitleOfBet}><div>Validate</div>
            </CustomInputText>
          </div>

          <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start"}}>
            <CustomLabel><div>Price ?</div>
            </CustomLabel>
            <CustomInputText value={this.state.issueOfBet} placeholder={"what do you win"} onChange={this.setIssueOfBet}><div>Validate</div>
            </CustomInputText>
          </div>

          <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start"}}>
            <CustomLabel><div>When ?</div>
            </CustomLabel>
            {this.state.displayDatePicker?
              <DatePicker
                  customInput={<CustomInputDate onQuit={this.toggleDatePicker}/>}
                  selected={this.state.expirationOfBet}
                  minDate={new Date()}
                  onChange={(value)=>this.setExpirationOfBet(value)}
                    />
              :
              <div className="CustomPicker" style={{width:"100%"}} onClick={this.toggleDatePicker}>Never
              </div>
            }

          </div>

          <CustomButtonValidate inactive={(this.state.titleOfBet.length > 0 && this.state.issueOfBet.length > 0 )  ? false : true} onClick={this.displayPage2} backgroundColor={"linear-gradient(to left, rgba(100, 250, 130), rgba(160, 255, 180))"} backgroundColorHover={"linear-gradient(to left, rgba(100, 250, 130), rgba(160, 255, 180))"}><div>Valider</div>
          </CustomButtonValidate>
        </div >

      </Animation.FadeInRight>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    accountState:state.account.accountStateRedux,
    sheetSelected:state.helper.sheetSelected,
    listOfFriends:state.account.friends,
  }
}

const BetMake = connect(mapStateToProps, mapDispatchToProps)(BetMakeComponent);
export default BetMake;
