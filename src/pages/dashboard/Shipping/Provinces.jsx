import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../../../layout/breadcrumb';
import { Button, Card, Container, Col, Row } from 'reactstrap';

import { message, Switch } from 'antd';
import { useDispatch } from 'react-redux';
import actions from './redux/actions';
import { useSelector } from 'react-redux';

const Provinces = () => {
  let dispatch = useDispatch();
  const provinces = useSelector((state) => state.Shipping.provinces.province);

  const handleStatus = (e, row) => {
    let data = {
      status: e,
    };
    dispatch(actions.editProvinceReq(row?.id, data));
  };

  useEffect(() => {
    dispatch(actions.fetchProvinceReq());
  }, []);

  const columns = React.useMemo(
    () => [
      {
        name: 'ID',
        center: true,
        selector: (row) => row.id,
      },
      {
        name: 'Name',
        center: true,

        selector: (row) => row.name,
      },
      {
        name: 'Status',
        center: true,
        selector: (row) => (
          <Switch
            checked={row.status}
            onChange={(e) => handleStatus(e, row)}
          ></Switch>
        ),
      },

      // {
      //   name: 'Actions',
      //   selector: 'actions',
      //   sortable: false,
      //   cell: (item) => (
      //     <>
      //       <button
      //         onClick={async () => {
      //           const response = await axios.get(`/shippings/${item.id}`);
      //           const data = await response.data;
      //           setShipData(data);
      //           setIsModalOpen(true);
      //           setIsEdit(true);
      //         }}
      //         style={{ backgroundColor: 'transparent', border: 'none' }}
      //       >
      //         <AiOutlineEdit fontSize={18} />
      //       </button>
      //       <button
      //         onClick={async () => {
      //           setIsDelete(await deleteShipping(item.id));
      //           setIsDelete(false);
      //         }}
      //         style={{ backgroundColor: 'transparent', border: 'none' }}
      //       >
      //         <AiOutlineDelete fontSize={18} />
      //       </button>
      //     </>
      //   ),
      // },
      // {
      //   name: 'Actions',
      //   selector: 'actions',
      //   sortable: false,
      //   cell: item => (
      //     <TableBasicActions
      //       // handleView={() => handleView(item)}
      //       handleDelete={() => (ConfirmDeleteDialogue('color').then(result => {
      //         if (result.isConfirmed) {
      //           deleteShipping(item?.id).then((response) => {
      //             getShipping();
      //             message.success("Deleted successfully")
      //           })
      //             .catch((error) => {
      //               message.error("Deletion failed")
      //             })
      //         }
      //       }))}
      //       handleEdit={() => {
      //         setShipData(item);
      //         setIsEdit(true);
      //         setIsModalOpen(true);

      //       }}
      //     />)
      // },
    ],
    [provinces],
  );

  return (
    <>
      <Breadcrumb parent="Dashboard" title="Provinces" />

      <Container fluid className="m-0 p-0">
        {/* <div className="feature-products">
          <Row>
            <Col xl="2" sm="2" className="mt-1">
              <Button onClick={() => {
                setIsModalOpen(true)
                setShipData(null);
              }} className="btn btn-primary">
                <i className="bi bi-plus"></i>
                Add New
              </Button>
            </Col>
            <Col xl="3" sm="3" className="mt-1"></Col>
            <Col xl="3" sm="3" className="text-right">
              <div className="select2-drpdwn-product select-options ">
                <select
                  className="form-control btn-square"
                  name="select"
                  onChange={(e) => {
                    setProvince(e.target.value.split(',')[1]);
                    setProvinceName(e.target.value.split(',')[0]);
                    setDistrictName('-1');
                  }}
                >
                  <option value={-1}>All Province</option>
                  {provinces?.map((p, i) => (
                    <option key={i} value={[p.name, p.id]}>{p.name}</option>
                  ))}
                </select>
              </div>
            </Col>
            <Col xl="4" sm="4" className="text-right">
              <div className="select2-drpdwn-product select-options ">
                <select
                  className="form-control btn-square"
                  name="select"
                  onChange={(e) => {
                    setDistrictName('-1');
                    setDistrictName(e.target.value);
                  }}
                >
                  <option value={-1}>
                    Please select province to select district
                  </option>
                  <option value={-1}>All district</option>
                  {districts?.map((d) => (
                    <option value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>
            </Col>
          </Row>
        </div> */}
        <Card>
          <DataTable
            noHeader={true}
            columns={columns}
            data={provinces}
            striped={true}
          />
        </Card>
      </Container>

      {/* {isModalOpen && (
        <ShippingForm
          dat={shipData ? shipData : null}
          setShipData={setShipData}
          isModalOpen={isModalOpen}
          isEdit={isEdit}
          onDiscard={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            getShipping();
          }}
          onFailure={() => setIsModalOpen(false)}
        />
      )} */}
    </>
  );
};

export default Provinces;
