import React, { Fragment, useEffect, useState } from 'react';
import { BsHouseDoor, BsHouseDoorFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { GrAddCircle } from 'react-icons/gr';
import Imageupload from '../../../components/upload/ImageUploader';
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import {
  Delete,
  Edit,
  // Update,
  UsersTableHeader,
  UsersTableTitle,
} from '../../../constant';
import WidgetGlance from '../../../components/Widget/WidgetGlance';
import Breadcrumb from '../../../layout/breadcrumb';
import axios from '../../../api/axios';
import paths from 'route/paths';
import ShowMessage from 'components/Toast/Toast';
import { fetchUser } from 'api';

const Allusers = (props) => {
  const [userCount, setUserCount] = useState(0);
  const datas = [
    {
      title: 'Total Users',
      value: userCount ? userCount : 0,
      icon: FaUserAlt,
    },
    {
      title: 'New Users Today',
      value: 40,
      icon: GrAddCircle,
    },
    {
      title: 'Users inside valley',
      value: 800,
      icon: BsHouseDoorFill,
    },
    {
      title: 'Users Outside Valley',
      value: 200,
      icon: BsHouseDoor,
    },
  ];
  const [data, setData] = useState([]);
  const [fileList, setFileList] = useState(false);
  const [modaledit, setModaledit] = useState(false);

  const [modalData, setModalData] = useState({});
  const [image, setimage] = useState([]);
  const history = useHistory();


  useEffect(() => {  
    axios.get('/users/count').then((data)=>{
      setUserCount(data.data?.count);
    })
    
  }, [modalData]);




  

  useEffect(() => {
    if (fileList && fileList.length) {
      setimage([{ url: fileList[0]?.url }]);
      setModalData({ ...modalData, image: fileList[0]?.url });
    }
  }, [fileList]);

  useEffect(() => setimage([{ url: modalData?.image }]), [modalData]);

  const toggleedit = () => setModaledit(!modaledit);

  const submitHandler = async () => {
    const user = {
      firstName: modalData.firstName,
      middleName: modalData.middleName,
      lastName: modalData.lastName,
      username: modalData.username,
      email: modalData.email,
      image: modalData.image,
      phone: modalData.phone,
      user_role: modalData.user_role,
    };
    await axios.patch(`/users/${modalData.id}`, user);
    toggleedit();
    setModalData({});
    ShowMessage('200', 'User Edited Successfully!');
  };

  return (
    <Fragment>
      <Modal isOpen={modaledit} toggle={toggleedit}>
        <ModalHeader toggle={toggleedit}>Edit Users</ModalHeader>
        <ModalBody>
          <Form className="theme-form">
            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">First Name</Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="text"
                  defaultValue={modalData?.firstName}
                  onChange={(e) =>
                    setModalData({ ...modalData, firstName: e.target.value })
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">Middle Name</Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="text"
                  value={modalData?.middleName}
                  onChange={(e) =>
                    setModalData({ ...modalData, middleName: e.target.value })
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">Last Name</Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="text"
                  value={modalData?.lastName}
                  onChange={(e) =>
                    setModalData({ ...modalData, lastName: e.target.value })
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
                  onChange={(e) =>
                    setModalData({ ...modalData, email: e.target.value })
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
                  value={modalData?.phone}
                  onChange={(e) =>
                    setModalData({ ...modalData, phone: e.target.value })
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
                  className="form-control digits"
                  defaultValue={modalData?.user_role}
                  onChange={(e) =>
                    setModalData({ ...modalData, user_role: e.target.value })
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
                  Images={image ? image : []} // send currnt images if there are any
                />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              toggleedit();
              setModalData({});
            }}
          >
            Close
          </Button>
          <Button color="secondary" onClick={submitHandler}>
            SaveChanges
          </Button>
        </ModalFooter>
      </Modal>

      <Breadcrumb parent="Users" title="Edit Users" />
      <Container fluid={true}>
        <WidgetGlance data={datas} />
        <div className="feature-products">
          <Row>
            <Col xl="3" sm="3">
              <div className={`product-sidebar }`}>
                <div className="filter-section">
                  <Card>
                    <CardHeader>
                      <h6 className="mb-0 f-w-600">
                        Filters
                        <span className="pull-right">
                          <i className="fa fa-chevron-down toggle-data"></i>
                        </span>
                      </h6>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </Col>
            <Col xl="4" sm="4">
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
                  <option value="Featured">Featured</option>
                  <option value="LowestPrices">LowestPrices</option>
                  <option value="HighestPrices">HighestPrices</option>
                </select>
              </div>
            </Col>
            <Col xl="2" sm="2">
              <Button
                className="mt-2 background--primary"
                onClick={() => history.push('/dashboard/user/create')}
              >
                Add User
              </Button>
            </Col>
          </Row>
        </div>
        <div className="edit-profile">
          {Array.isArray(data) ?
            <Row>
              <Col md="12">
                <Card>
                  <div className="table-responsive">
                    <table className="table card-table table-vcenter text-nowrap">
                      <thead>
                        <tr>
                          {Array.isArray(UsersTableHeader) && UsersTableHeader?.map((items, i) => (
                            <th key={i}>{items}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(data) && data?.map((items, i) => (
                          <tr key={i}>
                            <td>{items.firstName} </td>
                            <td>{items.middleName}</td>
                            <td>{items.lastName}</td>
                            <td>{items.email}</td>
                            <td> {items.role} </td>
                            <td className="text-right">
                              {/* <Button
                              color="primary"
                              onClick={() => {
                                toggleedit();
                                setModalData(items);
                              }}
                              size="sm"
                            >
                              <i className="fa fa-pencil"></i> {Edit}
                            </Button>{' '} */}
                              {/* | */}
                              {/* <Button color="transparent" size="sm">
                              <i className="fa fa-link"></i> {Update}
                            </Button> */}
                              <Button color="danger" size="sm">
                                <i className="fa fa-trash"></i> {Delete}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </Col>
            </Row>
            :
            <Spinner ></Spinner>}
        </div>
      </Container>
    </Fragment>
  );
};

export default Allusers;
