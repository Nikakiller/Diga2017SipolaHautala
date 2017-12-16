
import React, { Component } from 'react'
let ReactHighcharts = require('react-highcharts'); 
var HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);

class Graph extends Component {
   
    render () {
    
    const{TickInterval,ChartDataValues} = this.props;

    var data = ChartDataValues[0].ChartData;
    let tickInterval = TickInterval;

    let config = {  
        chart: {
            polar: true,
            backgroundColor:"transparent",
            height:500,
            width:552,
            plotBorderWidth: null,
            margin: [0, 0, 0, 0],
            spacingTop: 0,
            spacingBottom: 0,
            spacingLeft: 0,
            spacingRight: 0
        },
        
        title: {
            text: ''
        },

        credits:"false",
    
        pane: {
            startAngle: 0,
            endAngle: 360,
            
        },
    
        xAxis: {
            tickInterval: tickInterval,
            min: 0,
            max: 360,
            lineWidth:3,
            labels:{
                enabled:false
            },
            lineWidth: 0,
            minorGridLineWidth: 0,
        },
    
        yAxis: {
            min: 0,
            lineWidth: 3,
            minorGridLineWidth: 0,
        },
    
        plotOptions: {
            series: {
                pointStart: 0,
                pointInterval: tickInterval,
            },
            dataLabels: {
                enabled: true,
                crop: false,
                overflow: 'none',
                padding: 50,
                useHTML: true,
                verticalAlign: 'middle',
                format: '<div class="wheel-label" style="color: {point.color}">{point.name}</div>',
                
                },
            states: {
                hover: {
                    enabled: true
                }
            },
            column: {
                pointPadding: 0,
                groupPadding: 0,
                borderWidth: 3
            },
        },
        
        series: [{
            innerSize: '30%',
            animation: {
                duration: 1500
            },
            type: 'column',
            name:"Indikaattorin arvo",
            data: data,
            pointPlacement: 'between',
            color:"#04B431"
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
