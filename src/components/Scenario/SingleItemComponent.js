
import React, { Component } from 'react'

class SingleItemComponent extends Component {

    render () {
      
        const{name,ItemSelectionClicked} = this.props;
    
            return (
                    <div><a href="#" onClick={() => ItemSelectionClicked({name})}>{name}</a>  </div>
                    )
    }
}

export default SingleItemComponent