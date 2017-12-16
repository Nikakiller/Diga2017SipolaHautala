import React, { Component } from "react";
import GraphComponent from "../Graph/GraphComponent";

class GraphsContainerComponent extends Component {

  shouldComponentUpdate(){

    return this.props.RenderChart;
    
  }

  render() {
    
    const {ChartDataValues,TickInterval} = this.props;

    return (
      <div className="GraphsContainer">
      <GraphComponent ChartDataValues={ChartDataValues} TickInterval={TickInterval} ChartTypePolar = {false}/>
      </div>
    );
  }
}

export default GraphsContainerComponent;
