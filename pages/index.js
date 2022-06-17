import React from 'react';
import Breadcrumbs from '../components/breadcrumbs';
import Table from '../components/table';
import Form from '../components/form';
import ReactPaginate from 'react-paginate';
import moment from 'moment'
/* eslint-disable */
const apiLink = 'https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f';
const pages = ['Home', 'Administration', 'Logger search'];
const headerCellTitle = ['User ID', 'Action Type', 'Application Type', 'Log ID', 'Application ID', 'Action Details', 'Source', 'IP', 'Date Time'];

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.show || [],
      currentPage: 1,
      items: 10,
      filtered: []
    }

    this.handelSort = this.handelSort.bind(this);
    this.handelReset = this.handelReset.bind(this);
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
      pages: pages,
      headerCellTitle: headerCellTitle,
      orginalData:data.result.auditLog
    }
  }

  handelPaginate = (obj) => {
    this.setState({
      currentPage: obj.selected + 1,
    });
  }

  handelData = (obj) => {
    this.handelSearchLogger(obj);
  }
  // let fetchedDate = inputObject.creationTimestamp.split(' ')[0];
  // let isBetween = moment(fetchedDate).isBetween(obj.fromDate, obj.toDate);

  removeEmpty(obj) {
    return Object.keys(obj)
      .filter(function (k) {
        return obj[k] != null;
      })
      .reduce(function (acc, k) {
        acc[k] = obj[k];
        return acc;
      }, {});
  }

  handelReset(){
    console.log()
    this.setState(
      {data:this.props.orginalData}
    )
  }

  handelSearchLogger = (submitedData) => {

    let inputsArray = [];
    let result = null;
    let resultWithDate = null;
    let filtered = [];
    let creationTimestamp = "";

    result = this.removeEmpty(submitedData);
    resultWithDate = this.removeEmpty(submitedData);

    for (const key in result) {
      if (Object.hasOwnProperty.call(result, key)) {
        const ele = result[key];
        if (key == 'fromDate' || key == 'toDate') {
          moment(ele).format("YYYY-MM-DD");
        }
      }
    }

    inputsArray.push(result);

    filtered = this.props.show.filter(function (i) {
      creationTimestamp = i.creationTimestamp.toString().split(' ')[0];
      i.creationTimestamp = i.creationTimestamp != null ? creationTimestamp : null;

      if (resultWithDate.fromDate && resultWithDate.toDate) {
        i.isBetween = moment(i.creationTimestamp).isBetween(resultWithDate.fromDate, resultWithDate.toDate, undefined, '[)');
      }

      return inputsArray.some(function (j) {
        delete j['fromDate'];
        delete j['toDate'];
        return !Object.keys(j).some(function (prop) {
          return i[prop] != j[prop]

        });
      });
    });

    if (resultWithDate.fromDate && resultWithDate.toDate) {
      filtered = filtered.filter(e => {
        return e.isBetween
      });

    }

    this.setState({
      data: filtered
    });
  }


  handelSortNumber(show, param) {
    return show.sort((a, b) => (a[param] > b[param] ? 1 : -1))
  }

  handelSort({ title }) {
    const show = this.props.show;
    const message = "No sort for Action Details, only on UserID,LogID,ApplicationType,ApplicationID,ActionType";
    let res = [];
    switch (title) {
      case "User ID":
        res = this.handelSortNumber(show, 'userId');
        break;
      case "Log ID":
        res = this.handelSortNumber(show, 'logId');
        break;
      case "Application Type":
        res = show.sort((a, b) => {
          return a.applicationType ? a.applicationType.localeCompare(b.applicationType) : [];
        });
        break;
      case "Application ID":
        res = this.handelSortNumber(show, 'applicationId');
        break;
      case "Action Details":
        alert(message);
        return;
      case "Source":
        alert(message);
        return;
      case "IP":
        alert(message);
        return;
      case "Date Time":
        alert(message);
        return;
      case "Action Type":
        res = show.sort((a, b) => {
          return a.actionType ? a.actionType.localeCompare(b.actionType) : [];
        });
      default:
        break;
    }
    this.setState({
      data: res
    });
  }


  render() {
    return <div className="m-auto">

      {/* START BREADCRUMBS SECTION */}
      <ul className="breadcrumbs">
        <Breadcrumbs pages={this.props.pages} />
      </ul>
      {/* END BREADCRUMBS SECTION */}

      {/* START FORM SECTION */}
      <Form resetData={this.handelReset} getData={this.handelData} />
      {/* END FORM SECTION */}

      {/* START TABLE SECTION */}
      <Table
        show={this.paginate(this.state.data, this.state.items, this.state.currentPage)}
        titles={this.props.headerCellTitle}
        handelSort={this.handelSort}
      />
      {/* END TABLE SECTION */}

      {/* START NO DATA MESSAGE */}
      {this.state.data.length == 0 ? <div className="text-center"><div className="text-center mb-3 text-danger">No records found, please read the notes and how to use search logger.</div></div> : ''}

      {/* END NO DATA MESSAGE */}

      {/* START PAGINATE SECTION */}
      {this.state.data.length != 0 ? <Paginate size={this.state.data.length / this.state.items} handelPaginateChange={this.handelPaginate} /> : ''}
      {/* END PAGINATE SECTION */}

      {/* START MORE INFORMATION */}
      <div className="alert alert-warning">
        <h2>Notes:</h2>
        <ul>
          <li className="mb-0">Please note that there is no (Employee Name) in the API response so I will use userId instead.</li>
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

