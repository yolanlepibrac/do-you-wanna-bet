
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
import FriendItem from './FriendItem';
import SearchSelectorUnique from './SearchSelectorUnique';
import { setSheetSelected } from "../Actions/index";
import { setNewBet } from "../Actions/index";
import Animation from "../Utils/Animation"


const sizeIconMobile = 40;
function mapDispatchToProps(dispatch) {
  return {
    sheetSelected:dispatch.sheetSelected,
    friends:dispatch.friends,
    setSheetSelected: (nameSheet) => dispatch(setSheetSelected(nameSheet)),
    setNewBet:(newBet, id) => dispatch(setNewBet(newBet, id)),
  };
};

class BetMake2Component extends Component {
  constructor (props) {
    super(props)
    this.state = {
      popupChooseFriends: false,
      researchFriend : "",
      selectedFriend : [],
      popupChooseWitness: false,
      witness : {},
     }
  }

  chooseFriends = () => {
    console.log(this.props.accountState.friends)
    this.setState({
      popupChooseFriends: true
    })
  }

  chooseWitness = () => {
    this.setState({
      popupChooseWitness: true
    })
  }

  setWitness = (witness) => {
    this.setState({
      witness: witness,
      popupChooseWitness: false
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

  quitChooseWitness = () => {
    this.setState({
      popupChooseWitness: false,
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
      if(newFriends[i].id === value.id){
        existing = true;
        indexOfExisting = i
      }
    }
    if(existing){
      newFriends.splice(indexOfExisting,1);
      console.log("splice")
    }else{
      newFriends.push(value);
      console.log("push")
    }
    this.setState({
      selectedFriend : newFriends,
    })
  }

  checkIfFriendIsSelected = (friend) => {

    var newFriends = this.state.selectedFriend;
    for (var i=0;i<newFriends.length;i++){
      if(newFriends[i].id === friend.id){

        return true;
      }
    }
    return false;
  }

  onClick= () => {
    if(this.state.selectedFriend.length > 0 && this.state.witness.id != undefined){
      this.props.validate(this.state.selectedFriend, this.state.witness)
    }
  }

  goBack = () => {
    this.props.goBack()
  }

  displayFriendForChooseWitness = (friend) => {
    if(!this.state.selectedFriend.map((f)=>(f.id)).includes(friend.id)){
      return(
        <SearchSelectorUnique style={{ paddingRight:20, textAlign:this.props.textAlign, fontSize:15, color:"black", width:"100%", borderBottom:"solid rgba(230,230,230,1) 0.5px"}} active={false} value={friend} onClick={(value)=>this.setWitness(value)} colorSelected={"rgba(136,240,180)"} colorDeBase={"rgba(253,253,253,1)"} colorHover ={"rgba(100,100,100,1)"} height={50}>
        </SearchSelectorUnique>
      )
    }
  }

  displayFriendForChooseFriend = (friend) => {
    return(
      <SearchSelector style={{ paddingRight:20, textAlign:this.props.textAlign, fontSize:15, color:"black", width:"100%", borderBottom:"solid rgba(230,230,230,1) 0.5px"}} active={this.checkIfFriendIsSelected(friend)} value={friend} onClick={(value) => this.toggleThisFriend(value)} colorSelected={"rgba(136,240,180)"} colorDeBase={"rgba(253,253,253,1)"} colorHover ={"rgba(100,100,100,1)"} height={50}>
      </SearchSelector>
    )
  }



  render(){
    return(

    <div className="Home2Container">

        <div style={{position:"absolute", width:30, height:30, top:25, left:10, backgroundImage:"url("+ require('../Assets/images/left.png') +")", backgroundSize:"cover"}} onClick={this.goBack}>
        </div>

        <div>
          <CustomLabel>Against Who ?
          </CustomLabel>
          <CustomPicker  onClick={this.chooseFriends}>Choose friends
          </CustomPicker>
          <ListOfItems height={100} width={200}>
            {this.state.selectedFriend.map((friend, index) => <FriendItem friend={friend} alreadyFriend={true} index={index} deletePossible={false}></FriendItem>)}
          </ListOfItems>
        </div>

        <div>
          <CustomLabel>Judge
          </CustomLabel>
          <CustomPicker  onClick={this.chooseWitness}>Choose the judge
          </CustomPicker>
          <ListOfItems height={70} width={200}>
            {this.state.witness.id !== undefined ?
              <FriendItem friend={this.state.witness} alreadyFriend={true} index={1} deletePossible={false}></FriendItem>
              :null
            }
          </ListOfItems>

        </div>

        {this.state.popupChooseWitness?
        <PopupChooseItems onQuit={this.quitChooseWitness}>
          <div style={{height:35, width:"100%"}}>
            <input type="text" placeholder={this.props.placeholder} style={{width:"100%", padding:0, marginTop:0, height:30}} onChange={this.researchFriend}/>
          </div>
          <div style={{ overflowY:"auto", width:"100%"}}>
            {this.props.accountState.friends.map((friend) => this.displayFriendForChooseWitness(friend))}
          </div>
        </PopupChooseItems>
        :null
        }


        {this.state.popupChooseFriends?
        <PopupChooseItems onQuit={this.quitChooseFriends}>
          <div style={{height:35, width:"100%"}}>
            <input type="text" placeholder={this.props.placeholder} style={{width:"100%", padding:0, marginTop:0, height:30}} onChange={this.researchFriend}/>
          </div>
          <div style={{ overflowY:"auto", width:"100%"}}>
            {this.props.accountState.friends.map((friend) => this.displayFriendForChooseFriend(friend))}
          </div>
            <CustomButtonValidate
            inactive={false}
            onClick={this.validateChooseFriends}
            style={{display:"flex", alignItem:"center", justifyContent:"center", width:200, height:70}}
            backgroundColor={"linear-gradient(to left, rgba(100, 250, 130), rgba(160, 255, 180))"}
            backgroundColorHover={"linear-gradient(to left, rgba(100, 250, 130), rgba(160, 255, 180))"}
            >
              <div>Choose friends</div>
            </CustomButtonValidate>
        </PopupChooseItems>
        :null
        }

        <CustomButtonValidate inactive={(this.state.selectedFriend.length > 0 && this.state.witness.id !== undefined)  ? false : true} onClick={this.onClick} backgroundColor={"linear-gradient(to left, rgba(100, 250, 130), rgba(160, 255, 180))"} backgroundColorHover={"linear-gradient(to left, rgba(100, 250, 130), rgba(160, 255, 180))"}><div>Valider</div>
        </CustomButtonValidate>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    accountState:state.account.accountStateRedux,
    sheetSelected:state.helper.sheetSelected,
  }
}

const BetMake2 = connect(mapStateToProps, mapDispatchToProps)(BetMake2Component);
export default BetMake2;
