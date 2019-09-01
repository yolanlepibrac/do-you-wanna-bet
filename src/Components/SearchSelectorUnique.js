
import React, { Component } from 'react';
import posed from 'react-pose';

const colorSelected = "rgba(100,226,59)"
const colorDeBase = "rgba(200,200,200,1)"
const colorHover = "rgba(100,100,100,1)"

export default class SearchSelectorUnique extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      hover : false,
      backgroundColor:this.props.active?this.props.colorSelected:this.props.colorDeBase,
      height:this.props.height?this.props.height:25,
    };
  }

  hover = () => {
    this.setState({
      hover : true,
      backgroundColor:this.props.active?this.props.colorSelected:this.props.colorHover
    })
  }
  blur = () => {
    this.setState({
      hover : false,
      backgroundColor:this.props.active?this.props.colorSelected:this.props.colorDeBase
    })
  }

  onClick = () => {
    this.props.onClick(this.props.value)
  }

  render(){
    var style={display:"flex", justifyContent:"space-between", alignItems:"center", backgroundColor:this.state.backgroundColor, paddingBottom:10, paddingTop:10, }
    return(

      <div onClick={this.onClick} onMouseEnter={this.hover} onMouseLeave={this.blur} style={Object.assign(style, this.props.style)}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
          <img src={this.props.value.imageProfil} style={{width:this.state.height, height:this.state.height, cursor:"pointer", marginLeft:this.state.height/2, marginRight:this.state.height/2, borderRadius:"50%"}}/>
          {this.props.value.userName}
        </div>
      </div>
    )
  }



}
