import React, { Component } from 'react'

class ChartTypeComponent extends Component {

    constructor(props){
        super(props)
        this.state={

            resultPolar:"active",
            resultColumns:"",
        }
    }

    ChartTypeClicked(){

        if(this.state.resultPolar!="active"){
            
            this.state.resultPolar ="active";
            this.state.resultColumns="";

        }else{

            this.state.resultPolar ="";
            this.state.resultColumns="active";
        }

        this.props.ChangeChartType();
    }
  
    render () {

        return (
            <div className="TypeContainer">
            <ul className="nav nav-pills">
            <li className={this.state.resultPolar}><a href="#"onClick={()=>this.ChartTypeClicked()}>Polar</a></li>
              <li className={this.state.resultColumn} onClick={()=>this.ChartTypeClicked()}><a href="#">Column</a></li>
            </ul>
          </div>
        )
    }
}

export default ChartTypeComponent;