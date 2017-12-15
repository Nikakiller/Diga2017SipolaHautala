
import React, { Component } from 'react'

class SingleItemComponent extends Component {

    render () {
      
        const{name,ItemSelectionClicked,id} = this.props;
    
            return (
                    <div><a href="#" onClick={() => ItemSelectionClicked({name},{id})}>{name}</a>  </div>
                    )
    }
}

export default SingleItemComponent