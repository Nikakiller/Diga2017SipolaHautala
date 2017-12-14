import React, { Component } from "react";
import GraphComponent from "../Graph/GraphComponent";

class GraphsContainerComponent extends Component {

  shouldComponentUpdate(){

    return this.props.RenderChart;
    
  }

  render() {
    
    const {ChartData} = this.props;

    return (
      <div className="GraphsContainer">
      <GraphComponent ChartData={ChartData}/>
      </div>
    );
  }
}

export default GraphsContainerComponent;
