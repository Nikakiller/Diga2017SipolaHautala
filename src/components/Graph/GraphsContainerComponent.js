import React, { Component } from "react";
import GraphComponent from "../Graph/GraphComponent";

class GraphsContainerComponent extends Component {

  shouldComponentUpdate(){

    return this.props.RenderChart;
    
  }

  render() {
    return (
      <div className="GraphsContainer">
      <GraphComponent />
      </div>
    );
  }
}

export default GraphsContainerComponent;
