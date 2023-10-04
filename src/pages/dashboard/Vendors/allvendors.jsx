import React, { Fragment, useEffect, useState } from 'react';
import Imageupload from '../../../components/upload/ImageUploader';
import {
  Button,
  Card,
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
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import actions from './redux/actions';
import Breadcrumb from '../../../layout/breadcrumb';
import paths from 'route/paths';
import ShowMessage from 'components/Toast/Toast';
import { Delete, Edit, VendorsTableHeader } from 'constant';
import config from 'config/app';
import { Checkbox } from 'antd';
import VendorForm from 'components/Modal/vendorForm';
import Loading from 'components/ProgressModal/Progress';

const AllVendors = (props) => {
  const dispatch = useDispatch();

  const [fileList, setFileList] = useState(false);
  const [modaledit, setModaledit] = useState(false);
  const [modalData, setModalData] = useState({});
  const [image, setimage] = useState([]);
  const data = useSelector((state) => state.Vendor.Vendor);
  useEffect(() => {
    dispatch(actions.getVendorReq());
  }, []);

  useEffect(() => {
    // if (fileList && fileList.length) {
    //   setimage([{ url: fileList[0]?.url }]);
    //   setModalData({ ...modalData, image: fileList[0]?.url });
    // }
  }, [fileList]);

  useEffect(() => setimage([{ url: modalData?.image }]), [modalData.image]);

  const toggleedit = () => setModaledit(!modaledit);

  const submitHandler = async () => {
    const vendor = {
      firstName: modalData?.firstName,
      middleName: modalData?.middleName,
      lastName: modalData?.lastName,
      username: modalData?.username,
      email: modalData?.email,
      image: modalData?.image,
      phone: modalData?.phone,
      company_name: modalData?.company_name,
      company_address: modalData?.company_address,
      is_phone_verified: modalData?.is_phone_verified,
      is_email_verified: modalData?.is_email_verified,
      citizenship: modalData?.citizenship,
      company_registration: modalData?.company_registration,
      pan_or_vat: modalData?.pan_or_vat,
      banijya_bivag: modalData?.banijya_bivag,
    };
    // await axios.patch(`/users/${modalData.id}`, user);
    dispatch(actions.editVendorReq(modalData.id, vendor));
    toggleedit();
    setModalData({});
  };

  return (
    <Fragment>
      <Loading
        // show={DealsStates?.getDeals?.loading || DealsStates?.loading}
        show={true}
        title={'Loading....'}
        type="info"
      />
      {/* <Modal size='lg' isOpen={modaledit} style={{maxWidth: '900px', width: '100%'}}  centered toggle={toggleedit}>
        <ModalHeader toggle={toggleedit}>Vendors</ModalHeader>
        <ModalBody>
          <Form className="theme-form">
            <FormGroup className="row">
              <Label className="col-sm-2 col-form-label">First Name</Label>
              <Col sm="4 my-auto">
                <Input
                  className="form-control"
                  type="text"
                  defaultValue={modalData?.firstName}
                  onChange={(e) =>
                    setModalData({ ...modalData, firstName: e.target.value })
                  }
                />
              </Col>
              <Label className="col-sm-2 col-form-label">Middle Name</Label>
              <Col sm="4 my-auto">
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
            <FormGroup className="row"></FormGroup>
            <FormGroup className="row">
              <Label className="col-sm-2 col-form-label">Last Name</Label>
              <Col sm="4 my-auto">
                <Input
                  className="form-control"
                  type="text"
                  value={modalData?.lastName}
                  onChange={(e) =>
                    setModalData({ ...modalData, lastName: e.target.value })
                  }
                />
              </Col>
              <Label className="col-sm-2 col-form-label">Email</Label>
              <Col sm="4">
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
              <Label className="col-sm-3 col-form-label">Company Name</Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="text"
                  value={modalData?.company_name}
                  onChange={(e) =>
                    setModalData({ ...modalData, company_name: e.target.value })
                  }
                />
              </Col>
            </FormGroup>

            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">Company Address</Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="text"
                  value={modalData?.company_address}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      company_address: e.target.value,
                    })
                  }
                />
              </Col>
            </FormGroup>

            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">
                Phone Verification
              </Label>
              <Col sm="3 my-auto">
                <Checkbox
                  value={modalData?.is_phone_verified}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      is_phone_verified: e.target.checked,
                    })
                  }
                />
              </Col>
              <Label className="col-sm-3 col-form-label">
                Email Verification
              </Label>
              <Col sm="3 my-auto">
                <Checkbox
                  value={modalData?.is_email_verified}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      is_email_verified: e.target.checked,
                    })
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">CitizenShip</Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="text"
                  value={modalData?.citizenship}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      citizenship: e.target.value,
                    })
                  }
                />
              </Col>
            </FormGroup>

            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">
                Company Registration
              </Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="text"
                  value={modalData?.company_registration}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      company_registration: e.target.value,
                    })
                  }
                />
              </Col>
            </FormGroup>

            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">Pan or Vat</Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="text"
                  value={modalData?.pan_or_vat}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      pan_or_vat: e.target.value,
                    })
                  }
                />
              </Col>
            </FormGroup>

            <FormGroup className="row">
              <Label className="col-sm-3 col-form-label">Banijya Bivag</Label>
              <Col sm="9">
                <Input
                  className="form-control"
                  type="text"
                  value={modalData?.banijya_bivag}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      banijya_bivag: e.target.value,
                    })
                  }
                />
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
      </Modal> */}
      <VendorForm
        modalData={modalData}
        modaledit={modaledit}
        toggleedit={toggleedit}
        setFileList={setFileList}
        image={image}
        fileList={fileList}
        setModalData={setModalData}
        submitHandler={submitHandler}
      ></VendorForm>

      <Breadcrumb parent="Vendors" title="All Vendors" />
      <Container fluid={true}>
        <div className="feature-products"></div>
        <div className="edit-profile">
          <Row>
            <Col md="12">
              <Card>
                <div className="table-responsive">
                  <table className="table card-table table-vcenter text-nowrap">
                    <thead>
                      <tr>
                        {VendorsTableHeader.map((items, i) => (
                          <th key={i}>{items}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((items, i) => (
                        <tr key={i}>
                          <td>
                            <img
                              className="img-icon"
                              src={
                                items?.avatar === null
                                  ? require('assets/images/avtar/dafault-user.jpg')
                                  : items?.avatar.includes('www')
                                  ? items.avatar
                                  : config.baseURL + items?.avatar
                              }
                            />
                          </td>
                          <td>
                            <Link to={'/dashboard/catalogs/' + items.id}>
                              {items?.firstName} {items?.lastName}
                            </Link>
                          </td>
                          <td>{items?.email}</td>
                          <td> {items?.username || '-'} </td>
                          <td> {items?.phone || '-'} </td>
                          <td> {items?.vendorDetail?.address || '-'} </td>
                          <td> {items?.vendorDetail?.commission || '-'} </td>
                          <td>
                            <Button
                              color="primary"
                              onClick={() => {
                                toggleedit();
                                setModalData(items);
                              }}
                              size="sm"
                            >
                              <i className="fa fa-pencil"></i> {Edit}
                            </Button>
                            {/* <Button color="transparent" size="sm">
                              <i className="fa fa-link"></i> {Update}
                            </Button> */}
                            {/* <Button color="danger" size="sm">
                              <i className="fa fa-trash"></i> {Delete}
                            </Button> */}
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

export default AllVendors;
