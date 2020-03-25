
import React , { Component } from 'react';
import axios from 'axios';
import { Button, Input,Row, Col, Alert } from 'reactstrap';
import {AgGridReact} from 'ag-grid-react';
import { Redirect } from 'react-router';

const SuccessSection = (props) => {
    return <Alert color="success">
            The customer was successfully deleted
            </Alert>
}

const ErrorSection = (props) => {
    return <Alert color="danger">
            An error ocurred
            </Alert>
}

class Home extends Component{

    searchValue = ""; 

    constructor(props){
        super(props);
        
        this.state= {
            redirect: null,
            customers : [],
            showSuccess: false,
            showError: false,
            newCustomerModal : false,
            columnDefs: [
				{headerName: "ID", field: "id"},
				{headerName: "First Name", field: "firstName"},
                {headerName: "Last Name", field: "lastName"},
                {headerName: "Email", field: "email"},
                {headerName: "Phone", field: "phoneNumber", width: 120,},
                {
                    headerName: "Edit",
                    field: "id",
                    width: 70,
                    colId: "edit",
                    cellRendererFramework: (row)=> {
                      return <button onClick={() => this.goToEdit(row.data.id)}>Edit </button>
                    },
                },
                {
                    headerName: "Delete",
                    field: "id",
                    width: 70,
                    colId: "delete",
                    cellRendererFramework: (row)=> {
                      return <button onClick={() => this.deleteCustomer(row.data.id)}>Delete</button>
                    },
                }
			],
			rowData: [
            ]
        };
    }

    componentWillMount() {     
        this.getCustomers();
    }

    goToEdit(id){
        this.setState({ redirect: "/customer/"+id+"/edit" });
    }

    getCustomers(){
        this.searchValue = "";
        
        axios.get(process.env.REACT_APP_API_URL+'/customer').then(response=>{
            this.setState(
            {
                rowData: response.data
            }
            )
        });
    }

    deleteCustomer(id){
        this.setState({showSuccess: false, showError: false});
        axios.delete(process.env.REACT_APP_API_URL+'/customer/'+id)
        .then(res => {
            this.getCustomers();
            this.setState({showSuccess: true});
        }, err=>{
          this.setState({showError: true});
        })
    }

    handleFilter  = event => {
        this.searchValue = event.target.value.toLowerCase();
        let result = this.state.rowData.filter(item => (this.searchValue === item.firstName.toLowerCase() || this.searchValue === item.lastName.toLowerCase() ) );

        if(result.length>0){
            this.setState(
                {
                    rowData: result
                }
            );
        }

        if(!this.searchValue){
            this.getCustomers();
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div className="container">
                    <div className="main-title">
                        <h4 align="center">CUSTOMERS</h4>
                    </div>
                    <hr></hr>
                    <br></br>
                    <div align="right">
                        <Button color="primary" size="sm" className="mr-2" href="/customer/new">New Customer</Button>
                    </div>
                    <br></br>
                    <Row>
                        <Col sm={{ size: 10}}>
                            <Input onChange={this.handleFilter} type="text" name="search" id="search" placeholder="Search..." />        
                        </Col>
                        <Col sm={{ size: 2}}>
                            <Button color="warning" size="sm" onClick={() => this.getCustomers()}>Clear</Button>
                        </Col>
                    </Row>
                    
                    <br></br>

                    <Row>
                        <Col sm={{ size: 12}}>
                            { this.state.showSuccess ? <SuccessSection/> : null }
                            { this.state.showError ? <ErrorSection/> : null }
                        </Col>
                    </Row>
                    <div className="ag-theme-balham"
                            style={{
                                height: '500px'
                            }}>

                            <AgGridReact
                                pagination={true}
                                columnDefs={this.state.columnDefs}
                                rowData={this.state.rowData}>
                            </AgGridReact>
                    </div>
                    
            </div> 
            );
    }
  }
  
  export default Home;