import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap'
import Photo from '../containers/upload/Photo';
import NameList from '../containers/upload/NameList';
import globals from '../App/Global';
class Upload extends Component{
    constructor(props) {
		super(props);

		this.state = {
            photos:[],
            nameList:[],
            isNameLoding:false,
            listReload: false,
		};

		// this.update = this.update.bind(this);
		// this.changeRoute = this.changeRoute.bind(this);
	}
    readFile(e){
        e.preventDefault();
        let input = e.target;
        let counter = input.files.length;
        let photos = [];
        let self = this;
        // console.log(input.files);
        for(var x = 0; x < counter; x++){
            if(input.files && input.files[x]){
                var reader = new FileReader();
                
                reader.onload = function(e){
                    let group = {
                        src: e.target.result,
                        status: "nothing"
                    }
                    photos.push(group);
                    self.setState({
                        photos
                    })
                };

                reader.readAsDataURL(input.files[x])
            }
        }
        
    }

    updateName(e){
        e.preventDefault()

        let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
    }

    async addName(){
        // e.preventDefault()

        if(!this.state.addedName || this.state.addedName === ""){
            alert('Please Enter Name');
            return;
        }

        if(!this.state.photos || this.state.photos.length < 5){
            alert('You must upload at least 5 Images');
            return;
        }

        let res_id = await fetch(globals.backend + "/checkname",{
            method: 'POST',
            // credentials: 'include',
            headers:{
                "Content-Type": "application/json",
                "Cache-Control": 'no-cache'
            },
            body:JSON.stringify({
                name: this.state.addedName
            })
        }).then(response => response.json());

        // console.log(result);
        if(res_id.id === "Failed"){
            alert('Alread regesitered. Please type another name.');
            return;
        }
        let self = this;
        this.state.photos.forEach((photo, index) => {
            var photos = [...this.state.photos];
            photos[index].status = "loading";
            this.setState({
                photos: photos
            })
            fetch(globals.backend + "/addface", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Cache-Control": 'no-cache'
                },
                body: JSON.stringify({
                    personId: res_id.id,
                    photo: photo.src
                })
            }).then(res => res.json())
            .then(result => {
                console.log(result);
                if(result.persisted === "Failed"){
                    alert("Operation Failed!!");
                }else if(result.persisted !== "Failed"){
                    var photos = [...this.state.photos];
                    photos[index].status = "success";
                    this.setState({
                        photos: photos
                    },()=>{
                        if(index === self.state.photos.length -1){
                            self.trainGroup();
                        }
                    })
                }
            })
        })
    }

    async trainGroup()
    {
        let result = await fetch(globals.backend + "/traingroup",{
            method: "get",
        }).then(res=>res.json());

        if(result.status === "Ok"){
            this.setState({
                listReload:true
            })
            alert('Operation Success!!!');
        }
    }

    changeListFlag(flag){
        this.setState({
            listReload: flag
        })
    }
    
    render(){
        // console.log("render");
        let photoList = this.state.photos.map((photo, index)=> {
            return <Photo src={photo.src} status={photo.status} key={index}/>
        })

        return(
            <Container className="upload-container">
                <Row>
                    <Col xs={12} md={8}>
                        <Row>
                            <Col md={12}>
                                <h3 className="page-header mb-4">Upload Photos Page</h3>

                                <div className="input-group mb-3>">
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" name="photo" accept=".png, .jpg, .jpeg" onChange={(e)=> this.readFile(e)} multiple/>
                                        <label className="custom-file-label" htmlFor="custom-file-input">Choose File</label>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        

                        {/* <form className="form-horizontal">
                            <div className="form-group">
                                <Row>
                                <label htmlFor="photo" className="col-md-2 control-label">Upload</label>
                                <div className="col-md-10">
                                    <input type="file" className="form-control" />
                                </div>
                                </Row>
                            </div>
                        </form> */}

                        <Row>
                            {photoList}
                        </Row>
                    </Col>
                    <Col  xs={12} md={4}>
                        <h3 className="page-header mb-4">Registered List</h3>
                        <div className="input-group mb-3>">
                            <input type="text" className="form-control" name="addedName" placeholder="Enter Add Name" onChange={(e) => this.updateName(e)}/>
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button" onClick={()=> this.addName()}>Add</button>
                            </div>
                        </div>
                        {/* {if(this.state.)} */}
                        <NameList reload={this.state.listReload} onListCount={e => this.props.onListCount(e)} onChangeListFlag={(e) => this.changeListFlag(e)}/>
                    </Col> 
                </Row>
            </Container>
        )
    }
}

export default Upload;