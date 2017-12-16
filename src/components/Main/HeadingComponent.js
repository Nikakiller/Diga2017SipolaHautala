
import React, { Component } from 'react'

class HeadingComponentH4 extends Component {
    render () {

        const{Title,DisplayH3} = this.props;
        let heading = null;

        if(Title === "METSÄMITTARI"){
            heading = (<div><h1 className="h1">{Title}</h1></div>)
        } 
        
        else if(Title==="Skenaarioiden valinta" || Title==="Indikaattoreiden valinta"){

            heading = (<div><h3 className="h3">{Title}</h3></div>)
        }
        else{
            if(DisplayH3){
            heading = (<div className="Chart h3"><h3 className="h3">{Title}</h3></div>)
            } else{
                heading = (<div><h4 className="h4">{Title}</h4></div>)
            }
        }
        return (    
            <div className="Headings">
            {heading}
            </div>
        )
    }
}

export default HeadingComponentH4