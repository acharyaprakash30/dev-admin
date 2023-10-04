import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Star } from 'react-feather';
import { Link } from 'react-router-dom';
import { BiTrendingDown } from 'react-icons/bi';
import { CgMathEqual } from 'react-icons/cg';
import { IoTrendingUpSharp } from 'react-icons/io5';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from 'reactstrap';
import {
  Featured,
  Filters,
  HighestPrices,
  LowestPrices,
  ReviewsTableHeader,
  ReviewsTableTitle,
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

const ReviewProducts = (props) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.PUBLIC_URL}/api/reviewProducts.json`)
      .then((res) => setProducts(res.data));
  }, []);

  const getAverageRatingStars = (avgRating) => {
    let totalRatings = [];
    for (var i = 0; i < avgRating; i++) {
      totalRatings.push(<i className="fa fa-star" key={i}></i>);
    }
    return totalRatings;
  };

  return (
    <Fragment>
      <Breadcrumb parent={config.appName} title="Review" />

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
            <Col md="12">
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between">
                    <h4 className="card-title mb-0 ">{ReviewsTableTitle}</h4>
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
                        {ReviewsTableHeader.map((items, i) => (
                          <th key={i}>{items}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((items, i) => (
                        <tr key={i}>
                          <td>{items.ProductName} </td>
                          <td>{items.TotalReviews}</td>
                          <td>{items.TotalRating}</td>
                          <td>
                            <div className="rating">
                              {getAverageRatingStars(
                                parseInt(items.AverageRating),
                              )}
                            </div>
                          </td>

                          <td className="text-right">
                            <Link
                              color="primary"
                              to={'/reviews-list/' + items.ProductID}
                              size="sm"
                            >
                              View
                            </Link>
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

export default ReviewProducts;
