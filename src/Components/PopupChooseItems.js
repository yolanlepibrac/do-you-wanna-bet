
import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";


const sizeIconMobile = 40;
function mapDispatchToProps(dispatch) {
  return {
    sheetSelected:dispatch.sheetSelected,
  };
};

class PopupChooseItemsComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
     }
  }

  render(){
    return(
      <div className="PopupChooseItems">
        <div className="BackgroundWindowQuit" onClick={this.props.onQuit}>
        </div>
        <div className="Popup"  style={this.props.style}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sheetSelected:state.helper.sheetSelected,
  }
}

const PopupChooseItems = connect(mapStateToProps, mapDispatchToProps)(PopupChooseItemsComponent);
export default PopupChooseItems;
