import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../layout/breadcrumb';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from 'reactstrap';
import { ArrowUp, X } from 'react-feather';
import {
  NewOrder,
  ShippedOrders,
  CancelledOrders,
  Price,
} from '../../constant';
import axios from 'axios';

const widgetData = [
  {
    title: 'New Orders',
    value: 45,
    icon: ArrowUp,
  },
  {
    title: 'Shi',
    value: 45,
    icon: ArrowUp,
  },
  {
    title: 'New Orders',
    value: 45,
    icon: ArrowUp,
  },
];

const OrderHistory = (props) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products`)
      .then((res) => setOrders(res.data));
  }, []);
  return (
    <Fragment>
      <Breadcrumb parent="Ecommerce" title="Recent Orders" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{NewOrder}</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  {orders.slice(0, 9).map((items, i) => (
                    <Col xl="4" md="6" key={i}>
                      <div className="prooduct-details-box">
                        <div className="media">
                          <img
                            className="align-self-center img-fluid img-60"
                            src={items.image}
                            alt="#"
                          />
                          <div className="media-body ml-3">
                            <div className="product-name">
                              <h6>
                                <a href="#javascript">{items.title}</a>
                              </h6>
                            </div>
                            <div className="rating">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                            <div className="price d-flex">
                              <div className="text-muted mr-2">{Price}</div>:{' '}
                              {items.price}
                            </div>
                            <div className="avaiabilty">
                              <div className="text-success">{items.id}</div>
                            </div>
                            <Button color="primary" size="xs">
                              {items.category}
                            </Button>
                            <X className="close" />
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{ShippedOrders}</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  {orders.slice(9, 18).map((items, i) => (
                    <Col xl="4" md="6" key={i}>
                      <div className="prooduct-details-box">
                        <div className="media">
                          <img
                            className="align-self-center img-fluid img-60"
                            src={items.image}
                            alt="#"
                          />
                          <div className="media-body ml-3">
                            <div className="product-name">
                              <h6>
                                <a href="#javascript">{items.title}</a>
                              </h6>
                            </div>
                            <div className="rating">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                            <div className="price d-flex">
                              <div className="text-muted mr-2">{Price}</div>:{' '}
                              {items.price}
                            </div>
                            <div className="avaiabilty">
                              <div className="text-success">{items.id}</div>
                            </div>
                            <Button color="success" size="xs">
                              {items.category}
                            </Button>
                            <X className="close" />
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{CancelledOrders}</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  {orders.slice(18, 27).map((items, i) => (
                    <Col xl="4" md="6" key={i}>
                      <div className="prooduct-details-box">
                        <div className="media">
                          <img
                            className="align-self-center img-fluid img-60"
                            src={items.image}
                            alt="#"
                          />
                          <div className="media-body ml-3">
                            <div className="product-name">
                              <h6>
                                <a href="#javascript">{items.title}</a>
                              </h6>
                            </div>
                            <div className="rating">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                            <div className="price d-flex">
                              <div className="text-muted mr-2">{Price}</div>:{' '}
                              {items.price}
                            </div>
                            <div className="avaiabilty">
                              <div className="text-success">{items.id}</div>
                            </div>
                            <Button color="danger" size="xs">
                              {items.category}
                            </Button>
                            <X className="close" />
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default OrderHistory;
