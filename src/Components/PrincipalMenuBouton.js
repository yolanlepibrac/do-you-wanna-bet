
import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";


const sizeIconMobile = 30;
function mapDispatchToProps(dispatch) {
  return {
  };
};

class PrincipalMenuBoutonComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
     }
  }

  select = () => {
    console.log(this.props.ongletselected)
    console.log(this.props.nameSheet)
    this.props.setOnglet(this.props.nameSheet)
  }

  render(){
    return(

      <div onClick={this.select} style={{display:"flex", width:sizeIconMobile, height:sizeIconMobile, alignItems:"center", justifyContent:"center", marginLeft:10, marginRight:0, width:sizeIconMobile, height:sizeIconMobile, textAlign: "center", cursor:"pointer", backgroundImage:this.props.nameSheet == this.props.ongletselected ? this.props.backgroundImageSelect:this.props.backgroundImage, backgroundSize:"cover"}}>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const PrincipalMenuBouton = connect(mapStateToProps, mapDispatchToProps)(PrincipalMenuBoutonComponent);
export default PrincipalMenuBouton;
