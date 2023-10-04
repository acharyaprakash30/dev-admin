import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, Col, Container, Media, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { Email, ContactUs, Location } from '../../../constant';
import Breadcrumb from '../../../layout/breadcrumb';
import actions from './redux/actions';
import defaultUserImg from 'assets/images/avtar/dafault-user.jpg';
import axios from '../../../api/axios';
import paths from 'route/paths';
import config from 'config/app';

const UserProfile = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [img, setImg] = useState('');
  const profile = useSelector((state) => state.Profile.profile);

  useEffect(() => {
    dispatch(actions.fetchProfileReq());
  }, [img]);

  let currentUser = profile && profile?.length > 0 ? profile[0] : null;
  /**User Image */
  let UserImage = '';
  if (!currentUser || !currentUser?.avatar) {
    UserImage = defaultUserImg;
  } else {
    UserImage = `${config.baseURL}${currentUser?.avatar}`;
  }

  /**User Image ends. */
  const readUrl = async (event) => {
    if (event.target.files.length === 0) return;
    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const formData = new FormData();
    formData.append('userImage', event.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = async (_event) => {
      const response = await axios.post(paths.assetManager, formData);
      setImg(await response.data[0].url);
      await axios.patch('/profile/update', {
        avatar: await response.data[0].url,
      });
    };
  };

  const readUrl1 = async (event) => {
    if (event.target.files.length === 0) return;
    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const formData = new FormData();
    formData.append('userImage', event.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = async (_event) => {
      const response = await axios.post(paths.assetManager, formData);
      setImg(await response.data[0].url);
      await axios.patch('/profile/update', {
        coverImage: [await response.data[0].url],
      });
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
                <CardHeader
                  className="cardheader"
                  style={{
                    background: `url(${UserImage})`,
                  }}
                ></CardHeader>
                <div className="user-image">
                  <div className="avatar">
                    <Media
                      body
                      alt=""
                      src={UserImage}
                      data-intro="This is Profile image"
                    />
                  </div>
                  <div
                    className="icon-wrapper"
                    data-intro="Change Profile image here"
                  >
                    <button
                      style={{
                        cursor: 'pointer',
                        backgroundColor: 'transparent',
                        border: 'none',
                      }}
                    >
                      <i className="icofont icofont-pencil-alt-5">
                        <input
                          className="upload"
                          type="file"
                          onChange={(e) => readUrl(e)}
                        />
                      </i>
                    </button>
                  </div>
                </div>
                <div className="info">
                  <Row>
                    <Col sm="6" lg="4" className="order-sm-1 order-xl-0">
                      <Row>
                        <Col md="6">
                          <div className="ttl-info text-left ttl-sm-mb-0">
                            <h6>
                              <i className="fa fa-user"></i>   User Name
                            </h6>
                            <span>{currentUser?.username}</span>
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="ttl-info text-left">
                            <h6>
                              <i className="fa fa-envelope mr-2"></i> {Email}
                            </h6>
                            <span>{currentUser?.email}</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm="12" lg="4" className="order-sm-0 order-xl-1">
                      <div className="user-designation">
                        <div className="title">
                          <a href="#javascript">
                            {currentUser?.firstName} {currentUser?.middleName}{' '}
                            {currentUser?.lastName}
                          </a>
                        </div>
                        <div className="desc mt-2">
                          {currentUser?.user_role}
                        </div>
                        <div>
                          <div>
                            <button
                              classname="font-weight-bold"
                              className="bg-transparent border-danger rounded"
                              onClick={() =>
                                history.push('/dashboard/userProfile/edit')
                              }
                            >
                              Edit Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col sm="6" lg="4" className="order-sm-2 order-xl-2">
                      <Row>
                        <Col md="6">
                          <div className="ttl-info text-left ttl-xs-mt">
                            <h6>
                              <i className="fa fa-phone"></i>   {ContactUs}
                            </h6>
                            <span>
                              {currentUser?.phone ?? '000 - 00000000'}
                            </span>
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="ttl-info text-left ttl-sm-mb-0">
                            <h6>
                              <i className="fa fa-location-arrow"></i>   
                              {Location}
                            </h6>
                            <span>
                              {currentUser?.address ?? '--------------'}
                            </span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <hr />
                  {/* <div
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
                  <div className="follow"></div> */}
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
