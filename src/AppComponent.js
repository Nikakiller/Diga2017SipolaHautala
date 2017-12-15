import React, { Component } from "react";
import MainContainerComponent from "./components/Main/MainContainerComponent";
import DataHandler from "./data/DataHandler";
import Defaults from "./components/defaults/Defaults";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class AppComponent extends Component {

  //Constructor
  constructor(props) {
    super(props);

    this.state = {

      //Dropdown menu data
      AreaLevelValues:[{areaLevelData:[]},{areaLevelSelected:"Valitse aluetaso"}],
      AreaDataValues:[{areaData:[]},{areaSelected:"Valitse alue"},{selectedAreaID:""}],
      ScenarioDataValues:[{scenarioData:[]},{scenarioSelected:"Valitse skenaario"},{scenarioID:""}],
      TimePeriodDataValues:[{timeData:[]},{timePeriodSelected:"Valitse ajankohta"}],

      //All the indicators
      scenariosData:[{id:0,name:Defaults.DataNotAvailable}],
      indicatorsDataTreeProduction:[{id:0,name:Defaults.DataNotAvailable}],
      indicatorsDataCollectionsProducts:[{id:0,name:Defaults.DataNotAvailable}],
      indicatorsDataDiversity:[{id:0,name:Defaults.DataNotAvailable}],
      indicatorsDataCarbon:[{id:0,name:Defaults.DataNotAvailable}],
      indicatorsDataOthers:[{id:0,name:Defaults.DataNotAvailable}],
    
      //Single scenario and indicator query
      TimePeriodID:"",
      IndicatorID:"",
      ScenarioID:"",
      IndicatorSelected: "",

      //Chart options
      RenderChart:true,
      ShowChartHeadings:true,
      TickInterval:36,

      //All selection values and chart related data
      values:[],
      ChartDataValues:[{ChartData:[]},{ChartDataID:[]}]

    };

    //Click handlers
    this.AreaLevelSelectionClicked = this.AreaLevelSelectionClicked.bind(this);
    this.AreaSelectionClicked = this.AreaSelectionClicked.bind(this);
    this.ScenarioSelectionClicked = this.ScenarioSelectionClicked.bind(this);
    this.TimePeriodSelectionClicked = this.TimePeriodSelectionClicked.bind(this);
    this.MultiChoiseItemClicked = this.MultiChoiseItemClicked.bind(this);
  }

  //Lifecycle methods
  componentDidMount() {
    //Setting up the initial data and selections
    DataHandler.getAreaLevelData()
      .then(areaLevelData => {
        const Data = this.state.AreaLevelValues;
        Data[0].areaLevelData = areaLevelData;
        this.setState({AreaLevelValues:Data});
      })
      .catch(error => {
        console.log("Failed", error);
      });
  }

  componentDidUpdate(){

     //Checking when component updates that is it time to render the chart
      if(this.state.ScenarioID !=="" && this.state.TimePeriodID!=="" && this.state.IndicatorID!==""){
        this.chartDataHandler();
      }
  }

  //Setting data not found fields
  setAllDataNotFound(){
      this.setState({
      indicatorsDataTreeProduction:[],
      indicatorsDataCarbon:[],
      indicatorsDataCollectionsProducts:[],
      indicatorsDataDiversity:[],
      indicatorsDataOthers:[]});
  }

  //Function AreLevelSelectionClicked
  AreaLevelSelectionClicked(AreaLevel) {

    const Data = this.state.AreaLevelValues;
    Data[1].areaLevelSelected = AreaLevel.name;
    this.setState({AreaLevelValues: Data});

    if(AreaLevel.name===Defaults.AreaLevelOneName){
      DataHandler.getAreaData(Defaults.AreaLevelOneID)
      .then(areaData => {
        const Data = this.state.AreaDataValues;
        Data[0].areaData = areaData;
        this.setState({AreaDataValues:Data});
      })
      .catch(error => {
        console.log("Failed", error);
      });
    }   else{
      DataHandler.getAreaData(Defaults.AreaLevelTwoID)
      .then(areaData => {
        const Data = this.state.AreaDataValues;
        Data[0].areaData = areaData;
        this.setState({AreaDataValues:Data});
      })
      .catch(error => {
        console.log("Failed", error);
      });
    }

  }

  //Function AreaSelectionClicked
  AreaSelectionClicked(Area){
    for(var i =0; i < this.state.AreaDataValues[0].areaData.length;i++){
        if(this.state.AreaDataValues[0].areaData[i].name===Area.name){

            let Data = this.state.AreaDataValues;
            let Scenario = this.state.ScenarioDataValues;

            Data[1].areaSelected = Area.name;
            Data[2].selectedAreaID = this.state.AreaDataValues[0].areaData[i].id;
            Scenario[0].scenarioData = this.state.AreaDataValues[0].areaData[i].scenarioCollections;
            console.log("Scenario: ",Scenario[0].scenarioData.length);
            this.setState({ScenarioDataValues: Scenario,AreaDataValues:Data});
       }
    }
  }

  //Function ScenarioSelectionClicked
  ScenarioSelectionClicked(Scenario,ID){
  
  console.log("Scenario: ", ID);
   this.setAllDataNotFound();

    var ScenarioId = null;
    var AreaDataId = null;

      for(var i=0; i < this.state.AreaDataValues[0].areaData.length;i++){
          if(this.state.AreaDataValues[1].areaSelected===this.state.AreaDataValues[0].areaData[i].name){
               for(var l=0; l < this.state.AreaDataValues[0].areaData[i].scenarioCollections.length;l++){
                 if(Scenario.name===this.state.AreaDataValues[0].areaData[i].scenarioCollections[l].name){        
                         ScenarioId = this.state.AreaDataValues[0].areaData[i].scenarioCollections[l].id;
                         AreaDataId = this.state.AreaDataValues[0].areaData[i].id;
                         console.log(ScenarioId);
                         break;
                     }
                 }                        
            }
        }

          DataHandler.getScenarioAndIndicatorData(ScenarioId,AreaDataId).then(allData => {
            if(allData[0].values.length >0){

              let sum = 0;
              let Tick = 0;
              let Time = this.state.TimePeriodDataValues;

              for(var i = 0; i < allData[0].indicatorCategories.length;i++){
              if(allData[0].indicatorCategories[i].name===Defaults.TreeProduction){         
                 this.setState({indicatorsDataTreeProduction:allData[0].indicatorCategories[i].indicators});
                 sum = sum + allData[0].indicatorCategories[i].indicators.length;
              } 
              if(allData[0].indicatorCategories[i].name===Defaults.Diversity){       
              this.setState({indicatorsDataDiversity:allData[0].indicatorCategories[i].indicators});
              sum = sum + allData[0].indicatorCategories[i].indicators.length;
              }
              if(allData[0].indicatorCategories[i].name===Defaults.CollectionProducts){  
              this.setState({indicatorsDataCollectionsProducts:allData[0].indicatorCategories[i].indicators});
              sum = sum + allData[0].indicatorCategories[i].indicators.length;
              }
              if(allData[0].indicatorCategories[i].name===Defaults.Carbon){             
              this.setState({indicatorsDataCarbon:allData[0].indicatorCategories[i].indicators});
              sum = sum + allData[0].indicatorCategories[i].indicators.length;
              }
              if(allData[0].indicatorCategories[i].name===Defaults.Others){             
                this.setState({indicatorsDataOthers:allData[0].indicatorCategories[i].indicators});
                sum = sum + allData[0].indicatorCategories[i].indicators.length;
              }
          }
              Tick = 360/sum;
              Time[0].timeData = allData[0].timePeriods;
              this.setState({scenariosData: allData[0].scenarios,TimePeriodDataValues:Time,values:allData[0].values,
              scenarioSelected:Scenario.name,TickInterval:Tick});
          }
          }).catch(error => {
          console.log("Failed", error);
        });
  }

  //Function TimePeriodSelectionClicked
  TimePeriodSelectionClicked(TimePeriod, ID){
    let Time = this.state.TimePeriodDataValues;
    Time[1].timePeriodSelected = TimePeriod;
    this.setState({TimePeriodDataValues:Time, TimePeriodID:ID});  
  }

  MultiChoiseItemClicked(CallingID, ID, Name){
        switch(CallingID){
        case Defaults.ScenariosSelectionID:{
          console.log("Calling ID Scenario: ", ID);
          this.setState({ScenarioID:ID});
          break;
        }
        case Defaults.TreeID:{
          console.log("Calling ID Tree: ", ID);
          this.setState({IndicatorID:ID,IndicatorSelected:Name});
          break;
        }
        case Defaults.DiversityID:{
          console.log("Calling ID Diversity: ", ID);
          this.setState({IndicatorID:ID});
          break;
        }
        case Defaults.CollectionProductsID:{
          console.log("Calling ID Collection ",ID);
          this.setState({IndicatorID:ID});
          break;
        }
        case Defaults.CarbonID:{
          console.log("Calling ID Carbon: ",ID);
          this.setState({IndicatorID:ID});
          break;
        }
        case Defaults.OthersID:{
          console.log("Calling ID Other: ",ID);
          this.setState({Indicator:ID});
          break;
        }

      default:{
          console.log("Default case");
        }
      }

    }
      
  chartDataHandler(){

    let addNewIndicator = true;

    for(var i=0; i < this.state.values.length;i++){

          if(this.state.values[i].timePeriodId === this.state.TimePeriodID
             && this.state.values[i].scenarioId === this.state.ScenarioID
             && this.state.values[i].indicatorId === this.state.IndicatorID){

              if(this.state.ChartDataValues[1].ChartDataID.length===0){  

              this.state.ChartDataValues[0].ChartData.push(this.state.values[i].value);
              this.state.ChartDataValues[1].ChartDataID.push(this.state.IndicatorID);
              this.setState({IndicatorID:""});
              break;

              } else {

                for(var l=0; l < this.state.ChartDataValues[1].ChartDataID.length;l++){

                  if(this.state.IndicatorID === this.state.ChartDataValues[1].ChartDataID[l]){

                        this.state.ChartDataValues[1].ChartDataID.splice(l, 1);
                        this.state.ChartDataValues[0].ChartData.splice(l,1);
                        this.setState({IndicatorID:""});
                        addNewIndicator = false;
                        break;
                  } 
                }
                       if(addNewIndicator){
                        this.state.ChartDataValues[0].ChartData.push(this.state.values[i].value);
                        this.state.ChartDataValues[1].ChartDataID.push(this.state.IndicatorID);
                        this.setState({IndicatorID:""});
                        break;
                       }
              }
         }
     }
  }

  //Render
  render() {
    return (
      <div className="App">
        <MainContainerComponent

          RenderChart = {this.state.RenderChart}
          ShowChartHeadings = {this.state.ShowChartHeadings}
          ChartDataValues = {this.state.ChartDataValues}
          TickInterval = {this.state.TickInterval}

          AreaLevelValues = {this.state.AreaLevelValues}
          AreaLevelSelectionClicked={this.AreaLevelSelectionClicked}
     
          AreaDataValues = {this.state.AreaDataValues}
          AreaSelectionClicked = {this.AreaSelectionClicked}
       
          ScenarioDataValues = {this.state.ScenarioDataValues}
          ScenarioSelectionClicked = {this.ScenarioSelectionClicked}
        
          ScenariosData = {this.state.scenariosData}
      
          TimePeriodDataValues = {this.state.TimePeriodDataValues}
          TimePeriodSelectionClicked = {this.TimePeriodSelectionClicked}
        
          IndicatorsDataTreeProduction = {this.state.indicatorsDataTreeProduction}
          IndicatorsDataCollectionProducts = {this.state.indicatorsDataCollectionsProducts}
          IndicatorsDataDiversity = {this.state.indicatorsDataDiversity}
          IndicatorsDataCarbon = {this.state.indicatorsDataCarbon}
          IndicatorsDataOthers = {this.state.indicatorsDataOthers}

          MultiChoiseItemClicked={this.MultiChoiseItemClicked}/>

      </div>
    );
  }
}

export default AppComponent;
