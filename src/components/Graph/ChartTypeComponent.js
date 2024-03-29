import React, { Component } from 'react'

class ChartTypeComponent extends Component {

    constructor(props){
        super(props)

        this.state={
            PolarView: "active",
            ColumnView :""
        }
    }

    PolarViewClicked(){

        if(this.state.PolarView!=="active"){
            this.setState({PolarView:"active",ColumnView:""});
        }
        
        this.props.ChangeChartType(true)
    }

    ColumnViewClicked(){

        if(this.state.ColumnView!=="active"){
            this.setState({PolarView:"",ColumnView:"active"});
        }

        this.props.ChangeChartType(false)
    }

    render () {

        return (
            <div className="TypeContainer">
            <ul className="nav nav-pills">
            <li className={this.state.PolarView}><a href="#"onClick={()=>this.PolarViewClicked()}>Polar</a></li>
              <li className={this.state.ColumnView} ><a href="#" onClick={()=>this.ColumnViewClicked()}>Column</a></li>
            </ul>
          </div>
        )
    }
}

export default ChartTypeComponent;