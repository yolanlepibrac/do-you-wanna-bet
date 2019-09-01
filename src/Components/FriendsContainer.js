
import React, { Component } from 'react';
import '../App.css';

import API from '../Utils/API';

import FriendItem from './FriendItem';
import Animation from "../Utils/Animation"

import { connect } from "react-redux";
import Spinner from 'react-bootstrap/Spinner'
import { setFriendsState } from "../Actions/index";

const selectedColor = "rgba(123,250,155,1)";
const nonSelectedColor = "rgba(240,240,240,1)";
function mapDispatchToProps(dispatch) {
  return {
    sheetSelected:dispatch.sheetSelected,
    accountStateRedux:dispatch.accountStateRedux,
    setFriendsState: (tabOfFriends) => dispatch(setFriendsState(tabOfFriends)),
  };
};

class FriendsContainerComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchValue:"",
      searchValueSend : "",
      tabOfFriendObject:[],
      tabOfIdOfFriendsAreadyFriends:this.props.accountState.friends,
      searchActive:false,
      displayLoading:false,
     }
  }

  changeSearchValue = (e) => {
    this.setState({
      searchValue:e.target.value
    })
  }

  submit = (e, context) => {
    if(e.key === 'Enter'){
      this.setState({
        displayLoading:true,
        searchValueSend : this.state.searchValue
      })
      API.searchFriends(this.state.searchValue, context).then(function(data){

          console.log(data.data.user)
          for (var i = 0; i < data.data.user.length; i++) {
            if(data.data.user[i].id === context.props.accountState.account.id){
              var result = data.data.user.splice(i, 1);
            }
          }
          context.setState({
            tabOfFriendObject : data.data.user,
            displayLoading : false
          })
      },function(error){
          console.log(error)
          context.setState({displayLoading:false})
          return;
      })
    }
  }

  toggleFriend = (friendToCheck, context) => {

    let tabOfIdOfFriends = this.props.accountState.friends
    let tabOfIdOfFriendsID = this.props.accountState.friends.map((friend)=>(friend.id))
    if(!tabOfIdOfFriendsID.includes(friendToCheck.id)){
      tabOfIdOfFriends.push(friendToCheck)
    }else{
      let index = tabOfIdOfFriendsID.indexOf(friendToCheck.id);
      if (index !== -1){
        tabOfIdOfFriends.splice(index, 1);
        tabOfIdOfFriendsID.splice(index, 1);
      }
    }
    this.props.setFriendsState(tabOfIdOfFriends)
    this.setState({
      tabOfIdOfFriendsAreadyFriends:tabOfIdOfFriends
    })
    API.toggleFriend(this.props.accountState.account.id, tabOfIdOfFriendsID).then(function(data){
        console.log(data.data)
    },function(error){
        console.log(error);
        return;
    })
  }

  setSearch = () => {
    this.setState({searchActive:true})
  }

  leaveSearch = () => {
    this.setState({searchActive:false})
  }



  render(){
    //let accountStateFriendID = this.props.accountState.friends.map((friend)=>(friend.id))
    return(
      <Animation.FadeInRight className="FriendsContainer">
        <div style={{display:"flex", width:"100%", height:40, justifyContent:"center", paddingLeft:5, paddingRight:5, marginTop:10, alignItems:"center"}}>
          <div onClick={this.leaveSearch} style={{width:70, display:"flex", justifyContent:"center", backgroundColor:this.state.searchActive?nonSelectedColor:selectedColor, borderRadius:"10px 0px 0px 10px", borderWidth:"1px 0px 1px 1px", borderStyle:"solid", borderColor:this.state.searchActive?"rgba(200,200,200,1)":"rgba(50,138,66,0.6)"}}>
            <div style={{width:30, height:30, backgroundImage:this.state.searchActive?"url("+ require('../Assets/images/friendsSelectGrey.png') +")":"url("+ require('../Assets/images/friendsSelectGreen.png') +")", backgroundSize:"cover"}}></div>
          </div>
          <div onClick={this.setSearch} style={{width:70, display:"flex", justifyContent:"center", backgroundColor:this.state.searchActive?selectedColor:nonSelectedColor, borderRadius:"0px 10px 10px 0px", borderWidth:"1px 1px 1px 0px", borderStyle:"solid", borderColor:this.state.searchActive?"rgba(50,138,66,0.6)":"rgba(200,200,200,1)"}}>
            <div style={{width:30, height:30, backgroundImage:this.state.searchActive?"url("+ require('../Assets/images/searchGreen.png') +")":"url("+ require('../Assets/images/searchGrey.png') +")", backgroundSize:"cover"}}></div>
          </div>
        </div>
        {this.state.searchActive ?
          <div style={{backgroundColor:"rgba(255,255,255,1)", marginLeft:5, marginRight:5,"box-shadow": "0px 0px 3px 1px rgba(160,160,160,1)", paddingBottom:20, height:"calc(100vh - 150px)", overflowY:"auto", marginTop:10}}>
            <div>
              <input autofocus type="text" placeholder="Search friends" value={this.state.searchValue} onChange={(e)=>this.changeSearchValue(e)} onKeyPress={(e)=>this.submit(e, this)} style={{width:"100%",margin:0, padding:0, paddingLeft:20, height:30, borderWidth:"0px 0px 1px 0px", borderColor:"rgba(230,230,230,1)"}}/>
            </div>
            {this.state.displayLoading?
              <div style={{width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", zIndex:15}}>
                <Spinner animation="border text-success"/>
              </div>
            :
              <div>
                {this.state.tabOfFriendObject.length>0 ?
                  this.state.tabOfFriendObject.map((friendObject, index)=>
                    <FriendItem friend={friendObject} onClick={(friend)=>this.toggleFriend(friend, this)} index={index} deletePossible={true} alreadyFriend={this.state.tabOfIdOfFriendsAreadyFriends.map((friend)=>(friend.id)).includes(friendObject.id)}>
                    </FriendItem>
                  )
                  :
                  <div>
                    {this.state.searchValueSend.length?
                      <div style={{color:"black", fontSize:12, marginTop:30}}>{"impossible to find : \"" + this.state.searchValueSend + "\""}
                      </div>
                      :null
                    }
                  </div>
                }
              </div>
            }
          </div>
          :
          <div style={{backgroundColor:"rgba(255,255,255,1)", marginLeft:5, marginRight:5,"box-shadow":"0px 0px 3px 1px rgba(160,160,160,1)", paddingBottom:20, height:"calc(100vh - 150px)", overflowY:"auto", marginTop:10}}>
            <div>
              <div style={{width:"100%", color:"grey", backgroundColor:"white", textAlign:"left", paddingLeft:20,  height:30, borderWidth:"0px 0px 1px 0px", borderStyle:"solid", borderColor:"rgba(230,230,230,1)"}}>My Friends
              </div>
            </div>
            {this.props.accountState.friends.map((friend, index)=>
              <FriendItem friend={friend} alreadyFriend={true} index={index} onClick={(friend)=>this.toggleFriend(friend, this)}  deletePossible={true}></FriendItem>
              )
            }
          </div>
        }

        {/*this.props.accountState.friends.map((friend)=><FriendItem friend={friend}></FriendItem>)*/}
      </Animation.FadeInRight>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sheetSelected:state.helper.sheetSelected,
    accountState:state.account.accountStateRedux,
  }
}

const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsContainerComponent);
export default FriendsContainer;
