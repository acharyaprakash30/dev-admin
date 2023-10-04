import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../../layout/breadcrumb';
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
} from 'reactstrap';
import axios from '../../../api/axios';
import {
  MyProfile,
  Bio,
  MarkJecno,
  Designer,
  Password,
  Website,
  Save,
  EditProfile,
  Company,
  Username,
  UsersCountryMenu,
  AboutMe,
  UpdateProfile,
  UsersTableTitle,
  FirstName,
  LastName,
  Address,
  EmailAddress,
  PostalCode,
  Country,
  UsersTableHeader,
  City,
  Edit,
  Update,
  Delete,
} from '../../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import actions from './redux/actions';
import ShowMessage from '../../../components/Toast/Toast';

const UserEdit = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

 

  const profile = useSelector((state) => state.Profile);

  useEffect(() => {
    dispatch(actions.fetchProfileReq());
  }, [dispatch]);

  useEffect(() => {
    if (!profile.loading) {
      setData({
        firstName: profile.profile[0]?.firstName,
        middleName: profile.profile[0]?.middleName,
        lastName: profile.profile[0]?.lastName,
        email: profile.profile[0]?.email,
        phone: profile.profile[0]?.phone,
      });
    }
  }, [profile.loading, profile.profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.patch('/profile/update', data);
    history.push('/dashboard/userprofile');
    ShowMessage(200, 'User edited Successfully!');
  };
  return (
    <Fragment>
      <Breadcrumb parent="Users" title="Edit Profile" />
      <Container fluid={true}>
        <div>
          <Form className="card" onSubmit={handleSubmit}>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label className="form-label">{FirstName}</Label>
                      <Input
                        className="form-control"
                        type="text"
                        required
                        placeholder="First Name"
                        defaultValue={data?.firstName}
                        onChange={(e) =>
                          setData({ ...data, firstName: e.target.value })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label className="form-label">Middle Name</Label>
                      <Input
                        className="form-control"
                        type="text"
                        defaultValue={data?.middleName}
                        onChange={(e) =>
                          setData({ ...data, middleName: e.target.value })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label className="form-label">{LastName}</Label>
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="Last Name"
                        defaultValue={data?.lastName}
                        required
                        onChange={(e) =>
                          setData({ ...data, lastName: e.target.value })
                        }
                      />
                    </FormGroup>
                  </Col>
                  </Row>
                  <Row>
                  <Col sm="6" md="6">
                    <FormGroup>
                      <Label className="form-label">{EmailAddress}</Label>
                      <Input
                        className="form-control"
                        type="email"
                        placeholder="Email"
                        required
                        defaultValue={data?.email}
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="6">
                    <FormGroup>
                      <Label className="form-label">Phone</Label>
                      <Input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Phone"
                        defaultValue={data?.phone}
                        onChange={(e) =>
                          setData({ ...data, phone: e.target.value })
                        }
                      />
                    </FormGroup>
                  </Col>
                  {/* <Col md="12">
                    <FormGroup>
                      <button
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: 'red',
                          cursor: 'pointer',
                        }}
                      >
                        Change Password?
                      </button>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <Label className="form-label">{Address}</Label>
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="Home Address"
                        onChange={(e) =>
                          setData({ ...data, address: e.target.value })
                        }
                      />
                    </FormGroup>
                  </Col> */}
                  {/* <Col sm="6" md="4">
                    <FormGroup>
                      <Label className="form-label">{City}</Label>
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="City"
                      />
                    </FormGroup>
                  </Col> */}
                  {/* <Col sm="6" md="3">
                    <FormGroup>
                      <Label className="form-label">{PostalCode}</Label>
                      <Input
                        className="form-control"
                        type="number"
                        placeholder="ZIP Code"
                      />
                    </FormGroup>
                  </Col> */}
                  {/* <Col md="5">
                    <FormGroup>
                      <Label className="form-label">{Country}</Label>
                      <Input
                        type="select"
                        name="select"
                        className="form-control btn-square"
                      >
                        {UsersCountryMenu.map((items, i) => (
                          <option key={i}>{items}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col> */}
                  {/* <Col md="12">
                    <div className="form-group mb-0">
                      <Label className="form-label">{AboutMe}</Label>
                      <Input
                        type="textarea"
                        className="form-control"
                        rows="5"
                        placeholder="Enter About your description"
                      />
                    </div>
                  </Col> */}
                </Row>
              </CardBody>
              <CardFooter className="text-right">
                <button className="btn btn-primary" type="submit">
                  {UpdateProfile}
                </button>
              </CardFooter>
            </Card>
          </Form>
        </div>
      </Container>
    </Fragment>
  );
};

export default UserEdit;
