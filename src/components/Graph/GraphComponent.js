
import React, { Component } from 'react'
const ReactHighcharts = require('react-highcharts'); 
/*var HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);*/

class Graph extends Component {
   
    render () {

    let config = {  
        chart: {
            polar: true,
            type: 'column',
            backgroundColor:"transparent",
            width:500,
            height:500,
            marginTop:120
        },
    
        title: {
            text: ''
        },
    
        subtitle: {
            text: ''
        },
    
        pane: {
            size: '85%'
        },
    
        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 0,
            layout: 'vertical',
            floating:true,
            margin:30
        },
    
        xAxis: {
            tickmarkPlacement: 'on'
        },
    
        yAxis: {
            min: 0,
            endOnTick: false,
            showLastLabel: true,
            title: {
                text: ''
            },
            labels: {
                
            },
            reversedStacks: false
        },
    
        tooltip: {
            valueSuffix: '*'
        },

        series: this.props.ChartData,
    
        plotOptions: {
            series: {
                stacking: 'normal',
                shadow: false,
                groupPadding: 0,
                pointPlacement: 'on'
            }
        }
    };
        
        return (
            <div className="Graph">
            <ReactHighcharts config={config}/>
            </div>
        )
    }
}

export default Graph;
