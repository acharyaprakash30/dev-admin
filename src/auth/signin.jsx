import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import image from '../assets/images/logo/logo.png';
import AlertItemWithIcon from '../components/Alert/AlertItemWithIcon';
import LoaderButton from '../components/LoaderButton/LoaderButton';
import {
  EmailAddress,
  ForgotPassword,
  Password,
  RememberPassword,
} from '../constant';
import Header from '../layout/header';
import authAction from '../pages/authentication/redux/actions';
import SignSVG from '../assets/svg/signup.svg';
import KTMLogo from '../assets/images/logo/KTM-KART-logo.svg';
import { routerActions } from 'react-router-redux';
import history from 'app/history';

const Logins = (_props) => {
  const [togglePassword, setTogglePassword] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.AuthReducer);
  const isLoggedIn = localStorage.getItem('access_token');
  const { register, errors, handleSubmit } = useForm();

  const loginWithJwt = (data) => {
    dispatch(authAction.login(data));
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/dashboard');
    }
  }, [isLoggedIn]);

  // if (auth && auth.isLoggedIn) {
  //   const { location } = _props;
  //   const { state } = location;
  //   // go to state.from if set before
  //   if (state && state.from) {
  //     // window.history.replace(state.from);
  //   }
  // }

  //Regex for email and password validation
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{5,100}$/;

  //Email States
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  //Password States
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIspasswordValid] = useState(false);

  useEffect(() => {
    const isValidEmail = EMAIL_REGEX.test(email);
    setIsEmailValid(isValidEmail);
  }, [email]);

  useEffect(() => {
    const isValidPassword = PASSWORD_REGEX.test(password);
    setIspasswordValid(isValidPassword);
  }, [password]);

  return (
    <Container fluid={true} className="signup--fluid pr-0">
      <Row className="align-items-center">
        <Col lg="6" xs="12">
          <div className="login-image">
            <figure className="text-center">
              <img
                className="img-fluid mx-auto mb-2 ktm-logo"
                src={KTMLogo}
                alt="Ktm Kart"
              />
              <p className="mt-1 mb-4 w-full fw-bold">KtmKart, Buy and Sell.</p>
              <img className="img-fluid" src={SignSVG} alt="Signup" />
            </figure>
          </div>
        </Col>

        <Col xs="12" lg="6" className="bg-white">
          <div className="login-card">
            <div>
              <div className="login-main login-tab">
                <Form
                  className="theme-form fade-show"
                  onSubmit={handleSubmit(loginWithJwt)}
                >
                  <h4>Sign In</h4>
                  <p>{'Enter your email & password to login'}</p>
                  {/* {auth?.statusCode ? (
                    <AlertItemWithIcon
                      status={auth?.statusCode}
                      message={auth?.message}
                    />
                  ) : null} */}
                  <FormGroup>
                    {/* <Label className="col-form-label">{EmailAddress}</Label> */}
                    <Label className="col-form-label">Username</Label>
                    <Input
                      className="form-control"
                      name="username"
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      innerRef={register({
                        required: 'Enter username or email.',
                      })}
                      placeholder="Enter email"
                    />
                    {/* <span className="text-danger">
                      {isEmailValid || !email ? '' : 'Please Enter Valid Email'}
                    </span> */}

                    {errors?.username?.type === 'required' ? (
                      <div className="text-danger p-2">
                        Identifier is required
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">{Password}</Label>
                    <Input
                      name="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      type={togglePassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      innerRef={register({
                        required: 'Enter password.',
                      })}
                    />
                    <div
                      className="show-hide"
                      onClick={() => setTogglePassword(!togglePassword)}
                    >
                      <span className={togglePassword ? '' : 'show'}></span>
                    </div>

                    {/* //! no password check implementation */}
                    {/* <span className="text-danger">
                      {isPasswordValid || !password
                        ? ''
                        : 'Password must contain one upper, one lower, one numeric and one special characters (!@#$%)'}
                    </span> */}
                    {errors?.password?.type === 'required' ? (
                      <div className="text-danger p-2">
                        Password is required
                      </div>
                    ) : null}
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
                    <LoaderButton
                      title="Login"
                      color="primary"
                      className={`btn-block mt-3`}
                      // disabled={auth?.loading || auth?.fetchingCurrentUser}
                      // disabled={!isEmailValid && !isPasswordValid ?'true':''}
                      type="submit"
                      isLoading={auth?.loading || auth?.fetchingCurrentUser}
                    />
                  </div>
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
