import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Progress,
  Spinner,
} from 'reactstrap';
import { message, Switch } from 'antd';
import { DealTableHeader, Delete, Edit } from '../../../constant';
import Breadcrumb from '../../../layout/breadcrumb';
import actions from './redux/actions';
import Moment from 'react-moment';
import Loading from 'components/ProgressModal/Progress';
import { useHistory } from 'react-router-dom';
import { updateDealApi } from 'api/fetchDeals';

const AllDeals = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const deals = useSelector((state) => state.Deal.Deals);

  const [modalDelete, setModalDelete] = useState(false);
  const [modalDeleteId, setModalDeleteId] = useState(null);
  const [modaledit, setModaledit] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [activeVal, setActiveVal] = useState(null);
  const [filteredData, setFilteredData] = useState(deals);

  const showModal = (id) => {
    setModalDeleteId(id);
    setModalDelete(true);
  };
  const deleteDeal = (id) => {
    setModalDelete(false);
    dispatch(actions.dltDealsReq(id));
  };

  const handleStatus = (e, deal) => {
    setSelectedID(deal?.id);
    // dispatch(actions.updateDealsReq({ isActive: !deal?.isActive, name: deal?.name },deal?.id,false))
    updateDealApi({ isActive: !deal?.isActive, name: deal?.name }, deal.id)
      .then((response) => {
        message.success('Status Updated successfully');
        dispatch({
          type: actions.UPDATE_DEAL_REQ,
          payload: { isActive: !deal.isActive, id: deal?.id },
        });
        setSelectedID(null);
      })
      .catch((err) => {
        setSelectedID(null);
        message.error('Update Failed !!');
      });
  };

  const DealsStates = useSelector((state) => state.Deal);
  const toggleedit = () => setModaledit(!modaledit);

  useEffect(() => {
    dispatch(actions.getDealsReq());
  }, []);

  const handleSearch = (e) => {
    let value = e.target.value;
    const result = Array.from(
      deals.filter(
        (v) => v.name && v.name.toLowerCase().includes(value.toLowerCase()),
      ),
    );
    setFilteredData(result);
  };

  return (
    <Fragment>
      {/**Loading Modal*/}
      <Loading
        show={DealsStates?.getDeals?.loading || DealsStates?.loading}
        title={'Loading....'}
        type="info"
      />
      <Loading
        show={DealsStates?.deleteDeal?.loading}
        title={'Deleting....'}
        type="danger"
      />
      {/**Loading Modal Ends*/}

      {/**Edit Modal*/}
      <Modal isOpen={modaledit}>
        <ModalHeader toggle={toggleedit}>Edit Deal</ModalHeader>
        <ModalBody>
          <Form className="theme-form">
            <FormGroup className="row">
              <Label className="col-sm-4 col-form-label">Deal Name</Label>
              <Col sm="8">
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Deal Name"
                />
              </Col>
            </FormGroup>

            <FormGroup className="row">
              <Label className="col-sm-4 col-form-label">Description</Label>
              <Col sm="8">
                <Input
                  className="form-control"
                  type="text"
                  placeholder="description"
                />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => setModaledit(false)}>
            Close
          </Button>
          <Button color="secondary">SaveChanges</Button>
        </ModalFooter>
      </Modal>
      {/** Edit Modal Ends*/}

      {/** Delete Modal */}
      <Modal
        isOpen={modalDelete}
        toggle={() => {
          setModalDelete(false);
        }}
      >
        <ModalHeader
          toggle={() => {
            setModalDelete(false);
          }}
        >
          Delete Deals
        </ModalHeader>
        <ModalBody>Are you sure you want to delete this deal??</ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              setModalDeleteId(null);
              setModalDelete(false);
            }}
          >
            Close
          </Button>
          <Button
            color="danger"
            size="sm"
            onClick={() => deleteDeal(modalDeleteId)}
          >
            <i className="fa fa-trash"></i> {Delete}
          </Button>
        </ModalFooter>
      </Modal>
      {/** Delete Modal Ends*/}

      <Breadcrumb parent="Dashboard" title="Deals" />
      <Container fluid={true}>
        {/* filter */}
        <div className="feature-products">
          <Row>
            {/* <Col xl="3" sm="3">
              <div className={`product-sidebar }`}>
                <div className="filter-section">
                  <Card>
                    <CardHeader>
                      <h6 className="mb-0 f-w-600">
                        Filters
                        <span className="pull-right">
                          <i className="fa fa-chevron-down toggle-data"></i>
                        </span>
                      </h6>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </Col> */}
            <Col xl="6" sm="6">
              <Form>
                <FormGroup className="m-0">
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Search by name"
                    onChange={(e) => handleSearch(e)}
                  />
                  {/* <i className="fa fa-search"></i> */}
                </FormGroup>
              </Form>
            </Col>

            {/* <Col xl="3" sm="3" className="text-right">
              <div className="select2-drpdwn-product select-options ">
                <select className="form-control btn-square" name="select">
                  <option value="Featured">Featured</option>
                  <option value="LowestPrices">LowestPrices</option>
                  <option value="HighestPrices">HighestPrices</option>
                </select>
              </div>
            </Col> */}
          </Row>
        </div>
        {deals?.length ? (
          <div className="edit-profile">
            <Row>
              <Col md="12">
                <Card>
                  <div className="table-responsive">
                    <table className="table card-table table-vcenter text-nowrap">
                      <thead>
                        <tr>
                          {DealTableHeader.map((items, i) => (
                            <th key={i}>{items}</th>
                          ))}

                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.length ? (
                          filteredData.map((deal) => (
                            <tr key={deal?.id}>
                              <td>{deal?.name}</td>
                              <td>
                                {' '}
                                {deal?.description?.length > 20
                                  ? `${deal?.description.slice(0, 30)}...`
                                  : deal?.description}
                              </td>
                              <td>{deal?.dailyFeatured ? 'true' : 'false'}</td>
                              <td>{deal?.setDate ? 'true' : 'false'}</td>
                              <td>
                                {deal?.startDate ? (
                                  <Moment format="YYYY-MM-DD HH:mm">
                                    {deal?.startDate}
                                  </Moment>
                                ) : (
                                  '---'
                                )}
                              </td>
                              <td>
                                {deal?.endDate ? (
                                  <Moment format="YYYY-MM-DD HH:mm">
                                    {deal.endDate}
                                  </Moment>
                                ) : (
                                  '---'
                                )}
                              </td>
                              <td>{deal?.setDiscount ? 'true' : 'false'}</td>
                              <td>
                                {deal?.discountType
                                  ? deal?.discountType
                                  : '---'}
                              </td>
                              <td>
                                {deal?.discountValue
                                  ? deal?.discountValue
                                  : '---'}
                              </td>
                              <td>
                                <Switch
                                  checked={
                                    deal?.id === selectedID
                                      ? !deal?.isActive
                                      : deal?.isActive
                                  }
                                  onChange={(e) => handleStatus(e, deal)}
                                ></Switch>
                              </td>

                              <td className="text-right">
                                <Button
                                  color="success"
                                  size="sm"
                                  onClick={() =>
                                    history.push(
                                      `/dashboard/deal/${deal?.id}/edit`,
                                    )
                                  }
                                >
                                  <i className="fa fa-pencil"></i> {Edit}
                                </Button>
                                <Button
                                  color="danger"
                                  size="sm"
                                  onClick={() => showModal(deal.id)}
                                >
                                  <i className="fa fa-trash"></i> {Delete}
                                </Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <div className="">No data</div>
                        )}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        ) : (
          <Spinner></Spinner>
        )}
      </Container>
    </Fragment>
  );
};

export default AllDeals;
