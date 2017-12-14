import React, { Component } from 'react'
import Defaults from "../defaults/Defaults"

class 
ItemSingleBasicChoise extends Component {

    constructor(props){
        super(props)
        this.state=
        {       
        result:"SingleItemDefault"
        }
    }

    setItemState(){
        
                this.props.MultiChoiseItemClicked(this.props.CallingID,this.props.id);

                if(this.props.name!==Defaults.DataNotAvailable){

                    if(this.state.result==="SingleItemDefault"){
                        this.setState({result:"SingleItemSelected"});
                    } else{
                         this.setState({result:"SingleItemDefault"});           
                    }
                }              
            }

    render () {

        return(
            <div>
                <li className={this.state.result} onClick={() => this.setItemState()}>{this.props.name}</li> 
            </div>
            )
    }
}

export default ItemSingleBasicChoise