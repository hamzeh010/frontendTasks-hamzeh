import React, { useState, useEffect, useRef } from 'react';

const Table = (props) => {
    let [value, setValue] = useState(false);

    const handleArrowClick = title => {
      setValue(!value)
      props.handelSort({isArrowUp:!value,title:title});
    };

    
    return (
        <table className="table">
            <thead>
                <tr>
                    {props.titles.map((title, index) =>
                        <th onClick={() => handleArrowClick(title)} key={index}>{title} <span className={value ? 'icon-circle-up':'icon-circle-down'}></span>{!!value}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {props.show.map((show, index) => (
                    <tr key={show.logId}>
                        <td>{show.userId ? show.userId : '-'}</td>
                        <td>{show.actionType ? show.actionType : '-'}</td>
                        <td>{show.applicationType ? show.applicationType : '-'}</td>
                        <td>{show.logId}</td>
                        <td>{show.applicationId ? show.applicationId : '-'}</td>
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