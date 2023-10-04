import React, { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../../../layout/breadcrumb';
import { Button, Card, Container, Col, Row } from 'reactstrap';

import { Input, Switch, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import actions from './redux/actions';
import ModalAddressForm from 'components/Modal/ModalAddressForm';
import ActionButton from 'components/ActionButtons/ActionButtons';
import { ConfirmDeleteDialogue } from 'utils/Dialogue';

const Areas = () => {
  let dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const provinces = useSelector((state) => state.Shipping?.provinces?.province);
  const [provinceId, setProvinceId] = useState();
  const districts = useSelector((state) => state.Shipping?.districts?.district);
  const [districtId, setDistrictId] = useState();
  const municipalities = useSelector(
    (state) => state.Shipping?.municipalities?.municipality,
  );
  const areas = useSelector((state) => state?.Shipping?.areas?.area);
  const [municipalityId, setMunicipalityId] = useState();
  const [page, setPage] = useState(1);
  const [row, setRow] = useState(10);
  const loading = useSelector((state) => state?.Shipping?.areas?.loading);
  const totalRow = useSelector((state) => state?.Shipping?.areas?.areaCount);
  const areaUpdated = useSelector((state) => state?.Shipping?.areas?.area);

  useEffect(() => {
    dispatch(actions.fetchProvinceReq());
  }, []);

  useEffect(() => {
    if (provinceId) {
      setMunicipalityId(-1);
      setDistrictId(-1);
      dispatch(actions.fetchDistrictReq({ id: provinceId }));
    } else {
      setMunicipalityId(-1);
      setDistrictId(-1);
      dispatch(actions.fetchAreasReq({ page, row }));
    }
  }, [provinceId]);

  useEffect(() => {
    if (provinceId && districtId) {
      console.log('district', districtId);
      setMunicipalityId(-1);
      dispatch(actions.fetchMunicipalityReq({ id: districtId }));
    } else {
      setMunicipalityId(-1);
      // dispatch(actions.fetchAreasReq({ page, row }));
    }
  }, [districtId]);

  const handleAreaPrice = (e, i, type) => {
    if (type === 'price') {
      dispatch(actions.editAreaData(i, e, 'price'));
    }
    if (type === 'name') {
      dispatch(actions.editAreaData(i, e, 'name'));
    }

    if (type === 'status') {
      dispatch(actions.editAreaData(i, e, 'status'));
    }
  };

  const handleBulkSubmit = () => {
    dispatch(actions.editAreasReq(areaUpdated));
  };

  useEffect(() => {
    dispatch(actions.fetchAreasReq({ id: municipalityId, page, row }));
  }, [page, row, municipalityId]);

  const columns = useMemo(
    () => [
      {
        name: 'ID',
        center: true,
        selector: (row, index) => row.id,
      },
      {
        name: 'Name',
        center: true,
        selector: (row, index) =>
          municipalityId > 0 ? (
            !console.log('hh') && (
              <Input
                type="text"
                defaultValue={row?.name}
                onChange={(e) => handleAreaPrice(e.target.value, index, 'name')}
              ></Input>
            )
          ) : (
            <span>{row?.name}</span>
          ),
      },
      {
        name: 'Status',
        center: true,
        selector: (row, index) => (
          <Switch
            defaultChecked={row?.status}
            onChange={(e) => handleAreaPrice(e, index, 'status')}
          ></Switch>
        ),
      },
      {
        name: 'Delivery Price',
        center: true,
        selector: (row, index) =>
          municipalityId > 0 ? (
            <Input
              type="number"
              defaultValue={row?.delivery_price}
              onChange={(e) => handleAreaPrice(e.target.value, index, 'price')}
            ></Input>
          ) : (
            <span>{row?.delivery_price}</span>
          ),
      },
      {
        name: 'Actions',
        center: true,
        selector: (row, index) => (
          <ActionButton
            onDelete={(e) =>
              ConfirmDeleteDialogue('area').then((result) => {
                if (result.isConfirmed) {
                  dispatch(actions.deleteArea(row?.id));
                }
              })
            }
          ></ActionButton>
        ),
      },
    ],
    [areas],
  );

  return (
    <>
      <ModalAddressForm
        provinces={provinces}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        type="Area"
      ></ModalAddressForm>
      <Breadcrumb parent="Dashboard" title="Areas" />
      <Container fluid className="m-0 p-0 ml-1">
        <Alert
          className="mb-2"
          showIcon
          closable
          type="info"
          message="Please select province, district and municipality to edit areas of the selected municipality"
        ></Alert>
        <div className="feature-products">
          <Row className="mb-1">
            <Col xl="2" sm="2" className="mt-1">
              <Button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className="btn btn-primary"
              >
                <i className="bi bi-plus"></i>
                Add New
              </Button>
            </Col>
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
                      {p?.name}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
            <Col xl="3" sm="3" className="text-right">
              <div className="select2-drpdwn-product select-options ">
                <select
                  className="form-control btn-square"
                  name="select"
                  placeholder="Select District"
                  disabled={provinceId > 0 ? false : true}
                  onChange={(e) => {
                    setDistrictId(e.target.value);
                  }}
                  value={districtId}
                >
                  <option value={-1}>All district</option>
                  {districts?.map((d) => (
                    <option value={+d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
            </Col>
            <Col xl="3" sm="3" className="text-right">
              <div className="select2-drpdwn-product select-options ">
                <select
                  className="form-control btn-square"
                  name="select"
                  placeholder="Select District"
                  disabled={provinceId > 0 && districtId > 0 ? false : true}
                  onChange={(e) => {
                    setMunicipalityId(e.target.value);
                  }}
                  value={municipalityId}
                >
                  <option value={-1}>All Municipalities</option>
                  {municipalities?.map((d) => (
                    <option value={+d.id}>{d.name}</option>
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
            data={areas}
            striped={true}
            pagination
            responsive
            paginationServer
            progressPending={loading}
            paginationTotalRows={totalRow}
            onChangeRowsPerPage={(row, page) => {
              setPage(page);
              setRow(row);
            }}
            onChangePage={(page, row) => {
              setPage(page);
            }}
          />
          {!loading && municipalityId > 0 && areas.length > 0 && (
            <Button
              className="col-md-3 col-lg-3 col-sm-5 text-center mt-1 mb-1 px-1 py-1 ml-1"
              onClick={handleBulkSubmit}
            >
              {' '}
              Submit Changes
            </Button>
          )}
        </Card>
      </Container>
    </>
  );
};

export default Areas;
