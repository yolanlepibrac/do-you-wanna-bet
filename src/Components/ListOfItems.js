
import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";


const sizeIconMobile = 40;
function mapDispatchToProps(dispatch) {
  return {
    sheetSelected:dispatch.sheetSelected,
  };
};

class ListOfItemsComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
     }
  }



  render(){
    return(
      <div>
        <div style={{width:this.props.width, height:this.props.height, backgroundColor:"rgba(255,255,255,1)", overflowY:"auto", boxShadow:"0px 0px 3px 2px rgba(0, 0, 0, 0.3) inset", color:"black", display:"flex", flexDirection:"column", alignItem:"flex-start", textAlign:"left", marginTop:5}}>
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

const ListOfItems = connect(mapStateToProps, mapDispatchToProps)(ListOfItemsComponent);
export default ListOfItems;
