import React, { Component } from 'react';
import {Col} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'

class Photo extends Component{
    // constructor(props) {
	// 	super(props);
    // }
    render(){
        let check = "";
        if(this.props.status === "success"){
            check = <FontAwesomeIcon icon={faCheckCircle}/>;
        }else if(this.props.status === "loading"){
            check = <FontAwesomeIcon icon={faSpinner} spin/>;
        }
        return(
            <Col md={4}>
                <img src={this.props.src} className="img-thumbnail" alt="upload_photo"/>
                <span className="success-show">{check}</span>
            </Col>
        )
    }
}

export default Photo;