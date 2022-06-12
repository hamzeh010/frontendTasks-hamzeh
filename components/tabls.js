import React from 'react';
const Table = (props) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    {props.titles.map((title, index) =>
                        <th key={index}>{title} <span className='icon-circle-up'></span></th>
                    )}
                </tr>
            </thead>
            <tbody>
                {props.show.map((show, index) => (
                    <tr key={show.logId}>
                        <td>{show.userId ? show.userId : '-'}</td>
                        <td>{show.logId}</td>
                        <td>{show.applicationType ? show.applicationType : '-'}</td>
                        <td>{show.applicationId ? show.applicationId : '-'}</td>
                        <td>{show.actionType ? show.actionType : '-'}</td>
                        <td>-</td>
                        <td>{show.source ? show.source : '-'}</td>
                        <td>{show.ip ? show.ip : '-'}</td>
                        <td>{show.creationTimestamp ? show.creationTimestamp : '-'}</td>
                    </tr>))
                }
            </tbody>
        </table>
    )

};
export default Table;