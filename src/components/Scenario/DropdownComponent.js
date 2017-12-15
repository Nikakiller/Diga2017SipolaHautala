
import React, { Component } from 'react'
import SingleItemComponent from "../Scenario/SingleItemComponent";
import SingleItemTimePeriodComponent from "../Scenario/SingleItemTimePeriodComponent";

class DropdownComponent extends Component {
 
    render () {

        const{DataArray,ItemSelected,ItemSelectionClicked,CreateTimeDropdown} = this.props;
        
        return (
            <div className="btn-group">
            <button type="button" className="btn btn-success btn-lg">{ItemSelected}</button>
            <button type="button" className="btn btn-success btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" 
            >
            <span className="caret"></span>
            <span className="sr-only">Toggle Dropdown</span>
            </button>
                <ul className="dropdown-menu">
                  {DataArray.map(item => CreateTimeDropdown?<SingleItemTimePeriodComponent key={item.id}{...item} 
                  ItemSelectionClicked={ItemSelectionClicked}/>:<SingleItemComponent key={item.id}{...item} 
                  ItemSelectionClicked={ItemSelectionClicked}/>)}
                </ul>
         </div>
        )
    }
}

export default DropdownComponent