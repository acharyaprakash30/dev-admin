import React, { Fragment, useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  CardFooter,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import paths from 'route/paths';
import Breadcrumb from '../../../layout/breadcrumb';
import Imageupload from '../../../components/upload/ImageUploader';
import ShowMessage from 'components/Toast/Toast';
import axios from '../../../api/axios';

const Adduser = (props) => {
  const history = useHistory();

  const [modalData, setModalData] = useState({});
  const [fileList, setFileList] = useState(false);
  useEffect(() => {
    if (fileList && fileList.length) {
      setModalData({ ...modalData, image: fileList[0]?.url });
    }
  }, [fileList]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post('/users', modalData);
    setModalData({});
    history.push('/dashboard/users');
    ShowMessage('200', 'User created successfully!');
  };

  return (
    <Fragment>
      <Breadcrumb parent="Form" title="Add User" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>User Details</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Form className="theme-form" onSubmit={submitHandler}>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          First Name
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="text"
                            defaultValue={modalData?.firstName}
                            required
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                firstName: e.target.value,
                              })
                            }
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
                            value={modalData?.middleName}
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                middleName: e.target.value,
                              })
                            }
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
                            value={modalData?.lastName}
                            required
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                lastName: e.target.value,
                              })
                            }
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">Email</Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="email"
                            value={modalData?.email}
                            required
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                email: e.target.value,
                              })
                            }
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">Phone</Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="text"
                            maxLength={10}
                            required
                            value={modalData?.phone}
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                phone: e.target.value,
                              })
                            }
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">Roles</Label>
                        <Col sm="9">
                          <Input
                            type="select"
                            name="select"
                            required
                            className="form-control digits"
                            defaultValue={modalData?.user_role}
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                user_role: e.target.value,
                              })
                            }
                          >
                            <option value="admin">admin</option>
                            <option value="staff">staff</option>
                            <option value="customer">Customer</option>
                            <option value="vendor">Vendor</option>
                          </Input>
                        </Col>
                      </FormGroup>

                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">Image</Label>
                        <Col sm="9">
                          <Imageupload
                            maxImageUpload={1}
                            url={paths.assetManager} //url
                            editImg={false}
                            aspectRatioX={786}
                            aspectRatioY={500}
                            setFileList={setFileList} //state to set all uploaded file
                          />
                        </Col>
                      </FormGroup>
                      <Button type="Submit" color="primary" className="mr-1">
                        Add User
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Adduser;
