import React, { Component } from 'react';
// import ReceiveImage from './ReceiveImage';
import {Container, Row, Col} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner,faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import globals from '../App/Global';

class ReceiveList extends Component{
    constructor(props) {
		super(props);

		this.state = {
            username: "",
            listCount: this.props.nameListCount,
            faceImages:[],
            history:[],
            isLoding: false,
            count:0,
            index:0,
            allowcheck: false,
            reqFolder:[],
        };
        // console.log(this.props.location.state);
    }

    componentWillReceiveProps(nextprops)
    {
        // console.log("next", nextprops)
        this.setState({
            listCount: nextprops.nameListCount,
            allowcheck: true,
        },()=>{
            // this.imageAPI();
            this.getAllowCheck();
        })
        
    }

    async getAllowCheck(){
        if(!this.state.allowcheck)
            return;
        let result = await fetch(globals.backend + "/getallowkey",{
            method:"get",
            headers:{
                "Content-Type": "application/json",
                "Cache-Control": 'no-cache'
            },            
        }).then(res => res.json());

        if(result.status.allowkey === 1){
            this.setState({
                allowcheck:false,
                reqFolder: result.status.request
            },()=>{
                this.imageAPI(0)
            })
        }else{
            setTimeout(() => {
                this.getAllowCheck();
            }, 2000);
        }
        
    }


    async imageAPI(index){
        // console.log(this.state.listCount);
        if(this.state.listCount/1 < 1){
            return;
        }
            
        // _self = this;
        let result = await fetch(globals.backend + "/getimagecount?index=" + index,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Cache-Control": 'no-cache'
            },
        }).then(res => res.json())
        // console.log(result.count);
        if(index === 0){
            let images=[];
            this.setState({
                faceImages: images,
            })
            let his = [];
            this.setState({
                history: his
            })
        }
        
        this.getImage(result.count, index);

    }

    async getImage(count, folder_count)
    {
        if(count < 1){
            return;
        }
        this.setState({
            count: count
        });
        for(var i = 0; i < count; i++)
        {
            this.setState({
                index:i,
                isLoding: true
            })
            let result = await fetch(globals.backend + "/getimages",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Cache-Control": 'no-cache'
                },
                body:JSON.stringify({
                    index: i
                })
            }).then(res=> res.json())
            // console.log(result);
            if(result.src !== "Failed"){
                let images = [...this.state.faceImages];
                images.push(result.src);
                // this.setState({
                //     faceImages: images
                // })
                let his = [...this.state.history];
                his.push(...result.history);
                this.setState({
                    history: his,
                    faceImages: images
                })
            }
            this.setState({
                isLoding: false
            })
        }

        if(folder_count >= this.state.reqFolder.length - 1){
            this.setState({
                count : -111,
                allowcheck:true
            },()=>{
                setTimeout(()=>{
                    this.getAllowCheck();
                }, 2000)
            })
        }else{
            console.log(folder_count);
            this.imageAPI(folder_count + 1);
        }

        
    }
    
    render(){
        let photoList = this.state.faceImages.map((image, index)=>{
            // return <Photo src={image} status={""} key={index}/>
            return (
                <Col md={12} key={index}>
                    <img src={image} key={index} alt="faceImgae" className="photo-thumbnail"/>
                </Col>
            )
        })

        let history = this.state.history.map((his, index) => {
            return(
                <li className="list-group-item" key={index}>{his}</li> 
            )
        })
        let loding_div ="";
        if(this.state.count > 0 && this.state.isLoding){
            loding_div = (
                <div className="receive-loding">
                    <span>{this.state.index + 1}/{this.state.count} Loding......  <FontAwesomeIcon icon={faSpinner} spin/></span>
                    
                </div>
            )
        }

        if(this.state.count === -111){
            loding_div = (
                <div className="receive-loding">
                    <span>Complete.....  <FontAwesomeIcon icon={faCheckCircle}/></span>
                    
                </div>
            )
        }
        return(
            <Container className="upload-container">
                <Row>
                    <Col xs={12} md={8}>
                        <Row>
                            <Col md={8}>
                                <h3 className="page-header mb-4">Receive Photos Page</h3>
                                  
                            </Col>
                            <Col md={4}>
                                {loding_div}
                            </Col>
                        </Row>
                        <Row>
                            {photoList}
                        </Row>
                    </Col>
                    <Col  xs={12} md={4}>
                        <h3 className="page-header mb-4">Recognation List</h3>
                        <ul className="list-group" style={{overflow: "auto", marginTop: 11}}>
                            {history}
                        </ul>
                    </Col> 
                </Row>
            </Container>
        )
    }
}

export default ReceiveList;