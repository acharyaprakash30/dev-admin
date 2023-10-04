import { Button } from 'antd';
import React from 'react';

const FilterStatus = ({ data, selectedStatus, setStatus }) => {
  const AllStatus = [
    'all',
    'pending',
    'confirmed',
    'rejected',
    'processing',
    'outForDelivery',
    'delivered',
    'paid',
  ];


  const findColor = (status) => {
    switch (status) {
      case 'outForDelivery':
        return '#FE9B5D';
      case 'pending':
        return '#F8D62B';
      case 'rejected':
        return 'red';
      case 'delivered':
        return 'green';
      case 'accepted':
        return 'Orange';
      case 'processing':
        return '#90EE90';
      case 'confirmed':
        return '#01a9ac';
      default:
        return 'red';
    }
  };
  // console.log(data);

  return (
    
      <div className="d-flex flex-wrap flex-end mb-2 mt-1 filterStatus">
      {data && Array.isArray(AllStatus) &&
        AllStatus?.length > 0 ?
        AllStatus.map((status, index) => (
          <Button
          key={index}
            style={{
              backgroundColor: findColor(status),
              color:
                status === 'pending' ||
                status === 'outForDelivery' ||
                status === 'processing'
                  ? 'black'
                  : 'white',
                }}
            className={`rounded mx-1 mb-1 text-capitalize  ${
              selectedStatus === status ? `border-primary` : ``
            }`}
            onClick={() => setStatus(status)}
            >
            {status}({data[status] || 0})
          </Button>
        ))
      :
      <p>Loading</p>
      }
        </div>
        
  );
 
};

export default FilterStatus;
