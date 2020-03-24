import React , { Component } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';

class NewCustomer extends Component{

    state = {
        customer : {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
    
        const customer = {
          firstName: this.state.customer.firstName,
          lastName: this.state.customer.lastName,
          email: this.state.customer.email,
          phoneNumber: this.state.customer.phoneNumber
        };

        axios.post(process.env.REACT_APP_API_URL+'/customer', { customer })
          .then(res => {
                console.log(res);
                document.getElementById("new-form").reset();
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
                            <Form onSubmit={this.handleSubmit} id="new-form">
                                <FormGroup>
                                    <Label>First Name</Label>
                                    <Input onChange={this.handleChange} type="text" name="firstName" id="firstName" placeholder="Enter First Name" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Last Name</Label>
                                    <Input onChange={this.handleChange}  type="text" name="lastName" id="lastName" placeholder="Enter Last Name" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input onChange={this.handleChange}  type="email" name="email" id="email" placeholder="Enter email" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Phone</Label>
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
  