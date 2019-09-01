
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

class CustomPickerComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      backgroundColor:this.props.backgroundColor,
     }
  }

  onClick= () => {
      this.props.onClick()
  }

  hover = () => {
    this.setState({
      backgroundColor:this.props.backgroundColorHover,
    })
  }

  notHover = () => {
    this.setState({
      backgroundColor:this.props.backgroundColor,
    })
  }

  render(){
    return(
          <div className="CustomPicker" onMouseEnter={this.hover} onMouseLeave={this.notHover} onClick={this.onClick} style={{backgroundColor:!this.props.inactive?this.state.backgroundColor:"grey",border:!this.props.inactive?this.state.border:"", boxShadow:!this.props.inactive?this.state.boxShadow:"", cursor:!this.props.inactive?"pointer":""}}>
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

const CustomPicker = connect(mapStateToProps, mapDispatchToProps)(CustomPickerComponent);
export default CustomPicker;
