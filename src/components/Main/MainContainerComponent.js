import React, { Component } from "react";
import GraphsContainerComponent from "../Graph/GraphsContainerComponent";
import MultiChoiseComponent from "../Scenario/MultiChoiceComponent";
import HeadingComponent from "../Main/HeadingComponent";
import DropdownComponent from "../Scenario/DropdownComponent";
import "../Main/MainContent.css";
import "../Main/MainContainer.css";
import Defaults from '../defaults/Defaults';

class MainContainerComponent extends Component {
  render() {

    const {
           RenderChart,
           ShowChartHeadings,
           ChartDataValues,
           TickInterval,
           ChangeChartType,
           ChartType,

           AreaLevelValues,AreaLevelSelectionClicked,
           AreaDataValues,AreaSelectionClicked,
           ScenarioDataValues,ScenarioSelectionClicked,
           ScenariosData,
           TimePeriodDataValues,TimePeriodSelectionClicked,
           IndicatorsDataTreeProduction,
           IndicatorsDataCollectionProducts,IndicatorsDataDiversity,
           IndicatorsDataCarbon,IndicatorsDataOthers,
           MultiChoiseItemClicked} = this.props;

          let ChartDetails = null;
          if(ShowChartHeadings){
             ChartDetails =     
             (  
              <div>
               <HeadingComponent Title={AreaDataValues[1].areaSelected} DisplayH3={true}/>
               <HeadingComponent Title={ScenarioDataValues[1].scenarioSelected} DisplayH3={true}/>
               <HeadingComponent Title={TimePeriodDataValues[1].timePeriodSelected} DisplayH3={true} />
               </div>
             ) 
          }

    return (
      <div className="MainContainer">

        <HeadingComponent Title="METSÄMITTARI"/>  

        <div className="Row">
          <div className="Column">
            <div className="ScenarioContainer">
          
            <HeadingComponent   Title="Skenaarioiden valinta"/>

            <div className="AreaLevelContainer">
            <HeadingComponent   Title="Aluetaso" />
            <DropdownComponent  ItemSelectionClicked = {AreaLevelSelectionClicked}
                                DataArray = {AreaLevelValues[0].areaLevelData}
                                ItemSelected = {AreaLevelValues[1].areaLevelSelected}
                                CreateTimeDropdown={false}
                                />

            <HeadingComponent   Title="Alue"/>
            <DropdownComponent  DataArray = {AreaDataValues[0].areaData} 
                                ItemSelectionClicked = {AreaSelectionClicked}
                                ItemSelected = {AreaDataValues[1].areaSelected}
                                CreateTimeDropdown={false}/>

            <HeadingComponent  Title="Skenaariokokoelma"/>
            <DropdownComponent  DataArray={ScenarioDataValues[0].scenarioData} 
                                ItemSelected={ScenarioDataValues[1].scenarioSelected}
                                ItemSelectionClicked={ScenarioSelectionClicked}
                                CreateTimeDropdown={false}
                                />
            </div>
    
          <div className="TimeScenarios">
            <HeadingComponent Title="Ajankohta" />
            <DropdownComponent DataArray = {TimePeriodDataValues[0].timeData}
                               ItemSelected = {TimePeriodDataValues[1].timePeriodSelected}
                               ItemSelectionClicked = {TimePeriodSelectionClicked}
                               CreateTimeDropdown={true}
                               />
    
            <HeadingComponent  Title="Skenaariot"/>
            <MultiChoiseComponent ChoiseData = {ScenariosData}
                                  MultiChoiseItemClicked={MultiChoiseItemClicked}
                                  CallingID ={Defaults.ScenariosSelectionID}/>
          </div>
            </div>  
          </div>

          <div className="Column">
            <div className="GraphsContainer">
             
              {ChartDetails}
              <GraphsContainerComponent RenderChart={RenderChart} ChartDataValues={ChartDataValues}
                                        TickInterval={TickInterval} ChangeChartType={ChangeChartType}
                                        ChartType={ChartType}/>    
            </div>
          </div>

          <div className="Column">
            <div className="IndicatorContainer">
            <HeadingComponent Title="Indikaattoreiden valinta"/>

          <div className="IndicatorLevelContainer">
              <HeadingComponent Title="Puutuotanto*" />
              <MultiChoiseComponent ChoiseData = {IndicatorsDataTreeProduction}
                                    MultiChoiseItemClicked={MultiChoiseItemClicked}
                                    CallingID={Defaults.TreeID}/>
              
              <HeadingComponent Title="Keruutuotteet" />
              <MultiChoiseComponent ChoiseData = {IndicatorsDataCollectionProducts}
                                    MultiChoiseItemClicked={MultiChoiseItemClicked}
                                    CallingID={Defaults.CollectionProductsID}/>

              <HeadingComponent Title="Monimuotoisuus" />
              <MultiChoiseComponent ChoiseData = {IndicatorsDataDiversity}
                                    MultiChoiseItemClicked={MultiChoiseItemClicked}
                                    CallingID={Defaults.DiversityID}/>

              <HeadingComponent Title="Hiili" />
              <MultiChoiseComponent ChoiseData = {IndicatorsDataCarbon}
                                    MultiChoiseItemClicked={MultiChoiseItemClicked}
                                    CallingID={Defaults.CarbonID}/>

              <HeadingComponent Title="Muut" />
              <MultiChoiseComponent ChoiseData = {IndicatorsDataOthers}
                                    MultiChoiseItemClicked={MultiChoiseItemClicked}
                                    CallingID={Defaults.OthersID} />

            </div>
                                    
           </div> 
          </div>
          </div>
      </div>
    );
  }
}

export default MainContainerComponent;
