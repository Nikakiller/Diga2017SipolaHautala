
function getPolarConfig(ChartDataValues,tickInterval){

    let data = ChartDataValues[0].ChartData;
    let config = {  
        chart: {
            polar: true,
            backgroundColor:"transparent",
            height:510,
            width:510,
            plotBorderWidth: null,
            margin: [10, 10, 10, 10],
            spacingTop: 0,
            spacingBottom: 0,
            spacingLeft: 0,
            spacingRight: 0,
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
        
        legend: {
            enabled: true,
            floating: true,
            verticalAlign: 'top',
            align:'right',
            y:0,
            margin:60
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

    return config;
}

    function getColumnConfig(ChartDataValues,tickInterval){
        
        let data = ChartDataValues[0].ChartData;
        let category = ChartDataValues[2].ChartDataIndicatorNames;

        let config = {  
            chart: {
                type: 'column',
                backgroundColor:"transparent",
                width: 510,
                height:510
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories:category,
                crosshair: true,
                reversedStacks:true,
                
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                },
             
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:5">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                },
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                innerSize: '30%',
                animation: {
                    duration: 1500
                },
                type: 'column',
                name:"Valitut indikaattorit",
                data: data,
                pointPlacement: 'between',
                color:"#04B431",
                showInLegend:false
            }],

            credits:false,
            
    
        };

    return config;
}

export default{

    getPolarConfig,
    getColumnConfig,

}