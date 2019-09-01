
import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";


import { bounceInDown } from 'react-animations';
import { fadeOut } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const bounceAnimation = keyframes`${bounceInDown}`;
const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;
const fadeOutAnimation = keyframes`${fadeOut}`;
const FadeOut = styled.div`
  animation: 1s ${fadeOutAnimation};
`;


const sizeIconMobile = 40;
function mapDispatchToProps(dispatch) {
  return {
    sheetSelected:dispatch.sheetSelected,
  };
};

class CustomButtonValidateComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      backgroundColor:this.props.backgroundColor,
      border: "solid 1.5px rgba(100,100,100,1)",
      boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.6)",
     }
  }

  onClick= () => {
      this.props.onClick()
  }

  hover = () => {
    this.setState({
      backgroundColor:this.props.backgroundColorHover,
      border: "solid 3px rgba(0,0,0,0.1)",
      boxShadow: "3px 3px 5px 0 rgba(0, 0, 0, 0.2)",
    })
  }

  notHover = () => {
    this.setState({
      backgroundColor:this.props.backgroundColor,
      border: "solid 1.5px rgba(100,100,100,1)",
      boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.6)",
    })
  }

  render(){
    return(
          <div className="CustomButtonValidate" onMouseEnter={this.hover} onMouseLeave={this.notHover} onClick={this.onClick} style={Object.assign({background:!this.props.inactive?this.state.backgroundColor:"rgba(210, 210, 210)",border:!this.props.inactive?this.state.border:"", boxShadow:!this.props.inactive?this.state.boxShadow:"", cursor:!this.props.inactive?"pointer":"", color:!this.props.inactive?"black":"rgba(237,237,237,1)"},this.props.style)}>
              {this.props.children}
          </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sheetSelected:state.helper.sheetSelected,
  }
}

const CustomButtonValidate = connect(mapStateToProps, mapDispatchToProps)(CustomButtonValidateComponent);
export default CustomButtonValidate;
