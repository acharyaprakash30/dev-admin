import React, { Fragment, useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
} from 'reactstrap';
import config from 'appconfig.json';
import { NewProduct } from 'constant';
import Breadcrumb from 'layout/breadcrumb';

import OrderChart from './charts-data/orders';
import SalesChart from './charts-data/sales';
import axios from '../../../api/axios';
import Statistics from './Statistics';
import { useSelector } from 'react-redux';

const Dashboard = (props) => {
  const AllStates = useSelector((state) => state.Statistics);
  let totalPendingOrder = AllStates?.pendingOrder?.data?.count
    ? AllStates?.pendingOrder?.data?.count
    : 0;
  let totalDeliveredOrder = AllStates?.deliveredOrder?.data?.count
    ? AllStates?.deliveredOrder?.data?.count
    : 0;
  let totalActiveOrder = AllStates?.activeOrder?.data?.count
    ? AllStates?.activeOrder?.data?.count
    : 0;
  let totalCancelledOrder = AllStates?.cancelledOrder?.data?.count
    ? AllStates?.cancelledOrder?.data?.count
    : 0;

  let orderCount = [
    { name: 'Pending', value: totalPendingOrder },
    { name: 'Delivered', value: totalDeliveredOrder },
    { name: 'Active', value: totalActiveOrder },
    { name: 'Cancelled', value: totalCancelledOrder },
  ];

  const [product, setProduct] = useState([]);
  const [order, setOrder] = useState([]);
  const [totalCount, setTotalCount] = useState();

  // const fetchOrder = async () => {
  //   const response = await axios.get('/orders?pageNumber=0&pageSize=8');

  //   setOrder((await response.data).slice(-9).reverse());
  // };

  const fetchOrder = async () => {
    const response = await axios.get(
      '/orders?filter[limit]=10&filter[skip]=0&filter[order]=id DESC',
    );
    setOrder(await response.data.orderItems);
  };

  // const fetchProduct = async () => {
  //   const response = await axios.get(
  //     '/products?filter[limit]=10&filter[skip]=0',
  //   );
  //   console.log(response,'RESPONDSE')
  //   setProduct(await response.data.products);
  // };

  const fetchProduct = async () => {
    const response = await axios.get(
      '/admin-products?filter[limit]=10&filter[skip]=0&filter[order]=id DESC',
    );
    setProduct(await response.data.adminProducts);
  };

  useEffect(() => {
    fetchProduct();
    fetchOrder();
  }, []);

  // eslint-disable-next-line
  // const [location, setlocation] = useState({
  //   address: false,
  //   mapPosition: {
  //     lat: 18.5204,
  //     lng: 73.8567,
  //   },
  //   markerPosition: {
  //     lat: 18.5204,
  //     lng: 73.8567,
  //   },
  // });

  // const BasicMap = withScriptjs(
  //   withGoogleMap((props) => (
  //     <GoogleMap
  //       google={props.google}
  //       defaultZoom={15}
  //       defaultCenter={{
  //         lat: location.mapPosition.lat,
  //         lng: location.mapPosition.lng,
  //       }}
  //     ></GoogleMap>
  //   )),
  // );

  // const settings = {
  //   className: 'center',
  //   centerMode: true,
  //   dots: false,
  //   arrows: false,
  //   infinite: true,
  //   speed: 500,
  //   centerPadding: '5px',
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  return (
    <Fragment>
      <Breadcrumb parent="Dashboard" title={config.appName} />
      <Container fluid={true}>
        <Row className="size-column">
          <Col xl="12 xl-100" className="box-col-12 ">
            <Row className="dash-chart">
              <Statistics />
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xl="12 xl-100" className="box-col-12 mb-4">
            <div className="chart-container w-100">
              <div className="chartCard w-100">
                <SalesChart></SalesChart>
              </div>
              <div className="chartCard w-100 ">
                <OrderChart
                  counterArr={orderCount}
                  total={totalCount}
                ></OrderChart>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl="12 xl-50" className="box-col-12">
            <Card>
              <CardHeader className="card-no-border">
                <h5>{NewProduct}</h5>
                <div className="card-header-right">
                  <ul className="list-unstyled card-option">
                    <li>
                      <i className="fa fa-spin fa-cog"></i>
                    </li>
                    <li>
                      <i className="view-html fa fa-code"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-maximize full-card"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-minus minimize-card"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-refresh reload-card"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-error close-card"></i>
                    </li>
                  </ul>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="our-product">
                  <h1></h1>
                  <div className="table-responsive">
                    <Table borderless>
                      <tbody className="f-w-500">
                        {product?.map((pr) => (
                          <tr key={pr?.id}>
                            <td>
                              <div
                                className=" media"
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-around',
                                  alignItems: 'center',
                                }}
                              >
                                <img
                                  src={
                                    pr.images
                                      ? `https://localhost/${pr?.images[0]?.url}`
                                      : 'favicon.ico'
                                  }
                                  alt=""
                                  className="p-1"
                                  height={50}
                                  width={50}
                                />
                                <div className="media-body ">
                                  <span>{pr?.name}</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p>Price</p>
                              <span>{pr.salePrice}</span>
                            </td>
                            <td>
                              <p>{'-51%'}</p>
                              <span>{pr.salePrice}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl="12 xl-50" className="box-col-12">
            <Card>
              <CardHeader className="card-no-border">
                <h5>Latest Orders</h5>
                <div className="card-header-right">
                  <ul className="list-unstyled card-option">
                    <li>
                      <i className="fa fa-spin fa-cog"></i>
                    </li>
                    <li>
                      <i className="view-html fa fa-code"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-maximize full-card"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-minus minimize-card"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-refresh reload-card"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-error close-card"></i>
                    </li>
                  </ul>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="our-product">
                  <div className="table-responsive">
                    <Table borderless>
                      <tbody className="f-w-500">
                        {order?.map((ord) => (
                          <tr key={ord?.id}>
                            <td>
                              <div className="media">
                                <div className="media-body ">
                                  <span>Tracking Code</span>
                                  <p className="font-roboto">
                                    {ord?.tracking_code}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p>User Name</p>
                              <span>
                                {ord?.user?.firstName} {ord?.user?.lastName}
                              </span>
                            </td>
                            <td>
                              <p>Amount</p>
                              <span>{ord?.amount}</span>
                            </td>
                            <td>
                              <p>Status</p>
                              <span>{ord?.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
