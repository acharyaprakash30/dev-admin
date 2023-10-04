import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../layout/breadcrumb';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Media,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';
import axios from 'axios';
import {
  UsersTableTitle,
  UsersTableHeader,
  // Edit,
  // Update,
  // Delete,
} from '../../constant';
import { useDispatch } from 'react-redux';
import UploadImage from '../../components/upload/UploadImage';

import actions from './redux/actions';
import ActionButton from '../../components/ActionButtons/ActionButtons';

const UserEdit = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${process.env.PUBLIC_URL}/api/user-edit-table.json`)
      .then((res) => setData(res.data));
    dispatch(actions.fetchDataReq());
  }, []);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modaledit, setModaledit] = useState(false);

  const toggleedit = () => setModaledit(!modaledit);
  const toggle = () => setModal(!modal);

  const onDelete = () => {
    //delete action
  };
  const onEdit = () => {
    //delete action
  };
  const onUpdate = () => {
    //delete action
  };

  return (
    <Fragment>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add User</ModalHeader>
        <ModalBody>
          <Form className="theme-form">
            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">First Name</Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="text"
                  placeholder="First Name"
                />
              </Col>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">Middle Name</Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Middle Name"
                />
              </Col>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">Last Name</Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Last Name"
                />
              </Col>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">Email</Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                />
              </Col>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">Password</Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                />
              </Col>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">
                Re-enter Password
              </Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="password"
                  placeholder="Re-Password"
                />
              </Col>
            </FormGroup>
            <div>
              <UploadImage title="Profile Image" isMultiple={false} />
            </div>
            <FormGroup className="row">
              <Label className="col-sm-2 col-form-label">Roles</Label>
              <Input
                type="select"
                name="select"
                className="form-control digits"
                defaultValue="1"
              >
                <option>admin</option>
                <option>staff</option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Close
          </Button>
          <Button color="secondary">SaveChanges</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modaledit} toggle={toggleedit}>
        <ModalHeader toggle={toggleedit}>ModalTitle</ModalHeader>
        <ModalBody>
          <Form className="theme-form">
            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">First Name</Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="text"
                  placeholder="First Name"
                />
              </Col>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">Middle Name</Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Middle Name"
                />
              </Col>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">Last Name</Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Last Name"
                />
              </Col>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">Email</Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                />
              </Col>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">Password</Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                />
              </Col>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">Avatar</Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="files"
                  placeholder="Avatar"
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="exampleFormControlSelect9">Roles</Label>
              <Input
                type="select"
                name="select"
                className="form-control digits"
                defaultValue="1"
              >
                <option>admin</option>
                <option>staff</option>
              </Input>
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

      <Breadcrumb parent="Users" title="Edit Profile" />
      <Container fluid={true}>
        <div className="edit-profile">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between">
                    <h4 className="card-title mb-0 ">{UsersTableTitle}</h4>
                    <Button variant="primary" onClick={toggle}>
                      <i className="ion ion-plus-circled "></i>
                    </Button>
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
                        {UsersTableHeader.map((items, i) => (
                          <th className="text-center" key={i}>
                            {items}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((items, i) => (
                        <tr className="text-center" key={i}>
                          <td>{items.FirstName} </td>
                          <td>{items.MiddleName}</td>
                          <td>{items.LastName}</td>
                          <td>{items.Email}</td>
                          <td> {items.Roles} </td>
                          <td className="text-right">
                            {/* TODO:: onEdit , onUpdate, onDelete are the buttons onclick methods (send as props) */}
                            {/* <Button
                              color="primary"
                              onClick={toggleedit}
                              size="sm"
                            >
                              <i className="fa fa-pencil"></i> {Edit}
                            </Button> */}
                            <ActionButton
                              onDelete={onDelete}
                              onEdit={onEdit}
                              onUpdate={onUpdate}
                            />
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

export default UserEdit;
