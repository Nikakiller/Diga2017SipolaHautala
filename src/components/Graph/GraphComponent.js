
import React, { Component } from 'react'
import ChartConfigs from "../Graph/ChartConfigs";
let ReactHighcharts = require('react-highcharts'); 
/*var HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);*/


class Graph extends Component {
   
    render () {
    
    const{TickInterval,ChartDataValues,ChartTypePolar} = this.props;
    var config = null;
    
    if(ChartTypePolar){   
        config= ChartConfigs.getPolarConfig(ChartDataValues,TickInterval)
    } else{

        config = ChartConfigs.getColumnConfig(ChartDataValues,TickInterval);
    }

        return (
            <div className="Graph">
            <ReactHighcharts config={config}/>
            </div>
        )
    }
}

export default Graph;
