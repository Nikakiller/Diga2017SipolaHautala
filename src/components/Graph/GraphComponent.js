
import React, { Component } from 'react'
let ReactHighcharts = require('react-highcharts'); 
var HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);

class Graph extends Component {
   
    render () {

    let config = {  
            chart: {
                polar: true,
                backgroundColor:"transparent",
                height:500,
                width:500
            },
            
            title: {
                text: ''
            },

            credits:"false",
        
            pane: {
                startAngle: 0,
                endAngle: 360
            },
        
            xAxis: {
                tickInterval: this.props.TickInterval,
                min: 0,
                max: 360,
                lineWidth:4,
                labels: {
                    formatter: function () {
                        return "Testi";
                    }
                }
            },
        
            yAxis: {
                min: 0,

            },
        
            plotOptions: {
                series: {
                    pointStart: 0,
                    pointInterval: this.props.TickInterval
                },
                column: {
                    pointPadding: 0,
                    groupPadding: 0
                }
            },
        
            series: [{
                type: 'column',
                name:"Valitut indikaattorit",
                data: this.props.ChartDataValues[0].ChartData, 
                pointPlacement: 'between',
                color: "Green",
            }] 
    };
        
        return (
            <div className="Graph">
            <ReactHighcharts config={config}/>
            </div>
        )
    }
}

export default Graph;
