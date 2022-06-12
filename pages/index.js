import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../components/breadcrumbs';
import Table from '../components/tabls';
import Form from '../components/form';
import ReactPaginate from 'react-paginate';
import moment from 'moment'
/* eslint-disable */
const apiLink = 'https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f';
const pages = ['Home', 'Administration', 'Logger search'];

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.show || [],
      currentPage: 1,
      items: 10
    }
  }


  paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  static async getInitialProps() {
    const res = await fetch(apiLink);
    const data = await res.json();
    this.state = data;
    return {
      show: data.result.auditLog,
      pages: pages
    }
  }

  handelPaginate = (obj) => {
    this.setState({
      currentPage: obj.selected + 1,
    });
  }

  handelData = (obj)=>{
    this.handelSearchLogger(obj);
  }

  handelSearchLogger = (obj)=>{
    console.log(obj);
    let res = this.props.show.filter((e,i)=>{
    let fetchedDate = e.creationTimestamp.split(' ')[0];
    let isBetween = moment(fetchedDate).isBetween(obj.fromDate, obj.toDate);

    console.log(obj.fromDate,' ',obj.toDate);
    console.log(e.creationTimestamp.split(' ')[0]);
    console.log("isBetween",isBetween,e)

     return e.applicationId == parseInt(obj.applicationId) && e.userId == obj.userId && e.actionType == obj.actionType && isBetween  ; 
    })
    this.setState({
      data:res
    })
  }

  handelReset(){
    window.location.reload();
  }


  render() {
    return <div className="m-auto">

      {/* START BREADCRUMBS SECTION */}
      <ul className="breadcrumbs">
        <Breadcrumbs pages={this.props.pages} />
      </ul>
      {/* END BREADCRUMBS SECTION */}

      {/* START FORM SECTION */}
      <Form getData={this.handelData}/>
      {/* END FORM SECTION */}

      {/* START TABLE SECTION */}
      <Table show={this.paginate(this.state.data, this.state.items, this.state.currentPage)} />
      {/* END TABLE SECTION */}

      {/* START NO DATA MESSAGE */}
      {this.state.data.length == 0 ? <div className="text-center"><div className="text-center mb-3 text-danger">No records found, please read the notes and how to use search logger.</div><button className="blue-btn mb-5" onClick={this.handelReset}>Reset fields</button></div>:''}
      
      {/* END NO DATA MESSAGE */}

      {/* START PAGINATE SECTION */}
      {this.state.data.length != 0 ? <Paginate size={this.state.data.length / this.state.items} handelPaginateChange={this.handelPaginate} />:''}
      {/* END PAGINATE SECTION */}

      {/* START MORE INFORMATION */}
      <div className="alert alert-warning">
        <h2>Notes:</h2>
        <ul>
          <li className="mb-0">Please note that there is no (Employee Name) in the API response so I will use userId instead.</li>
          <li className="mb-0">All the search fields are required.</li>
          <li className="mb-0">Reload the page to reset the table.</li>
        </ul>
      </div>
      <div className='alert alert-success'>
      <h2>How to use search logger?</h2>
        <p className="mb-0">To find a record please fill the bellow data to the fields: </p> 
        <ul>
          <li>"userId": 15497</li>
          <li>"actionType": "INITIATE_APPLICATION"</li>
          <li>"applicationType": "ADD_POA"</li>
          <li>"From date": "09-12-2021"</li>
          <li>"To date": "12-6-2022"</li>
          <li>"ApplicationId": 726278576002607</li>
        </ul>
        <ul>
          <li>"userId": 1052</li>
          <li>"actionType": "INITIATE_APPLICATION"</li>
          <li>"applicationType": "ADD_POA"</li>
          <li>"From date": "09-12-2021"</li>
          <li>"To date": "12-6-2022"</li>
          <li>"ApplicationId": 144170790324169</li>
        </ul>
      </div>
      {/* END MORE INFORMATION */}
    </div>
  }
}


// Pagination element 1,2,3,4
function Paginate({ size, handelPaginateChange }) {
  const sizeData = size;

  const handlePageChange = (event) => {
    handelPaginateChange(event);
  };
  return (
    <div className="pagenation">
      <ReactPaginate
        previousLabel=""
        nextLabel=">"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={sizeData}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        forcePage={0}
      />

    </div>
  );
}


export default Home;

