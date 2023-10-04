import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../../layout/breadcrumb';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  FormGroup,
  Form,
  Input,
  Modal,
  ModalHeader,
  Label,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import WidgetGlance from '../../../components/CardWidget/WidgetGlance';

import { BecomeMember, PlansTableHeader } from '../../../constant';
import Axios from 'axios';
const Plans = (props) => {

  const datas = [
    {
      title: 'Monthly basis',
      price: '0',
      plan: 'mo',
      advantage: 'can add and sell items',
    },
    {
      title: 'Monthly basis',
      price: '10',
      plan: '3-mo',
      advantage: 'can add and sell items',
    },
    {
      title: 'Monthly basis',
      price: '100',
      plan: 'mo',
      advantage: 'can add and sell items',
    },
    {
      title: 'Monthly basis',
      price: '10',
      plan: 'mo',
      advantage: 'can add and sell items',
    },
  ];
  useEffect(() => {
    Axios.get(
      `${process.env.PUBLIC_URL}/api/plans-edit-table.json`,
    ).then((res) => setData(res.data));
  }, []);
  const [modaledit, setModaledit] = useState(false);

  const toggleedit = () => setModaledit(!modaledit);
  const [data, setData] = useState([]);

  return (
    <Fragment>
      <Breadcrumb parent="Price" title="Pricing" />
      <Container fluid={true}>
        <Modal isOpen={modaledit} toggle={toggleedit}>
          <ModalHeader toggle={toggleedit}>All Shops</ModalHeader>
          <ModalBody>
            <Form className="theme-form">
              <FormGroup className="row">
                <Label className="col-sm-4 col-form-label">Member's Name</Label>
                <Col sm="8">
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Shop Name"
                  />
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Label className="col-sm-4 col-form-label">Address</Label>
                <Col sm="8">
                  <Input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                  />
                </Col>
              </FormGroup>
              <FormGroup className="row">
                <Label className="col-sm-4 col-form-label">Email Address</Label>
                <Col sm="8">
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Address"
                  />
                </Col>
              </FormGroup>

              <FormGroup className="row">
                <Label className="col-sm-4 col-form-label">Plan</Label>
                <Col sm="8">
                  <Input
                    type="select"
                    name="select"
                    className="form-control digits"
                    defaultValue="1"
                  >
                    <option>1 month</option>
                    <option>2 month</option>
                  </Input>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleedit}>
              Close
            </Button>
            <Button color="secondary">SaveChanges</Button>
          </ModalFooter>
        </Modal>
        <Row>
          <Card className="plans__pricecard">
            <CardHeader>
              <h5>{BecomeMember}</h5>
            </CardHeader>
            <CardBody className=" justify-content-center">
              <WidgetGlance data={datas} />
            </CardBody>
          </Card>
        </Row>
        <div className="feature-products">
          <Row>
            <Col xl="3" sm="3">
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
                  <option value="Featured">Featured</option>
                  <option value="LowestPrices">LowestPrices</option>
                  <option value="HighestPrices">HighestPrices</option>
                </select>
              </div>
            </Col>
          </Row>
        </div>
        <Row>
          <Card className="plans__usercard">
            <CardHeader>
              <h5>Members</h5>
            </CardHeader>
            <div className="table-responsive">
              <table className="table card-table table-vcenter text-nowrap">
                <thead>
                  <tr>
                    {PlansTableHeader.map((items, i) => (
                      <th key={i}>{items}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((items, i) => (
                    <tr key={i}>
                      <td>{items.MemberName} </td>
                      <td>{items.Address}</td>
                      <td>{items.Email}</td>
                      <td> {items.SubscriptionType} </td>

                      <td className="text-right">
                        <Button onClick={toggleedit} color="primary" size="sm">
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Plans;
