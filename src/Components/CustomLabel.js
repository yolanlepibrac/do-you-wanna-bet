
import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";


const sizeIconMobile = 40;
function mapDispatchToProps(dispatch) {
  return {
    sheetSelected:dispatch.sheetSelected,
  };
};

class CustomLabelComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
     }
  }

  render(){
    return(
      <div className="CustomLabel" >
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

const CustomLabel = connect(mapStateToProps, mapDispatchToProps)(CustomLabelComponent);
export default CustomLabel;
