import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import Breadcrumb from '../../../layout/breadcrumb';
import actions from './redux/actions';

const Addvendor = (props) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const handleForm = (data) => {
    dispatch(actions.sendVendorReq({ ...data, username: data.email }));
  };

  return (
    <Fragment>
      <Breadcrumb parent="Form" title="Add Vendor" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Vendor Details</h5>
              </CardHeader>
              <Form
                onSubmit={handleSubmit(handleForm)}
                className="form theme-form"
              >
                <CardBody>
                  <Row>
                    <Col>
                      <Form className="theme-form">
                        <FormGroup className="row">
                          <Label className="col-sm-3 col-form-label">
                            First Name
                          </Label>
                          <Col sm="9">
                            <Input
                              className="form-control"
                              type="text"
                              name="firstName"
                              innerRef={register({
                                required: true,
                              })}
                              placeholder="First Name"
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup className="row">
                          <Label className="col-sm-3 col-form-label">
                            Middle Name
                          </Label>
                          <Col sm="9">
                            <Input
                              className="form-control"
                              type="text"
                              name="middleName"
                              innerRef={register()}
                              placeholder="Middle Name"
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup className="row">
                          <Label className="col-sm-3 col-form-label">
                            Last Name
                          </Label>
                          <Col sm="9">
                            <Input
                              className="form-control"
                              type="text"
                              name="lastName"
                              innerRef={register()}
                              placeholder="Last Name"
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup className="row">
                          <Label className="col-sm-3 col-form-label">
                            Email
                          </Label>
                          <Col sm="9">
                            <Input
                              className="form-control"
                              type="email"
                              name="email"
                              innerRef={register({
                                required: true,
                              })}
                              placeholder="Email"
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup className="row">
                          <Label className="col-sm-3 col-form-label">
                            username
                          </Label>
                          <Col sm="9">
                            <Input
                              className="form-control"
                              type="text"
                              name="username"
                              innerRef={register({
                                required: true,
                              })}
                              placeholder="username"
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup className="row">
                          <Label className="col-sm-3 col-form-label">
                            Password
                          </Label>
                          <Col sm="9">
                            <Input
                              className="form-control"
                              type="password"
                              name="password"
                              innerRef={register({
                                required: true,
                              })}
                              placeholder="password"
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup className="row">
                          <Label className="col-sm-3 col-form-label">
                            Phone Number
                          </Label>
                          <Col sm="9">
                            <Input
                              className="form-control"
                              type="number"
                              name="phone"
                              innerRef={register({
                                required: true,
                              })}
                              placeholder="Number"
                            />
                          </Col>
                        </FormGroup>
                      </Form>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit" className="mr-1">
                    Add Vendor
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Addvendor;
