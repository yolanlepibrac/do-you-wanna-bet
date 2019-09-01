
import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";


const sizeIconMobile = 40;
function mapDispatchToProps(dispatch) {
  return {
    sheetSelected:dispatch.sheetSelected,
  };
};

class CustomInputTextComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
     }
  }

  onChange = (e) => {
    this.props.onChange(e.target.value)
  }

  render(){
    return(
      <div style={{margin:0, padding:0, display:"flex", flexDirection:"column", justifyContent:"flex-start"}}>
        <input className="CustomInputText" type="text" placeholder={this.props.placeholder} onChange={(e)=>this.onChange(e)}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sheetSelected:state.helper.sheetSelected,
  }
}

const CustomInputText = connect(mapStateToProps, mapDispatchToProps)(CustomInputTextComponent);
export default CustomInputText;
