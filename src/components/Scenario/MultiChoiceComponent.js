
import React, { Component } from 'react'
import ItemSingleBasicChoise from "../Scenario/ItemSingleBasicChoiseComponent";

class MultiChoiceComponent extends Component {

    render () {

        const{ChoiseData,MultiChoiseItemClicked, CallingID} = this.props;
    
        return (
            <div className="ListContainer">
                <ul className="Scenarios">
                {ChoiseData.map(item => <ItemSingleBasicChoise  key={item.id}{...item} MultiChoiseItemClicked={MultiChoiseItemClicked}
                CallingID={CallingID}/>)}
                </ul>
            </div>
        )
    }
}

export default MultiChoiceComponent
