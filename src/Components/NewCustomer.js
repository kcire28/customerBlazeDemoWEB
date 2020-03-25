import React , { Component } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Input, Label, Row, Col, Alert } from 'reactstrap';


const SuccessSection = (props) => {
    return <Alert color="success">
            The customer was successfully inserted!
            </Alert>
}

const ErrorSection = (props) => {
    return <Alert color="danger">
            An error ocurred
            </Alert>
}

const FullValidation = (props) => {
    return <Alert color="warning">
            Please complete all required fields.
            </Alert>
}


class NewCustomer extends Component{

    state = {
        customer : {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: ''
        },
        showSuccess : false,
        showError : false,
        showValidationMsg: false
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({showSuccess: false, showError: false, showValidationMsg: false});

        if(!this.state.customer.firstName || !this.state.customer.lastName || !this.state.customer.email || !this.state.customer.phoneNumber){
            this.setState({showValidationMsg: true});
            return;
        }
        let customer = {
          firstName: this.state.customer.firstName,
          lastName: this.state.customer.lastName,
          email: this.state.customer.email,
          phoneNumber: this.state.customer.phoneNumber
        };

        axios.post(process.env.REACT_APP_API_URL+'/customer',customer)
          .then(res => {
                document.getElementById("new-form").reset();   
                this.setState({showSuccess: true});
            }, err=>{
              this.setState({showError: true});
            })
      }

      handleChange = event => {

        if(event.target.name == "firstName"){
            this.state.customer.firstName = event.target.value;
        }
        if(event.target.name == "lastName"){
            this.state.customer.lastName = event.target.value;
        }
        if(event.target.name == "email"){
            this.state.customer.email = event.target.value;
        }
        if(event.target.name == "phoneNumber"){
            this.state.customer.phoneNumber = event.target.value;
        }
      }

    render() {
        return (
            <div className="container">
                <div className="main-title">
                    <h4 align="center">NEW CUSTOMER</h4>
                </div>
                <hr></hr>
                <div>
                    <Row>
                        <Col sm={{ size: 6, offset: 3}}>
                            <Row>
                                <Col sm={{ size: 12}}>
                                    { this.state.showSuccess ? <SuccessSection/> : null }
                                    { this.state.showError ? <ErrorSection/> : null }
                                    { this.state.showValidationMsg ? <FullValidation/> : null }
                                </Col>
                            </Row>
                            <Form onSubmit={this.handleSubmit} id="new-form">
                                <FormGroup>
                                    <Label>First Name*</Label>
                                    <Input onChange={this.handleChange} type="text" name="firstName" id="firstName" placeholder="Enter First Name" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Last Name*</Label>
                                    <Input onChange={this.handleChange}  type="text" name="lastName" id="lastName" placeholder="Enter Last Name" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Email*</Label>
                                    <Input onChange={this.handleChange}  type="email" name="email" id="email" placeholder="Enter email" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Phone*</Label>
                                    <Input onChange={this.handleChange}  type="text" name="phone" id="phone" placeholder="Enter Phone" />
                                </FormGroup>
                                <div align="center">
                                    <Button color="primary" type="submit" className="mr-2">Save</Button>
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
  
  export default NewCustomer;
  