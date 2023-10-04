import React, { useEffect, useRef } from 'react';
import {
  Button,
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
import { useForm } from 'react-hook-form';
import user from './redux/action';
import { useDispatch, useSelector } from 'react-redux';

const UserAdd = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const roles = useSelector((state) => state.user.roleList);

  const fetchRole = useRef();

  fetchRole.current = () => {
    if (!roles.length) dispatch(user.getRole());
  };

  useEffect(() => {
    fetchRole.current();
  }, []);

  return (
    <>
      <Container fluid={true}>
        <div className="edit-profile">
          <Form onSubmit={handleSubmit((data) => dispatch(user.addUser(data)))}>
            <Row>
              <Col xl="12">
                <CardHeader>
                  <h4 className="card-title mb-0 m-4">Add Users</h4>
                </CardHeader>
                <CardBody>
                  <div className="card-options p-4">
                    {/* select role */}
                    <Row>
                      <FormGroup className="col-4 p-r-0">
                        <Label>Select Role</Label>

                        {/* <select className="form-control" type size="1" name="roleId" innerRef={register()}> */}
                        <Input
                          type="select"
                          name="roleId"
                          innerRef={register()}
                        >
                          {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </Input>

                        {/* </select> */}
                      </FormGroup>
                    </Row>
                    <hr />
                    {/* Names */}
                    <Row>
                      {/* first name  */}
                      <FormGroup className="col-4 p-r-0">
                        <Label>First Name</Label>
                        <Input
                          placeholder="First Name"
                          type="text"
                          name="firstName"
                          innerRef={register({
                            required: 'First name is required',
                          })}
                        ></Input>
                      </FormGroup>
                      {/* middle name */}
                      <FormGroup className="col-4 p-r-0">
                        <Label>Middle Name</Label>
                        <Input
                          placeholder="Middle Name"
                          type="text"
                          name="middleName"
                          innerRef={register()}
                        ></Input>
                      </FormGroup>
                      {/* last name */}
                      <FormGroup className="col-4 p-r-0">
                        <Label>Last Name</Label>
                        <Input
                          placeholder="Last Name"
                          type="text"
                          name="lastName"
                          innerRef={register({
                            required: 'last name is required.',
                          })}
                        ></Input>
                      </FormGroup>
                    </Row>
                    {/* contact details */}
                    <Row>
                      {/* Email  */}
                      <FormGroup className="col-md-4 col-sm-12 p-r-0">
                        <Label>Email</Label>
                        <Input
                          placeholder="Email"
                          type="email"
                          name="email"
                          innerRef={register({
                            required: 'Email is required.',
                          })}
                        ></Input>
                      </FormGroup>
                      {/* phone */}
                      <FormGroup className="col-md-4 col-sm-12 p-r-0">
                        <Label>Phone</Label>
                        <Input
                          name="phone"
                          placeholder="Phone"
                          innerRef={register({
                            required: 'Phone is required.',
                          })}
                          type="text"
                        ></Input>
                      </FormGroup>
                    </Row>
                    {/* credentials */}
                    <Row>
                      {/* username */}
                      <FormGroup className="col-4 p-r-0">
                        <Label>Username</Label>
                        <Input
                          placeholder="Username"
                          type="text"
                          name="username"
                          innerRef={register({
                            required: 'Username is required.',
                          })}
                        ></Input>
                      </FormGroup>
                      {/* password */}
                      <FormGroup className="col-4 p-r-0">
                        <Label>Password</Label>
                        <Input
                          placeholder="Password"
                          type="password"
                          name="password"
                          innerRef={register({
                            required: 'Password is required.',
                          })}
                        ></Input>
                      </FormGroup>
                    </Row>
                  </div>
                </CardBody>
                <CardFooter className="text-center">
                  <Button className="primary" type="submit">
                    Add User
                  </Button>
                </CardFooter>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default UserAdd;
