import React, { Fragment, useState } from 'react';
import { Star } from 'react-feather';
import { BiTrendingDown } from 'react-icons/bi';
import { CgMathEqual } from 'react-icons/cg';
import { IoTrendingUpSharp } from 'react-icons/io5';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Media,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from 'reactstrap';
import {
  Brand,
  Featured,
  Filters,
  HighestPrices,
  LowestPrices,
  Next,
  Previous,
} from '../../../constant';
import WidgetGlance from '../../../components/Widget/WidgetGlance';
import Breadcrumb from '../../../layout/breadcrumb';
import config from '../../../appconfig.json';

const datas = [
  {
    title: 'Total Reviews',
    value: 400,
    icon: Star,
  },
  {
    title: 'Average Reviews',
    value: 4,
    icon: CgMathEqual,
  },
  {
    title: 'Lowest Review',
    value: 1,
    icon: BiTrendingDown,
  },
  {
    title: 'Highest Review',
    value: 5,
    icon: IoTrendingUpSharp,
  },
];

const CustomerReview = (props) => {
  const [reviews] = useState([]);

  const [savereply, setCommentbox] = useState(false);
  const [modaledit, setModaledit] = useState(false);

  const commentbox = () => setCommentbox(!savereply);
  const toggleedit = () => setModaledit(!modaledit);

  return (
    <Fragment>
      <Breadcrumb parent={config.appName} title="Review" />

      <Modal className="modal-lg" isOpen={modaledit} toggle={toggleedit}>
        <ModalHeader toggle={toggleedit}>Edit Users</ModalHeader>
        <ModalBody>
          <Row>
            <Col xl="12 xl-100">
              <Card>
                <CardBody>
                  <Row>
                    <Col xl="6" md="12">
                      <div className="product-page-details">
                        <h3>Women Pink shirt.</h3>
                      </div>

                      <div>
                        <table className="product-page-width">
                          <tbody>
                            <tr>
                              <td>
                                {' '}
                                <b>{Brand} &nbsp;&nbsp;&nbsp;:</b>
                              </td>
                              <td>{'Pixelstrap'}</td>
                            </tr>

                            <tr>
                              <td>
                                {' '}
                                <b>
                                  {'Seller'} &nbsp;&nbsp;&nbsp;:
                                  &nbsp;&nbsp;&nbsp;
                                </b>
                              </td>
                              <td>{'ABC'}</td>
                            </tr>
                            <tr>
                              <td>
                                {' '}
                                <b>
                                  {'Fabric'} &nbsp;&nbsp;&nbsp;:
                                  &nbsp;&nbsp;&nbsp;
                                </b>
                              </td>
                              <td>{'Cotton'}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Col>
                    <Col xl="4" md="6">
                      <div className="media">
                        <Media
                          className="img-thumbnail  "
                          src={require('../../../assets/images/product/15.png')}
                          alt="Generic placeholder image"
                        />
                      </div>
                    </Col>
                  </Row>
                  <hr />

                  <hr />
                  <Row>
                    <Col md="6">
                      <h6 className="product-title">{'Ratings'}</h6>
                    </Col>
                  </Row>
                  <Row>
                    {reviews.slice(0, 9).map((items, i) => (
                      <Col xl="12" md="12" key={i}>
                        <div className="prooduct-details-box">
                          <div className="media">
                            <img
                              className=" img-fluid img-60 ml-2"
                              src={require('../../../assets/images/' +
                                items.img)}
                              alt="#"
                            />

                            <div className="media-body ml-3">
                              <div className="product-name">
                                <h6>
                                  <a href="#javascript">{items.username}</a>
                                </h6>
                              </div>
                              <div className="rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                              </div>
                              <div className="review mr-1">
                                <p> {items.review} </p>
                              </div>

                              <Col xl="4" md="6">
                                <div className="reviewreply d-flex mt-2 justify-content-between">
                                  <div className="likeicon">
                                    <span>Like</span>
                                    <i className="fa fa-thumbs-o-up ml-1"></i>
                                  </div>
                                  <div className="commenticon">
                                    <span>Comment</span>
                                    <i
                                      onClick={commentbox}
                                      className="icon-comment-alt ml-1"
                                    ></i>
                                  </div>
                                </div>
                              </Col>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </CardBody>

                <nav aria-label="Page navigation example">
                  <Pagination
                    className="pagination justify-content-end pagination-primary"
                    aria-label="Page navigation example"
                  >
                    <PaginationItem>
                      <PaginationLink href="#javascript">
                        {Previous}
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#javascript">{'1'}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#javascript">{'2'}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#javascript">{'3'}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#javascript">{Next}</PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleedit}>
            Close
          </Button>
          <Button color="secondary">SaveChanges</Button>
        </ModalFooter>
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
                          {/* <Allfilters /> */}
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
            <Col md="4">
              <Card className="custom-card widget-profile">
                <CardHeader>
                  <p>
                    The Product Was Really Great. I really liked the Product
                    they sold me. Looking Forward to buy more.
                  </p>
                </CardHeader>
                <div className="text-center profile-details">
                  <h4>John Doe</h4>
                </div>
              </Card>
            </Col>
            <Col md="4">
              <Card className="custom-card widget-profile">
                <CardHeader>
                  <p>
                    The Product Was Really Great. I really liked the Product
                    they sold me. Looking Forward to buy more.
                  </p>
                </CardHeader>
                <div className="text-center profile-details">
                  <h4>John Doe</h4>
                </div>
              </Card>
            </Col>
            <Col md="4">
              <Card className="custom-card widget-profile">
                <CardHeader>
                  <p>
                    The Product Was Really Great. I really liked the Product
                    they sold me. Looking Forward to buy more.
                  </p>
                </CardHeader>
                <div className="text-center profile-details">
                  <h4>John Doe</h4>
                </div>
              </Card>
            </Col>
            <Col md="4">
              <Card className="custom-card widget-profile">
                <CardHeader>
                  <p>
                    The Product Was Really Great. I really liked the Product
                    they sold me. Looking Forward to buy more.
                  </p>
                </CardHeader>
                <div className="text-center profile-details">
                  <h4>John Doe</h4>
                </div>
              </Card>
            </Col>
            <Col md="4">
              <Card className="custom-card widget-profile">
                <CardHeader>
                  <p>
                    The Product Was Really Great. I really liked the Product
                    they sold me. Looking Forward to buy more.
                  </p>
                </CardHeader>
                <div className="text-center profile-details">
                  <h4>John Doe</h4>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default CustomerReview;
