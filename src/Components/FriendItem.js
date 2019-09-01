
import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";
import posed from 'react-pose';



const heightItem = 50;
const borderWidth = 3;
const fontSize = 15;
const coloWin = "rgba(87,201,108)"
const coloLoose = "rgba(255,82,82)"
const CompetenceTechnosBar = posed.div({
    idle: {
      width : "0px",
      transition: ({i}) => ({
        duration: 500,
        ease: 'backInOut',
        delay: i*0,
      })
     },
    hovered: {
      width:"100%",
      transition: ({i}) => ({
        duration: 100,
        ease: 'easeOut',
        delay: i*100+600,
      })
     },
});


function mapDispatchToProps(dispatch) {
  return {
    sheetSelected:dispatch.sheetSelected,
    friends:dispatch.friends,
  };
};

class FriendItemComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      popupChooseFriends: false,
      researchFriend : "",
      selectedFriend : [],
      titleOfBet:"",
      issueOfBet:"",
      display : false,
      deltaImageX:0,
      dragging:false,
     }
  }

  numberWon = (friend) => {
    var numberWon = 0
    if(friend.won){
      numberWon = friend.won
    }
    return numberWon
  }


  componentDidMount = () => {
      var percent = Math.random()
      var centerX = (heightItem+borderWidth*2) / 2;
      var centerY = (heightItem+borderWidth*2) / 2;
      var radius = heightItem/2;

      var canvas = document.getElementById("win_"+this.props.friend.id);
      var context = canvas.getContext('2d');

      context.beginPath();
      context.arc(centerX, centerY, radius, -Math.PI/2, 2*Math.PI*percent-Math.PI/2, false);
      context.lineWidth = borderWidth;
      context.strokeStyle = coloWin;
      context.stroke();

      var canvasLoose = document.getElementById("loose_"+this.props.friend.id);
      var contextLoose = canvasLoose.getContext('2d');
      contextLoose.beginPath();
      contextLoose.arc(centerX, centerY, radius,  2*Math.PI*percent-Math.PI/2, 3*Math.PI/2, false);
      contextLoose.lineWidth = borderWidth;
      contextLoose.strokeStyle = coloLoose;
      contextLoose.stroke();

      this.setState({
        display : true,
      })
  }

  down = (e) => {
    if(this.props.deletePossible){
      this.setState({
        dragging:true,
        xCursor : e.changedTouches[0].clientX - this.state.deltaImageX ,
      })
    }
  }

  drag = (event) => {
    if(this.props.deletePossible){
      if(this.state.dragging && this.state.deltaImageX>=0 &&  this.state.deltaImageX<=150){
        this.setState({
          deltaImageX : event.changedTouches[0].clientX - this.state.xCursor
        })
      }
    }
  }

  up = () => {
    if(this.props.deletePossible){
      if(this.state.deltaImageX<75){
        this.setState({deltaImageX : 0})
      }
      if(this.state.deltaImageX>75){
        this.setState({deltaImageX : 150})
      }
      this.setState({
        dragging:false,
      })
    }
  }

  toggleFriend = () => {
    if(this.props.deletePossible){
      this.setState({deltaImageX : 0})
      this.props.onClick(this.props.friend)
    }
  }


  render(){
    let friend = this.props.friend
    return(
      <div className="FriendItem">
          <div style={{display:"flex", alignItems:"center", justifyContent:"flex-start", textAlign:"center", position:"relative", width:"100%", paddingRight:10}}>
            <canvas id={"win_"+this.props.friend.id} width={heightItem+borderWidth*2} height={heightItem+borderWidth*2} style={{position:"absolute", top:0, left:this.state.deltaImageX, zIndex:12}}>
            </canvas>
            <canvas id={"loose_"+this.props.friend.id} width={heightItem+borderWidth*2} height={heightItem+borderWidth*2} style={{position:"absolute", top:0, left:this.state.deltaImageX, zIndex:12}}>
            </canvas>
            {this.props.alreadyFriend?
              <div>
                <div style={{borderRadius:"50%", zIndex:13, position:"absolute", top:borderWidth, left:borderWidth+this.state.deltaImageX, width:heightItem, height:heightItem}}
                onMouseDown={(event)=>this.down(event)}
                onMouseMove={(event)=>this.drag(event)}
                onMouseUp={(event)=>this.up(event)}
                onTouchStart={(event)=>this.down(event)}
                onTouchMove={(event)=>this.drag(event)}
                onTouchEnd={(event)=>this.up(event)}>
                </div>
                <div style={{display:"flex", alignItems:"center", zIndex:10, position:"absolute", height:heightItem, top:borderWidth, left:borderWidth+heightItem/2, backgroundColor:"rgba(243,243,243,1)",  width:this.state.deltaImageX, overflow:"hidden"}}>
                  <div style={{borderRadius:150, height:30, width:100, textAlign:"center",  backgroundColor:"rgba(200,50,70,0.5)", border:"2px solid rgba(200,200,200,1)"}}
                  onClick={this.toggleFriend}>Delete
                  </div>
                </div>
              </div>
              :null
            }
            <img width={heightItem} height={heightItem} src={friend.imageProfil} style={{cursor:"pointer", borderWidth:0, borderStyle:"solid", borderRadius:"50%", zIndex:11, position:"absolute", top:borderWidth, left:borderWidth+this.state.deltaImageX}}/>
            <CompetenceTechnosBar pose={this.state.display ? "hovered" : "idle"} i={this.props.index}  style={{display:"flex", flexDirection:"row", justifyContent:"space-between", overflow:"hidden", height:heightItem, marginTop:2, backgroundColor:"rgba(243,243,243,1)", borderRadius:32}}>
                <div style={{display:"flex", marginLeft:80, marginRight:10, alignItems:"center", justifyContent:"space-between", width:"100%"}}>
                    <div style={{display:"flex", flexDirection:"column", textAlign:"left"}}>
                      <div style={{fontSize:fontSize, color:"black"}}>{friend.userName}
                      </div>
                      <div style={{fontSize:fontSize-2, color:"rgba(150,150,150,1)"}}>{friend.bets.length + " bets - " + this.numberWon(friend) + " won"}
                      </div>
                    </div>
                    {this.props.alreadyFriend ?
                      <div style={{width:heightItem/2, height:heightItem/2, backgroundImage:"url("+ require('../Assets/images/check.png') +")", backgroundSize:"cover"}}>
                      </div>
                      :
                      <div onClick={this.toggleFriend} style={{width:heightItem/2, height:heightItem/2, backgroundImage:"url("+ require('../Assets/images/addFriend.png') +")", backgroundSize:"cover"}}>
                      </div>
                    }
                  </div>
            </CompetenceTechnosBar>
          </div>


      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    accountState:state.account.accountStateRedux,
  }
}

const FriendItem = connect(mapStateToProps, mapDispatchToProps)(FriendItemComponent);
export default FriendItem;
