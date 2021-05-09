import React, { Component } from 'react';
import {Col} from 'reactstrap';

import Globals from '../../App/Global';
class NameList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            nameList:[]
        }
    }

    componentDidMount(e){
        this.getNameList()
    }

    componentWillReceiveProps(nextProps)
    {
        if(nextProps.reload === true){
            this.getNameList();
            this.props.onChangeListFlag(false);
        }
        
    }

    getNameList() {
        var xhr = new XMLHttpRequest();
        this.setState({
            isLoading: true,
        })
        xhr.open('get', Globals.backend + "/getnamelist", true);
        xhr.onload = function () {
            var nameData = JSON.parse(xhr.responseText);
            this.setState({
                nameList: nameData
            })
            this.setState({
                isLoading: false,
            })
            //this.getAllowCheck();
            this.props.onListCount(nameData.length);
        }.bind(this);
        xhr.send();
    }

    

    render(){
        // console.log('adfasdf');
        let nameList = this.state.nameList.map((name, index) =>{
            return <li className="list-group-item" key={index}>{name}</li>
        })
        if(this.state.isLoading){
            return(
                <Col md={12} style={{height: 317, marginTop: 11, display:'flex', justifyContent:'center', alignItems:'center' }}>
                    <img src="https://static.centro.org.uk/XnwmAssets/img/spinner.gif" alt="loading" style={{width: 75, height: 75}}/>
                </Col>
            )
        }
        return(
            <ul className="list-group" style={{height: 317, overflow: "auto", marginTop: 11}}>
                {nameList}
            </ul>
        )
    }
}

export default NameList;