
import React, { Component } from 'react'

class SingleTimePeriodComponent extends Component {
    render () {

        const{yearStart,yearEnd, ItemSelectionClicked,id} = this.props;
        let TimePeriod = (yearStart+" (-"+yearEnd+")");

        return (
            <div>
               <div><a href="#" onClick={() => ItemSelectionClicked(TimePeriod,id)}>{TimePeriod}</a> </div>
            </div>
        )
    }
}

export default SingleTimePeriodComponent