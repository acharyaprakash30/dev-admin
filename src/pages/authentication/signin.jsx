import React, { useState } from 'react';
import { Facebook, GitHub, Twitter } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import AlertItemWithIcon from '../../components/Alert/AlertItemWithIcon';
import {
  CreateAccount,
  EmailAddress,
  Password,
  RememberPassword,
} from '../../constant';
import authAction from '../../pages/authentication/redux/actions';

const Logins = (props) => {
  const [email, setEmail] = useState('admin');
  const [password, setPassword] = useState('test123!@#');
  const [togglePassword, setTogglePassword] = useState(false);
  const auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const loginWithJwt = (email, password) => {
    let reqObject = { username: email, password };
    dispatch(authAction.login(reqObject));
  };
  if (auth.isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Container fluid={true} className="p-0">
      <Row>
        <Col xs="12">
          <div className="login-card">
            <div>
              <div>
                <a className="logo" href="index.html">
                  <img
                    className="img-fluid for-light logo-login-light"
                    src={require('../../assets/images/logo/login.png')}
                    alt=""
                  />
                  <img
                    className="img-fluid for-dark"
                    src={require('../../assets/images/logo/logo_dark.png')}
                    alt=""
                  />
                </a>
              </div>
              <div className="login-main login-tab">
                <Form className="theme-form fade-show">
                  <h4>Sign In</h4>
                  <p>{'Enter your email & password to login'}</p>
                  {auth?.statusCode ? <AlertItemWithIcon /> : null}
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input
                      className="form-control"
                      type="email"
                      required=""
                      onChange={(e) => setEmail(e.target.value)}
                      defaultValue={email}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">{Password}</Label>
                    <Input
                      className="form-control"
                      type={togglePassword ? 'text' : 'password'}
                      onChange={(e) => setPassword(e.target.value)}
                      defaultValue={password}
                      required=""
                    />
                    <div
                      className="show-hide"
                      onClick={() => setTogglePassword(!togglePassword)}
                    >
                      <span className={togglePassword ? '' : 'show'}></span>
                    </div>
                  </FormGroup>
                  <div className="form-group mb-0">
                    <div className="checkbox ml-3">
                      <Input id="checkbox1" type="checkbox" />
                      <Label className="text-muted" for="checkbox1">
                        {RememberPassword}
                      </Label>
                    </div>
                    {/* <a className="link" href="#javascript">
                      {ForgotPassword}
                    </a> */}
                    <Button
                      color="primary"
                      className="btn-block"
                      onClick={() => loginWithJwt(email, password)}
                    >
                      Login
                    </Button>
                  </div>
                  <h6 className="text-muted mt-4 or">{'Or Sign in with'}</h6>
                  <div className="social mt-4">
                    <div className="btn-showcase">
                      <Button color="light">
                        <Facebook className="txt-fb" />
                      </Button>
                      <Button color="light">
                        <i className="icon-social-google txt-googleplus"></i>
                      </Button>
                      <Button color="light">
                        <Twitter className="txt-twitter" />
                      </Button>
                      <Button color="light">
                        <GitHub />
                      </Button>
                    </div>
                  </div>
                  <p className="mt-4 mb-0">
                    {"Don't have account?"}
                    <a className="ml-2" href="/signup">
                      {CreateAccount}
                    </a>
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(Logins);
