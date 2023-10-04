import React,{useState,useEffect} from 'react';
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
import { Checkbox } from 'antd';
import Imageupload from '../../components/upload/ImageUploader';
import paths from 'route/paths';


const VendorForm = ({modaledit,toggleedit,modalData,setModalData,submitHandler,setFileList,fileList,image}) => {

  return (
    <Modal size='lg' isOpen={modaledit} style={{maxWidth: '900px', width: '100%'}}  centered toggle={toggleedit}>
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
      </Modal>
  )
}

export default VendorForm