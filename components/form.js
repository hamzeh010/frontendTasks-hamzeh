import React, { useState,useEffect } from 'react';


class Form extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userId:'',
            actionType: '',
            applicationType:'',
            fromDate:'',
            toDate:'',
            applicationId:''
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

      }

      handleChange(event, param) {
        let formData = {};
        formData[param] = event.target.value;
        this.setState(formData);
        console.log(param,event.target.value)
      }

      handleSubmit(event) {
        event.preventDefault();
        let isNotEmpty = false;
        isNotEmpty = Object.values(this.state).every(x => (x != ''));
        if(isNotEmpty){
            this.props.getData(this.state);
        }else{
            alert('Please fill all the fields!')
        }
       
        
      }

    render() {
        return (
            <form className="d-flex mb-3" onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label className="d-block">
                  User ID
                </label>
                <input 
                type="text"
                name="userId"
                onChange={event => this.handleChange(event,'userId')}
                required
                placeholder="eg. 91030" 
                />
            </div>
            <div className="form-group">
                <label className="d-block">
                    Action type
                </label>
                <select 
                name="actionType" 
                onChange={event => this.handleChange(event,'actionType')} 
                required
                >
                    <option value="none" defaultValue="none"></option>
                    <option value="DARI_REFRESH_TOKEN">DARI_REFRESH_TOKEN</option>
                    <option value="INITIATE_APPLICATION">INITIATE_APPLICATION</option>
                </select>
            </div>
            <div className="form-group">
                <label className="d-block">
                    Application type
                </label>
                <select 
                name="applicationType"
                onChange={event => this.handleChange(event,'applicationType')}
                required
                >
                    <option value="none" defaultValue="none" ></option>
                    <option value="ADD_COMPANY">ADD_COMPANY</option>
                    <option value="ADD_COMPANY_EMPLOYEE">ADD_COMPANY_EMPLOYEE</option>
                    <option value="ADD_POA">ADD_POA</option>
                </select>
            </div>
            <div className="form-group">
                <label className="d-block">
                    Form Date
                </label>
                <input 
                type="date"
                name="fromDate"
                data-date-format="DD MMMM YYYY"
                onChange={event => this.handleChange(event,'fromDate')}
                required />
            </div>
            <div className="form-group">
                <label className="d-block">
                    To Date
                </label>
                <input 
                type="date" 
                name="to"
                onChange={event => this.handleChange(event,'toDate')}
                required />
            </div>
            <div className="form-group">
                <label className="d-block">
                    Application ID
                </label>
                <input
                type="text"
                name="applicationId"
                onChange={event => this.handleChange(event,'applicationId')}
                placeholder="e.g. 219841/2021"
                required/>
            </div>
            
            <input className="blue-btn ml-4" type="submit" value="Search Logger" />
        </form>
        );
      }
   

};

export default Form;