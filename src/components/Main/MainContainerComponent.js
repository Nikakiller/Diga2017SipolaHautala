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
           ChartData,
           AreaLevelSelectionClicked,AreaLevelData,AreaLevelSelected,
           AreaSelectionClicked,AreaSelected,AreaData,
           ScenarioSelectionClicked,ScenarioSelected,ScenarioData, 
           ScenariosData,
           TimePeriodsData, TimePeriodSelected,TimePeriodSelectionClicked,
           IndicatorsDataTreeProduction,
           IndicatorsDataCollectionProducts,IndicatorsDataDiversity,
           IndicatorsDataCarbon,IndicatorsDataOthers,
           MultiChoiseItemClicked} = this.props;

          let ChartDetails = null;
          if(ShowChartHeadings){
             ChartDetails =     
             (  
              <div>
               <HeadingComponent Title={AreaSelected}/>
               <HeadingComponent Title={ScenarioSelected}/>
               <HeadingComponent Title={TimePeriodSelected} />
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

            <HeadingComponent   Title="Aluetaso" />
            <DropdownComponent  ItemSelectionClicked = {AreaLevelSelectionClicked}
                                DataArray = {AreaLevelData}
                                ItemSelected = {AreaLevelSelected}
                                CreateTimeDropdown={false}/>

            <HeadingComponent   Title="Alue"/>
            <DropdownComponent  DataArray = {AreaData} 
                                ItemSelectionClicked = {AreaSelectionClicked}
                                ItemSelected = {AreaSelected}
                                CreateTimeDropdown={false}/>

            <HeadingComponent  Title="Skenaariokokoelma"/>
            <DropdownComponent  DataArray={ScenarioData} 
                                ItemSelected={ScenarioSelected}
                                ItemSelectionClicked={ScenarioSelectionClicked}
                                CreateTimeDropdown={false}/>
    
          <div className="TimeScenarios">
            <HeadingComponent Title="Ajankohta" />
            <DropdownComponent DataArray = {TimePeriodsData}
                               ItemSelected = {TimePeriodSelected}
                               ItemSelectionClicked = {TimePeriodSelectionClicked}
                               CreateTimeDropdown={true}/>
    
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
              <GraphsContainerComponent RenderChart={RenderChart} ChartData={ChartData}/>    
            </div>
          </div>

          <div className="Column">
            <div className="IndicatorContainer">
            <HeadingComponent Title="Indikaattoreiden valinta"/>

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
    );
  }
}

export default MainContainerComponent;
