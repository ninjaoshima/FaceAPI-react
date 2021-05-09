import React, { Component } from 'react';
import Upload from './Upload';
import ReceiveList from './ReceiveList';

class Face extends Component{
    constructor(props) {
		super(props);

		this.state = {
            username: this.props.location.state,
            nameListCount: -1,
        };
        // console.log(this.props.location.state);
    }

    nameListCount(count){
        console.log(count);
        this.setState({
            nameListCount:count,
        })
    }

    
    render(){
        return(
            <div>
                <Upload onListCount={(e) => this.nameListCount(e)}/>
                <ReceiveList nameListCount={this.state.nameListCount}/>
            </div>
        )
    }
}

export default Face;