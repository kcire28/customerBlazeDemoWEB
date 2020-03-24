import React , { Component } from 'react';
import axios from 'axios';
import {Button, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';

class EditCustomer extends Component{

    state = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    }

    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.findCustomer();
    }

    findCustomer(){
        axios.get(process.env.REACT_APP_API_URL+'/customer/'+this.props.match.params.id)
        .then(res => {
            this.setState({
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                phoneNumber: res.data.phoneNumber
            }); 
        })
    }

    handleSubmit = event => {
        event.preventDefault();
    
        const customer = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber
        };

        axios.put(process.env.REACT_APP_API_URL+'/customer/'+this.props.match.params.id, { customer })
          .then(res => {
                console.log(res);
                this.findCustomer();
          })
      }

      handleChange = event => {        
        if(event.target.name == "firstName"){
            this.setState({
                firstName: event.target.value
            });
        }
        if(event.target.name == "lastName"){
            this.setState({
                lastName: event.target.value
            });
        }
        if(event.target.name == "email"){
            this.setState({
                email: event.target.value
            });
        }
        if(event.target.name == "phoneNumber"){
            this.setState({
                phoneNumber: event.target.value
            });
        }
      }

    render() {
        return (
            <div className="container">
                <div className="main-title">
                    <h4 align="center">EDIT CUSTOMER</h4>
                </div>
                <hr></hr>
                <div>
                    <Row>
                        <Col sm={{ size: 6, offset: 3}}>
                            <Form onSubmit={this.handleSubmit} id="edit-form">
                                <FormGroup>
                                    <Label>First Name</Label>
                                    <Input value={this.state.firstName} onChange={this.handleChange} type="text" name="firstName" id="firstName" placeholder="Enter First Name" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Last Name</Label>
                                    <Input value={this.state.lastName} onChange={this.handleChange}  type="text" name="lastName" id="lastName" placeholder="Enter Last Name" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input value={this.state.email}  onChange={this.handleChange}  type="email" name="email" id="email" placeholder="Enter email" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Phone</Label>
                                    <Input value={this.state.phoneNumber}  onChange={this.handleChange}  type="text" name="phoneNumber" id="phone" placeholder="Enter Phone" />
                                </FormGroup>
                                <div align="center">
                                    <Button color="primary" type="submit" className="mr-2">Update</Button>
                                    <Button type="button" href="/">Cancel</Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                  
                </div>
            </div> 
        );
    }
  }
  
  export default EditCustomer;
  