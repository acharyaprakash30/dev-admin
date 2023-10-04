import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../../../layout/breadcrumb';
import { Button, Card, Container, Col, Row } from 'reactstrap';
import { Switch } from 'antd';
import actions from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import ModalAddressForm from 'components/Modal/ModalAddressForm';
import { ConfirmDeleteDialogue } from 'utils/Dialogue';
import ActionButton from 'components/ActionButtons/ActionButtons';

const Municipalities = () => {
  let dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const provinces = useSelector((state) => state.Shipping?.provinces?.province);
  const [provinceId, setProvinceId] = useState();
  const districts = useSelector((state) => state.Shipping?.districts?.district);
  const municipalities = useSelector(
    (state) => state.Shipping?.municipalities?.municipality,
  );
  const [districtId, setDistrictId] = useState();
  const [page, setPage] = useState(1);
  const [row, setRow] = useState(10);
  const totalRow = useSelector(
    (state) => state.Shipping?.municipalities?.municipalityCount,
  );
  const loading = useSelector((state) => state.Shipping?.municipalities?.loading);

  //fetching provinces
  useEffect(() => {
    dispatch(actions.fetchProvinceReq());
  }, []);

  // fetching districts
  useEffect(() => {
    if (provinceId) {
      dispatch(actions.fetchDistrictReq({ id: provinceId }));
    }
  }, [provinceId]);

  // fetching municipalities
  useEffect(() => {
    dispatch(actions.fetchMunicipalityReq({ id: districtId, page, row }));
  }, [page, row, districtId]);

  const handleStatus = (e, row) => {
    let data = {
      status: e,
    };
    dispatch(actions.editMunicipalityReq(row?.id, data));
  };

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
            onChange={(e) => handleStatus(e, row)}
            checked={row.status}
          ></Switch>
        ),
      },

      {
        name: 'Actions',
        center: true,
        selector: (row, index) => (
          <ActionButton
            onDelete={(e) =>
              ConfirmDeleteDialogue('municipality').then((result) => {
                if (result.isConfirmed) {
                  dispatch(actions.deleteMunicipality(row?.id));
                }
              })
            }
          ></ActionButton>
        ),
      },
    ],
    [municipalities],
  );

  return (
    <>
          <ModalAddressForm
        provinces={provinces}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        type= "Municipality"
      ></ModalAddressForm>
      <Breadcrumb parent="Dashboard" title="Municipality" />
      <Container fluid className="m-0 p-0 ml-1">
        <div className="feature-products">
          <Row className="mb-1">
            <Col xl="2" sm="2" className="mt-1">
              <Button
                onClick={() => {
                    setIsModalOpen(true);
                  //   setShipData(null);
                }}
                className="btn btn-primary"
              >
                <i className="bi bi-plus"></i>
                Add New
              </Button>
            </Col>
            <Col xl="2" sm="2" className="mt-1"></Col>
            <Col xl="4" sm="4" className="text-right">
              <div className="select2-drpdwn-product select-options ">
                <select
                  className="form-control btn-square"
                  name="select"
                  onChange={(e) => {
                    setProvinceId(e.target.value.split(',')[1]);
                  }}
                >
                  <option value={-1}>All Province</option>
                  {provinces?.map((p, i) => (
                    <option key={i} value={[p.name, p.id]}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
            <Col xl="4" sm="4" className="text-right">
              <div className="select2-drpdwn-product select-options ">
                <select
                  className="form-control btn-square"
                  name="select"
                  placeholder="Select District"
                  disabled={provinceId ? false : true}
                  onChange={(e) => {
                    setDistrictId(e.target.value);
                  }}
                >
                  <option value={''}>All district</option>
                  {districts?.map((d) => (
                    <option value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
            </Col>
          </Row>
        </div>

        <Card>
          <DataTable
            noHeader={true}
            columns={columns}
            data={municipalities}
            striped={true}
            responsive
            paginationTotalRows={totalRow}
            progressPending={loading}
            pagination
            paginationServer
            onChangeRowsPerPage={(row, page) => {
              setPage(page);
              setRow(row);
            }}
            onChangePage={(page,totalRow) => {
              setPage(page);
            }}
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

export default Municipalities;
