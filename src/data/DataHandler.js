import axios from "axios";

let areaLevelData = [];
let areaData =[];
let allData = [];

function getAreaLevelData(ID) {

  let httpAddressAreaLevel = 'https://melatupa.azurewebsites.net/regionLevels';
  
      return new Promise((resolve, reject) => {
        axios.get(httpAddressAreaLevel).then(response => {
          
                  areaLevelData = response.data;
                  resolve(areaLevelData);
          
                }).catch(error =>{
        
                  reject(error);
          
                });
      }); 
}

function getAreaData(ID) {

  let httpAddressArea = 'https://melatupa.azurewebsites.net/regionLevels/'+ID+'/regions';

  return new Promise((resolve, reject) => {
    axios.get(httpAddressArea).then(response => {
      
              areaData = response.data;
              resolve(areaData);
      
            }).catch(error =>{
      
              console.log("error: ",error);
              reject(error);
      
            });
  });
}

function getScenarioAndIndicatorData(ScenarioID,RegionID){

  let httpAddressAllData = 'https://melatupa.azurewebsites.net/scenarioCollection/'+ScenarioID+'/region/'+RegionID;

  return new Promise((resolve, reject) => {
    axios.get(httpAddressAllData).then(response => {

              allData = response.data;
              resolve(allData);
      
            }).catch(error =>{
      
              console.log("error: ",error);
              reject(error);
      
            });
  });
}

export default {
  getAreaLevelData,
  getAreaData,
  getScenarioAndIndicatorData,
 
}
