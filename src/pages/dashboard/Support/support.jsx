import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import CKEditor from 'react-ckeditor-component';
import { FaQuestion } from 'react-icons/fa';
import { FcCheckmark } from 'react-icons/fc';
import { GrAddCircle } from 'react-icons/gr';
import { VscLoading } from 'react-icons/vsc';
import {
  Button, Card,
  CardBody, CardHeader, Col, Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody, ModalHeader, Row
} from 'reactstrap';
import {
  Featured, Filters,
  HighestPrices, LowestPrices,
  SupportTableHeader,
  SupportTableTitle,
  SupportView
} from '../../../constant';
import WidgetGlance from '../../../customizedComponents/Widget/WidgetGlance';
import Breadcrumb from '../../../layout/breadcrumb';

const datas = [
  {
    title: 'Total Problems',
    value: 20,
    icon: FaQuestion,
  },
  {
    title: 'New Problems Today',
    value: 2,
    icon: GrAddCircle,
  },
  {
    title: 'Pending Problems',
    value: 30,
    icon: VscLoading,
  },
  {
    title: 'Solved Problems',
    value: 20,
    icon: FcCheckmark,
  },
];

const Product = (props) => {


  useEffect(() => {
    axios
      .get(`${process.env.PUBLIC_URL}/api/support-edit-table.json`)
      .then((res) => setData(res.data));
  }, []);

  const [data, setData] = useState([]);

  const [modaledit, setModaledit] = useState(false);
  const toggleedit = () => setModaledit(!modaledit);

  return (
    <Fragment>
      <Breadcrumb parent="Ecommerce" title="Review" />

      <Modal className="modal-lg" isOpen={modaledit} toggle={toggleedit}>
        <ModalHeader toggle={toggleedit}> Support Page </ModalHeader>
        <ModalBody>
          <Row>
            <Col xl="12 xl-100">
              <Card>
                <CardBody>
                  <Row>
                    <Col xl="12" md="12">
                      <div className="prooduct-details-box">
                        <div className="media">
                          <img
                            className=" img-fluid img-60 ml-2"
                            src={require('../../../assets/images/user/1.jpg')}
                            alt="#"
                          />

                          <div className="media-body ml-3">
                            <div className="product-name">
                              <h6>
                                <a href="#javascript">ABX</a>
                              </h6>
                            </div>

                            <div className="  mr-1">
                              <p>
                                {' '}
                                I am not able to add item so please response as
                                soon as possible!!!!{' '}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xl="12" md="12">
                      <FormGroup className="mb-0">
                        <Label className="text-muted">Messages</Label>
                        <CKEditor activeclassName="p10" />
                      </FormGroup>
                      <Col sm="4">
                        <Button
                          color="primary"
                          className="btn-block btn-mail text-center  mt-3"
                        >
                          <i className="fa fa-paper-plane mr-2"></i>
                          Send
                        </Button>
                      </Col>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
      </Modal>

      <Container fluid={true} className="product-wrapper">
        <WidgetGlance data={datas} />
        <div className="product-grid">
          <div className="feature-products">
            <Row>
              <Col xl="3" sm="3">
                <div className={`product-sidebar }`}>
                  <div className="filter-section">
                    <Card>
                      <CardHeader>
                        <h6 className="mb-0 f-w-600">
                          {Filters}
                          <span className="pull-right">
                            <i className="fa fa-chevron-down toggle-data"></i>
                          </span>
                        </h6>
                      </CardHeader>
                      <div className="left-filter">
                        <CardBody className="filter-cards-view animate-chk">
                        </CardBody>
                      </div>
                    </Card>
                  </div>
                </div>
              </Col>
              <Col xl="6" sm="6">
                <Form>
                  <FormGroup className="m-0">
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="search"
                    />
                    <i className="fa fa-search"></i>
                  </FormGroup>
                </Form>
              </Col>

              <Col xl="3" sm="3" className="text-right">
                <div className="select2-drpdwn-product select-options ">
                  <select className="form-control btn-square" name="select">
                    <option value="Featured">{Featured}</option>
                    <option value="LowestPrices">{LowestPrices}</option>
                    <option value="HighestPrices">{HighestPrices}</option>
                  </select>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="edit-profile">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between">
                    <h4 className="card-title mb-0 ">{SupportTableTitle}</h4>
                  </div>

                  <div className="card-options">
                    <a
                      className="card-options-collapse"
                      href="#javascript"
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-up"></i>
                    </a>
                    <a
                      className="card-options-remove"
                      href="#javascript"
                      data-toggle="card-remove"
                    >
                      <i className="fe fe-x"></i>
                    </a>
                  </div>
                </CardHeader>
                <div className="table-responsive">
                  <table className="table card-table table-vcenter text-nowrap">
                    <thead>
                      <tr>
                        {SupportTableHeader.map((items, i) => (
                          <th key={i}>{items}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((items, i) => (
                        <tr key={i}>
                          <td>{items.VendorName} </td>
                          <td>{items.Email}</td>
                          <td>{items.PhoneNumber}</td>
                          <td> {items.Problem} </td>
                          <td className="text-right">
                            <Button
                              color="primary"
                              onClick={toggleedit}
                              size="sm"
                            >
                              {SupportView}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default Product;
