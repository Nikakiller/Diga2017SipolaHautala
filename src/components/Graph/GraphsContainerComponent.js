import React, { Component } from "react";
import GraphComponent from "../Graph/GraphComponent";
import ChartTypeComponent from "../Graph/ChartTypeComponent";

class GraphsContainerComponent extends Component {

  shouldComponentUpdate(){
    return this.props.RenderChart;
  }

  render() {
    
    const {ChartDataValues,TickInterval,ChangeChartType,ChartType} = this.props;

    return (
      <div className="GraphsContainer">
      <GraphComponent ChartDataValues={ChartDataValues} TickInterval={TickInterval} ChartTypePolar={ChartType} />
      <ChartTypeComponent ChangeChartType={ChangeChartType}/>
      </div>
    );
  }
}

export default GraphsContainerComponent;
