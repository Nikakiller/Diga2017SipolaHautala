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

      areaLevelData: [],
      areaLevelSelected: "Valitse aluetaso",

      areaData: [],
      areaSelected: "Valitse alue",

      selectedAreaID:"",
      scenarioData : [],

      scenarioSelected:"Valitse skenaario",
      selectedScenarioID:"",

      timeData:[],
      timePeriodSelected:"Valitse ajankohta",

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

      RenderChart:true,
      ShowChartHeadings:true,

      values:[],
      ChartData:[{"data":[0.13],"type":"column","name":"Hakkuu"},{"data":[0.26],"type":"column","name":"Mustikkasato"},
                {"data":[0.54],"type":"column","name":"Hiili"},{"data":[0.78],"type":"column","name":"Muut"}]
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
        this.setState({ areaLevelData: areaLevelData});
      })
      .catch(error => {
        console.log("Failed", error);
      });
  }

  componentDidUpdate(){

     if(this.state.IndicatorID!=="" && this.state.TimePeriodID !=="" && this.state.ScenarioID !=""){
        this.searchValuesFromData();
     }
  }

  //Setting data not found fields
  setAllDataNotFound(){

      /*this.state.indicatorsDataCollectionsProducts[0] = {id:0, name: Defaults.DataNotAvailable};
      this.state.indicatorsDataDiversity[0] = {id:1,name:Defaults.DataNotAvailable};
      this.state.indicatorsDataCarbon [0]= {id:2, name: Defaults.DataNotAvailable};
      this.state.indicatorsDataOthers [0]= {id:3, name: Defaults.DataNotAvailable};*/

      this.setState({
      indicatorsDataTreeProduction:[],
      indicatorsDataCarbon:[],
      indicatorsDataCollectionsProducts:[],
      indicatorsDataDiversity:[],
      indicatorsDataOthers:[]});
  }

  //Function AreLevelSelectionClicked
  AreaLevelSelectionClicked(AreaLevel) {

    this.setState({areaLevelSelected:AreaLevel.name});

    if(AreaLevel.name===Defaults.AreaLevelOneName){

      DataHandler.getAreaData(Defaults.AreaLevelOneID)
      .then(areaData => {
        this.setState({ areaData: areaData });
      })
      .catch(error => {
        console.log("Failed", error);
      });
    } 
    
    else{
  
      DataHandler.getAreaData(Defaults.AreaLevelTwoID)
      .then(areaData => {
        this.setState({ areaData: areaData });
      })
      .catch(error => {
        console.log("Failed", error);
      });
    }

  }

  //Function AreaSelectionClicked
  AreaSelectionClicked(Area){

    for(var i =0; i < this.state.areaData.length;i++){

        if(this.state.areaData[i].name===Area.name){
            this.setState({scenarioData:this.state.areaData[i].scenarioCollections,areaSelected:Area.name,
            selectedAreaID:this.state.areaData[i].id });
       }
    }
  }

  //Function ScenarioSelectionClicked
  ScenarioSelectionClicked(Scenario){
    
   this.setAllDataNotFound()

    var ScenarioId = null;
    var AreaDataId = null;

    this.setState({scenarioSelected:Scenario.name});

    for(var i=0; i < this.state.areaData.length;i++){
      
          if(this.state.areaSelected===this.state.areaData[i].name){
      
               for(var l=0; l < this.state.areaData[i].scenarioCollections.length;l++){
      
                 if(Scenario.name===this.state.areaData[i].scenarioCollections[l].name){
                                
                         ScenarioId = this.state.areaData[i].scenarioCollections[l].id;
                         AreaDataId = this.state.areaData[i].id;
                         break;
                     }
                 }                        
             }
        }  

          DataHandler.getScenarioAndIndicatorData(ScenarioId,AreaDataId).then(allData => {

            console.log(allData);

            if(allData[0].values.length >0){

              for(var i = 0; i < allData[0].indicatorCategories.length;i++){

              if(allData[0].indicatorCategories[i].name===Defaults.TreeProduction){         
                 this.setState({indicatorsDataTreeProduction:allData[0].indicatorCategories[i].indicators});
              } 

              if(allData[0].indicatorCategories[i].name===Defaults.Diversity){       
              this.setState({indicatorsDataDiversity:allData[0].indicatorCategories[i].indicators});
              }

              if(allData[0].indicatorCategories[i].name===Defaults.CollectionProducts){  
              this.setState({indicatorsDataCollectionsProducts:allData[0].indicatorCategories[i].indicators});
              }

              if(allData[0].indicatorCategories[i].name===Defaults.Carbon){             
              this.setState({indicatorsDataCarbon:allData[0].indicatorCategories[i].indicators});
              }
              
              if(allData[0].indicatorCategories[i].name===Defaults.Others){             
                this.setState({indicatorsDataOthers:allData[0].indicatorCategories[i].indicators});
              }
          }
             this.setState({scenariosData: allData[0].scenarios,timeData:allData[0].timePeriods,values:allData[0].values});
          }
  
          }).catch(error => {
          console.log("Failed", error);
        });
  }

  //Function TimePeriodSelectionClicked
  TimePeriodSelectionClicked(TimePeriod, ID){
    this.setState({timePeriodSelected:TimePeriod, TimePeriodID:ID});  
  }

  MultiChoiseItemClicked(CallingID, ID, Name){

      this.setState({IndicatorSelected:Name});

      switch(CallingID){
        case Defaults.ScenariosSelectionID:{
          console.log("Calling ID Scenario: ", ID);
          this.setState({ScenarioID:ID});
          break;
        }
        case Defaults.TreeID:{
          console.log("Calling ID Tree: ", ID);
          this.setState({IndicatorID:ID});
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
      }
  }

  searchValuesFromData(){

    for(var i=0; i < this.state.values.length;i++){

          if(this.state.values[i].timePeriodId === this.state.TimePeriodID
             && this.state.values[i].scenarioId === this.state.ScenarioID
             && this.state.values[i].indicatorId === this.state.IndicatorID){
            
            this.state.ChartData.push({data:[this.state.values[i].value],type:"column",name:this.state.IndicatorSelected});
              
            break;
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
          ChartData = {this.state.ChartData}

          AreaLevelSelectionClicked={this.AreaLevelSelectionClicked}
          AreaLevelData={this.state.areaLevelData}
          AreaLevelSelected = {this.state.areaLevelSelected}

          AreaData = {this.state.areaData}
          AreaSelectionClicked = {this.AreaSelectionClicked}
          AreaSelected ={this.state.areaSelected}
          
          ScenarioData = {this.state.scenarioData}
          ScenarioSelectionClicked = {this.ScenarioSelectionClicked}
          ScenarioSelected = {this.state.scenarioSelected}
          
          ScenariosData = {this.state.scenariosData}
      
          TimePeriodsData = {this.state.timeData}
          TimePeriodSelectionClicked = {this.TimePeriodSelectionClicked}
          TimePeriodSelected ={this.state.timePeriodSelected}

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
