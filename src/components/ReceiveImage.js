import React, { Component } from 'react';
// import Upload from './Upload';

class ReceiveImage extends Component{
    constructor(props) {
		super(props);

		this.state = {
			username: "this.props.location.state"
        };
        // console.log(this.props.location.state);
    }

    
    render(){
        return(
            <div>
                ReceiveImage
            </div>
        )
    }
}

export default ReceiveImage;