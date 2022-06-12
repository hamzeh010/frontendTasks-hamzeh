import React, { useState,useEffect } from 'react';
const Table = (props) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>Log ID</th>
                    <th>Application Type</th>
                    <th>Application ID</th>
                    <th>Action Type</th>
                    <th>Action Details</th>
                    <th>Source</th>
                    <th>IP</th>
                    <th>Date Time</th>
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