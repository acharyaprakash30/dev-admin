import React, { Fragment, useState, useRef } from 'react';
import Breadcrumb from '../../layout/breadcrumb';
import { Container, Row, Col, Card, CardHeader, Media } from 'reactstrap';
import {
  Email,
  MarekjecnoMailId,
  BOD,
  DDMMYY,
  Designer,
  ContactUs,
  ContactUsNumber,
  LocationDetails,
  MarkJecno,
  Follower,
  Following,
  Location,
} from '../../constant';
const UserProfile = (props) => {
  const [url, setUrl] = useState();

  const readUrl = (event) => {
    if (event.target.files.length === 0) return;
    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      setUrl(reader.result);
    };
  };
  return (
    <Fragment>
      <Breadcrumb parent="Users" title="User Profile" />
      <Container fluid={true}>
        <div className="user-profile">
          <Row>
            <Col sm="12">
              <Card className="card hovercard text-center">
                <CardHeader className="cardheader"></CardHeader>
                <div className="user-image">
                  <div className="avatar">
                    <Media
                      body
                      alt=""
                      src={
                        url ? url : require('../../assets/images/user/7.jpg')
                      }
                      data-intro="This is Profile image"
                    />
                  </div>
                  <div
                    className="icon-wrapper"
                    data-intro="Change Profile image here"
                  >
                    <i className="icofont icofont-pencil-alt-5">
                      <input
                        className="upload"
                        type="file"
                        onChange={(e) => readUrl(e)}
                      />
                    </i>
                  </div>
                </div>
                <div className="info">
                  <Row>
                    <Col sm="6" lg="4" className="order-sm-1 order-xl-0">
                      <Row>
                        <Col md="6">
                          <div className="ttl-info text-left">
                            <h6>
                              <i className="fa fa-envelope mr-2"></i> {Email}
                            </h6>
                            <span>ecommerce@email.com</span>
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="ttl-info text-left ttl-sm-mb-0">
                            <h6>
                              <i className="fa fa-calendar"></i>   
                              {BOD}
                            </h6>
                            <span>{DDMMYY}</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm="12" lg="4" className="order-sm-0 order-xl-1">
                      <div className="user-designation">
                        <div className="title">
                          <a target="_blank" href="#javascript">
                            {MarkJecno}
                          </a>
                        </div>
                        <div className="desc mt-2">Admin</div>
                      </div>
                    </Col>
                    <Col sm="6" lg="4" className="order-sm-2 order-xl-2">
                      <Row>
                        <Col md="6">
                          <div className="ttl-info text-left ttl-xs-mt">
                            <h6>
                              <i className="fa fa-phone"></i>   
                              {ContactUs}
                            </h6>
                            <span>+977 1234567890</span>
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="ttl-info text-left ttl-sm-mb-0">
                            <h6>
                              <i className="fa fa-location-arrow"></i>
                                 {Location}
                            </h6>
                            <span> 127, Shankhamul, Kathmandu</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <hr />
                  <div
                    className="social-media step4"
                    data-intro="This is your Social details"
                  >
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <a href="#javascript">
                          <i className="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#javascript">
                          <i className="fa fa-google-plus"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#javascript">
                          <i className="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#javascript">
                          <i className="fa fa-instagram"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#javascript">
                          <i className="fa fa-rss"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="follow">
                    <Row>
                      <Col col="6" className="text-md-right border-right">
                        <div className="follow-num counter">{'25869'}</div>
                        <span>Products Listed</span>
                      </Col>
                      <Col col="6" className="text-md-left">
                        <div className="follow-num counter">{'659887'}</div>
                        <span>Products sold</span>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default UserProfile;
