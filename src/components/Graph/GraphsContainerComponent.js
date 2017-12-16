import React, { Component } from "react";
import GraphComponent from "../Graph/GraphComponent";
import SelectChartType from "../Graph/SelectChartType";

class GraphsContainerComponent extends Component {

  shouldComponentUpdate(){

    return this.props.RenderChart;
    
  }

  render() {
    
    const {ChartDataValues,TickInterval} = this.props;

    return (
      <div className="GraphsContainer">
      <GraphComponent ChartDataValues={ChartDataValues} TickInterval={TickInterval}/>
      <SelectChartType />
      </div>
    );
  }
}

export default GraphsContainerComponent;
