import React from 'react';


class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            actionType: null,
            applicationType: null,
            toDate: null,
            fromDate: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handelReload = this.handelReload.bind(this);
    }

    handleChange(event, param) {
        let formData = {};

        if (param == 'userId') {
            formData[param] = parseInt(event.target.value) || null;
        } else {
            formData[param] = event.target.value || null;
        }

        this.setState(formData);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.getData(this.state);
    }
    handelReload() {
        this.props.resetData();
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
                        onChange={event => this.handleChange(event, 'userId')}

                        placeholder="eg. 91030"
                    />
                </div>
                <div className="form-group">
                    <label className="d-block">
                        Action type
                    </label>
                    <select
                        name="actionType"
                        onChange={event => this.handleChange(event, 'actionType')}

                    >
                        <option value="null" defaultValue="null"></option>
                        <option value="ADD_EMPLOYEE">ADD_EMPLOYEE</option>
                        <option value="INITIATE_APPLICATION">INITIATE_APPLICATION</option>
                        <option value="SUBMIT_APPLICATION">SUBMIT_APPLICATION</option>
                        <option value="DARI_REFRESH_TOKEN">DARI_REFRESH_TOKEN</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="d-block">
                        Application type
                    </label>
                    <select
                        name="applicationType"
                        onChange={event => this.handleChange(event, 'applicationType')}

                    >
                        <option value="null" defaultValue="null"></option>
                        <option value="ADD_COMPANY_EMPLOYEE">ADD_COMPANY_EMPLOYEE</option>
                        <option value="ADD_POA">ADD_POA</option>
                        <option value="LEASE_REGISTRATION">LEASE_REGISTRATION</option>
                        <option value="CERT_TITLE_DEED_PLOT">CERT_TITLE_DEED_PLOT</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="d-block">
                        From Date
                    </label>
                    <input
                        type="date"
                        name="fromDate"
                        onChange={event => this.handleChange(event, 'fromDate')}
                    />
                </div>
                <div className="form-group">
                    <label className="d-block">
                        To Date
                    </label>
                    <input
                        type="date"
                        name="to"
                        onChange={event => this.handleChange(event, 'toDate')}
                    />
                </div>
                <div className="form-group">
                    <label className="d-block">
                        Application ID
                    </label>
                    <input
                        type="text"
                        name="applicationId"
                        onChange={event => this.handleChange(event, 'applicationId')}
                        placeholder="e.g. 219841/2021"
                    />
                </div>

                <input className="blue-btn" type="submit" value="Search Logger" />
                <input className="blue-btn" onClick={this.handelReload} type="reset" value="Clear" />
            </form>
        );
    }


};

export default Form;