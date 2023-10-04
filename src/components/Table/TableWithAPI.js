import React from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

export default (props) => {
    let {loading, searchText, tableHeader, tableData, editUrl, showModal, handleTableChange, pagination} = props;

    let columns = tableHeader ? tableHeader : [];
    let data = tableData ? tableData : [];

    /**Adding functionalites to columns */
    columns = columns && columns.map((col) => {
        let sortFilter = data.some(value => {
            return value[col.dataIndex] === undefined || typeof variable === "boolean";
        });

        return {
            ...col,
            sorter: col.sort && !sortFilter ? (a, b) => a[col.dataIndex].localeCompare(b[col.dataIndex]) : false,
            sortDirections: col.sort ? ['descend', 'ascend'] : false,
            ellipsis: true,
            search: col.search ? true : false
        }
    });

    /** Actions */
    columns.push({
        title: 'Action',
        dataIndex: "action",
        fixed: 'right',
    });


    /**Refactoring Data */
    data = data.map((row) => {
        let objectAsArray = Object.entries(row);
        objectAsArray.map((value) => {
            if (value[1] === true) row[value[0]] = "Yes";
            else if (value[1] === false) row[value[0]] = "No";
            else if (!value[1]) row[value[0]] = "-";
            else if (typeof value[1] === 'object') row[value[0]] = value[1];
            else row[value[0]] = value[1].toString();
        });
        row.key = row.id;
        row.action = (
            <span>
                <Tooltip title="Edit">
                    <Link to={editUrl?editUrl.replace(':id', row.id):"#"}>
                        <Button type="primary" shape="circle" >
                            <i className="fa fa-pencil "></i>
                        </Button>
                    </Link>
                </Tooltip>
                &nbsp;
                <Tooltip title="Delete">
                    <Button type="primary" danger shape="circle" onClick={() => showModal ? showModal(row.id): null}>
                        <i className="fa fa-trash"></i>
                    </Button>
                </Tooltip>
            </span>
        );
        return row;
    });


    const searchData = (data) => {

        let searchResult = data && data.filter((row) => {
            let searchResult = [];
            for (const col of columns) {
                if (!searchText) {
                    searchResult.push(true);
                    continue;
                }
                if (!col.search) {
                    searchResult.push(false);
                } else {
                    let rowKey = col["dataIndex"] ? col["dataIndex"] : '';
                    let rowValue = row[rowKey] ? row[rowKey] : '';
                    let searchValue = rowValue.toString().toLowerCase();
                    if (searchValue.includes(searchText.toLowerCase())) searchResult.push(true);
                }
            }
            if (searchResult.some(value => value === true)) return true;
            return false;
        });
        return searchResult;
    }

    let currentData = data? searchData(data) : [];

    // const handleTableChange = (pagination, filters, sorter) => {
        
    //     console.log("pagination: ", pagination);
    // }

    let pg = {
        ...pagination, 
        showTotal : total => `Total ${total} items`
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={currentData}
                size="middle"
                loading={loading ? loading : false}
                pagination={pg}
                onChange= {handleTableChange}
                
            />
        </>
    );
}